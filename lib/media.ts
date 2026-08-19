/**
 * Semua foto/video di website ini diambil langsung dari Google Drive,
 * bukan file lokal. Setelah kamu upload foto/video ke folder Drive yang
 * sesuai, klik kanan file → "Bagikan" → "Siapa saja yang memiliki link" →
 * copy ID file dari URL-nya, lalu tempel di value bawah ini.
 *
 * Contoh URL Drive:
 *   https://drive.google.com/file/d/1AbCdeFGhIJkLmnoPQRstuVWxyz/view
 *                                    ^^^^^^^^^^^^^^^^^^^^^^^^^^^ <- ini ID-nya
 *
 * Selama value masih string kosong "", website akan menampilkan slot
 * placeholder bergaris putus-putus di posisi tersebut.
 */

export const driveMedia = {
  // Folder Drive: "Susunan awal halaman bagian beranda es teh kulonan"
  heroVideo: "", // video produk gambar Sprite (hero)
  whyUsVideo: "", // video produk Sprite series (kenapa memilih kami)
  menuHighlightVideo: "", // video 6 gelas varian + choco series

  // Folder Drive: "foto tim es teh kulonan"
  teamVideo: "",
  teamPhoto1: "",
  storePhoto: "",

  // Video Jumat Berkah (beranda)
  jumatBerkahVideo: "",

  // Folder Drive: "Best seller teh kulonan" — foto per menu best seller
  bestSellerOriJumbo: "",
  bestSellerTehLeci: "1v5BlT0Gmkt5-_O8kb6qOyrHl0waRUZ-9", // best seller es teh leci 6 ribu
  bestSellerLecyMilkTea: "",
  bestSellerLemonTea: "",
  bestSellerLemonTeaHoney: "",

  // Foto gerai untuk tiap paket franchise (dikirim via WA sesuai brief)
  franchisePaketA: "",
  franchisePaketB: "",
} as const;

export type DriveMediaKey = keyof typeof driveMedia;

export function driveImageUrl(fileId: string) {
  // Format ini lebih stabil untuk ditampilkan langsung sebagai <img>
  // dibanding drive.google.com/uc?export=view (sering kena halaman
  // peringatan scan virus untuk file besar).
  return `https://lh3.googleusercontent.com/d/${fileId}=w1000`;
}

export function driveVideoEmbedUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
