// js/gallery.js - Photo Gallery and Fullscreen Lightbox Viewer

class GalleryManager {
  constructor() {
    this.currentCategory = "all";
    this.currentLightboxIndex = 0;
    this.galleryItems = travelStore.getGallery();
    this.init();
  }

  init() {
    this.galleryGrid = document.getElementById("galleryGrid");
    this.lightboxModal = document.getElementById("lightboxModal");
    this.lightboxImg = document.getElementById("lightboxImg");
    this.lightboxCaption = document.getElementById("lightboxCaption");
    this.categoryPills = document.querySelectorAll(".gallery-pill");

    this.attachEvents();
    this.render();
  }

  attachEvents() {
    this.categoryPills.forEach(pill => {
      pill.addEventListener("click", (e) => {
        this.categoryPills.forEach(p => p.classList.remove("active"));
        e.currentTarget.classList.add("active");
        this.currentCategory = e.currentTarget.dataset.category;
        this.render();
      });
    });

    // Lightbox keyboard controls (ESC, Left arrow, Right arrow)
    window.addEventListener("keydown", (e) => {
      if (!this.lightboxModal || !this.lightboxModal.classList.contains("active")) return;
      if (e.key === "Escape") this.closeLightbox();
      if (e.key === "ArrowLeft") this.prevImage();
      if (e.key === "ArrowRight") this.nextImage();
    });
  }

  getFilteredItems() {
    if (this.currentCategory === "all") return this.galleryItems;
    return this.galleryItems.filter(item => item.category.toLowerCase() === this.currentCategory.toLowerCase());
  }

  render() {
    if (!this.galleryGrid) return;
    const items = this.getFilteredItems();

    this.galleryGrid.innerHTML = items.map((item, index) => `
      <div class="gallery-item" onclick="galleryManager.openLightbox(${index})">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
        <div class="gallery-overlay">
          <h4>${item.title}</h4>
          <p>📍 ${item.location} • 📸 ${item.photographer}</p>
          <div style="display: flex; align-items: center; gap: 0.35rem; color: #fff; font-size: 0.85rem; margin-top: 0.35rem;">
            <span>❤️</span>
            <span>${item.likes} Likes</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  openLightbox(index) {
    const items = this.getFilteredItems();
    if (!items[index]) return;

    this.currentLightboxIndex = index;
    const item = items[index];

    if (this.lightboxImg && this.lightboxCaption && this.lightboxModal) {
      this.lightboxImg.src = item.image;
      this.lightboxImg.alt = item.title;
      this.lightboxCaption.innerHTML = `
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.25rem;">${item.title}</h3>
        <p style="font-size: 0.9rem; color: #94a3b8;">📍 ${item.location} | Photo by <strong>${item.photographer}</strong> (${index + 1} of ${items.length})</p>
        <button class="btn btn-sm btn-secondary" style="margin-top: 0.6rem; color: #ef4444;" onclick="galleryManager.likeImage('${item.id}')">
          ❤️ Like (${item.likes})
        </button>
      `;
      this.lightboxModal.classList.add("active");
    }
  }

  likeImage(itemId) {
    const updated = travelStore.likeGalleryItem(itemId);
    this.galleryItems = travelStore.getGallery();
    this.openLightbox(this.currentLightboxIndex);
    this.render();
    showToast("Liked photo!", "success");
  }

  closeLightbox() {
    if (this.lightboxModal) {
      this.lightboxModal.classList.remove("active");
    }
  }

  nextImage() {
    const items = this.getFilteredItems();
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % items.length;
    this.openLightbox(this.currentLightboxIndex);
  }

  prevImage() {
    const items = this.getFilteredItems();
    this.currentLightboxIndex = (this.currentLightboxIndex - 1 + items.length) % items.length;
    this.openLightbox(this.currentLightboxIndex);
  }
}

let galleryManager;
document.addEventListener("DOMContentLoaded", () => {
  galleryManager = new GalleryManager();
});
