// js/search-filter.js - Search, Filtering, and Sorting logic

class SearchFilterManager {
  constructor() {
    this.currentCategory = "all";
    this.searchQuery = "";
    this.maxPrice = 6000;
    this.sortBy = "popular";
    this.init();
  }

  init() {
    this.destinationsContainer = document.getElementById("destinationsGrid");
    this.searchInput = document.getElementById("destSearchInput");
    this.priceRange = document.getElementById("destPriceRange");
    this.priceDisplay = document.getElementById("destPriceDisplay");
    if (this.priceDisplay) {
      this.priceDisplay.textContent = travelStore.formatPrice(this.maxPrice);
    }
    this.sortSelect = document.getElementById("destSortSelect");
    this.categoryPills = document.querySelectorAll(".category-pill");
    
    // Hero search elements
    this.heroSearchTabs = document.querySelectorAll(".search-tab-btn");
    this.heroSearchForms = {
      tours: document.getElementById("heroToursForm"),
      hotels: document.getElementById("heroHotelsForm"),
      flights: document.getElementById("heroFlightsForm")
    };

    this.attachEvents();
    this.renderDestinations();
  }

  attachEvents() {
    // Hero Search Tabs
    this.heroSearchTabs.forEach(tab => {
      tab.addEventListener("click", (e) => {
        const tabType = e.currentTarget.dataset.tab;
        this.switchHeroTab(tabType);
      });
    });

    // Hero Form Submissions
    if (this.heroSearchForms.tours) {
      this.heroSearchForms.tours.addEventListener("submit", (e) => {
        e.preventDefault();
        const destInput = document.getElementById("heroTourDest").value.trim();
        this.searchQuery = destInput;
        if (this.searchInput) this.searchInput.value = destInput;
        this.renderDestinations();
        document.getElementById("destinations").scrollIntoView({ behavior: "smooth" });
      });
    }

    if (this.heroSearchForms.hotels) {
      this.heroSearchForms.hotels.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("hotels").scrollIntoView({ behavior: "smooth" });
        showToast("Filtered hotels matching your search!", "info");
      });
    }

    if (this.heroSearchForms.flights) {
      this.heroSearchForms.flights.addEventListener("submit", (e) => {
        e.preventDefault();
        document.getElementById("flights").scrollIntoView({ behavior: "smooth" });
        showToast("Found available flights for selected route!", "info");
      });
    }

    // Category Pills
    this.categoryPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        this.categoryPills.forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.currentCategory = e.currentTarget.dataset.category;
        this.renderDestinations();
      });
    });

    // Search Input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.renderDestinations();
      });
    }

    // Price Range Slider
    if (this.priceRange) {
      this.priceRange.addEventListener("input", (e) => {
        this.maxPrice = Number(e.target.value);
        if (this.priceDisplay) {
          this.priceDisplay.textContent = travelStore.formatPrice(this.maxPrice);
        }
        this.renderDestinations();
      });
    }

    // Sort Select
    if (this.sortSelect) {
      this.sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderDestinations();
      });
    }

    // Re-render when currency or wishlist changes
    window.addEventListener("currency-change", () => {
      if (this.priceDisplay) {
        this.priceDisplay.textContent = travelStore.formatPrice(this.maxPrice);
      }
      this.renderDestinations();
    });

    window.addEventListener("wishlist-change", () => {
      this.renderDestinations();
    });
  }

  switchHeroTab(tabType) {
    this.heroSearchTabs.forEach(t => t.classList.toggle("active", t.dataset.tab === tabType));
    document.querySelectorAll(".search-pane").forEach(pane => {
      pane.classList.toggle("active", pane.id === `searchPane-${tabType}`);
    });
  }

  getFilteredDestinations() {
    let list = travelStore.getDestinations();

    // Category Filter
    if (this.currentCategory !== "all") {
      list = list.filter(d => d.category.toLowerCase() === this.currentCategory.toLowerCase());
    }

    // Search Query Filter
    if (this.searchQuery) {
      list = list.filter(d => 
        d.name.toLowerCase().includes(this.searchQuery) ||
        d.country.toLowerCase().includes(this.searchQuery) ||
        d.description.toLowerCase().includes(this.searchQuery)
      );
    }

    // Max Price Filter
    list = list.filter(d => d.startingPrice <= this.maxPrice);

    // Sorting
    if (this.sortBy === "price-asc") {
      list.sort((a, b) => a.startingPrice - b.startingPrice);
    } else if (this.sortBy === "price-desc") {
      list.sort((a, b) => b.startingPrice - a.startingPrice);
    } else if (this.sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else {
      // Default: popularity by reviews count
      list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return list;
  }

  renderDestinations() {
    if (!this.destinationsContainer) return;

    const list = this.getFilteredDestinations();
    const wishlist = travelStore.getWishlist();

    if (list.length === 0) {
      this.destinationsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <p style="font-size: 3rem; margin-bottom: 0.75rem;">🏝️</p>
          <h3 style="font-size: 1.3rem; color: var(--text-primary); margin-bottom: 0.5rem;">No destinations match your criteria</h3>
          <p>Try adjusting your search terms or expanding your budget range.</p>
        </div>
      `;
      return;
    }

    this.destinationsContainer.innerHTML = list.map(dest => {
      const isWishlisted = wishlist.includes(dest.id);
      return `
        <div class="destination-card">
          <div class="card-img-wrap">
            <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';" />
            <span class="card-badge">${dest.tag}</span>
            <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    title="Add to Wishlist" 
                    onclick="travelStore.toggleWishlist('${dest.id}')">
              ♥
            </button>
          </div>
          <div class="card-content">
            <div class="card-location">
              <span>📍</span>
              <span>${dest.country}</span>
            </div>
            <h3 class="card-title">${dest.name}</h3>
            <p class="card-desc">${dest.description}</p>
            <div class="card-footer">
              <div class="card-price-info">
                <span class="label">Starts from</span>
                <span class="amount">${travelStore.formatPrice(dest.startingPrice)}</span>
              </div>
              <div class="card-rating-badge">
                <span>⭐</span>
                <span>${dest.rating.toFixed(1)} (${dest.reviewsCount})</span>
              </div>
            </div>
            <button class="btn btn-primary btn-block" style="margin-top: 1rem;" onclick="bookingManager.openTourBookingModal('${dest.id}')">
              Explore & Book ➔
            </button>
          </div>
        </div>
      `;
    }).join("");
  }
}

let searchFilterManager;
document.addEventListener("DOMContentLoaded", () => {
  searchFilterManager = new SearchFilterManager();
});
