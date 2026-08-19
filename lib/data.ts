export const WA_NUMBER = "6281299960009";
export const PHONE_DISPLAY = "0812-9996-0009";

// Alamat asal berdirinya Es Teh Kulonan (2022), sesuai brief Drive.
// Titik jualan lengkap ada di halaman /cabang (10 lokasi).
export const HQ_ADDRESS = "Pasar Cerme, Kec. Cerme, Kabupaten Gresik, Jawa Timur";

// Belum ada akun media sosial resmi di brief/Drive klien — isi linknya
// di sini kalau sudah ada, ikon otomatis tampil di footer begitu diisi.
export const socials = {
  instagram: "",
  tiktok: "",
  facebook: "",
};

export function waLink(message: string) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  size: string; // cb, ck, cr, cm
  bestSeller?: boolean;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const rawMenuData: { category: string; items: Omit<MenuItem, "id">[] }[] = [
  {
    category: "Ori",
    items: [
      { name: "Ori Jumbo", price: 4000, size: "Cup Besar", bestSeller: true },
      { name: "Teh Hangat", price: 4000, size: "Cup Kecil" },
    ],
  },
  {
    category: "Ori Variant",
    items: [
      { name: "Teh Leci", price: 6000, size: "Cup Besar", bestSeller: true },
      { name: "Teh Melon", price: 6000, size: "Cup Besar" },
      { name: "Teh Jeruk", price: 6000, size: "Cup Besar" },
      { name: "Teh Susu", price: 6000, size: "Cup Besar" },
    ],
  },
  {
    category: "Milk Variant",
    items: [
      { name: "Lecy Milk Tea", price: 8000, size: "Cup Regular", bestSeller: true },
      { name: "Melon Milk Tea", price: 8000, size: "Cup Regular" },
      { name: "Orange Milk Tea", price: 8000, size: "Cup Regular" },
    ],
  },
  {
    category: "Mojito Variant",
    items: [
      { name: "Mojito Lecy", price: 7000, size: "Cup Kecil" },
      { name: "Mojito Melon", price: 7000, size: "Cup Kecil" },
      { name: "Mojito Jeruk", price: 7000, size: "Cup Kecil" },
    ],
  },
  {
    category: "Choco Variant",
    items: [
      { name: "Coklat Royal", price: 10000, size: "Cup Regular" },
      { name: "Coklat Milo", price: 10000, size: "Cup Regular" },
      { name: "Coklat Silverqueen", price: 10000, size: "Cup Regular" },
    ],
  },
  {
    category: "Colours Variant",
    items: [
      { name: "Matcha", price: 8000, size: "Cup Regular" },
      { name: "Taro", price: 8000, size: "Cup Regular" },
      { name: "Permen Karet", price: 8000, size: "Cup Regular" },
      { name: "Avocado", price: 8000, size: "Cup Regular" },
    ],
  },
  {
    category: "Kopi Variant",
    items: [
      { name: "Kopi Mocca", price: 8000, size: "Cup Medium" },
      { name: "Kopi Aren Latte", price: 10000, size: "Cup Medium" },
    ],
  },
  {
    category: "Lemon Variant",
    items: [
      { name: "Lemon Tea", price: 8000, size: "Cup Besar", bestSeller: true },
      { name: "Lemon Tea Honey", price: 10000, size: "Cup Besar", bestSeller: true },
    ],
  },
];

export const menuData: MenuCategory[] = rawMenuData.map((cat) => ({
  category: cat.category,
  items: cat.items.map((item) => ({ ...item, id: slugify(item.name) })),
}));

export const bestSellers = menuData
  .flatMap((c) => c.items.map((i) => ({ ...i, category: c.category })))
  .filter((i) => i.bestSeller);

export const allMenuItems = menuData.flatMap((c) =>
  c.items.map((i) => ({ ...i, category: c.category }))
);

export type Branch = {
  name: string;
  address: string;
  wa: string;
};

export const branches: Branch[] = [
  {
    name: "Indomaret Menganti Karangturi",
    address:
      "Indomaret Menganti Karangturi, Sidomulyo, Hulaan, Kec. Menganti, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Indomaret Raya Hulaan",
    address: "Jl. Raya Menganti, Sidomulyo, Hulaan, Kec. Menganti, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Alfamidi Raya Cerme Lor No. 30",
    address: "Jl. Raya Cerme Lor No.30, Cerme Lor, Kec. Cerme, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Indomaret Embong Karang Cerme (TRSC)",
    address: "Jl. Pasar Cerme Lor No.166, Ngabetan, Cerme Lor, Kec. Cerme, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Indomaret Gubernur Suryo",
    address:
      "Jl. Gub Suryo No 1B Rt/Rw 01/03, Karang Poh, Gresik, Karangpoh, Kemuteran, Kec. Gresik, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Family Bakery Jl. Sumatra No. 64",
    address: "Jl. Sumatra No.64, Gn. Malang, Randuagung, Kec. Kebomas, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Indomaret Raya Putat Lor",
    address: "Jl. Raya Putat Lor, Gantang, Boboh, Kec. Menganti, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Cermart, Pasar Cerme Lor No. 80",
    address: "Jl. Pasar Cerme Lor No.80, Cerme Lor, Kec. Cerme, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Pasar Cerme Lor No. 156",
    address: "Jalan Pasar Cerme Lor No. 156, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
  {
    name: "Indomaret Sukomulyo 1, Maduran, Roomo",
    address: "Indomaret Sukomulyo 1, Maduran, Roomo, Kec. Manyar, Kabupaten Gresik",
    wa: WA_NUMBER,
  },
];

export const franchisePackages = [
  {
    name: "Paket A (Ekonomis)",
    tagline: "Paket Ekonomis",
    price: "Rp 3.000.000",
    features: ["Free ongkir", "Portable", "Bahan baku free 150 porsi", "Siap jualan"],
  },
  {
    name: "Paket B (Jos)",
    tagline: "Paket Jos",
    price: "Rp 15.000.000",
    features: [
      "Free ongkir",
      "Bahan baku free 500 porsi",
      "Termasuk booth container",
      "Siap jualan",
    ],
  },
];

export const menuAndalan = [
  "Es Teh Ori",
  "Lemon Tea",
  "Lemon Tea Honey",
  "Leci Tea",
  "Leci Milk Tea",
];
