/**
 * STUDENT PORTAL — Shared Application Behaviour
 * Encapsulated architecture with enhanced safety, accessibility, and utility.
 */
(() => {
  'use strict';

  // ===== Mobile Navigation Controller =====
  const nav = document.getElementById("nav");
  const menu = document.getElementById("menu");

  if (menu && nav) {
    /**
     * Toggles the mobile navigation drawer context safely.
     * @param {Boolean} [forceState] - Explicitly force an open/close state.
     */
    const toggleMenu = (forceState) => {
      const isExpanded = typeof forceState === 'boolean' 
        ? forceState 
        : !nav.classList.contains("show");

      nav.classList.toggle("show", isExpanded);
      menu.setAttribute("aria-expanded", isExpanded);
    };

    // Click handler for primary hamburger trigger
    menu.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Automatically close drawer when selecting a navigation node
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    // Global document hook: Close drawer on external window click
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("show") && !nav.contains(e.target) && e.target !== menu) {
        toggleMenu(false);
      }
    });

    // Accessibility Keyboard Hook: Close drawer on pressing Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("show")) {
        toggleMenu(false);
        menu.focus(); // Returns focus to hamburger for seamless screen reader flow
      }
    });
  }

  // ===== Third-Party Animation Framework Hooks =====
  if (window.AOS && typeof window.AOS.init === "function") {
    window.AOS.init({ 
      once: true, 
      duration: 600,
      easing: 'ease-out-cubic'
    });
  }
})();