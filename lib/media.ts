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
  bestSellerTehLeci: "",
  bestSellerLecyMilkTea: "",
  bestSellerLemonTea: "",
  bestSellerLemonTeaHoney: "",

  // Foto gerai untuk tiap paket franchise (dikirim via WA sesuai brief)
  franchisePaketA: "",
  franchisePaketB: "",
} as const;

export type DriveMediaKey = keyof typeof driveMedia;

export function driveImageUrl(fileId: string) {
  return `https://drive.google.com/uc?export=view&id=${fileId}`;
}

export function driveVideoEmbedUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
