// js/reviews.js - Reviews, Testimonials, and Rating Breakdown

class ReviewsManager {
  constructor() {
    this.reviews = travelStore.getReviews();
    this.init();
  }

  init() {
    this.reviewsGrid = document.getElementById("reviewsGrid");
    this.writeReviewModal = document.getElementById("writeReviewModal");
    this.reviewForm = document.getElementById("writeReviewForm");
    this.starRatingInput = 5;

    this.attachEvents();
    this.render();
  }

  attachEvents() {
    // Write Review Modal trigger
    const openBtn = document.getElementById("openWriteReviewBtn");
    if (openBtn) {
      openBtn.addEventListener("click", () => this.openWriteReviewModal());
    }

    // Star Selection in Modal
    const starButtons = document.querySelectorAll(".star-select-btn");
    starButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const val = Number(e.currentTarget.dataset.value);
        this.starRatingInput = val;
        starButtons.forEach(b => {
          const bVal = Number(b.dataset.value);
          b.textContent = bVal <= val ? "★" : "☆";
          b.style.color = bVal <= val ? "#f59e0b" : "#cbd5e1";
        });
      });
    });

    // Form Submit
    if (this.reviewForm) {
      this.reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = document.getElementById("revAuthor").value.trim();
        const destination = document.getElementById("revDestSelect").value;
        const comment = document.getElementById("revComment").value.trim();

        const user = travelStore.getCurrentUser();
        const avatar = user ? user.avatar : `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(author)}`;

        travelStore.addReview({
          author,
          avatar,
          destination,
          rating: this.starRatingInput,
          comment
        });

        this.reviews = travelStore.getReviews();
        this.closeWriteReviewModal();
        this.render();
        showToast("Thank you! Your review has been published.", "success");
        this.reviewForm.reset();
      });
    }

    // Global listener for reviews change
    window.addEventListener("review-added", () => {
      this.reviews = travelStore.getReviews();
      this.render();
    });
  }

  openWriteReviewModal() {
    const user = travelStore.getCurrentUser();
    if (user && document.getElementById("revAuthor")) {
      document.getElementById("revAuthor").value = user.name;
    }

    // Populate destinations in review dropdown
    const destSelect = document.getElementById("revDestSelect");
    if (destSelect) {
      const pkgs = travelStore.getPackages();
      destSelect.innerHTML = pkgs.map(p => `<option value="${p.title}">${p.title}</option>`).join('');
    }

    if (this.writeReviewModal) {
      this.writeReviewModal.classList.add("active");
    }
  }

  closeWriteReviewModal() {
    if (this.writeReviewModal) {
      this.writeReviewModal.classList.remove("active");
    }
  }

  calculateBreakdown() {
    const approved = this.reviews.filter(r => r.status === "approved");
    if (approved.length === 0) return { avg: 5.0, count: 0, distribution: [100, 0, 0, 0, 0] };

    let total = 0;
    const countByStar = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1

    approved.forEach(r => {
      total += r.rating;
      const idx = 5 - Math.round(r.rating);
      if (idx >= 0 && idx < 5) countByStar[idx]++;
    });

    const avg = (total / approved.length).toFixed(1);
    const distribution = countByStar.map(cnt => Math.round((cnt / approved.length) * 100));

    return { avg, count: approved.length, distribution };
  }

  render() {
    const approvedReviews = this.reviews.filter(r => r.status === "approved");
    const { avg, count, distribution } = this.calculateBreakdown();

    // Render Stats
    const avgScoreEl = document.getElementById("reviewsAvgScore");
    const totalCountEl = document.getElementById("reviewsTotalCount");
    if (avgScoreEl) avgScoreEl.textContent = avg;
    if (totalCountEl) totalCountEl.textContent = `Based on ${count} verified traveler reviews`;

    // Render Progress Bars
    [5, 4, 3, 2, 1].forEach((stars, i) => {
      const bar = document.getElementById(`starProgress-${stars}`);
      const pct = document.getElementById(`starPct-${stars}`);
      if (bar) bar.style.width = `${distribution[i]}%`;
      if (pct) pct.textContent = `${distribution[i]}%`;
    });

    // Render Reviews Grid
    if (this.reviewsGrid) {
      this.reviewsGrid.innerHTML = approvedReviews.map(r => `
        <div class="review-card">
          <div class="review-header">
            <div class="reviewer-profile">
              <img src="${r.avatar}" alt="${r.author}" class="reviewer-avatar" />
              <div>
                <h4 class="reviewer-name">${r.author}</h4>
                <span class="review-trip-tag">📍 ${r.destination}</span>
              </div>
            </div>
            <div class="stars-rating" style="font-size: 1rem;">
              ${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}
            </div>
          </div>
          <p class="review-body">"${r.comment}"</p>
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted); padding-top: 0.75rem; border-top: 1px solid var(--border-subtle);">
            <span>📅 ${r.date}</span>
            <button class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.6rem;" onclick="reviewsManager.upvoteReview('${r.id}')">
              👍 Helpful (${r.likes})
            </button>
          </div>
        </div>
      `).join('');
    }
  }

  upvoteReview(reviewId) {
    const rev = this.reviews.find(r => r.id === reviewId);
    if (rev) {
      rev.likes = (rev.likes || 0) + 1;
      travelStore.set(STORE_KEYS.REVIEWS, this.reviews);
      this.render();
      showToast("Marked review as helpful!", "success");
    }
  }
}

let reviewsManager;
document.addEventListener("DOMContentLoaded", () => {
  reviewsManager = new ReviewsManager();
});
