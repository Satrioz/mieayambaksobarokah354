document.addEventListener("DOMContentLoaded", async function () {
  // --- 1. LOGIKA HARGA OTOMATIS (API HARI LIBUR) ---
  const priceElements = document.querySelectorAll(".price-counter");
  const today = new Date().toISOString().split("T")[0];
  let markup = 0;

  try {
    const response = await fetch(
      `https://api-harilibur.vercel.app/api?year=${new Date().getFullYear()}`,
    );
    const holidays = await response.json();
    if (holidays.some((h) => h.holiday_date === today)) markup = 1000;
  } catch (error) {
    console.error("Gagal cek kalender:", error);
  }

  priceElements.forEach((el) => {
    const parent = el.closest(".menu-item");
    const namaMenu = parent.querySelector("h4").textContent.toLowerCase();
    const menuMinuman = ["es", "jeruk", "teh", "kopi", "campur"];

    if (menuMinuman.some((m) => namaMenu.includes(m))) {
      el.innerText = "Rp5.000";
    } else {
      let basePrice = parseInt(el.textContent.replace(/\D/g, ""));
      el.innerText = "Rp" + (basePrice + markup).toLocaleString("id-ID");
    }
  });

  // --- 2. ANIMASI & UI INTERACTION ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => observer.observe(el));

  // Toggle Menu Mobile
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuToggle?.addEventListener("click", () =>
    mobileMenu.classList.toggle("hidden"),
  );

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;
      const navH = document.querySelector("nav")?.offsetHeight || 80;
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - navH,
        behavior: "smooth",
      });
      mobileMenu.classList.add("hidden");
    });
  });

  // Back to Top (Logo)
  document
    .getElementById("logo-kembali-atas")
    ?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

  // --- 3. TESTIMONI SLIDER ---
  const reviews = [
    {
      name: "Satrio Wibisono",
      text: "Pelayanan dan rasa makanannya mantap, bintang 5!",
    },
    {
      name: "AHMAD SHARIV",
      text: "Enak, bersih, pelayanannya ramah. Sudah langganan sejak 15 tahun!",
    },
    {
      name: "NiKetut Mega Sari Dewi",
      text: "Mie ayam dan baksonya enakk, apalagi es campurnya segerrr.",
    },
    {
      name: "Retno Charolina",
      text: "Setiap hari Minggu selalu makan di sini 😍",
    },
    { name: "Hendri Saputra", text: "Enak n ramah." },
    { name: "Nur Salim", text: "Makanannya enak, cocok buat keluarga." },
  ];

  const slider = document.getElementById("testimonial-slider");
  if (slider) {
    slider.innerHTML = reviews
      .map(
        (rev) => `
      <div class="min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between">
        <div>
          <div class="text-yellow-400 mb-2">⭐⭐⭐⭐⭐</div>
          <p class="text-gray-700 italic text-sm md:text-base">"${rev.text}"</p>
        </div>
        <h4 class="font-bold text-gray-900 mt-6 border-t pt-4">${rev.name}</h4>
      </div>
    `,
      )
      .join("");

    // Auto Slide Logic
    let idx = 0;
    setInterval(() => {
      idx = (idx + 1) % reviews.length;
      if (window.innerWidth >= 1024 && idx > reviews.length - 3) idx = 0;
      const gap = 16;
      const cardWidth =
        slider.firstElementChild.getBoundingClientRect().width + gap;
      slider.style.transform = `translateX(${-idx * cardWidth}px)`;
    }, 5000);
  }
});

// --- LOGIKA RESET FORM SETELAH SUBMIT ---
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function () {
    // Kita beri jeda sedikit agar proses pengiriman data ke Formspree tetap berjalan
    setTimeout(() => {
      contactForm.reset();
    }, 100);
  });
}
