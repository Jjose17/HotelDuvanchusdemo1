import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "bath"
  | "calendar"
  | "car"
  | "chevron"
  | "clock"
  | "close"
  | "mail"
  | "map"
  | "menu"
  | "pause"
  | "phone"
  | "play"
  | "shower"
  | "tv"
  | "users"
  | "wifi";
const paths: Record<IconName, ReactNode> = {
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  bath: (
    <>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M7 12V7a3 3 0 0 1 5.8-1" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  car: (
    <>
      <path d="m5 17-2-1v-4l2-1 2-5h10l2 5 2 1v4l-2 1" />
      <path d="M7.5 13h.01M16.5 13h.01" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: <path d="m6 6 12 12M18 6 6 18" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  pause: <path d="M9 7v10M15 7v10" />,
  phone: (
    <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.3-1.4-5.6-3.7-7-7l2-2-3-5Z" />
  ),
  play: <path d="m9 7 8 5-8 5Z" />,
  shower: (
    <>
      <path d="M4 5a4 4 0 0 1 8 0v2" />
      <path d="M9 10h6l-1-3h-4l-1 3ZM10 14v.01M13 14v.01M16 14v.01M11 18v.01M14 18v.01" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="m9 2 3 4 3-4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="7" r="4" />
      <path d="M2 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v2M17 4a4 4 0 0 1 0 7.5M18 15a4 4 0 0 1 4 4v2" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r=".7" fill="currentColor" />
    </>
  ),
};
function Icon({ name, size = 21 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const photos = [
  {
    src: "https://images.unsplash.com/photo-1680210851458-b7dc5685e06e?auto=format&fit=crop&w=2000&q=84",
    alt: "Habitación luminosa con dos camas, imagen de referencia",
    label: "Habitación · Imagen de referencia",
    position: "center 58%",
  },
  {
    src: "https://images.unsplash.com/photo-1582642250536-419cfaaef741?auto=format&fit=crop&w=1800&q=84",
    alt: "Entrada de una edificación con plantas, imagen de referencia",
    label: "Entrada · Imagen de referencia",
    position: "center 53%",
  },
  {
    src: "https://images.unsplash.com/photo-1680210850481-66ee30ca2a48?auto=format&fit=crop&w=1800&q=84",
    alt: "Habitación cálida, imagen de referencia",
    label: "Interior · Imagen de referencia",
    position: "center 55%",
  },
  {
    src: "https://images.unsplash.com/photo-1570197820006-3e46f5ee01bb?auto=format&fit=crop&w=2000&q=84",
    alt: "Arquitectura urbana colombiana, imagen de referencia del destino",
    label: "Destino · Imagen de referencia",
    position: "center 48%",
  },
];
const services: { icon: IconName; title: string }[] = [
  { icon: "clock", title: "Atención 24 horas" },
  { icon: "wifi", title: "Wifi gratis" },
  { icon: "car", title: "Parqueadero" },
  { icon: "bath", title: "Baño privado" },
  { icon: "shower", title: "Agua caliente" },
  { icon: "tv", title: "Televisión por cable" },
];

function D2Button({
  children,
  onClick,
  light = false,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  light?: boolean;
  type?: "button" | "submit";
}) {
  return (
    <button className={`d2-button ${light ? "d2-button-light" : ""}`} type={type} onClick={onClick}>
      {children}
      <Icon name="arrow" size={18} />
    </button>
  );
}
function Brand() {
  return (
    <a className="d2-brand" href="#d2-inicio">
      <span>D</span>
      <div>
        <strong>Hotel Duvanchu’s</strong>
        <small>Seguridad y Confort</small>
      </div>
    </a>
  );
}
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("d2-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`d2-reveal ${className}`}>
      {children}
    </div>
  );
}

function Header({ onConsult }: { onConsult: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 50);
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);
  const links = [
    ["Habitaciones", "#d2-habitaciones"],
    ["Servicios", "#d2-servicios"],
    ["El hotel", "#d2-hotel"],
    ["Ubicación", "#d2-ubicacion"],
  ];
  return (
    <header className={`d2-header ${scrolled || open ? "d2-header-solid" : ""}`}>
      <div className="d2-nav">
        <Brand />
        <nav aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <button className="d2-nav-consult" onClick={onConsult}>
          Consultar
        </button>
        <button
          className="d2-menu-toggle"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="d2-mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav className="d2-mobile-menu" id="d2-mobile-menu" aria-label="Navegación móvil">
          {links.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small>
              {label}
              <Icon name="arrow" size={18} />
            </a>
          ))}
          <D2Button
            onClick={() => {
              setOpen(false);
              onConsult();
            }}
          >
            Consultar estadía
          </D2Button>
        </nav>
      )}
    </header>
  );
}

