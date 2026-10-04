// js/itinerary.js - Interactive Day-by-Day Travel Itinerary Planner

class ItineraryPlanner {
  constructor() {
    this.itineraryData = travelStore.getCustomItinerary();
    this.activeDayIndex = 0;
    this.init();
  }

  init() {
    this.daysNavContainer = document.getElementById("itineraryDaysNav");
    this.timelineContainer = document.getElementById("itineraryTimeline");
    this.totalCostDisplay = document.getElementById("itineraryTotalCost");
    this.addActivityModal = document.getElementById("addActivityModal");
    
    this.attachEvents();
    this.render();
  }

  attachEvents() {
    // Add Day Button
    const addDayBtn = document.getElementById("addItineraryDayBtn");
    if (addDayBtn) {
      addDayBtn.addEventListener("click", () => this.addNewDay());
    }

    // Add Activity Form Submit
    const form = document.getElementById("addActivityForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.saveNewActivity();
      });
    }

    // Export / Print button
    const exportBtn = document.getElementById("exportItineraryBtn");
    if (exportBtn) {
      exportBtn.addEventListener("click", () => {
        window.print();
      });
    }

    // Listen to currency changes
    window.addEventListener("currency-change", () => {
      this.render();
    });
  }

  addNewDay() {
    const nextDayNumber = this.itineraryData.length + 1;
    const newDay = {
      day: nextDayNumber,
      date: `Day ${nextDayNumber}`,
      city: "Destination City",
      activities: [
        {
          id: "act-" + Date.now(),
          time: "10:00 AM",
          title: "Morning Sightseeing",
          location: "City Center",
          cost: 20,
          notes: "Explore local landmark"
        }
      ]
    };
    this.itineraryData.push(newDay);
    travelStore.saveCustomItinerary(this.itineraryData);
    this.activeDayIndex = this.itineraryData.length - 1;
    this.render();
    showToast(`Added Day ${nextDayNumber} to your itinerary!`, "success");
  }

  deleteDay(dayIndex) {
    if (this.itineraryData.length <= 1) {
      showToast("You must have at least one day in your itinerary.", "error");
      return;
    }
    if (confirm(`Are you sure you want to delete Day ${dayIndex + 1}?`)) {
      this.itineraryData.splice(dayIndex, 1);
      // Re-index days
      this.itineraryData.forEach((d, idx) => {
        d.day = idx + 1;
        d.date = `Day ${idx + 1}`;
      });
      travelStore.saveCustomItinerary(this.itineraryData);
      this.activeDayIndex = Math.max(0, this.activeDayIndex - 1);
      this.render();
      showToast("Day removed from itinerary.", "info");
    }
  }

  openAddActivityModal() {
    if (this.addActivityModal) {
      document.getElementById("addActivityForm").reset();
      this.addActivityModal.classList.add("active");
    }
  }

  closeAddActivityModal() {
    if (this.addActivityModal) {
      this.addActivityModal.classList.remove("active");
    }
  }

  saveNewActivity() {
    const time = document.getElementById("actTime").value.trim() || "10:00 AM";
    const title = document.getElementById("actTitle").value.trim();
    const location = document.getElementById("actLocation").value.trim() || "Local Attraction";
    const cost = Number(document.getElementById("actCost").value) || 0;
    const notes = document.getElementById("actNotes").value.trim() || "";

    const newActivity = {
      id: "act-" + Date.now(),
      time,
      title,
      location,
      cost,
      notes
    };

    if (!this.itineraryData[this.activeDayIndex]) {
      this.itineraryData[this.activeDayIndex] = { day: this.activeDayIndex + 1, date: `Day ${this.activeDayIndex + 1}`, city: "City", activities: [] };
    }

    this.itineraryData[this.activeDayIndex].activities.push(newActivity);
    travelStore.saveCustomItinerary(this.itineraryData);
    this.closeAddActivityModal();
    this.render();
    showToast("Activity added to your timeline!", "success");
  }

  deleteActivity(activityId) {
    const currentDay = this.itineraryData[this.activeDayIndex];
    if (!currentDay) return;

    currentDay.activities = currentDay.activities.filter(a => a.id !== activityId);
    travelStore.saveCustomItinerary(this.itineraryData);
    this.render();
    showToast("Activity removed.", "info");
  }

  calculateTotalCost() {
    let total = 0;
    this.itineraryData.forEach(day => {
      day.activities.forEach(act => {
        total += act.cost || 0;
      });
    });
    return total;
  }

  render() {
    if (!this.daysNavContainer || !this.timelineContainer) return;

    // Render Days Tab Navigation
    this.daysNavContainer.innerHTML = this.itineraryData.map((d, idx) => `
      <button class="itinerary-day-tab ${idx === this.activeDayIndex ? 'active' : ''}" onclick="itineraryPlanner.selectDay(${idx})">
        📅 ${d.date}
      </button>
    `).join('');

    // Update total cost
    const totalCost = this.calculateTotalCost();
    if (this.totalCostDisplay) {
      this.totalCostDisplay.textContent = travelStore.formatPrice(totalCost);
    }

    // Render Timeline for active day
    const activeDay = this.itineraryData[this.activeDayIndex];
    if (!activeDay || !activeDay.activities || activeDay.activities.length === 0) {
      this.timelineContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">📝</p>
          <h4 style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 0.5rem;">No activities planned for this day yet</h4>
          <button class="btn btn-primary btn-sm" onclick="itineraryPlanner.openAddActivityModal()">+ Add First Activity</button>
        </div>
      `;
      return;
    }

    this.timelineContainer.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--border-color);">
        <h4 style="font-size: 1.15rem; font-weight: 800; color: var(--text-primary);">
          ${activeDay.date} Activities (${activeDay.activities.length})
        </h4>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-primary btn-sm" onclick="itineraryPlanner.openAddActivityModal()">+ Add Activity</button>
          <button class="btn btn-secondary btn-sm" style="color: var(--danger);" onclick="itineraryPlanner.deleteDay(${this.activeDayIndex})">Delete Day 🗑️</button>
        </div>
      </div>

      <div class="itinerary-timeline">
        ${activeDay.activities.map(act => `
          <div class="timeline-item">
            <div class="timeline-dot"></div>
            <div class="timeline-card">
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem;">
                  <span class="card-badge" style="position: static; font-size: 0.75rem; background: var(--primary-light); color: var(--primary);">⏱️ ${act.time}</span>
                  <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">📍 ${act.location}</span>
                </div>
                <h4>${act.title}</h4>
                ${act.notes ? `<p class="notes">💭 ${act.notes}</p>` : ''}
              </div>
              <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem;">
                <span style="font-size: 1.05rem; font-weight: 800; color: var(--primary);">${act.cost > 0 ? travelStore.formatPrice(act.cost) : 'Free'}</span>
                <button class="btn-icon danger" title="Remove Activity" onclick="itineraryPlanner.deleteActivity('${act.id}')">
                  ✕
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  selectDay(index) {
    this.activeDayIndex = index;
    this.render();
  }
}

let itineraryPlanner;
document.addEventListener("DOMContentLoaded", () => {
  itineraryPlanner = new ItineraryPlanner();
});
