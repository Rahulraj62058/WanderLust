// js/booking.js - Package Details, Booking Engine, Price Calculator, and Checkout

class BookingManager {
  constructor() {
    this.init();
  }

  init() {
    this.packagesContainer = document.getElementById("packagesGrid");
    this.hotelsContainer = document.getElementById("hotelsGrid");
    this.flightsContainer = document.getElementById("flightsGrid");

    this.packageDetailModal = document.getElementById("packageDetailModal");
    this.bookingModal = document.getElementById("bookingModal");
    this.confirmationModal = document.getElementById("confirmationModal");

    this.renderTourPackages();
    this.renderHotels();
    this.renderFlights();
    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener("currency-change", () => {
      this.renderTourPackages();
      this.renderHotels();
      this.renderFlights();
    });

    window.addEventListener("wishlist-change", () => {
      this.renderTourPackages();
    });
  }

  // --- Render Tour Packages Grid ---
  renderTourPackages() {
    if (!this.packagesContainer) return;
    const packages = travelStore.getPackages();
    const wishlist = travelStore.getWishlist();

    this.packagesContainer.innerHTML = packages.map(pkg => {
      const isWishlisted = wishlist.includes(pkg.id);
      return `
        <div class="package-card">
          <div class="card-img-wrap">
            <img src="${pkg.image}" alt="${pkg.title}" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';" />
            <span class="card-badge">${pkg.discount}</span>
            <span class="pkg-duration-pill">⏳ ${pkg.durationDays} Days / ${pkg.durationNights} Nights</span>
            <button class="card-wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    title="Add to Wishlist" 
                    onclick="travelStore.toggleWishlist('${pkg.id}')">
              ♥
            </button>
          </div>
          <div class="card-content">
            <div class="card-location">
              <span>📍</span>
              <span>${pkg.destination}</span>
            </div>
            <h3 class="card-title">${pkg.title}</h3>
            <div class="pkg-specs">
              <span class="pkg-spec-item">👥 ${pkg.groupSize}</span>
              <span class="pkg-spec-item">⭐ ${pkg.rating.toFixed(1)} (${pkg.reviewsCount})</span>
            </div>
            <ul class="pkg-highlights-list">
              ${pkg.highlights.slice(0, 2).map(h => `<li>${h}</li>`).join('')}
            </ul>
            <div class="card-footer">
              <div class="card-price-info">
                <span class="label">Price per person</span>
                <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                  <span class="amount">${travelStore.formatPrice(pkg.price)}</span>
                  <span style="font-size: 0.85rem; text-decoration: line-through; color: var(--text-muted);">${travelStore.formatPrice(pkg.originalPrice)}</span>
                </div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="bookingManager.openPackageDetails('${pkg.id}')">
                Details ℹ️
              </button>
            </div>
            <button class="btn btn-accent btn-block" style="margin-top: 1rem;" onclick="bookingManager.startTourBooking('${pkg.id}')">
              Book Package Now ➔
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- Render Hotels Grid ---
  renderHotels() {
    if (!this.hotelsContainer) return;
    const hotels = travelStore.getHotels();

    this.hotelsContainer.innerHTML = hotels.map(hotel => `
      <div class="hotel-card">
        <div class="card-img-wrap">
          <img src="${hotel.image}" alt="${hotel.name}" loading="lazy" />
          <span class="card-badge">⭐ ${hotel.stars}-Star Luxury</span>
        </div>
        <div class="card-content">
          <div class="card-location">
            <span>📍</span>
            <span>${hotel.city}, ${hotel.country}</span>
          </div>
          <h3 class="card-title">${hotel.name}</h3>
          <p class="card-desc">${hotel.description}</p>
          <div class="amenities-tags">
            ${hotel.amenities.map(a => `<span class="amenity-tag">✓ ${a}</span>`).join('')}
          </div>
          <div class="card-footer">
            <div class="card-price-info">
              <span class="label">Per Night</span>
              <span class="amount">${travelStore.formatPrice(hotel.pricePerNight)}</span>
            </div>
            <div class="card-rating-badge">
              <span>⭐</span>
              <span>${hotel.rating.toFixed(1)} (${hotel.reviewsCount})</span>
            </div>
          </div>
          <button class="btn btn-primary btn-block" style="margin-top: 1rem;" onclick="bookingManager.openHotelBookingModal('${hotel.id}')">
            Reserve Room ➔
          </button>
        </div>
      </div>
    `).join('');
  }

  // --- Render Flights Grid ---
  renderFlights() {
    if (!this.flightsContainer) return;
    const flights = travelStore.getFlights();

    this.flightsContainer.innerHTML = flights.map(flt => `
      <div class="flight-card">
        <div class="flight-airline">
          <div class="flight-icon-box">${flt.logo}</div>
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 800; color: var(--text-primary);">${flt.airline}</h4>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 600;">${flt.airlineCode}</span>
          </div>
        </div>

        <div class="flight-route-info">
          <div class="flight-point">
            <div class="time">${flt.departureTime}</div>
            <div class="airport">${flt.origin}</div>
          </div>

          <div class="flight-duration-line">
            <span class="duration">⏱️ ${flt.duration}</span>
            <div class="flight-line"></div>
            <span class="stops">${flt.stops}</span>
          </div>

          <div class="flight-point">
            <div class="time">${flt.arrivalTime}</div>
            <div class="airport">${flt.destination}</div>
          </div>
        </div>

        <div class="flight-price-action">
          <div>
            <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">From</span>
            <div style="font-size: 1.4rem; font-weight: 800; color: var(--primary);">${travelStore.formatPrice(flt.classes[0].price)}</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="bookingManager.openFlightBookingModal('${flt.id}')">
            Book Flight ✈️
          </button>
        </div>
      </div>
    `).join('');
  }

  // --- Package Details Modal ---
  openPackageDetails(packageId) {
    const pkg = travelStore.getPackageById(packageId);
    if (!pkg) return;

    const modalBody = document.getElementById("packageDetailModalBody");
    const modalTitle = document.getElementById("packageDetailModalTitle");
    modalTitle.textContent = pkg.title;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem; border-radius: var(--radius-lg); overflow: hidden; height: 320px;">
        <img src="${pkg.image}" alt="${pkg.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        <span class="card-badge" style="position: static; background: var(--primary-light); color: var(--primary);">⏱️ ${pkg.durationDays} Days / ${pkg.durationNights} Nights</span>
        <span class="card-badge" style="position: static; background: #fef3c7; color: #b45309;">⭐ ${pkg.rating.toFixed(1)} Rating</span>
        <span class="card-badge" style="position: static; background: #dcfce7; color: #16a34a;">👥 ${pkg.groupSize}</span>
      </div>

      <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary);">Tour Overview</h4>
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.5rem;">${pkg.overview}</p>

      <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--text-primary);">Day-by-Day Itinerary</h4>
      <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2rem;">
        ${pkg.itinerary.map(item => `
          <div style="background: var(--bg-subtle); border-left: 3px solid var(--primary); padding: 0.85rem 1.25rem; border-radius: var(--radius-sm);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
              <strong style="color: var(--primary); font-size: 0.85rem;">Day ${item.day}</strong>
              <strong style="color: var(--text-primary); font-size: 0.95rem;">${item.title}</strong>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-secondary); margin: 0;">${item.desc}</p>
          </div>
        `).join('')}
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2rem;">
        <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h5 style="color: var(--success); font-weight: 700; margin-bottom: 0.75rem;">✓ What's Included</h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
            ${pkg.inclusions.map(inc => `<li>• ${inc}</li>`).join('')}
          </ul>
        </div>
        <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <h5 style="color: var(--danger); font-weight: 700; margin-bottom: 0.75rem;">✗ What's Excluded</h5>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.4rem; font-size: 0.85rem; color: var(--text-secondary);">
            ${pkg.exclusions.map(exc => `<li>• ${exc}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <div>
          <span style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase;">Special Price</span>
          <div style="font-size: 1.75rem; font-weight: 800; color: var(--primary);">${travelStore.formatPrice(pkg.price)} <span style="font-size: 0.85rem; color: var(--text-secondary); font-weight: normal;">/ person</span></div>
        </div>
        <button class="btn btn-accent btn-lg" onclick="bookingManager.closePackageDetails(); bookingManager.startTourBooking('${pkg.id}')">
          Book This Package ➔
        </button>
      </div>
    `;

    this.packageDetailModal.classList.add("active");
  }

  closePackageDetails() {
    if (this.packageDetailModal) {
      this.packageDetailModal.classList.remove("active");
    }
  }

  // --- Start Tour Booking Flow ---
  startTourBooking(packageId) {
    const pkg = travelStore.getPackageById(packageId);
    if (!pkg) return;

    this.renderBookingModalContent({
      type: "tour",
      itemId: pkg.id,
      title: pkg.title,
      basePrice: pkg.price,
      image: pkg.image,
      details: `${pkg.durationDays} Days / ${pkg.durationNights} Nights`
    });
  }

  openTourBookingModal(destId) {
    const dest = travelStore.getDestinationById(destId);
    if (!dest) return;

    this.renderBookingModalContent({
      type: "tour",
      itemId: dest.id,
      title: `Custom Tour to ${dest.name}`,
      basePrice: dest.startingPrice,
      image: dest.image,
      details: `Destination Tour Package (${dest.category.toUpperCase()})`
    });
  }

  openHotelBookingModal(hotelId) {
    const hotel = travelStore.getHotelById(hotelId);
    if (!hotel) return;

    this.renderBookingModalContent({
      type: "hotel",
      itemId: hotel.id,
      title: hotel.name,
      basePrice: hotel.pricePerNight,
      image: hotel.image,
      details: `${hotel.city}, ${hotel.country} • Deluxe Suite`,
      isHotel: true,
      roomTypes: hotel.roomTypes
    });
  }

  openFlightBookingModal(flightId) {
    const flight = travelStore.getFlightById(flightId);
    if (!flight) return;

    this.renderBookingModalContent({
      type: "flight",
      itemId: flight.id,
      title: `${flight.airline} (${flight.flightNumber || flight.airlineCode})`,
      basePrice: flight.classes[0].price,
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=600&q=80",
      details: `${flight.origin} ➔ ${flight.destination} (${flight.duration})`,
      isFlight: true,
      classes: flight.classes
    });
  }

  renderBookingModalContent(item) {
    const user = travelStore.getCurrentUser() || { name: "", email: "", phone: "" };
    const modalBody = document.getElementById("bookingModalBody");
    const modalTitle = document.getElementById("bookingModalTitle");

    modalTitle.textContent = `Checkout & Reserve`;

    let state = {
      travelers: 1,
      basePrice: item.basePrice,
      addOnsTotal: 0,
      discountPercent: 0,
      selectedClassPrice: item.basePrice
    };

    modalBody.innerHTML = `
      <div style="display: flex; gap: 1.25rem; margin-bottom: 1.5rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border-color);">
        <img src="${item.image}" alt="${item.title}" style="width: 100px; height: 80px; object-fit: cover; border-radius: var(--radius-md);" />
        <div>
          <span class="card-badge" style="position: static; font-size: 0.75rem; background: var(--primary-light); color: var(--primary);">${item.type.toUpperCase()} BOOKING</span>
          <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--text-primary); margin-top: 0.25rem;">${item.title}</h4>
          <p style="font-size: 0.85rem; color: var(--text-muted);">${item.details}</p>
        </div>
      </div>

      <form id="bookingForm" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label>Full Name *</label>
            <input type="text" id="bookName" class="form-control" value="${user.name}" required placeholder="John Doe" />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label>Email Address *</label>
            <input type="email" id="bookEmail" class="form-control" value="${user.email}" required placeholder="john@example.com" />
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label>Phone Number *</label>
            <input type="tel" id="bookPhone" class="form-control" required placeholder="+1 (555) 000-0000" />
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label>Departure / Check-in Date *</label>
            <input type="date" id="bookDate" class="form-control" required value="${new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0]}" />
          </div>
        </div>

        ${item.isHotel ? `
          <div class="form-group" style="margin-bottom: 0;">
            <label>Select Room Category</label>
            <select id="bookRoomType" class="form-control">
              ${item.roomTypes.map(r => `<option value="${r.price}">${r.name} - ${travelStore.formatPrice(r.price)} / night (${r.bed})</option>`).join('')}
            </select>
          </div>
        ` : ''}

        ${item.isFlight ? `
          <div class="form-group" style="margin-bottom: 0;">
            <label>Select Cabin Class</label>
            <select id="bookFlightClass" class="form-control">
              ${item.classes.map(c => `<option value="${c.price}">${c.name} - ${travelStore.formatPrice(c.price)} (Baggage: ${c.baggage})</option>`).join('')}
            </select>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group" style="margin-bottom: 0;">
            <label>Guests / Travelers</label>
            <select id="bookTravelers" class="form-control">
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="5">5+ Persons (Group)</option>
            </select>
          </div>
          <div class="form-group" style="margin-bottom: 0;">
            <label>Payment Method</label>
            <select id="bookPaymentMethod" class="form-control">
              <option value="Credit Card">💳 Credit / Debit Card</option>
              <option value="PayPal">🅿️ PayPal</option>
              <option value="Apple Pay">🍎 Apple Pay / Google Pay</option>
              <option value="Bank Wire">🏦 Direct Bank Wire</option>
            </select>
          </div>
        </div>

        <!-- Add-ons Selection -->
        <div style="background: var(--bg-subtle); padding: 1rem 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; display: block;">Optional Trip Enhancements</label>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.88rem;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" id="addonTransfer" value="50" class="addon-checkbox" />
              <span>VIP Airport Private Transfer (+${travelStore.formatPrice(50)})</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" id="addonInsurance" value="75" class="addon-checkbox" />
              <span>Comprehensive Travel & Medical Insurance (+${travelStore.formatPrice(75)})</span>
            </label>
          </div>
        </div>

        <!-- Promo Code Input -->
        <div style="display: flex; gap: 0.5rem;">
          <input type="text" id="bookPromo" class="form-control" placeholder="Promo code (Try: WANDER10 or FLY20)" style="text-transform: uppercase;" />
          <button type="button" id="applyPromoBtn" class="btn btn-secondary btn-sm">Apply</button>
        </div>
        <div id="promoMsg" style="font-size: 0.8rem; font-weight: 600; margin-top: -0.5rem;"></div>

        <!-- Price Breakdown Box -->
        <div style="background: var(--bg-surface); border: 2px dashed var(--primary); border-radius: var(--radius-md); padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem; color: var(--text-secondary);">
            <span>Base Rate (<span id="summaryTravelers">1</span> traveler(s)):</span>
            <span id="summaryBasePrice">${travelStore.formatPrice(state.basePrice)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem; color: var(--text-secondary);">
            <span>Add-ons:</span>
            <span id="summaryAddons">${travelStore.formatPrice(0)}</span>
          </div>
          <div id="summaryDiscountRow" style="display: none; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem; color: var(--success); font-weight: 700;">
            <span>Promo Discount:</span>
            <span id="summaryDiscount">-</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid var(--border-color); font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">
            <span>Total Payable:</span>
            <span id="summaryTotal" style="color: var(--primary);">${travelStore.formatPrice(state.basePrice)}</span>
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 0.5rem;">
          Confirm & Pay Securely 🔒
        </button>
      </form>
    `;

    // Dynamic Price Calculator Function
    const calculateTotal = () => {
      const travelers = Number(document.getElementById("bookTravelers").value) || 1;
      let unitPrice = item.basePrice;

      if (item.isHotel && document.getElementById("bookRoomType")) {
        unitPrice = Number(document.getElementById("bookRoomType").value);
      } else if (item.isFlight && document.getElementById("bookFlightClass")) {
        unitPrice = Number(document.getElementById("bookFlightClass").value);
      }

      let addons = 0;
      document.querySelectorAll(".addon-checkbox:checked").forEach(cb => {
        addons += Number(cb.value);
      });

      const subtotal = (unitPrice * travelers) + addons;
      const discount = subtotal * (state.discountPercent / 100);
      const total = Math.max(0, subtotal - discount);

      document.getElementById("summaryTravelers").textContent = travelers;
      document.getElementById("summaryBasePrice").textContent = travelStore.formatPrice(unitPrice * travelers);
      document.getElementById("summaryAddons").textContent = travelStore.formatPrice(addons);
      
      const discountRow = document.getElementById("summaryDiscountRow");
      if (state.discountPercent > 0) {
        discountRow.style.display = "flex";
        document.getElementById("summaryDiscount").textContent = `-${travelStore.formatPrice(discount)} (${state.discountPercent}%)`;
      } else {
        discountRow.style.display = "none";
      }

      document.getElementById("summaryTotal").textContent = travelStore.formatPrice(total);
      return total;
    };

    // Promo Code listener
    document.getElementById("applyPromoBtn").addEventListener("click", () => {
      const code = document.getElementById("bookPromo").value.trim().toUpperCase();
      const msg = document.getElementById("promoMsg");
      if (code === "WANDER10") {
        state.discountPercent = 10;
        msg.textContent = "✓ 10% Discount applied!";
        msg.style.color = "var(--success)";
      } else if (code === "FLY20") {
        state.discountPercent = 20;
        msg.textContent = "✓ 20% Mega Summer Discount applied!";
        msg.style.color = "var(--success)";
      } else {
        state.discountPercent = 0;
        msg.textContent = "✗ Invalid promo code.";
        msg.style.color = "var(--danger)";
      }
      calculateTotal();
    });

    // Inputs change listener for total recalculation
    document.getElementById("bookTravelers").addEventListener("change", calculateTotal);
    if (document.getElementById("bookRoomType")) {
      document.getElementById("bookRoomType").addEventListener("change", calculateTotal);
    }
    if (document.getElementById("bookFlightClass")) {
      document.getElementById("bookFlightClass").addEventListener("change", calculateTotal);
    }
    document.querySelectorAll(".addon-checkbox").forEach(cb => {
      cb.addEventListener("change", calculateTotal);
    });

    // Form Submit
    document.getElementById("bookingForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const totalAmount = calculateTotal();
      const newBooking = travelStore.createBooking({
        type: item.type,
        itemTitle: item.title,
        customerName: document.getElementById("bookName").value.trim(),
        customerEmail: document.getElementById("bookEmail").value.trim(),
        customerPhone: document.getElementById("bookPhone").value.trim(),
        date: document.getElementById("bookDate").value,
        travelers: Number(document.getElementById("bookTravelers").value),
        totalAmount: totalAmount,
        paymentMethod: document.getElementById("bookPaymentMethod").value
      });

      this.closeBookingModal();
      this.openConfirmationModal(newBooking);
    });

    this.bookingModal.classList.add("active");
  }

