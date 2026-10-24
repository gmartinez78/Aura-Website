/* Aura | JS mínimo. El sitio funciona sin JS; esto solo mejora. */

// 1. Número de WhatsApp en un solo lugar.
//    Todos los enlaces con data-wa="mensaje" se convierten en wa.me con el texto prellenado.
const AURA_WHATSAPP = "18092179323";

// Keep the floating header visible once the page moves past the hero.
const siteHeader = document.querySelector(".site-header");
if (siteHeader) {
  const updateStickyHeader = () => {
    siteHeader.classList.toggle("is-sticky", window.scrollY > 80);
  };
  updateStickyHeader();
  window.addEventListener("scroll", updateStickyHeader, { passive: true });
}

document.querySelectorAll("[data-wa]").forEach((link) => {
  const text = link.getAttribute("data-wa") || "Hola Aura, quiero más información.";
  link.href = `https://wa.me/${AURA_WHATSAPP}?text=${encodeURIComponent(text)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

const casesSlider = document.querySelector(".cases");
if (casesSlider) {
  const caseCards = [...casesSlider.querySelectorAll(".case-card")];
  let caseIndex = 0;
  const showCase = (index) => {
    caseIndex = Math.max(0, Math.min(index, caseCards.length - 1));
    caseCards[caseIndex]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  };
  document.querySelector("[data-cases-prev]")?.addEventListener("click", () => showCase(caseIndex - 1));
  document.querySelector("[data-cases-next]")?.addEventListener("click", () => showCase(caseIndex + 1));
}

const deviceTrack = document.querySelector(".resources-device-slider__track");
if (deviceTrack) {
  deviceTrack.insertAdjacentHTML("beforeend", deviceTrack.innerHTML);
}

// 2. Menú móvil accesible.
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");

if (toggle && menu) {
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });
}

// 3. Año del footer.
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// 4. Hero headline: turn each character into a tiny particle on hover.
document.querySelectorAll(".hero__headline-layer h1 span").forEach((word) => {
  const text = word.textContent;
  word.textContent = "";
  [...text].forEach((character, index) => {
    const particle = document.createElement("span");
    particle.className = "hero-letter";
    particle.textContent = character === " " ? "\u00a0" : character;
    particle.style.setProperty("--i", index);
    particle.style.setProperty("--x", `${(Math.random() * 70 - 35).toFixed(1)}px`);
    particle.style.setProperty("--y", `${(Math.random() * 54 - 27).toFixed(1)}px`);
    particle.style.setProperty("--r", `${(Math.random() * 36 - 18).toFixed(1)}deg`);
    word.appendChild(particle);
  });
});

// 5. Services showcase: the left copy stays pinned while each right-hand
// scene takes over the viewport. This mirrors the Design Monks scroll rhythm:
// one scene is active at a time, then the next pair of images replaces it.
const serviceScenes = [...document.querySelectorAll(".service-scene")];
if (serviceScenes.length) {
  const stickyCopy = document.querySelector(".services-story__copy");
  let activeScene = null;
  let ticking = false;

  const renderServiceScene = () => {
    ticking = false;
    const focusLine = window.innerHeight * .46;
    let active = serviceScenes.find((scene) => {
      const rect = scene.getBoundingClientRect();
      return rect.top <= focusLine && rect.bottom >= focusLine;
    });

    if (!active) {
      active = serviceScenes.reduce((closest, scene) => {
        const rect = scene.getBoundingClientRect();
        const distance = Math.abs((rect.top + rect.height / 2) - focusLine);
        return distance < closest.distance ? { scene, distance } : closest;
      }, { scene: serviceScenes[0], distance: Infinity }).scene;
    }

    if (active === activeScene) return;
    activeScene = active;
    const activeIndex = serviceScenes.indexOf(active);
    serviceScenes.forEach((scene, index) => {
      scene.classList.toggle("is-visible", index === activeIndex);
      scene.classList.toggle("is-before", index < activeIndex);
      scene.classList.toggle("is-after", index > activeIndex);
    });

    if (stickyCopy) {
      stickyCopy.classList.add("is-changing");
      window.setTimeout(() => {
        stickyCopy.innerHTML = active.querySelector(".service-scene__copy").innerHTML;
        stickyCopy.classList.remove("is-changing");
      }, 140);
    }
  };

  const requestServiceUpdate = () => {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(renderServiceScene);
    }
  };

  renderServiceScene();
  window.addEventListener("scroll", requestServiceUpdate, { passive: true });
  window.addEventListener("resize", requestServiceUpdate);
}
