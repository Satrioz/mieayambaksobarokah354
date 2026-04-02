# 🍜 Barokah 354 - Professional Culinary Landing Page

Website landing page modern dan responsif untuk usaha kuliner **Barokah 354** di Sidorejo, Lampung. Proyek ini menggabungkan solusi bisnis nyata dengan implementasi teknologi web terkini untuk memastikan performa, keamanan, dan pengalaman pengguna yang optimal.

## 🌟 Fitur Unggulan (Technical Highlights)

* **🛡️ Hardened Security**: Mengimplementasikan **Content Security Policy (CSP)** untuk mencegah serangan XSS, *Clickjacking*, serta blokir otomatis terhadap iklan nakal dan skrip judi online.
* **📈 Dynamic Pricing Engine**: Integrasi dengan API Hari Libur Nasional untuk penyesuaian harga otomatis (Markup Rp1.000) pada hari libur.
* **💬 Integrated Google Reviews**: Menampilkan testimoni pelanggan asli dari Google Maps secara dinamis menggunakan struktur data yang rapi.
* **🚀 Optimized Performance**: Menggunakan **Unobtrusive JavaScript** (pemisahan logika dari HTML) untuk memastikan kepatuhan terhadap standar keamanan modern dan kecepatan akses.

## 🛠️ Tech Stack & Tools

* **Frontend**: HTML5, Tailwind CSS (Utility-first framework).
* **Logic**: Vanilla JavaScript (ES6+), Fetch API, Intersection Observer.
* **Security**: CSP Meta Tags, SRI (Subresource Integrity), Rel Noopener/Noreferrer.
* **Deployment**: Vercel / GitHub Pages.

## 📂 Struktur Repositori

```text
├── css/
│   └── style.css      # Custom animations & global styling
├── js/
│   └── script.js     # Core Logic: Pricing, Status Toko, & Scroll Handle
├── index.html        # Main entry point (SEO Optimized)
└── README.md         # Dokumentasi teknis
