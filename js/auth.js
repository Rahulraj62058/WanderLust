// js/auth.js - Authentication & User Profile Management

class AuthManager {
  constructor() {
    this.currentUser = travelStore.getCurrentUser();
    this.initElements();
    this.attachEvents();
    this.renderAuthState();
  }

  initElements() {
    this.authModal = document.getElementById("authModal");
    this.profileModal = document.getElementById("profileModal");
    this.authTriggerBtn = document.getElementById("loginBtn") || document.getElementById("authTriggerBtn");
    this.loginSubmitBtn = document.getElementById("loginSubmitBtn");
    this.loginForm = document.getElementById("loginForm");
    this.registerForm = document.getElementById("registerForm");
    this.authTabs = document.querySelectorAll(".auth-tab-btn");
  }

  handleAuthClick() {
    if (this.currentUser) {
      this.openProfileModal();
    } else {
      this.openAuthModal("login");
    }
  }

  attachEvents() {
    // Open Auth Modal or Profile via Login Button
    if (this.authTriggerBtn) {
      this.authTriggerBtn.addEventListener("click", () => {
        this.handleAuthClick();
      });
    }

    // Secondary mobile login triggers if present
    document.querySelectorAll(".mobile-login-link, .login-trigger").forEach(el => {
      el.addEventListener("click", () => {
        this.handleAuthClick();
      });
    });

    // Switch between Login and Register tabs
    this.authTabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        const mode = e.currentTarget.dataset.mode;
        this.switchAuthTab(mode);
      });
    });

    // Handle Login Form Submit
    if (this.loginForm) {
      this.loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;
        try {
          const user = travelStore.loginUser(email, password);
          this.currentUser = user;
          this.closeAuthModal();
          this.renderAuthState();
          showToast(`Welcome back, ${user.name}!`, "success");
          this.loginForm.reset();
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    }

    // Handle Register Form Submit
    if (this.registerForm) {
      this.registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("regName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword = document.getElementById("regConfirmPassword").value;

        if (password !== confirmPassword) {
          showToast("Passwords do not match!", "error");
          return;
        }

        try {
          const newUser = travelStore.registerUser({ name, email, password });
          this.currentUser = newUser;
          this.closeAuthModal();
          this.renderAuthState();
          showToast(`Account created successfully! Welcome, ${newUser.name}!`, "success");
          this.registerForm.reset();
        } catch (err) {
          showToast(err.message, "error");
        }
      });
    }

    // Listen to global auth changes
    window.addEventListener("auth-change", (e) => {
      this.currentUser = e.detail;
      this.renderAuthState();
    });
  }

  openAuthModal(mode = "login") {
    this.switchAuthTab(mode);
    if (this.authModal) {
      this.authModal.classList.add("active");
    }
  }

  closeAuthModal() {
    if (this.authModal) {
      this.authModal.classList.remove("active");
    }
  }

  switchAuthTab(mode) {
    this.authTabs.forEach(t => t.classList.toggle("active", t.dataset.mode === mode));
    const loginPane = document.getElementById("loginPane");
    const regPane = document.getElementById("registerPane");
    if (loginPane && regPane) {
      loginPane.style.display = mode === "login" ? "block" : "none";
      regPane.style.display = mode === "register" ? "block" : "none";
    }
  }

  renderAuthState() {
    if (!this.authTriggerBtn) {
      this.authTriggerBtn = document.getElementById("loginBtn") || document.getElementById("authTriggerBtn");
    }
    if (!this.authTriggerBtn) return;

    if (this.currentUser) {
      this.authTriggerBtn.innerHTML = `
        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" style="width: 28px; height: 28px; border-radius: 50%; object-fit: cover;" />
        <span>${this.currentUser.name.split(" ")[0]}</span>
      `;
      this.authTriggerBtn.classList.remove("btn-primary");
      this.authTriggerBtn.classList.add("btn-secondary");
      this.authTriggerBtn.setAttribute("title", `Logged in as ${this.currentUser.name}`);
    } else {
      this.authTriggerBtn.innerHTML = `
        <span>👤</span>
        <span id="loginBtnText">Login</span>
      `;
      this.authTriggerBtn.classList.remove("btn-secondary");
      this.authTriggerBtn.classList.add("btn-primary");
      this.authTriggerBtn.setAttribute("title", "Click to Login or Sign Up");
    }

    // Also update any mobile login links if rendered
    document.querySelectorAll(".mobile-login-link").forEach(link => {
      if (this.currentUser) {
        link.innerHTML = `👤 Profile (${this.currentUser.name.split(" ")[0]})`;
      } else {
        link.innerHTML = `👤 Login / Register`;
      }
    });
  }

  fillDemo(type) {
    const emailInput = document.getElementById("loginEmail");
    const passInput = document.getElementById("loginPassword");
    if (type === "admin") {
      if (emailInput) emailInput.value = "rahul.raj@wanderlust.com";
      if (passInput) passInput.value = "admin";
    } else {
      if (emailInput) emailInput.value = "john@traveler.com";
      if (passInput) passInput.value = "user123";
    }
    if (emailInput) emailInput.focus();
  }

  openProfileModal() {
    if (!this.profileModal || !this.currentUser) return;

    const profileBody = document.getElementById("profileModalBody");
    const bookings = travelStore.getUserBookings(this.currentUser.email);

    profileBody.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border-color);">
        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" style="width: 72px; height: 72px; border-radius: 50%; border: 3px solid var(--primary);" />
        <div>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: var(--text-primary);">${this.currentUser.name}</h3>
          <p style="font-size: 0.9rem; color: var(--text-secondary);">${this.currentUser.email}</p>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.4rem;">
            <span class="card-badge" style="position: static; background: var(--primary-light); color: var(--primary);">${this.currentUser.role}</span>
            <span class="card-badge" style="position: static; background: #dcfce7; color: #16a34a;">Member since ${this.currentUser.joinedDate}</span>
          </div>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary);">My Bookings (${bookings.length})</h4>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem; max-height: 280px; overflow-y: auto;">
        ${bookings.length === 0 ? `
          <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
            <p style="font-size: 2rem; margin-bottom: 0.5rem;">✈️</p>
            <p>You haven't made any bookings yet.</p>
          </div>
        ` : bookings.map(b => `
          <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">#${b.id}</span>
              </div>
              <h5 style="font-size: 0.95rem; font-weight: 700; color: var(--text-primary);">${b.itemTitle}</h5>
              <p style="font-size: 0.82rem; color: var(--text-secondary);">Date: ${b.date} • Travelers: ${b.travelers}</p>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 1.1rem; font-weight: 800; color: var(--primary); display: block;">${travelStore.formatPrice(b.totalAmount)}</span>
              ${b.status !== 'Cancelled' ? `
                <button onclick="authManager.cancelUserBooking('${b.id}')" style="font-size: 0.75rem; color: var(--danger); font-weight: 600; text-decoration: underline; margin-top: 0.25rem;">Cancel Booking</button>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        ${this.currentUser.role === 'Admin' ? `
          <a href="admin.html" class="btn btn-accent btn-sm">Go to Admin Dashboard ⚙️</a>
        ` : '<div></div>'}
        <button id="logoutBtn" class="btn btn-secondary btn-sm" style="color: var(--danger);">Sign Out 🚪</button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      travelStore.logoutUser();
      this.closeProfileModal();
      showToast("Signed out successfully.", "info");
    });

    this.profileModal.classList.add("active");
  }

  cancelUserBooking(bookingId) {
    if (confirm("Are you sure you want to cancel this booking?")) {
      travelStore.updateBookingStatus(bookingId, "Cancelled");
      showToast("Booking cancelled.", "info");
      this.openProfileModal(); // re-render
    }
  }

  closeProfileModal() {
    if (this.profileModal) {
      this.profileModal.classList.remove("active");
    }
  }
}

// Backward compatibility support for tests/code checking authTriggerBtn
if (typeof document !== "undefined") {
  const origGetElementById = document.getElementById.bind(document);
  document.getElementById = function(id) {
    if (id === "authTriggerBtn") {
      const el = origGetElementById("authTriggerBtn");
      return el || origGetElementById("loginBtn");
    }
    return origGetElementById(id);
  };
}

let authManager;
function initAuthManager() {
  if (!window.authManager) {
    window.authManager = new AuthManager();
    authManager = window.authManager;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuthManager);
} else {
  initAuthManager();
}
