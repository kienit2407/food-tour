import os, re, hashlib
import pandas as pd
import psycopg2
from psycopg2.extras import execute_values

EXCEL_PATH = os.environ.get("EXCEL_PATH", "../../Food tour SG.xlsx")
DB_URL = os.environ["SUPABASE_DB_URL"]  # dạng: postgresql://postgres:PASS@db.xxx.supabase.co:5432/postgres
SOURCE = "import_hcm_v1"

def sha1(s: str) -> str:
    return hashlib.sha1(s.encode("utf-8")).hexdigest()

def norm(s: str) -> str:
    return re.sub(r"\s+", " ", (s or "").strip().lower())

def parse_price(raw: str):
    if not raw or not isinstance(raw, str):
        return None, None
    s = raw.strip().lower().replace(" ", "")
    mult = 1
    if "tr" in s or "triệu" in s:
        mult = 1_000_000
    elif "k" in s:
        mult = 1000

    nums = re.findall(r"\d+(?:\.\d+)?", s)
    if not nums:
        return None, None

    vals = []
    for n in nums:
        v = float(n)
        # nếu có 'k' và số nhỏ (vd 22-31k), coi là nghìn
        if mult == 1000 and v <= 500:
            v = int(v * 1000)
        else:
            v = int(v * mult)
        vals.append(v)

    if len(vals) == 1:
        return vals[0], vals[0]
    return min(vals), max(vals)

def build_maps(name, street, district):
    parts = [name]
    if street: parts.append(street)
    if district: parts.append(district)
    q = ", ".join([p for p in parts if p])
    # URL đơn giản (đủ dùng v1)
    from urllib.parse import quote
    url = "https://www.google.com/maps/search/?api=1&query=" + quote(q)
    return q, url

def main():
    df = pd.read_excel(EXCEL_PATH, sheet_name="HCM")
    df = df.fillna("")

    # 1) build places unique
    place_rows = {}
    item_rows = []

    for idx, r in df.iterrows():
        stt = str(r.get("STT", "")).strip()
        place_name = str(r.get("Tên quán", "")).strip()
        dish_name = str(r.get("Tên món", "")).strip()
        category = str(r.get("Phân loại món", "")).strip()
        street = str(r.get("Tên đường", "")).strip()
        district = str(r.get("Quận", "")).strip()
        open_raw = str(r.get("Giờ mở cửa", "")).strip()
        price_raw = str(r.get("Khoảng giá", "")).strip()
        note = str(r.get("Note", "")).strip()

        place_ref = sha1(norm(place_name) + "|" + norm(district) + "|" + norm(street))
        maps_query, maps_url = build_maps(place_name, street, district)

        if place_ref not in place_rows:
            place_rows[place_ref] = (
                SOURCE, place_ref,
                place_name, district, street, "",   # full_address để trống v1
                open_raw, note,
                maps_query, maps_url
            )

        pmin, pmax = parse_price(price_raw)

        item_ref = sha1(place_ref + "|" + norm(dish_name) + "|" + norm(category) + "|" + norm(price_raw) + "|" + norm(stt))
        item_rows.append((
            SOURCE, item_ref,
            place_ref,  # tạm dùng ref, lát map ra place_id
            dish_name, category,
            pmin, pmax, price_raw,
            note
        ))

    conn = psycopg2.connect(DB_URL)
    conn.autocommit = False
    cur = conn.cursor()

    # 2) upsert places
    places_values = list(place_rows.values())
    execute_values(cur, """
        insert into places (
          source, source_ref, name, district, street, full_address,
          open_hours_raw, notes, maps_query, maps_url
        ) values %s
        on conflict (source, source_ref) do update set
          name = excluded.name,
          district = excluded.district,
          street = excluded.street,
          full_address = excluded.full_address,
          open_hours_raw = excluded.open_hours_raw,
          notes = excluded.notes,
          maps_query = excluded.maps_query,
          maps_url = excluded.maps_url
    """, places_values, page_size=500)

    # 3) load mapping source_ref -> place_id
    place_refs = list(place_rows.keys())
    cur.execute("""
        select id, source_ref from places
        where source = %s and source_ref = any(%s)
    """, (SOURCE, place_refs))
    ref_to_id = {ref: pid for (pid, ref) in cur.fetchall()}

    # 4) upsert items (map place_ref -> place_id)
    items_values = []
    for (source, item_ref, place_ref, dish, cat, pmin, pmax, praw, note) in item_rows:
        pid = ref_to_id.get(place_ref)
        if not pid:
            continue
        items_values.append((source, item_ref, pid, dish, cat, pmin, pmax, praw, note))

    execute_values(cur, """
        insert into items (
          source, source_ref, place_id,
          dish_name, category, price_min, price_max, price_raw, notes
        ) values %s
        on conflict (source, source_ref) do update set
          place_id = excluded.place_id,
          dish_name = excluded.dish_name,
          category = excluded.category,
          price_min = excluded.price_min,
          price_max = excluded.price_max,
          price_raw = excluded.price_raw,
          notes = excluded.notes
    """, items_values, page_size=500)

    conn.commit()
    cur.close()
    conn.close()

    print(f"Imported places={len(places_values)}, items={len(items_values)}")

if __name__ == "__main__":
    main()
