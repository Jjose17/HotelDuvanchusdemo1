/* Hotel Duvanchu’s — JavaScript sin librerías.
   Textos y fotografías: index.html. Colores y tamaños: styles.css. */
"use strict";

const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

// 1. Cabecera y menú del celular.
const header = select(".d2-header");
const menu = select(".d2-mobile-menu");
const menuToggle = select(".d2-menu-toggle");
const menuIcon = menuToggle.innerHTML;
const closeIcon = '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
function updateHeader() {
  header.classList.toggle("d2-header-solid", window.scrollY > 50 || !menu.hidden);
}
function setMenu(open) {
  menu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  menuToggle.innerHTML = open ? closeIcon : menuIcon;
  updateHeader();
}
menuToggle.addEventListener("click", () => setMenu(menu.hidden));
menu.addEventListener("click", (event) => {
  if (event.target.closest("a, button")) setMenu(false);
});
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1000) setMenu(false);
});
updateHeader();

function consult() {
  setMenu(false);
  select("#d2-consulta").scrollIntoView({
    behavior: reducedMotion.matches ? "instant" : "smooth", block: "start"
  });
}
selectAll(".d2-nav-consult, [data-consult], .d2-section-head .d2-button, .d2-closing button").forEach(button => {
  button.addEventListener("click", consult);
});

// 2. Carrusel. Las fotos se leen del HTML para editarlas en un solo lugar.
const hero = select(".d2-hero");
const slides = selectAll(".d2-slide");
const dots = selectAll(".d2-dots button");
const photos = slides.map((slide, index) => {
  const image = select("img", slide);
  const galleryImage = selectAll(".d2-gallery-item img")[index];
  const caption = selectAll(".d2-gallery-item > span")[index];
  return { src: image.getAttribute("src"), alt: galleryImage.alt, label: caption.textContent };
});
let active = 0;
let paused = reducedMotion.matches;
let timer;
const pauseButton = select(".d2-pause");
function showSlide(index) {
  active = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("d2-slide-active", i === active);
    slide.setAttribute("aria-hidden", String(i !== active));
    const img = select("img", slide);
    if (img) img.alt = i === active ? photos[i]?.alt || "" : "";
    if (dots[i]) {
      dots[i].classList.toggle("active", i === active);
      dots[i].setAttribute("aria-pressed", String(i === active));
    }
  });
  const dotsContainer = select(".d2-dots");
  if (dotsContainer) dotsContainer.setAttribute("aria-label", `Diapositiva ${active + 1} de ${slides.length}`);
  const status = select(".d2-photo-status");
  if (status && photos[active]) status.textContent = photos[active].label;
}
function updatePlayback() {
  clearInterval(timer);
  hero.classList.toggle("carousel-paused", paused);
  if (pauseButton) {
    pauseButton.setAttribute("aria-label", paused ? "Reproducir carrusel" : "Pausar carrusel");
    pauseButton.setAttribute("aria-pressed", String(paused));
    const path = select("path", pauseButton);
    if (path) path.setAttribute("d", paused ? "m9 7 8 5-8 5Z" : "M9 7v10M15 7v10");
  }
  if (!paused && !document.hidden) timer = setInterval(() => showSlide(active + 1), 6000);
}
function manualSlide(index) {
  paused = true;
  showSlide(index);
  updatePlayback();
}
const prevBtn = select('[aria-label="Fotografía anterior"]', hero);
if (prevBtn) prevBtn.addEventListener("click", () => manualSlide(active - 1));
const nextBtn = select('[aria-label="Fotografía siguiente"]', hero);
if (nextBtn) nextBtn.addEventListener("click", () => manualSlide(active + 1));
dots.forEach((dot, index) => dot.addEventListener("click", () => manualSlide(index)));
if (pauseButton) {
  pauseButton.addEventListener("click", () => { paused = !paused; updatePlayback(); });
  hero.addEventListener("focusin", event => {
    if (!pauseButton.contains(event.target)) { paused = true; updatePlayback(); }
  });
}
document.addEventListener("visibilitychange", updatePlayback);
reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) paused = true;
  updatePlayback();
});
showSlide(0);
updatePlayback();

// Ignorar gestos sobre botones/formulario y desplazamientos verticales.
function enableSwipe(element, callback) {
  let start = null;
  element.addEventListener("touchstart", event => {
    if (event.touches.length !== 1 || event.target.closest("a, button, input, select, label")) {
      start = null;
      return;
    }
    start = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  element.addEventListener("touchend", event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    start = null;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) callback(dx < 0 ? 1 : -1);
  }, { passive: true });
  element.addEventListener("touchcancel", () => { start = null; }, { passive: true });
}
enableSwipe(hero, direction => manualSlide(active + direction));

