document.addEventListener("DOMContentLoaded", async function () {
  // --- 1. LOGIKA HARGA PEMERINTAH (UPDATE OTOMATIS) ---
  const priceElements = document.querySelectorAll(".price-counter");
  const today = new Date().toISOString().split("T")[0];
  let isHariRaya = false;

  try {
    // Ambil data libur nasional Indonesia
    const response = await fetch(
      `https://api-harilibur.vercel.app/api?year=${new Date().getFullYear()}`,
    );
    const holidays = await response.json();
    isHariRaya = holidays.some((h) => h.holiday_date === today);
  } catch (error) {
    console.error("Gagal cek kalender pemerintah:", error);
  }

  const markup = isHariRaya ? 1000 : 0;

  priceElements.forEach((el) => {
    const parent = el.closest(".menu-item");
    const namaMenu = parent.querySelector("h4").textContent.toLowerCase();
    let basePrice = parseInt(el.textContent.replace(/\D/g, ""));
    let finalPrice;

    // Ketentuan: Minuman 5k, Makanan +1rb jika libur
    if (
      namaMenu.includes("es ") ||
      namaMenu.includes("jeruk") ||
      namaMenu.includes("teh")
    ) {
      finalPrice = 5000;
    } else {
      finalPrice = basePrice + markup;
    }

    // Jalankan animasi angka
    animatePrice(el, finalPrice);

    if (isHariRaya && !namaMenu.includes("es ")) {
      const info = document.createElement("small");
      info.className = "text-red-500 block text-[10px] italic mt-1";
      info.innerText = "*Harga Hari Raya (+1rb)";
      el.appendChild(info);
    }
  });

  function animatePrice(element, target) {
    let current = 0;
    const timer = setInterval(() => {
      current += target / 40;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.childNodes[0].nodeValue =
        "Rp" + Math.floor(current).toLocaleString("id-ID");
    }, 20);
  }

  // --- 2. FITUR LAMA (SCROLL & MENU MOBILE) ---
  // Animasi fade-in saat scroll
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

  // Toggle menu HP
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuToggle) {
    menuToggle.addEventListener("click", () =>
      mobileMenu.classList.toggle("hidden"),
    );
  }

  // Smooth scroll navbar
  document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
      }
    });
  });
});

// 1. Data Testimoni (Nama, Bintang, Ulasan)
const reviews = [
  {
    name: "Satrio Wibisono",
    rating: 5,
    text: "Makanan dan layanannya mantap bintang 5!",
  },
  {
    name: "AHMAD SHARIV",
    rating: 5,
    text: "Enak, bersih, pelayanannya ramah. Sudah langganan sejak 15 tahun yang lalu!",
  },
  {
    name: "NiKetut Mega Sari Dewi",
    rating: 5,
    text: "Mie ayam dan baksonya enakk, apalagi es campurnya segerrr bgt.",
  },
  {
    name: "Retno Charolina",
    rating: 5,
    text: "Setiap hari Minggu selalu makan di sini 😍😍🥰",
  },
  { name: "hendri saputra", rating: 5, text: "Enak n ramah." },
];

const slider = document.getElementById("testimonial-slider");

// 2. Render Kartu Testimoni ke HTML
// Render Testimoni Cards (Mobile Friendly)
reviews.forEach((rev) => {
  const card = document.createElement("div");

  // Gunakan w-full supaya di HP lebar kartunya pas 100% layar
  card.className =
    "min-w-full md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.33%-16px)] bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 text-left flex flex-col justify-between whitespace-normal";

  card.innerHTML = `
    <div class="overflow-hidden">
      <div class="text-yellow-400 mb-2 text-sm">${"⭐".repeat(rev.rating)}</div>
      <p class="text-gray-700 leading-relaxed mb-4 italic text-sm md:text-base">"${rev.text}"</p>
    </div>
    <div>
      <h4 class="font-bold text-gray-900 text-base md:text-lg">${rev.name}</h4>
    </div>
  `;
  slider.appendChild(card);
});

// 3. Logika Geser Otomatis
let currentIdx = 0;

function updateSlider() {
  if (!slider) return;
  const cardWidth = slider.firstElementChild.getBoundingClientRect().width + 24;
  slider.style.transform = `translateX(${-currentIdx * cardWidth}px)`;
}

function nextSlide() {
  currentIdx = (currentIdx + 1) % reviews.length;
  // Reset jika sudah di ujung supaya tidak kosong
  if (window.innerWidth >= 1024 && currentIdx > reviews.length - 3)
    currentIdx = 0;
  else if (window.innerWidth >= 768 && currentIdx > reviews.length - 2)
    currentIdx = 0;
  updateSlider();
}

function prevSlide() {
  currentIdx = (currentIdx - 1 + reviews.length) % reviews.length;
  updateSlider();
}

// Jalankan otomatis setiap 5 detik
setInterval(nextSlide, 5000);
