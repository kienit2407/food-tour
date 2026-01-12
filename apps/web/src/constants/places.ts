// src/constants/places.ts
export type Place = {
  id: string
  name: string
  subtitle: string
  price: "$" | "$$" | "$$$"
  district: "District 1" | "District 3" | "Binh Thanh" | "District 5"
  hours: string
  rating: number
  imageUrl: string
  category: "All" | "Banh Mi" | "Pho & Noodles" | "Coffee & Tea" | "Street Snacks"
  isOpen?: boolean
}

export const PLACES: Place[] = [
  {
    id: "1",
    name: "Banh Mi Huynh Hoa",
    subtitle: "Special Pate Banh Mi",
    price: "$$",
    district: "District 1",
    hours: "14:00 - 23:00",
    rating: 4.8,
    category: "Banh Mi",
    isOpen: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdLCy_f4o77lMl-6GlIu1ptXyvtvyu2taUTyB6ZrGmZIxomam1O2jKys3CmSMTdK4YhK-AV3ap-kF6OgpiPr7lqYh9D6xFuY_bh4jFv8NB_3sXC2Zj1VrZDS1Av-tbdajFFSxOHDXdPF-lldbJHnqniFPsJPx_Lq685_kmPLqHLiVMHEpRJUTvMa56f_XFHFInZtahjxcCLjukxLZ0XrhKfxy6sbxyfukh1T_euXQ5MepZp9Iv79AO5DLMA9iq8RJ1XKWgOjw9vQU",
  },
  {
    id: "2",
    name: "The Workshop Coffee",
    subtitle: "Specialty Pour Over",
    price: "$$$",
    district: "District 1",
    hours: "08:00 - 21:00",
    rating: 4.5,
    category: "Coffee & Tea",
    isOpen: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMrKELgCHPSqsdb3EaOAGRGPtJwzBBmECCY997k7qZMUUUUyJveALCF4aCe2ziUgGg4Lj6g9SU529h5AziDkwsRG_7GepqTdHuhACp6sOn2F0vzHBNN_UZMT12dityAC0nCpmp-dIJFTBsD6PPSMaHpM32RQPRSAbnDKOlunfK4mO-ECEC4RPu23yj1qDTpBrFpMIR1pX0CVj-I97vYQIWUmK6qlrPSViMTpBZqO_gIjoS0PI80ZGhRe3ASa6FHVc63Co1ULI-G0c",
  },
  {
    id: "3",
    name: "Bun Thit Nuong Chi Tuyen",
    subtitle: "Grilled Pork Noodles",
    price: "$",
    district: "District 1",
    hours: "07:00 - 20:00",
    rating: 4.3,
    category: "Street Snacks",
    isOpen: true,
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZXNPN1h82rJGdXGujVnpIj2Ncd049CldbWqQ3fJ41E0FPkux7CgRb_e7k4Gc5V8oARCwzwBCKpXg2HQpetVrCq4mhid0xNxM1UM3awVJZ_Ga34RozP3Vmg_I3zVOCGh6flrlM0aCdNCW0vPDJx5mYV1UH2lqX0q_vXRPldK_tHVzzpQjqfsY_IA1deCfD2atylMp1smG3Z6TEgPR7RESPT5yZ9AYwNfl6SUk0rH8yH6Az-SK8DgoLeijTxDD7AMsel-FVwwcD0Dc",
  },
]
