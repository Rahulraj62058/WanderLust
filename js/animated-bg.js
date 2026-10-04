/**
 * WanderLust — Animated Background Engine
 * Canvas-based particle / star field + connection lines, themed to light/dark.
 */
(function () {
  "use strict";

  /* ── 1. Inject HTML elements ── */
  function injectElements() {
    // Canvas
    const canvas = document.createElement("canvas");
    canvas.id = "animated-bg-canvas";
    document.body.prepend(canvas);

    // Gradient layer
    const gradLayer = document.createElement("div");
    gradLayer.className = "bg-gradient-layer";
    document.body.prepend(gradLayer);

    // Orbs layer
    const orbsWrap = document.createElement("div");
    orbsWrap.className = "bg-orbs";
    orbsWrap.innerHTML = `
      <div class="bg-orb bg-orb-1"></div>
      <div class="bg-orb bg-orb-2"></div>
      <div class="bg-orb bg-orb-3"></div>
      <div class="bg-orb bg-orb-4"></div>
      <div class="bg-orb bg-orb-5"></div>
    `;
    document.body.prepend(orbsWrap);

    // Floating emoji icons
    const icons = ["✈️","🌍","🗺️","🏖️","🌄","🧳","⛵","🏔️","🌊","🌴","🗼","🌅"];
    const floatersWrap = document.createElement("div");
    floatersWrap.className = "bg-floaters";
    icons.forEach((icon, i) => {
      const el = document.createElement("span");
      el.className = "bg-floater";
      el.textContent = icon;
      floatersWrap.appendChild(el);
    });
    document.body.appendChild(floatersWrap);
  }

  /* ── 2. Canvas particle system ── */
  function initCanvas() {
    const canvas = document.getElementById("animated-bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W, H, particles = [], animId;
    const PARTICLE_COUNT = 90;
    const MAX_DIST = 140;

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function randomBetween(a, b) { return a + Math.random() * (b - a); }

    function createParticle() {
      return {
        x:  randomBetween(0, W),
        y:  randomBetween(0, H),
        vx: randomBetween(-0.35, 0.35),
        vy: randomBetween(-0.35, 0.35),
        r:  randomBetween(1.5, 3.2),
      };
    }

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
    }

    function getColors() {
      if (isDark()) {
        return {
          dot:  "rgba(56, 189, 248, 0.55)",
          line: "rgba(56, 189, 248, ",
        };
      }
      return {
        dot:  "rgba(2, 132, 199, 0.45)",
        line: "rgba(2, 132, 199, ",
      };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const { dot, line } = getColors();

      // Update + draw dots
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        // Bounce off edges
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dot;
        ctx.fill();
      });

      // Draw connecting lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = line + alpha + ")";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => { resize(); initParticles(); });
  }

  /* ── 3. Theme-change observer (recolors instantly) ── */
  function watchTheme() {
    const observer = new MutationObserver(() => {
      // Canvas auto-redraws with new color via isDark() check
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  }

  /* ── 4. Boot ── */
  function boot() {
    injectElements();
    initCanvas();
    watchTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
