# 🍜 Food Tour SG — Saigon Food Finder (Web)

Food Tour SG is a web app that helps users discover food places and dishes in Ho Chi Minh City.
The app connects to a **real Supabase database**, supports **VI/EN language**, and displays prices in **VND**.
It includes a responsive **Desktop Home**, **Mobile Home (filter sheet + bottom nav)**, and a **Place Detail** page that loads place info + dish items by `place_id`.

---

## ✅ Key Screens

### 🖥️ Desktop Home
- Left sidebar filters: **District / Category / Budget**
- Listings grid from database
- Random suggestion button (pick a real place from DB)

### 📱 Mobile Home
- Filter as a **Sheet**
- Bottom navigation **does not cover content**
- Same query logic as desktop, optimized layout for mobile

### 🏠 Place Detail
- Query **places** by `id`
- Query **items** by `place_id`
- Labels & text support **VI/EN**
- Prices shown as **VND** (`price_min / price_max` and/or `price_raw`)

---

## 🗃️ Database (Supabase)

Main tables:

### `places`
- `id` (uuid)
- `name` (text)
- `district` (text)
- `street` (text)
- `full_address` (text)
- `open_hours_raw` (text)
- `notes` (text)
- `maps_query` (text)
- `maps_url` (text)
- `source`, `source_ref`
- `created_at`, `updated_at`

### `items`
- `id` (uuid)
- `place_id` (uuid) → FK to `places.id`
- `dish_name` (text)
- `category` (text)
- `price_min` (int)
- `price_max` (int)
- `price_raw` (text)
- `notes` (text)
- `source`, `source_ref`
- `created_at`, `updated_at`

### `v_listings` (View)
Used for listing cards on Home:
- `item_id`, `dish_name`, `category`
- `price_min`, `price_max`, `price_raw`
- `place_id`, `place_name`, `district`, `street`, `full_address`
- `open_hours_raw`, `place_notes`, `maps_query`, `maps_url`

> Note: If you later add multilingual columns (`name_vi/name_en`, `address_vi/address_en`),
update queries + normalizers to map the correct field based on the current language.

---

## ✨ Features

### 🔎 Filters (District / Category / Price)
- Desktop: Sidebar filters
- Mobile: Sheet filters
- Filtering is applied through DB query parameters (not mock data)

### 🎲 Random suggestion (Real DB)
- Random pick from the currently loaded result set
- Navigate to `/places/:id`

### 🌍 i18n (VI/EN)
- UI labels support VI/EN
- Place/Dish text can be mapped based on schema (current schema uses `name`, `full_address`, etc.)

### 💰 VND Price Display
- Uses `price_min / price_max` when available
- Fallback to `price_raw` if needed

---

## 🧰 Tech Stack

### Frontend
- **React + Vite + TypeScript**
- **TailwindCSS**
- **shadcn/ui** (Radix UI)
- **React Router** (routing)
- **TanStack React Query** (server state + caching)

### Backend / Database
- **Supabase** (Postgres + API)

---

## 📁 Project Structure (Recommended)
```txt
This project follows a feature-first structure:
apps/web/src
├─ components/
│  ├─ layout/                 # App layout: Header, BottomNav, wrappers...
│  └─ ui/                     # shadcn/ui components: button, card, select, sheet...
│
├─ features/
│  ├─ filters/
│  │  ├─ components/          # FiltersSidebar, FiltersSheet
│  │  └─ state/               # Filter state helpers (optional)
│  │
│  ├─ listings/
│  │  └─ components/          # PlaceCard, PlaceCardSkeleton
│  │
│  └─ places/
│     ├─ api.ts               # Supabase calls (CRUD, RPC...)
│     ├─ queries.ts           # React Query hooks
│     ├─ normalize.ts         # Map DB model -> UI model
│     └─ utils.ts             # Helpers (safe fields, parsing...)
│
├─ pages/
│  ├─ Home/
│  │  ├─ HomeDesktop.tsx
│  │  ├─ HomeMobile.tsx
│  │  └─ index.tsx
│  │
│  └─ PlaceDetail/
│     └─ index.tsx
│
├─ i18n/
│  └─ i18n.tsx                # I18n provider + t()
│
└─ lib/
   ├─ supabase.ts             # Supabase client
   ├─ queryClient.ts          # React Query client
   └─ format.ts               # formatVND(), etc.
```
---
## 🚀 Installation & Setup
### If u want to take it immatediately. Let follow the intructions which i created for you below 👇:
```bash
git clone https://github.com/kienit2407/Web-App-Glasses.git
```
### Step 1: Directing at Project's location:
```bash
cb app/web
```
### Step 2: Instruction for React.js
#### If u installed yarn:
```bash
yarn install
```
### If u use npm normally:
```bash
npm install
```
---
### 🤝 Contact
### ❓If u have any the question, don't scared anything. Let hit me up through my facebook or Email 😘 : 
- 🔗 https://www.facebook.com/kin240705?locale=vi_VN
- 📬 trungkien24072005@gmail.com
### Dear send to u a huge thanks. I'm truely, grateful to u ❤️