
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");

// Menutup menu navigasi
function closeMenu() {
  navMenu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
}

// Membuka dan menutup menu pada layar HP
menuToggle.addEventListener("click", () => {
  const isOpen =
    menuToggle.getAttribute("aria-expanded") === "true";

  navMenu.classList.toggle("open", !isOpen);

  menuToggle.setAttribute(
    "aria-expanded",
    String(!isOpen)
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Buka menu" : "Tutup menu"
  );
});

// Menutup menu setelah tautan diklik
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });

    link.classList.add("active");
  });
});

// Menutup menu menggunakan tombol Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

// Menutup menu jika layar kembali ke ukuran desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});

// Menyesuaikan navigasi dengan bagian yang sedang terlihat
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const activeHref = `#${entry.target.id}`;

        navLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === activeHref
          );
        });
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px"
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

