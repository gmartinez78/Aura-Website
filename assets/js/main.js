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
