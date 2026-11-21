/**
 * ==========================================================================
 * INVITATION.JS - TRANSICIONES Y REVELADO CINEMÁTICO SUAVE EN SCROLL
 * MIS XV AÑOS XIMENA (MODELO 01)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.querySelector(".main-invitation-container");
  const envelope = document.getElementById("envelope-screen");
  const isEnvelopePresent = envelope && !envelope.classList.contains("hidden");

  // 1. Entrada suave del contenedor principal
  if (mainContainer) {
    mainContainer.classList.add("page-dreamy-entrance");

    if (!isEnvelopePresent) {
      requestAnimationFrame(() => {
        setTimeout(() => {
          mainContainer.classList.add("page-ready");
        }, 80);
      });
    } else {
      window.addEventListener(
        "envelopeOpened",
        () => {
          setTimeout(() => {
            mainContainer.classList.add("page-ready");
          }, 120);
        },
        { once: true }
      );
    }
  }

  // 2. Grupos de elementos con animación de revelado suave al hacer scroll
  const revealGroups = [
    // Portada / Hero
    { selector: ".xv-floral-arch-header", class: "top-floral-reveal" },
    { selector: ".xv-crown-name-block", class: "scroll-reveal", delay: "delay-1" },
    { selector: ".xv-hero-arch-frame", class: "scroll-reveal-scale", delay: "delay-2" },
    { selector: ".xv-welcome-text", class: "scroll-reveal", delay: "delay-2" },
    { selector: ".xv-audio-player-block", class: "scroll-reveal-scale", delay: "delay-3" },

    // Padres, Padrinos, Fecha, Contador y Calendario
    { selector: ".xv-family-block", class: "scroll-reveal" },
    { selector: ".xv-celebrate-date-block", class: "scroll-reveal-scale", delay: "delay-1" },
    { selector: ".xv-countdown-block", class: "scroll-reveal", delay: "delay-1" },
    { selector: ".xv-calendar-block", class: "scroll-reveal-scale", delay: "delay-2" },

    // Misa, Recepción y Banners Fotográficos
    { selector: ".xv-event-card", class: "scroll-reveal", stagger: true },
    { selector: ".xv-torn-photo-banner", class: "scroll-reveal-scale" },

    // Itinerario y Código de Vestimenta
    { selector: ".xv-itinerary-section", class: "scroll-reveal" },
    { selector: ".xv-timeline-item", class: "scroll-reveal", stagger: true },
    { selector: ".xv-dresscode-section", class: "scroll-reveal" },

    // Regalos, Galería, RSVP y Cierre
    { selector: ".xv-gifts-section", class: "scroll-reveal" },
    { selector: ".xv-rsvp-section", class: "scroll-reveal" },
    { selector: ".xv-bouquet-card", class: "scroll-reveal-scale" },
    { selector: ".gallery-thumb-item", class: "scroll-reveal-scale", stagger: true },
    { selector: ".xv-final-photo-section", class: "scroll-reveal-scale" }
  ];

  const allTargets = [];
  revealGroups.forEach((group) => {
    const nodes = document.querySelectorAll(group.selector);
    nodes.forEach((node, index) => {
      node.classList.add(group.class);
      if (group.delay) {
        node.classList.add(group.delay);
      }
      if (group.stagger) {
        const staggerIndex = (index % 5) + 1;
        node.classList.add(`delay-${staggerIndex}`);
      }
      allTargets.push(node);
    });
  });

  if (!("IntersectionObserver" in window)) {
    allTargets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -30px 0px",
      threshold: 0.08
    }
  );

  const startObserving = () => {
    allTargets.forEach((el) => observer.observe(el));
  };

  if (!isEnvelopePresent) {
    setTimeout(startObserving, 120);
  } else {
    window.addEventListener(
      "envelopeOpened",
      () => {
        setTimeout(startObserving, 250);
      },
      { once: true }
    );
  }
});
