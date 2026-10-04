// js/store.js - Central State Management with LocalStorage

const STORE_KEYS = {
  DESTINATIONS: "wanderlust_destinations",
  PACKAGES: "wanderlust_packages",
  HOTELS: "wanderlust_hotels",
  FLIGHTS: "wanderlust_flights",
  GALLERY: "wanderlust_gallery",
  REVIEWS: "wanderlust_reviews",
  BOOKINGS: "wanderlust_bookings",
  USERS: "wanderlust_users",
  CURRENT_USER: "wanderlust_current_user",
  CURRENCY: "wanderlust_currency",
  THEME: "wanderlust_theme",
  WISHLIST: "wanderlust_wishlist",
  CUSTOM_ITINERARY: "wanderlust_custom_itinerary"
};

const CURRENCY_RATES = {
  USD: { symbol: "$", rate: 1, name: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, name: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, name: "GBP (£)" },
  INR: { symbol: "₹", rate: 83.5, name: "INR (₹)" },
  JPY: { symbol: "¥", rate: 155.0, name: "JPY (¥)" },
  AUD: { symbol: "A$", rate: 1.52, name: "AUD (A$)" }
};

class TravelStore {
  constructor() {
    this.init();
  }

  init() {
    // Initialize datasets in LocalStorage and sync new items
    try {
      let storedDest = JSON.parse(localStorage.getItem(STORE_KEYS.DESTINATIONS) || "[]");
      if (!storedDest.length || storedDest.length < INITIAL_DESTINATIONS.length) {
        localStorage.setItem(STORE_KEYS.DESTINATIONS, JSON.stringify(INITIAL_DESTINATIONS));
      } else {
        // Sync any updated image URLs
        storedDest = storedDest.map(d => {
          const fresh = INITIAL_DESTINATIONS.find(item => item.id === d.id);
          return fresh ? { ...d, image: fresh.image, tag: fresh.tag } : d;
        });
        localStorage.setItem(STORE_KEYS.DESTINATIONS, JSON.stringify(storedDest));
      }
    } catch(e) {
      localStorage.setItem(STORE_KEYS.DESTINATIONS, JSON.stringify(INITIAL_DESTINATIONS));
    }

    try {
      let storedPkgs = JSON.parse(localStorage.getItem(STORE_KEYS.PACKAGES) || "[]");
      if (!storedPkgs.length || storedPkgs.length < INITIAL_PACKAGES.length) {
        localStorage.setItem(STORE_KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES));
      } else {
        // Sync any updated image URLs and discount badges
        storedPkgs = storedPkgs.map(p => {
          const fresh = INITIAL_PACKAGES.find(item => item.id === p.id);
          return fresh ? { ...p, image: fresh.image, discount: fresh.discount } : p;
        });
        localStorage.setItem(STORE_KEYS.PACKAGES, JSON.stringify(storedPkgs));
      }
    } catch(e) {
      localStorage.setItem(STORE_KEYS.PACKAGES, JSON.stringify(INITIAL_PACKAGES));
    }
    if (!localStorage.getItem(STORE_KEYS.HOTELS)) {
      localStorage.setItem(STORE_KEYS.HOTELS, JSON.stringify(INITIAL_HOTELS));
    }
    if (!localStorage.getItem(STORE_KEYS.FLIGHTS)) {
      localStorage.setItem(STORE_KEYS.FLIGHTS, JSON.stringify(INITIAL_FLIGHTS));
    }
    if (!localStorage.getItem(STORE_KEYS.GALLERY)) {
      localStorage.setItem(STORE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
    }
    if (!localStorage.getItem(STORE_KEYS.REVIEWS)) {
      localStorage.setItem(STORE_KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem(STORE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    }
    if (!localStorage.getItem(STORE_KEYS.USERS)) {
      localStorage.setItem(STORE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
    } else {
      // Sync admin user name, email, and avatar if updated
      try {
        const existingUsers = JSON.parse(localStorage.getItem(STORE_KEYS.USERS) || "[]");
        const adminIndex = existingUsers.findIndex(u => u.id === "usr-admin" || u.role === "Admin");
        if (adminIndex !== -1) {
          existingUsers[adminIndex].name = "Rahul Raj (Admin)";
          existingUsers[adminIndex].email = "rahul.raj@wanderlust.com";
          existingUsers[adminIndex].avatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80";
          localStorage.setItem(STORE_KEYS.USERS, JSON.stringify(existingUsers));
        }
      } catch (e) {}
    }
    if (!localStorage.getItem(STORE_KEYS.CURRENCY)) {
      localStorage.setItem(STORE_KEYS.CURRENCY, "USD");
    }
    if (!localStorage.getItem(STORE_KEYS.THEME)) {
      localStorage.setItem(STORE_KEYS.THEME, "light");
    }
    if (!localStorage.getItem(STORE_KEYS.WISHLIST)) {
      localStorage.setItem(STORE_KEYS.WISHLIST, JSON.stringify(["dest-1", "pkg-2"]));
    }
    if (!localStorage.getItem(STORE_KEYS.CUSTOM_ITINERARY)) {
      const defaultCustomPlan = [
        {
          day: 1,
          date: "Day 1",
          city: "Tokyo, Japan",
          activities: [
            { id: "act-1", time: "09:00 AM", title: "Arrival & Hotel Check-in", location: "Shinjuku Granbell", cost: 0, notes: "Collect pocket Wi-Fi at Narita" },
            { id: "act-2", time: "02:00 PM", title: "Meiji Jingu Shrine Walk", location: "Harajuku", cost: 0, notes: "Quiet stroll under giant cedar trees" },
            { id: "act-3", time: "07:30 PM", title: "Shinjuku Omoide Yokocho Yakitori", location: "Memory Lane", cost: 35, notes: "Authentic skewers and local vibe" }
          ]
        },
        {
          day: 2,
          date: "Day 2",
          city: "Tokyo, Japan",
          activities: [
            { id: "act-4", time: "09:30 AM", title: "Senso-ji Temple & Nakamise Dori", location: "Asakusa", cost: 15, notes: "Try fresh melonpan and green tea" },
            { id: "act-5", time: "03:00 PM", title: "TeamLab Planets Immersive Art", location: "Toyosu", cost: 38, notes: "Advance reservation booked" },
            { id: "act-6", time: "08:00 PM", title: "Rooftop Drinks in Shibuya", location: "Shibuya Sky", cost: 25, notes: "Panoramic 360 night view" }
          ]
        }
      ];
      localStorage.setItem(STORE_KEYS.CUSTOM_ITINERARY, JSON.stringify(defaultCustomPlan));
    }
  }

  // --- Currency Helpers ---
  getCurrency() {
    return localStorage.getItem(STORE_KEYS.CURRENCY) || "USD";
  }

  setCurrency(curr) {
    if (CURRENCY_RATES[curr]) {
      localStorage.setItem(STORE_KEYS.CURRENCY, curr);
      window.dispatchEvent(new CustomEvent("currency-change", { detail: curr }));
    }
  }

  formatPrice(usdAmount) {
    const curr = this.getCurrency();
    const info = CURRENCY_RATES[curr] || CURRENCY_RATES.USD;
    const converted = Math.round(usdAmount * info.rate);
    return `${info.symbol}${converted.toLocaleString()}`;
  }

  // --- Generic Storage Helpers ---
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error(`Error reading ${key} from storage:`, e);
      return null;
    }
  }

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing ${key} to storage:`, e);
    }
  }

  // --- Destinations ---
  getDestinations() {
    return this.get(STORE_KEYS.DESTINATIONS) || [];
  }

  getDestinationById(id) {
    return this.getDestinations().find(d => d.id === id);
  }

  addDestination(dest) {
    const items = this.getDestinations();
    dest.id = "dest-" + Date.now();
    items.unshift(dest);
    this.set(STORE_KEYS.DESTINATIONS, items);
    return dest;
  }

  updateDestination(id, updatedData) {
    const items = this.getDestinations().map(d => d.id === id ? { ...d, ...updatedData } : d);
    this.set(STORE_KEYS.DESTINATIONS, items);
  }

  deleteDestination(id) {
    const items = this.getDestinations().filter(d => d.id !== id);
    this.set(STORE_KEYS.DESTINATIONS, items);
  }

  // --- Packages ---
  getPackages() {
    return this.get(STORE_KEYS.PACKAGES) || [];
  }

  getPackageById(id) {
    return this.getPackages().find(p => p.id === id);
  }

  addPackage(pkg) {
    const items = this.getPackages();
    pkg.id = "pkg-" + Date.now();
    items.unshift(pkg);
    this.set(STORE_KEYS.PACKAGES, items);
    return pkg;
  }

  updatePackage(id, updatedData) {
    const items = this.getPackages().map(p => p.id === id ? { ...p, ...updatedData } : p);
    this.set(STORE_KEYS.PACKAGES, items);
  }

  deletePackage(id) {
    const items = this.getPackages().filter(p => p.id !== id);
    this.set(STORE_KEYS.PACKAGES, items);
  }

  // --- Hotels ---
  getHotels() {
    return this.get(STORE_KEYS.HOTELS) || [];
  }

  getHotelById(id) {
    return this.getHotels().find(h => h.id === id);
  }

  // --- Flights ---
  getFlights() {
    return this.get(STORE_KEYS.FLIGHTS) || [];
  }

  getFlightById(id) {
    return this.getFlights().find(f => f.id === id);
  }

  // --- Bookings ---
  getBookings() {
    return this.get(STORE_KEYS.BOOKINGS) || [];
  }

  getUserBookings(email) {
    if (!email) return [];
    return this.getBookings().filter(b => b.customerEmail.toLowerCase() === email.toLowerCase());
  }

  createBooking(bookingData) {
    const items = this.getBookings();
    const newBooking = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      status: "Confirmed",
      bookingDate: new Date().toISOString().split("T")[0],
      ...bookingData
    };
    items.unshift(newBooking);
    this.set(STORE_KEYS.BOOKINGS, items);
    window.dispatchEvent(new CustomEvent("booking-created", { detail: newBooking }));
    return newBooking;
  }

  updateBookingStatus(id, newStatus) {
    const items = this.getBookings().map(b => b.id === id ? { ...b, status: newStatus } : b);
    this.set(STORE_KEYS.BOOKINGS, items);
  }

  deleteBooking(id) {
    const items = this.getBookings().filter(b => b.id !== id);
    this.set(STORE_KEYS.BOOKINGS, items);
  }

  // --- Users & Auth ---
  getUsers() {
    return this.get(STORE_KEYS.USERS) || [];
  }

  getCurrentUser() {
    return this.get(STORE_KEYS.CURRENT_USER);
  }

  setCurrentUser(user) {
    if (user) {
      this.set(STORE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORE_KEYS.CURRENT_USER);
    }
    window.dispatchEvent(new CustomEvent("auth-change", { detail: user }));
  }

  registerUser(userData) {
    const users = this.getUsers();
    if (users.some(u => u.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error("An account with this email already exists.");
    }
    const newUser = {
      id: "usr-" + Date.now(),
      role: "User",
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userData.name)}`,
      joinedDate: new Date().toISOString().split("T")[0],
      status: "Active",
      ...userData
    };
    users.push(newUser);
    this.set(STORE_KEYS.USERS, users);
    this.setCurrentUser(newUser);
    return newUser;
  }

  loginUser(email, password) {
    const users = this.getUsers();
    const cleanEmail = (email || "").toLowerCase().trim();
    const user = users.find(u => {
      const matchEmail = u.email.toLowerCase() === cleanEmail || 
        (u.role === "Admin" && (cleanEmail === "admin" || cleanEmail === "admin@wanderlust.com" || cleanEmail === "rahul.raj@wanderlust.com" || cleanEmail === "rahul@wanderlust.com")) ||
        (cleanEmail === "user" && u.email.toLowerCase() === "john@traveler.com");
      return matchEmail && u.password === password;
    });
    if (!user) {
      throw new Error("Invalid email or password.");
    }
    if (user.status === "Suspended") {
      throw new Error("Your account has been suspended by an administrator.");
    }
    this.setCurrentUser(user);
    return user;
  }

  logoutUser() {
    this.setCurrentUser(null);
  }

  toggleUserStatus(id) {
    const users = this.getUsers().map(u => {
      if (u.id === id) {
        const nextStatus = u.status === "Active" ? "Suspended" : "Active";
        return { ...u, status: nextStatus };
      }
      return u;
    });
    this.set(STORE_KEYS.USERS, users);
  }

  toggleUserRole(id) {
    const users = this.getUsers().map(u => {
      if (u.id === id) {
        const nextRole = u.role === "Admin" ? "User" : "Admin";
        return { ...u, role: nextRole };
      }
      return u;
    });
    this.set(STORE_KEYS.USERS, users);
  }

  // --- Wishlist ---
  getWishlist() {
    return this.get(STORE_KEYS.WISHLIST) || [];
  }

  toggleWishlist(itemId) {
    let list = this.getWishlist();
    const exists = list.includes(itemId);
    if (exists) {
      list = list.filter(id => id !== itemId);
    } else {
      list.push(itemId);
    }
    this.set(STORE_KEYS.WISHLIST, list);
    window.dispatchEvent(new CustomEvent("wishlist-change", { detail: list }));
    return !exists;
  }

  // --- Reviews ---
  getReviews() {
    return this.get(STORE_KEYS.REVIEWS) || [];
  }

  addReview(reviewData) {
    const items = this.getReviews();
    const newReview = {
      id: "rev-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      likes: 0,
      status: "approved",
      ...reviewData
    };
    items.unshift(newReview);
    this.set(STORE_KEYS.REVIEWS, items);
    window.dispatchEvent(new CustomEvent("review-added", { detail: newReview }));
    return newReview;
  }

  toggleReviewStatus(id) {
    const items = this.getReviews().map(r => {
      if (r.id === id) {
        return { ...r, status: r.status === "approved" ? "rejected" : "approved" };
      }
      return r;
    });
    this.set(STORE_KEYS.REVIEWS, items);
  }

  deleteReview(id) {
    const items = this.getReviews().filter(r => r.id !== id);
    this.set(STORE_KEYS.REVIEWS, items);
  }

  // --- Custom Itinerary ---
  getCustomItinerary() {
    return this.get(STORE_KEYS.CUSTOM_ITINERARY) || [];
  }

  saveCustomItinerary(itineraryList) {
    this.set(STORE_KEYS.CUSTOM_ITINERARY, itineraryList);
    window.dispatchEvent(new CustomEvent("itinerary-change", { detail: itineraryList }));
  }

  // --- Gallery ---
  getGallery() {
    return this.get(STORE_KEYS.GALLERY) || [];
  }

  likeGalleryItem(id) {
    const items = this.getGallery().map(g => g.id === id ? { ...g, likes: g.likes + 1 } : g);
    this.set(STORE_KEYS.GALLERY, items);
    return items.find(g => g.id === id);
  }
}

// Global store singleton
const travelStore = new TravelStore();
