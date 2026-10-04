// js/app.js - Global App Initializer, Theme, Currency, Toast, and UI Interactivity

// --- Toast Notification Engine ---
function showToast(message, type = "info") {
  let container = document.getElementById("toastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ️"
  };

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">${icons[type] || "ℹ️"}</span>
    <span style="flex: 1;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "slideInRight 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

class AppInitializer {
  constructor() {
    this.initTheme();
    this.initCurrency();
    this.initNavigation();
    this.initContactAndFAQ();
    this.initModals();
    this.initScrollTop();
  }

  // --- Theme Management ---
  initTheme() {
    const savedTheme = localStorage.getItem(STORE_KEYS.THEME) || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
    this.updateThemeIcons(savedTheme);

    themeToggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", nextTheme);
        localStorage.setItem(STORE_KEYS.THEME, nextTheme);
        this.updateThemeIcons(nextTheme);
        showToast(`Switched to ${nextTheme} mode 🌓`, "info");
      });
    });
  }

  updateThemeIcons(theme) {
    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
    });
  }

  // --- Currency Selector ---
  initCurrency() {
    const currencySelects = document.querySelectorAll(".currency-select");
    const currentCurrency = travelStore.getCurrency();

    currencySelects.forEach(sel => {
      sel.value = currentCurrency;
      sel.addEventListener("change", (e) => {
        const val = e.target.value;
        travelStore.setCurrency(val);
        currencySelects.forEach(s => s.value = val);
        showToast(`Currency changed to ${val}`, "info");
      });
    });
  }

  // --- Navigation & Mobile Drawer ---
  initNavigation() {
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerBtn && navMenu) {
      hamburgerBtn.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });

      document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
          navMenu.classList.remove("open");
        });
      });
    }

    // Active link highlighting on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
      const scrollY = window.pageYOffset;
      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute("id");
        const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

        if (navLink) {
          if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add("active");
          } else {
            navLink.classList.remove("active");
          }
        }
      });
    });
  }

  // --- Contact Form & FAQ Accordion ---
  initContactAndFAQ() {
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Your message has been sent! Our travel specialist will reach out within 24 hours.", "success");
        contactForm.reset();
      });
    }

    const newsletterForms = document.querySelectorAll(".newsletter-form");
    newsletterForms.forEach(form => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        showToast("Subscribed! Check your inbox for exclusive travel deals.", "success");
        form.reset();
      });
    });

    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(q => {
      q.addEventListener("click", () => {
        const item = q.parentElement;
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(i => i.classList.remove("open"));
        if (!wasOpen) {
          item.classList.add("open");
        }
      });
    });
  }

  // --- Generic Modal Closer Handlers ---
  initModals() {
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
          backdrop.classList.remove("active");
        }
      });
    });

    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const modal = e.target.closest(".modal-backdrop") || e.target.closest(".lightbox-modal");
        if (modal) {
          modal.classList.remove("active");
        }
      });
    });
  }

  // --- Scroll To Top ---
  initScrollTop() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 400) {
        scrollTopBtn.classList.add("visible");
      } else {
        scrollTopBtn.classList.remove("visible");
      }
    });

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new AppInitializer();
});
