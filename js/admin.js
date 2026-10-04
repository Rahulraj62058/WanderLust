// js/admin.js - Complete Frontend Admin Panel Dashboard Logic

class AdminDashboard {
  constructor() {
    this.currentTab = "overview";
    this.init();
  }

  init() {
    this.navItems = document.querySelectorAll(".admin-nav-item");
    this.tabPanes = document.querySelectorAll(".admin-tab-pane");
    this.topbarTitle = document.getElementById("adminTopbarTitle");
    this.addPackageModal = document.getElementById("adminAddPackageModal");

    this.attachEvents();
    this.renderAll();
  }

  attachEvents() {
    // Admin Sidebar Tab Switching
    this.navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.switchTab(tab);
      });
    });

    // Mobile Sidebar Toggle
    const mobileToggle = document.getElementById("adminMobileToggle");
    const sidebar = document.querySelector(".admin-sidebar");
    if (mobileToggle && sidebar) {
      mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
      });
    }

    // Add Package Form
    const pkgForm = document.getElementById("adminAddPackageForm");
    if (pkgForm) {
      pkgForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleCreatePackage();
      });
    }

    // Filter bookings by status
    const statusFilter = document.getElementById("adminBookingStatusFilter");
    if (statusFilter) {
      statusFilter.addEventListener("change", () => {
        this.renderBookingsTable();
      });
    }

    // Search bookings
    const searchBookings = document.getElementById("adminBookingSearch");
    if (searchBookings) {
      searchBookings.addEventListener("input", () => {
        this.renderBookingsTable();
      });
    }
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    this.navItems.forEach(item => {
      item.classList.toggle("active", item.dataset.tab === tabId);
    });
    this.tabPanes.forEach(pane => {
      pane.classList.toggle("active", pane.id === `adminTab-${tabId}`);
    });

    const titles = {
      overview: "Dashboard Overview & KPI Analytics",
      bookings: "Bookings & Reservations Management",
      packages: "Tour Packages & Destinations Catalog",
      users: "Registered Users & Access Control",
      reviews: "Customer Reviews Moderation"
    };

    if (this.topbarTitle) {
      this.topbarTitle.textContent = titles[tabId] || "Admin Dashboard";
    }

    // Close mobile sidebar if open
    const sidebar = document.querySelector(".admin-sidebar");
    if (sidebar) sidebar.classList.remove("open");

    this.renderAll();
  }

  renderAll() {
    this.renderKPIs();
    this.renderCharts();
    this.renderBookingsTable();
    this.renderPackagesTable();
    this.renderUsersTable();
    this.renderReviewsTable();
  }

  // --- KPI Metrics ---
  renderKPIs() {
    const bookings = travelStore.getBookings();
    const users = travelStore.getUsers();
    const packages = travelStore.getPackages();
    const reviews = travelStore.getReviews();

    const confirmedBookings = bookings.filter(b => b.status === "Confirmed");
    const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    const revenueEl = document.getElementById("kpiTotalRevenue");
    const bookingsEl = document.getElementById("kpiTotalBookings");
    const usersEl = document.getElementById("kpiTotalUsers");
    const packagesEl = document.getElementById("kpiTotalPackages");

    if (revenueEl) revenueEl.textContent = travelStore.formatPrice(totalRevenue);
    if (bookingsEl) bookingsEl.textContent = bookings.length;
    if (usersEl) usersEl.textContent = users.length;
    if (packagesEl) packagesEl.textContent = packages.length;
  }

  // --- HTML5 Canvas Charts ---
  renderCharts() {
    const revenueCanvas = document.getElementById("revenueChartCanvas");
    if (revenueCanvas && revenueCanvas.getContext) {
      const ctx = revenueCanvas.getContext("2d");
      const width = revenueCanvas.width = revenueCanvas.parentElement.clientWidth;
      const height = revenueCanvas.height = 240;

      ctx.clearRect(0, 0, width, height);

      // Draw Revenue Line / Bar Graph
      const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep"];
      const data = [12400, 18500, 24600, 31200, 28900, 38400];
      const maxVal = 45000;
      const barWidth = 42;
      const gap = (width - 60 - (months.length * barWidth)) / (months.length - 1);

      // Grid Lines
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = 20 + i * 45;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }

      // Bars & Labels
      data.forEach((val, i) => {
        const x = 50 + i * (barWidth + gap);
        const barHeight = (val / maxVal) * 170;
        const y = height - 35 - barHeight;

        // Gradient bar
        const grad = ctx.createLinearGradient(0, y, 0, height - 35);
        grad.addColorStop(0, "#0284c7");
        grad.addColorStop(1, "#06b6d4");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]) : ctx.fillRect(x, y, barWidth, barHeight);
        ctx.fill();

        // Month text
        ctx.fillStyle = "#64748b";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(months[i], x + barWidth / 2, height - 12);

        // Value text
        ctx.fillStyle = "#0f172a";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(`$${(val / 1000).toFixed(0)}k`, x + barWidth / 2, y - 6);
      });
    }

    // Pie Chart for Bookings Categories
    const catCanvas = document.getElementById("categoryChartCanvas");
    if (catCanvas && catCanvas.getContext) {
      const ctx = catCanvas.getContext("2d");
      const width = catCanvas.width = catCanvas.parentElement.clientWidth;
      const height = catCanvas.height = 240;

      ctx.clearRect(0, 0, width, height);

      const slices = [
        { label: "Tours (55%)", val: 0.55, color: "#0284c7" },
        { label: "Hotels (30%)", val: 0.30, color: "#10b981" },
        { label: "Flights (15%)", val: 0.15, color: "#f97316" }
      ];

      const centerX = width / 2;
      const centerY = height / 2 - 15;
      const radius = 70;
      let startAngle = 0;

      slices.forEach(s => {
        const sliceAngle = s.val * 2 * Math.PI;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fill();
        startAngle += sliceAngle;
      });

      // Donut hole
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 40, 0, 2 * Math.PI);
      ctx.fill();

      // Legend
      ctx.font = "12px sans-serif";
      let legendX = 20;
      slices.forEach(s => {
        ctx.fillStyle = s.color;
        ctx.fillRect(legendX, height - 20, 10, 10);
        ctx.fillStyle = "#334155";
        ctx.textAlign = "left";
        ctx.fillText(s.label, legendX + 16, height - 11);
        legendX += 105;
      });
    }
  }

  // --- Bookings Table ---
  renderBookingsTable() {
    const tbody = document.getElementById("adminBookingsTbody");
    if (!tbody) return;

    let bookings = travelStore.getBookings();
    const statusFilter = document.getElementById("adminBookingStatusFilter")?.value || "all";
    const searchQuery = (document.getElementById("adminBookingSearch")?.value || "").toLowerCase().trim();

    if (statusFilter !== "all") {
      bookings = bookings.filter(b => b.status.toLowerCase() === statusFilter.toLowerCase());
    }

    if (searchQuery) {
      bookings = bookings.filter(b => 
        b.customerName.toLowerCase().includes(searchQuery) ||
        b.customerEmail.toLowerCase().includes(searchQuery) ||
        b.itemTitle.toLowerCase().includes(searchQuery) ||
        b.id.toLowerCase().includes(searchQuery)
      );
    }

    if (bookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">No bookings found.</td></tr>`;
      return;
    }

    tbody.innerHTML = bookings.map(b => `
      <tr>
        <td><strong>#${b.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: var(--text-primary);">${b.customerName}</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${b.customerEmail}</div>
        </td>
        <td>
          <span class="card-badge" style="position: static; font-size: 0.75rem; background: var(--bg-subtle); color: var(--text-primary); margin-bottom: 0.25rem;">${b.type.toUpperCase()}</span>
          <div style="font-size: 0.88rem; font-weight: 600;">${b.itemTitle}</div>
        </td>
        <td>${b.date} (${b.travelers} Pax)</td>
        <td><strong style="color: var(--primary);">${travelStore.formatPrice(b.totalAmount)}</strong></td>
        <td>
          <span class="status-badge ${b.status.toLowerCase()}">${b.status}</span>
        </td>
        <td>
          <div class="table-actions">
            ${b.status !== 'Confirmed' ? `
              <button class="btn-icon" title="Approve Booking" onclick="adminDashboard.setBookingStatus('${b.id}', 'Confirmed')">✓</button>
            ` : ''}
            ${b.status !== 'Cancelled' ? `
              <button class="btn-icon danger" title="Cancel Booking" onclick="adminDashboard.setBookingStatus('${b.id}', 'Cancelled')">🚫</button>
            ` : ''}
            <button class="btn-icon danger" title="Delete Booking" onclick="adminDashboard.removeBooking('${b.id}')">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  setBookingStatus(id, status) {
    travelStore.updateBookingStatus(id, status);
    this.renderAll();
    showToast(`Booking #${id} updated to ${status}!`, "success");
  }

  removeBooking(id) {
    if (confirm(`Are you sure you want to delete Booking #${id}?`)) {
      travelStore.deleteBooking(id);
      this.renderAll();
      showToast(`Booking #${id} removed.`, "info");
    }
  }

  // --- Tour Packages Management ---
  renderPackagesTable() {
    const tbody = document.getElementById("adminPackagesTbody");
    if (!tbody) return;

    const packages = travelStore.getPackages();

    tbody.innerHTML = packages.map(p => `
      <tr>
        <td>
          <img src="${p.image}" alt="${p.title}" style="width: 54px; height: 42px; border-radius: var(--radius-sm); object-fit: cover;" />
        </td>
        <td>
          <strong style="color: var(--text-primary);">${p.title}</strong>
          <div style="font-size: 0.8rem; color: var(--text-muted);">📍 ${p.destination}</div>
        </td>
        <td><span class="card-badge" style="position: static; font-size: 0.75rem; background: var(--primary-light); color: var(--primary);">${p.category.toUpperCase()}</span></td>
        <td>${p.durationDays}D / ${p.durationNights}N</td>
        <td><strong>${travelStore.formatPrice(p.price)}</strong></td>
        <td>⭐ ${p.rating.toFixed(1)}</td>
        <td>
          <div class="table-actions">
            <button class="btn-icon danger" title="Delete Package" onclick="adminDashboard.removePackage('${p.id}')">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  openAddPackageModal() {
    if (this.addPackageModal) {
      document.getElementById("adminAddPackageForm").reset();
      this.addPackageModal.classList.add("active");
    }
  }

  closeAddPackageModal() {
    if (this.addPackageModal) {
      this.addPackageModal.classList.remove("active");
    }
  }

  handleCreatePackage() {
    const title = document.getElementById("pkgTitle").value.trim();
    const destination = document.getElementById("pkgDest").value.trim();
    const category = document.getElementById("pkgCategory").value;
    const price = Number(document.getElementById("pkgPrice").value);
    const durationDays = Number(document.getElementById("pkgDays").value);
    const image = document.getElementById("pkgImage").value.trim() || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";
    const overview = document.getElementById("pkgOverview").value.trim();

    travelStore.addPackage({
      title,
      destination,
      category,
      price,
      originalPrice: Math.round(price * 1.2),
      discount: "15% OFF",
      durationDays,
      durationNights: Math.max(1, durationDays - 1),
      image,
      rating: 5.0,
      reviewsCount: 1,
      featured: true,
      groupSize: "2-12 Travelers",
      overview,
      highlights: ["Guided sightseeing excursions", "Luxury resort accommodations", "Daily breakfast buffet"],
      inclusions: ["Boutique hotel stays", "Local expert guide", "Private air-conditioned transport"],
      exclusions: ["International flights", "Personal expenses"],
      itinerary: [
        { day: 1, title: "Arrival & Welcome Dinner", desc: "Check-in to resort, orientation meeting, and traditional welcome dinner." },
        { day: 2, title: "City Tour & Exploration", desc: "Full day excursion to key historic sights and scenic viewpoints." }
      ]
    });

    this.closeAddPackageModal();
    this.renderAll();
    showToast("New Tour Package published successfully!", "success");
  }

  removePackage(id) {
    if (confirm("Are you sure you want to delete this tour package?")) {
      travelStore.deletePackage(id);
      this.renderAll();
      showToast("Tour package deleted.", "info");
    }
  }

  // --- Users Table ---
  renderUsersTable() {
    const tbody = document.getElementById("adminUsersTbody");
    if (!tbody) return;

    const users = travelStore.getUsers();

    tbody.innerHTML = users.map(u => `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <img src="${u.avatar}" alt="${u.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" />
            <div>
              <strong style="color: var(--text-primary);">${u.name}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${u.email}</div>
            </div>
          </div>
        </td>
        <td>
          <span class="card-badge" style="position: static; font-size: 0.75rem; background: ${u.role === 'Admin' ? 'var(--accent-gradient)' : 'var(--primary-light)'}; color: ${u.role === 'Admin' ? '#fff' : 'var(--primary)'};">
            ${u.role}
          </span>
        </td>
        <td>${u.joinedDate}</td>
        <td>
          <span class="status-badge ${u.status.toLowerCase()}">${u.status}</span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon" title="Toggle Role (Admin/User)" onclick="adminDashboard.toggleRole('${u.id}')">🔄</button>
            <button class="btn-icon danger" title="Toggle Ban Status" onclick="adminDashboard.toggleStatus('${u.id}')">🚫</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  toggleRole(id) {
    travelStore.toggleUserRole(id);
    this.renderUsersTable();
    showToast("User role updated!", "success");
  }

  toggleStatus(id) {
    travelStore.toggleUserStatus(id);
    this.renderUsersTable();
    showToast("User status updated!", "info");
  }

  // --- Reviews Moderation ---
  renderReviewsTable() {
    const tbody = document.getElementById("adminReviewsTbody");
    if (!tbody) return;

    const reviews = travelStore.getReviews();

    tbody.innerHTML = reviews.map(r => `
      <tr>
        <td>
          <strong>${r.author}</strong>
          <div style="font-size: 0.8rem; color: var(--text-muted);">${r.date}</div>
        </td>
        <td>${r.destination}</td>
        <td>⭐ ${r.rating} / 5</td>
        <td style="max-width: 300px; font-size: 0.85rem;">"${r.comment}"</td>
        <td>
          <span class="status-badge ${r.status.toLowerCase()}">${r.status}</span>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-icon" title="Approve / Reject" onclick="adminDashboard.toggleReview('${r.id}')">⚖️</button>
            <button class="btn-icon danger" title="Delete Review" onclick="adminDashboard.removeReview('${r.id}')">🗑️</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  toggleReview(id) {
    travelStore.toggleReviewStatus(id);
    this.renderReviewsTable();
    showToast("Review moderation status updated.", "info");
  }

  removeReview(id) {
    if (confirm("Are you sure you want to delete this review?")) {
      travelStore.deleteReview(id);
      this.renderReviewsTable();
      showToast("Review removed.", "info");
    }
  }
}

let adminDashboard;
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("adminTab-overview")) {
    adminDashboard = new AdminDashboard();
  }
});
