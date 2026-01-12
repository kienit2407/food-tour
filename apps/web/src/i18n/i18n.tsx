/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useMemo, useState } from "react";

export type Locale = "vi" | "en";

type Dict = Record<string, { vi: string; en: string }>;

const dict: Dict = {
  app_name: { vi: "Food Tour SG", en: "Food Tour SG" },
  discover: { vi: "Khám phá", en: "Discover" },
  favorites: { vi: "Đã lưu", en: "Favorites" },
  activity: { vi: "Hoạt động", en: "Activity" },

  filters: { vi: "Bộ lọc", en: "Filters" },
  district: { vi: "Quận", en: "District" },
  category: { vi: "Danh mục", en: "Category" },
  budget: { vi: "Ngân sách", en: "Budget" },
  reset: { vi: "Đặt lại", en: "Reset" },

  all: { vi: "Tất cả", en: "All" },
  results: { vi: "Kết quả", en: "Results" },
  recommended: { vi: "Gợi ý cho bạn", en: "Recommended" },

  dish: { vi: "Món", en: "Dish" },
  address: { vi: "Địa chỉ", en: "Address" },
  open_hours: { vi: "Giờ mở cửa", en: "Open hours" },
  price_range: { vi: "Khoảng giá", en: "Price range" },

  surprise: { vi: "Ngẫu nhiên", en: "Surprise me" },
  view_detail: { vi: "Xem chi tiết", en: "View detail" },
  back: { vi: "Quay lại", en: "Back" },
  details: { vi: "Chi tiết", en: "Details" },
  menu: { vi: "Thực đơn", en: "Menu" },
  notes: { vi: "Ghi chú", en: "Notes" },
  map: { vi: "Bản đồ", en: "Map" },
  no_items: { vi: "Chưa có món trong dữ liệu.", en: "No items found." },
  open_hours_label: { vi: "Giờ mở cửa", en: "Open hours" },
};

type I18nCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: keyof typeof dict) => string;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("vi");

  const value = useMemo<I18nCtx>(() => {
    return {
      locale,
      setLocale,
      t: (key) => dict[key]?.[locale] ?? String(key),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
