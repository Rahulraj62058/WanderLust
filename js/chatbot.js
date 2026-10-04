// js/chatbot.js - Interactive Floating AI Travel Assistant (WanderBot)

class ChatbotManager {
  constructor() {
    this.isOpen = false;
    this.messages = [
      {
        sender: "bot",
        text: "Hello! 👋 I'm **WanderBot**, your smart travel assistant. Where in the world would you like to travel next?"
      }
    ];
    this.init();
  }

  init() {
    this.toggleBtn = document.getElementById("chatbotToggleBtn");
    this.window = document.getElementById("chatbotWindow");
    this.messagesContainer = document.getElementById("chatMessages");
    this.input = document.getElementById("chatInput");
    this.sendBtn = document.getElementById("chatSendBtn");
    this.closeBtn = document.getElementById("chatCloseBtn");
    this.suggestions = document.querySelectorAll(".chat-suggestion-chip");

    this.attachEvents();
    this.renderMessages();
  }

  attachEvents() {
    if (this.toggleBtn) {
      this.toggleBtn.addEventListener("click", () => this.toggleChat());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.closeChat());
    }

    if (this.sendBtn) {
      this.sendBtn.addEventListener("click", () => this.handleSendMessage());
    }

    if (this.input) {
      this.input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.handleSendMessage();
        }
      });
    }

    this.suggestions.forEach(chip => {
      chip.addEventListener("click", (e) => {
        const text = e.currentTarget.textContent.trim();
        this.addMessage("user", text);
        this.processBotResponse(text);
      });
    });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.window) {
      this.window.classList.toggle("active", this.isOpen);
      if (this.isOpen && this.input) {
        this.input.focus();
      }
    }
  }

  closeChat() {
    this.isOpen = false;
    if (this.window) {
      this.window.classList.remove("active");
    }
  }

  handleSendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    this.addMessage("user", text);
    this.input.value = "";
    this.processBotResponse(text);
  }

  addMessage(sender, text) {
    this.messages.push({ sender, text });
    this.renderMessages();
  }

  renderMessages() {
    if (!this.messagesContainer) return;
    this.messagesContainer.innerHTML = this.messages.map(m => `
      <div class="chat-bubble ${m.sender}">
        ${this.formatMarkdown(m.text)}
      </div>
    `).join('');
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  formatMarkdown(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  }

  processBotResponse(query) {
    const q = query.toLowerCase();
    let reply = "";

    // Show typing state
    setTimeout(() => {
      if (q.includes("budget") || q.includes("10000") || q.includes("10k") || q.includes("cheap") || q.includes("low cost")) {
        reply = "💰 **Low-Budget Trips Starting at ₹10,000 ($120)**:<br/>• **4-Day Goa Beach & Sunset Cruise**: ₹10,000 ($120)<br/>• **3-Day Rishikesh River Rafting & Camping**: ₹10,000 ($120)<br/>• **5-Day Manali & Kasol Himalayan Trek**: ₹12,000 ($145)<br/>• **5-Day Jaipur & Udaipur Heritage**: ₹15,000 ($180)<br/>Check the **Tour Packages** section for instant bookings!";
      } else if (q.includes("luxury") || q.includes("maldives") || q.includes("500000") || q.includes("5 lakh") || q.includes("expensive")) {
        reply = "👑 **Ultra-Luxury Packages (₹3,00,000 - ₹5,00,000)**:<br/>• **7-Day Maldives Deluxe Overwater Villa with Seaplane & Underwater Dining**: ₹3,00,000 ($3,600)<br/>• **5-Day Swiss Alps Grand Glacier & Chalet**: ₹1,15,000 ($1,399)<br/>All VIP amenities and 5-star concierge included!";
      } else if (q.includes("goa") || q.includes("manali") || q.includes("rishikesh")) {
        reply = "🎒 We have special budget packages for **Goa** (₹10,000), **Manali & Kasol** (₹12,000), and **Rishikesh Rafting** (₹10,000) with stays, meals, and adventures included!";
      } else if (q.includes("bali") || q.includes("indonesia")) {
        reply = "🌴 **Bali Tropical Escape** is our #1 trending tour package! 7 days of luxury villas, Mount Batur sunrise, and manta ray snorkeling for only $699 (~₹58,000). Would you like to view tour packages?";
      } else if (q.includes("swiss") || q.includes("alps") || q.includes("switzerland")) {
        reply = "🏔️ **Swiss Alps Glacier Tour** includes first-class Swiss rail passes, Jungfraujoch Top of Europe, and luxury chalets in Zermatt facing the Matterhorn!";
      } else if (q.includes("japan") || q.includes("tokyo") || q.includes("kyoto")) {
        reply = "🌸 **Japan Cherry Blossom & Samurai Heritage** is an 8-day bullet train journey across Tokyo, Mount Fuji, and Kyoto with authentic Ryokan onsen stays!";
      } else if (q.includes("hotel") || q.includes("stay") || q.includes("room")) {
        reply = "🏨 We feature handpicked 5-star resorts in Bali, Zermatt, Kyoto, Santorini, and Dubai. You can reserve directly from the **Hotels** section!";
      } else if (q.includes("flight") || q.includes("airline") || q.includes("ticket")) {
        reply = "✈️ We offer non-stop and luxury flights with Emirates, Singapore Airlines, Swiss Air, and Qatar Airways. Check the **Flights** section to book!";
      } else if (q.includes("promo") || q.includes("discount") || q.includes("coupon")) {
        reply = "🎉 Use coupon code **WANDER10** for 10% off any tour package, or **FLY20** for 20% off summer packages during checkout!";
      } else if (q.includes("cancel") || q.includes("refund")) {
        reply = "🛡️ All tour bookings offer **100% free cancellation up to 48 hours** before departure. You can manage or cancel reservations anytime from your User Profile!";
      } else if (q.includes("admin") || q.includes("login") || q.includes("dashboard")) {
        reply = "⚙️ You can access the **Admin Dashboard** via the top navigation or demo credentials (rahul.raj@wanderlust.com / admin) to manage bookings, packages, and users.";
      } else if (q.includes("itinerary") || q.includes("plan")) {
        reply = "🗺️ Check out our **Itinerary Planner** section where you can customize activities, calculate daily budgets, and export printable travel plans!";
      } else {
        reply = "✨ I can help you with **Tour Packages**, **Hotel Bookings**, **Flight Tickets**, **Custom Itineraries**, or finding the best vacation deals. What can I help you find?";
      }

      this.addMessage("bot", reply);
    }, 500);
  }
}

let chatbotManager;
document.addEventListener("DOMContentLoaded", () => {
  chatbotManager = new ChatbotManager();
});