  closeBookingModal() {
    if (this.bookingModal) {
      this.bookingModal.classList.remove("active");
    }
  }

  // --- Confirmation & E-Receipt Modal ---
  openConfirmationModal(booking) {
    const modalBody = document.getElementById("confirmationModalBody");
    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <div style="width: 70px; height: 70px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 2.2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto;">
          ✓
        </div>
        <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.35rem;">Booking Confirmed!</h3>
        <p style="font-size: 0.95rem; color: var(--text-secondary);">Your reservation has been secured. Booking ID: <strong>#${booking.id}</strong></p>
      </div>

      <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Item Reserved</span>
          <strong style="color: var(--text-primary); font-size: 0.95rem;">${booking.itemTitle}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Lead Traveler</span>
          <span style="color: var(--text-primary); font-weight: 600;">${booking.customerName}</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Date & Party</span>
          <span style="color: var(--text-primary); font-weight: 600;">${booking.date} (${booking.travelers} Pax)</span>
        </div>
        <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <span style="font-size: 0.85rem; color: var(--text-muted);">Payment Method</span>
          <span style="color: var(--text-primary); font-weight: 600;">${booking.paymentMethod}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding-top: 0.5rem; font-size: 1.25rem; font-weight: 800;">
          <span style="color: var(--text-primary);">Total Paid</span>
          <span style="color: var(--primary);">${travelStore.formatPrice(booking.totalAmount)}</span>
        </div>
      </div>

      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-secondary btn-block" onclick="window.print()">
          Print Receipt 🖨️
        </button>
        <button class="btn btn-primary btn-block" onclick="bookingManager.closeConfirmationModal()">
          Done 👍
        </button>
      </div>
    `;

    this.confirmationModal.classList.add("active");
  }

  closeConfirmationModal() {
    if (this.confirmationModal) {
      this.confirmationModal.classList.remove("active");
    }
  }
}

let bookingManager;
document.addEventListener("DOMContentLoaded", () => {
  bookingManager = new BookingManager();
});
