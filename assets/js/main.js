/* Aura | JS mínimo. El sitio funciona sin JS; esto solo mejora. */

// 1. Número de WhatsApp en un solo lugar.
//    Todos los enlaces con data-wa="mensaje" se convierten en wa.me con el texto prellenado.
const AURA_WHATSAPP = "18092179323";

document.querySelectorAll("[data-wa]").forEach((link) => {
  const text = link.getAttribute("data-wa") || "Hola Aura, quiero más información.";
  link.href = `https://wa.me/${AURA_WHATSAPP}?text=${encodeURIComponent(text)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

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

// 5. Services showcase: activate each scene as it enters the viewport.
const serviceScenes = document.querySelectorAll(".service-scene");
if (serviceScenes.length && "IntersectionObserver" in window) {
  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
  }, { threshold: 0.35 });
  serviceScenes.forEach((scene, index) => {
    if (index === 0) scene.classList.add("is-visible");
    serviceObserver.observe(scene);
  });
}