type StayData = { arrival: string; departure: string; guests: string };
function StayForm({ onComplete }: { onComplete: (data: StayData) => void }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const today = new Date().toISOString().split("T")[0];
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Record<string, string> = {};
    if (!arrival) next.arrival = "Selecciona la llegada.";
    else if (arrival < today) next.arrival = "La llegada no puede estar en el pasado.";
    if (!departure) next.departure = "Selecciona la salida.";
    else if (arrival && departure <= arrival) next.departure = "La salida debe ser posterior.";
    if (Number(guests) < 1) next.guests = "Selecciona al menos un huésped.";
    setErrors(next);
    if (!Object.keys(next).length) onComplete({ arrival, departure, guests });
  };
  return (
    <form className="d2-stay-form" onSubmit={submit} noValidate>
      <label className={errors.arrival ? "d2-invalid" : ""}>
        <span>Llegada</span>
        <div>
          <Icon name="calendar" size={18} />
          <input
            type="date"
            min={today}
            value={arrival}
            onChange={(e) => {
              setArrival(e.target.value);
              setErrors({ ...errors, arrival: "" });
            }}
          />
        </div>
        {errors.arrival && <small>{errors.arrival}</small>}
      </label>
      <label className={errors.departure ? "d2-invalid" : ""}>
        <span>Salida</span>
        <div>
          <Icon name="calendar" size={18} />
          <input
            type="date"
            min={arrival || today}
            value={departure}
            onChange={(e) => {
              setDeparture(e.target.value);
              setErrors({ ...errors, departure: "" });
            }}
          />
        </div>
        {errors.departure && <small>{errors.departure}</small>}
      </label>
      <label className={errors.guests ? "d2-invalid" : ""}>
        <span>Huéspedes</span>
        <div>
          <Icon name="users" size={18} />
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option value={n} key={n}>
                {n} {n === 1 ? "huésped" : "huéspedes"}
              </option>
            ))}
          </select>
        </div>
        {errors.guests && <small>{errors.guests}</small>}
      </label>
      <D2Button type="submit">Consultar mi estadía</D2Button>
    </form>
  );
}

