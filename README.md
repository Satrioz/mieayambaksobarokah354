# 🍜 Barokah 354 - Landing Page 

Website landing page modern yang dirancang khusus untuk **UMKM Mie Ayam & Bakso Barokah 354**. Proyek ini fokus pada kecepatan akses, keamanan tingkat tinggi, dan pengalaman pengguna (*User Experience*) yang intuitif untuk meningkatkan konversi penjualan melalui WhatsApp.

---

## 🚀 Fitur Utama

* **📅 Dynamic Pricing Engine**: Menggunakan Fetch API untuk mengecek hari libur nasional secara otomatis. Harga menu utama akan naik Rp1.000 (markup) saat hari raya/libur secara *real-time*.
* **🛡️ Hardened Security**: Implementasi **Content Security Policy (CSP)** yang ketat untuk mencegah serangan XSS, *Malvertising*, dan blokir otomatis terhadap iklan nakal/judi online.
* **📱 Responsive & Interactive**: Dibangun dengan Tailwind CSS untuk tampilan sempurna di semua perangkat, dilengkapi dengan animasi *scroll-reveal* dan *testimonial slider*.
* **⚡ Optimized Performance**: Menggunakan prinsip *Clean Code* dan *Unobtrusive JavaScript* untuk pemisahan logika yang rapi dan performa website yang ringan.

## 🛠️ Tech Stack

- **Framework CSS**: Tailwind CSS (via CDN with Security Integrity).
- **Language**: Vanilla JavaScript (ES6+), HTML5, CSS3.
- **Tools & Deployment**: Vercel/GitHub Pages, Google Maps API Integration.

## 📂 Struktur Proyek

```text
├── css/
│   └── style.css      # Custom animations & optimized performance styles
├── js/
│   └── script.js     # Core Logic: Pricing, Status Toko, & Slider
├── img/              # Aset gambar asli produk (Mie Ayam, Bakso, dll)
├── index.html        # Main entry point (SEO & Security Optimized)
└── README.md         # Dokumentasi proyek