// 3. Ventanas: cierre con Escape, foco y bloqueo del scroll de fondo.
let currentDialog = null;
let returnFocus = null;
function openDialog(dialog) {
  returnFocus = document.activeElement;
  currentDialog = dialog;
  dialog.hidden = false;
  document.body.classList.add("dialog-open");
  select("button, a, input", dialog)?.focus();
}
function closeDialog() {
  if (!currentDialog) return;
  currentDialog.hidden = true;
  currentDialog = null;
  document.body.classList.remove("dialog-open");
  returnFocus?.focus({ preventScroll: true });
}
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (currentDialog) closeDialog();
    else { setMenu(false); menuToggle.focus(); }
  }
  if (event.key === "Tab" && currentDialog) {
    const controls = selectAll('button, a[href], input, select, [tabindex="0"]', currentDialog);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

// 4. Formulario de consulta: no confirma ni cobra una reserva.
const form = select(".d2-stay-form");
const [arrival, departure] = selectAll('input[type="date"]', form);
const guests = select("select", form);
const summary = select(".d2-modal-backdrop");
select(".d2-modal-close").addEventListener("click", closeDialog);
summary.addEventListener("click", event => { if (event.target === summary) closeDialog(); });
function localDate(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
function setDateLimits() {
  arrival.min = localDate();
  const next = arrival.value ? new Date(`${arrival.value}T12:00:00`) : new Date();
  next.setDate(next.getDate() + 1);
  departure.min = localDate(next);
}
[arrival, departure, guests].forEach((field, index) => {
  field.id = ["arrival", "departure", "guests"][index];
  field.name = field.id;
  const error = document.createElement("small");
  error.id = `${field.id}-error`;
  error.setAttribute("aria-live", "polite");
  field.closest("label").append(error);
  field.setAttribute("aria-describedby", error.id);
  field.addEventListener("change", () => { setError(field, ""); setDateLimits(); });
});
function setError(field, message) {
  select(`#${field.id}-error`).textContent = message;
  field.setAttribute("aria-invalid", String(Boolean(message)));
  field.closest("label").classList.toggle("d2-invalid", Boolean(message));
}
setDateLimits();
form.addEventListener("submit", event => {
  event.preventDefault();
  setDateLimits();
  const errors = [
    !arrival.value ? "Selecciona la llegada." : arrival.value < localDate() ? "La llegada no puede estar en el pasado." : "",
    !departure.value ? "Selecciona la salida." : departure.value <= (arrival.value || localDate()) ? "La salida debe ser posterior a la llegada." : "",
    Number(guests.value) < 1 ? "Selecciona al menos un huésped." : ""
  ];
  const fields = [arrival, departure, guests];
  fields.forEach((field, i) => setError(field, errors[i]));
  const invalid = errors.findIndex(Boolean);
  if (invalid !== -1) { fields[invalid].focus(); return; }
  const format = value => new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${value}T12:00:00`));
  const values = [format(arrival.value), format(departure.value), guests.value];
  selectAll("dd", summary).forEach((item, i) => { item.textContent = values[i]; });
  const message = `Hola, quisiera consultar disponibilidad en Hotel Duvanchu's. Llegada: ${arrival.value}. Salida: ${departure.value}. Huéspedes: ${guests.value}.`;
  select("a", summary).href = `https://wa.me/573229069022?text=${encodeURIComponent(message)}`;
  openDialog(summary);
});

// 5. Galería ampliable.
const viewer = select(".d2-viewer");
let galleryIndex = 0;
function showPhoto(index) {
  galleryIndex = (index + photos.length) % photos.length;
  const photo = photos[galleryIndex];
  const image = select("img", viewer);
  image.src = photo.src;
  image.alt = photo.alt;
  select(".d2-viewer-caption span").textContent = photo.label;
  select(".d2-viewer-caption small").textContent = `${galleryIndex + 1} / ${photos.length}`;
}
selectAll(".d2-gallery-item, .d2-room-photos button").forEach(button => {
  button.addEventListener("click", () => {
    const index = photos.findIndex(photo => photo.src === select("img", button).getAttribute("src"));
    showPhoto(Math.max(0, index));
    openDialog(viewer);
  });
});
select(".d2-viewer-close").addEventListener("click", closeDialog);
select(".d2-viewer-prev").addEventListener("click", () => showPhoto(galleryIndex - 1));
select(".d2-viewer-next").addEventListener("click", () => showPhoto(galleryIndex + 1));
viewer.addEventListener("click", event => { if (event.target === viewer) closeDialog(); });
enableSwipe(viewer, direction => showPhoto(galleryIndex + direction));
document.addEventListener("keydown", event => {
  if (currentDialog !== viewer) return;
  if (event.key === "ArrowLeft") showPhoto(galleryIndex - 1);
  if (event.key === "ArrowRight") showPhoto(galleryIndex + 1);
});

// 6. Aparición progresiva; el contenido sigue visible sin JavaScript.
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("d2-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  selectAll(".d2-reveal").forEach(element => {
    element.classList.add("reveal-ready");
    observer.observe(element);
  });
}