function Hero({ onComplete }: { onComplete: (data: StayData) => void }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const touchX = useRef<number | null>(null);
  const reduced = useRef(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const next = useCallback(() => setActive((i) => (i + 1) % photos.length), []);
  const previous = () => setActive((i) => (i - 1 + photos.length) % photos.length);
  useEffect(() => {
    if (paused || interacting || reduced.current) return;
    const timer = window.setInterval(next, 6000);
    return () => window.clearInterval(timer);
  }, [next, paused, interacting]);
  return (
    <section
      className="d2-hero"
      id="d2-inicio"
      onFocusCapture={() => setInteracting(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setInteracting(false);
      }}
      onTouchStart={(e) => {
        touchX.current = e.changedTouches[0].clientX;
        setInteracting(true);
      }}
      onTouchEnd={(e) => {
        if (touchX.current !== null) {
          const delta = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 55) delta > 0 ? previous() : next();
        }
        touchX.current = null;
        setInteracting(false);
      }}
    >
      <div className="d2-slides" aria-live="polite">
        {photos.map((photo, index) => (
          <div
            className={`d2-slide ${index === active ? "d2-slide-active" : ""}`}
            key={photo.src}
            aria-hidden={index !== active}
          >
            <img
              src={photo.src}
              alt={index === active ? photo.alt : ""}
              style={{ objectPosition: photo.position }}
            />
          </div>
        ))}
      </div>
      <div className="d2-hero-shade" />
      <div className="d2-hero-content">
        <span className="d2-kicker">Hotel Duvanchu’s · Chiquinquirá</span>
        <h1>Llega, descansa y siéntete bienvenido</h1>
        <p>
          Un hotel familiar, atendido por sus propietarios, cerca del terminal de transportes de
          Chiquinquirá.
        </p>
        <div className="d2-hero-actions">
          <a className="d2-button" href="#d2-consulta">
            Consultar disponibilidad
            <Icon name="arrow" size={18} />
          </a>
          <a className="d2-text-link" href="#d2-habitaciones">
            Explorar habitaciones
            <Icon name="arrow" size={18} />
          </a>
        </div>
      </div>
      <div className="d2-carousel-ui">
        <button onClick={previous} aria-label="Fotografía anterior">
          <Icon name="chevron" />
        </button>
        <div className="d2-dots" aria-label={`Diapositiva ${active + 1} de ${photos.length}`}>
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Ver fotografía ${index + 1}`}
            >
              <span />
            </button>
          ))}
        </div>
        <button onClick={next} aria-label="Fotografía siguiente">
          <Icon name="chevron" />
        </button>
        <button
          className="d2-pause"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Reproducir carrusel" : "Pausar carrusel"}
        >
          <Icon name={paused ? "play" : "pause"} />
        </button>
        <span className="d2-photo-status">{photos[active].label}</span>
      </div>
      <div className="d2-booking-panel" id="d2-consulta">
        <div className="d2-booking-title">
          <small>Consulta directa</small>
          <strong>Planea tu estadía</strong>
        </div>
        <StayForm onComplete={onComplete} />
      </div>
    </section>
  );
}

function SummaryModal({ data, onClose }: { data: StayData | null; onClose: () => void }) {
  useEffect(() => {
    if (!data) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [data, onClose]);
  if (!data) return null;
  const format = (value: string) =>
    new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(`${value}T12:00:00`),
    );
  const text = `Hola, quisiera consultar disponibilidad en Hotel Duvanchu's. Llegada: ${data.arrival}. Salida: ${data.departure}. Huéspedes: ${data.guests}.`;
  return (
    <div
      className="d2-modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="d2-summary"
        role="dialog"
        aria-modal="true"
        aria-labelledby="d2-summary-title"
      >
        <button className="d2-modal-close" onClick={onClose} aria-label="Cerrar resumen">
          <Icon name="close" />
        </button>
        <span className="d2-kicker">Consulta preparada</span>
        <h2 id="d2-summary-title">Estos son los datos de tu estadía</h2>
        <p>El hotel te confirmará disponibilidad y tarifa.</p>
        <dl>
          <div>
            <dt>Llegada</dt>
            <dd>{format(data.arrival)}</dd>
          </div>
          <div>
            <dt>Salida</dt>
            <dd>{format(data.departure)}</dd>
          </div>
          <div>
            <dt>Huéspedes</dt>
            <dd>{data.guests}</dd>
          </div>
        </dl>
        <a
          className="d2-button"
          href={`https://wa.me/573229069022?text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noreferrer"
        >
          Continuar a WhatsApp
          <Icon name="arrow" size={18} />
        </a>
        <small>No se envía ningún mensaje automáticamente. Canal pendiente de confirmación.</small>
      </section>
    </div>
  );
}

function Gallery({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <div className="d2-mosaic">
      {photos.concat(photos.slice(0, 2)).map((photo, index) => (
        <button
          key={`${photo.src}-${index}`}
          className={`d2-gallery-item d2-gallery-${index + 1}`}
          onClick={() => onOpen(index % photos.length)}
        >
          <img src={photo.src} alt={photo.alt} />
          <span>{photo.label}</span>
          <i>
            Ampliar <Icon name="arrow" size={16} />
          </i>
        </button>
      ))}
    </div>
  );
}
function GalleryViewer({
  index,
  onChange,
  onClose,
}: {
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  const touchX = useRef<number | null>(null);
  const move = useCallback(
    (direction: number) => {
      if (index !== null) onChange((index + direction + photos.length) % photos.length);
    },
    [index, onChange],
  );
  useEffect(() => {
    if (index === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, [index, move, onClose]);
  if (index === null) return null;
  const photo = photos[index];
  return (
    <div
      className="d2-viewer"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de galería"
      onTouchStart={(e) => (touchX.current = e.changedTouches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current !== null) {
          const delta = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(delta) > 50) move(delta > 0 ? -1 : 1);
        }
      }}
    >
      <button className="d2-viewer-close" onClick={onClose} aria-label="Cerrar galería">
        <Icon name="close" />
      </button>
      <button className="d2-viewer-prev" onClick={() => move(-1)} aria-label="Fotografía anterior">
        <Icon name="chevron" />
      </button>
      <img src={photo.src} alt={photo.alt} />
      <button className="d2-viewer-next" onClick={() => move(1)} aria-label="Fotografía siguiente">
        <Icon name="chevron" />
      </button>
      <div className="d2-viewer-caption">
        <span>{photo.label}</span>
        <small>
          {index + 1} / {photos.length}
        </small>
      </div>
    </div>
  );
}

export default function DemoTwo() {
  const [summary, setSummary] = useState<StayData | null>(null);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const openConsult = () =>
    document.querySelector("#d2-consulta")?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <div className="demo-two">
      <Header onConsult={openConsult} />
      <main>
        <Hero onComplete={setSummary} />
        <section className="d2-welcome d2-section" id="d2-hotel">
          <Reveal className="d2-welcome-copy">
            <span className="d2-kicker">Bienvenido a Duvanchu’s</span>
            <h2>La cercanía de un hotel familiar</h2>
            <p className="d2-lead">
              Un lugar para hacer una pausa, descansar y sentirse bien recibido en Chiquinquirá.
            </p>
            <p>
              Somos un hotel atendido por sus propietarios, con atención cercana y los servicios
              esenciales para acompañar tu estadía.
            </p>
            <a className="d2-inline-link" href="#d2-servicios">
              Conoce nuestros servicios <Icon name="arrow" size={18} />
            </a>
          </Reveal>
          <Reveal className="d2-welcome-images">
            <figure>
              <img src={photos[2].src} alt={photos[2].alt} />
              <figcaption>{photos[2].label}</figcaption>
            </figure>
            <figure>
              <img src={photos[1].src} alt={photos[1].alt} />
              <figcaption>{photos[1].label}</figcaption>
            </figure>
          </Reveal>
        </section>
        <section className="d2-rooms d2-section" id="d2-habitaciones">
          <Reveal className="d2-section-head">
            <span className="d2-kicker">Habitaciones</span>
            <h2>Encuentra tu espacio para descansar</h2>
            <div>
              <p>
                La información publicada menciona camas sencillas y dobles. Consulta las opciones y
                la tarifa disponibles para tus fechas.
              </p>
              <D2Button onClick={openConsult}>Consultar opciones</D2Button>
            </div>
          </Reveal>
          <Reveal className="d2-room-photos">
            <button onClick={() => setGalleryIndex(0)}>
              <img src={photos[0].src} alt={photos[0].alt} />
              <span>{photos[0].label}</span>
            </button>
            <button onClick={() => setGalleryIndex(2)}>
              <img src={photos[2].src} alt={photos[2].alt} />
              <span>{photos[2].label}</span>
            </button>
          </Reveal>
        </section>
        <section className="d2-services d2-section" id="d2-servicios">
          <Reveal className="d2-services-title">
            <span className="d2-kicker">Lo esencial para tu estadía</span>
            <h2>Descansa con tranquilidad</h2>
          </Reveal>
          <Reveal className="d2-services-grid">
            {services.map((service, index) => (
              <article key={service.title}>
                <span>0{index + 1}</span>
                <Icon name={service.icon} size={28} />
                <h3>{service.title}</h3>
              </article>
            ))}
          </Reveal>
        </section>
        <section className="d2-gallery d2-section">
          <Reveal className="d2-gallery-head">
            <div>
              <span className="d2-kicker">Galería</span>
              <h2>Una mirada a tu próxima estadía</h2>
            </div>
            <p>
              Imágenes de referencia para explorar la dirección visual. Deben sustituirse por
              material confirmado del hotel antes de publicar.
            </p>
          </Reveal>
          <Reveal>
            <Gallery onOpen={setGalleryIndex} />
          </Reveal>
        </section>
        <section className="d2-location" id="d2-ubicacion">
          <Reveal className="d2-map">
            <div className="d2-map-roads">
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="d2-map-pin">
              <Icon name="map" size={30} />
              <small>Ubicación exacta por verificar</small>
            </div>
          </Reveal>
          <Reveal className="d2-location-copy">
            <span className="d2-kicker">Ubicación</span>
            <h2>Tu próxima parada, Chiquinquirá</h2>
            <div className="d2-address">
              <Icon name="map" />
              <p>
                <strong>Calle 4B # 7-132</strong>
                <br />
                Barrio El Bosque
                <br />
                Chiquinquirá, Boyacá
              </p>
            </div>
            <p>Cerca del Terminal de Transportes.</p>
            <a
              className="d2-button d2-button-light"
              href="https://www.google.com/maps/search/?api=1&query=Calle+4B+%23+7-132+Chiquinquira+Boyaca"
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
              <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </section>
        <section className="d2-closing">
          <Reveal>
            <span className="d2-kicker">Atención 24 horas</span>
            <h2>Te esperamos en Hotel Duvanchu’s</h2>
            <p>Conversemos sobre tu próxima estadía en Chiquinquirá.</p>
            <div>
              <D2Button onClick={openConsult}>Consultar disponibilidad</D2Button>
              <a className="d2-button d2-button-outline" href="tel:+573229069022">
                <Icon name="phone" size={18} />
                Llamar ahora
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <footer className="d2-footer">
        <Brand />
        <div>
          <small>Contacto</small>
          <a href="tel:+573229069022">+57 322 906 9022</a>
          <a href="mailto:hotelduvanchus1@gmail.com">hotelduvanchus1@gmail.com</a>
        </div>
        <div>
          <small>Dirección</small>
          <p>
            Calle 4B # 7-132
            <br />
            Barrio El Bosque, Chiquinquirá
          </p>
        </div>
        <span>© 2025 Hotel Duvanchu’s</span>
      </footer>
      <SummaryModal data={summary} onClose={() => setSummary(null)} />
      <GalleryViewer
        index={galleryIndex}
        onChange={setGalleryIndex}
        onClose={() => setGalleryIndex(null)}
      />
    </div>
  );
}
