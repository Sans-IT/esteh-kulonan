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

import { allMenuItems } from "@/lib/data"

// Video & foto non-menu (hero, tim, franchise, dll)
export const driveVideos = {
  heroVideo: "14rlCh3VmdpBoExauMYnXdA85TcWosy76", // video promosi produk (hero), urutan video 1
  whyUsVideo: "19tSsweXoTwSMFj-FUtNQixVejUnEhrZc", // video di bawah "Kenapa Memilih Es Teh Kulonan"
  // Bagian "Menu Andalan" dapat 2 video terpisah dari client (choco series & varian menu)
  menuHighlightVideoChoco: "1WkUa8F6BdydQgt36S3ArS_q9VgsVYOMX", // video choco series
  menuHighlightVideoVarian: "1j8z5OVW_3IQKeNwdye2LG1UkOWrxF10A", // video 6 gelas varian menu
  teamVideo: "18wg4EqZdetMABO4DXYUFzcg_5Rx6Z2Km", // video tim Es Teh Kulonan
  jumatBerkahVideo: "16Dwx3XdIcggO41Uggl_3x_jfAdM7lb2S", // video dokumentasi Jumat Berkah
}

export const drivePhotos = {
  storePhoto: "16tPcjM8X4Sat6xjL4mQJwKkAfDevN7lb", // foto tim, bagian "Tentang"
  teamPhoto1: "1Q4JsnmLyTizHwO9PpVxBQolAkyHRgdOh", // foto gerai, bagian "Tentang"
  franchisePaketA: "", // belum dikirim client
  franchisePaketB: "", // belum dikirim client
}

// Logo resmi (final) — dipakai di navbar, footer, dan bagian "Makna Logo".
// Selama kosong, komponen Logo otomatis jatuh ke ikon gunungan placeholder.
export const logoImage = "1a6TG6s-zYs06YAdCxl8cT1mf9U3Jpbvv"

// Foto tiap item menu, key = id (slug) dari lib/data.ts, digenerate
// otomatis dari daftar menu supaya semua item selalu punya slot foto.
export const driveMenuImages: Record<string, string> = Object.fromEntries(
  allMenuItems.map((item) => [item.id, ""])
)

// Foto yang sudah dikirim klien via Drive:
driveMenuImages["teh-leci"] = "1v5BlT0Gmkt5-_O8kb6qOyrHl0waRUZ-9" // best seller es teh leci 6 ribu
driveMenuImages["avocado"] = "1FxZeWZVtRQ1BrBTfxpX1QN51rLHIxsvK"
driveMenuImages["coklat-milo"] = "1UbktoWHainBiZ-lZRD_E2fn9MypMe0zx"
driveMenuImages["coklat-royal"] = "1HM1Jb_Ybkv0mbPRmBLi8IUD5JwTA1CIn"
driveMenuImages["coklat-silverqueen"] = "1rfIXfTjzB5YPjbXF4OxJaMjmqrZfpHJM"
driveMenuImages["kopi-aren-latte"] = "1WjaYAE5C69M6-5RDyWeKXU1Ls6ABxJvN"
driveMenuImages["kopi-mocca"] = "1NGW-MC7BoqfnoHIj4GpG1EBcKR1Ej8Ds"
driveMenuImages["lecy-milk-tea"] = "1HwjJicHlyqXNZ2lL1EW1ezWtSb8pw0aj"
driveMenuImages["lemon-tea"] = "1an1oyczRjAS03pALg66IKIzEYUADx6qe"
driveMenuImages["lemon-tea-honey"] = "1XixtfyzUkoH9Yf-q0CrziUw0RSk7VOr2"
driveMenuImages["matcha"] = "1GiTPJ4To78d2xmQIDaaGqKCVwmKpe_xN"
driveMenuImages["melon-milk-tea"] = "1oB41-HnPzRN-j3fp71276aeOoHN89fwF"
driveMenuImages["mojito-lecy"] = "1xf0TT6yU1fG5CivsFQLtF2h0NwfMcweh"
driveMenuImages["mojito-melon"] = "1Q_U5ciamKstDhPJISqJc3z5P8fisHfIg"
driveMenuImages["mojito-jeruk"] = "1IikQYNrvZGUUWIQpsCZUlfpwsDa3IKvg"
driveMenuImages["orange-milk-tea"] = "1CWQHcFCcED8_NsqZmsCapdrjNn7GqSIH"
driveMenuImages["permen-karet"] = "1ZX4D-v3qSc_-tCKdBjav58LAjOE4FS2d"
driveMenuImages["taro"] = "1XHHrYQWM0DfMmPig2wzxZKm5bgtwSMbZ"
driveMenuImages["teh-hangat"] = "119W4djkTSxCdH3Xp68z8AszcFXoP27gG"
driveMenuImages["teh-jeruk"] = "15Ypyi51lMJ3e3JsQTjUArkyVpYhu9ooA"
driveMenuImages["teh-melon"] = "1m0IX6NZpE3Gf9hhQWb9LAC0qMd7ox2fm"
driveMenuImages["ori-jumbo"] = "1JhKeBliYJPbr8B6qfoi9iYgarXt24ZHv" // "teh ORI"
driveMenuImages["teh-susu"] = "1KoyY0TjDPQ-JleVl7i86KjiH3JquXytI"

export function driveImageUrl(fileId: string) {
  // Format ini lebih stabil untuk ditampilkan langsung sebagai <img>
  // dibanding drive.google.com/uc?export=view (sering kena halaman
  // peringatan scan virus untuk file besar).
  return `https://lh3.googleusercontent.com/d/${fileId}`
}

export function driveVideoEmbedUrl(fileId: string, autoplay = false) {
  // Iframe preview Drive — ini yang paling reliable buat nampilin video
  // (langsung ada thumbnail + tombol play dari Drive sendiri, nggak
  // kena masalah "file kegedean" kayak link download langsung).
  // Parameter ?autoplay=1 dicoba supaya video di Beranda main sendiri —
  // ini bukan API resmi dari Google jadi hasilnya bisa beda-beda di
  // tiap browser (sebagian besar browser tetap butuh video di-mute dulu
  // baru boleh autoplay, dan itu diatur oleh player Drive sendiri, bukan
  // dari sisi kita).
  return `https://drive.google.com/file/d/${fileId}/preview${autoplay ? "?autoplay=1" : ""}`
}
