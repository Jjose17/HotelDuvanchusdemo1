import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "bath"
  | "bed"
  | "calendar"
  | "car"
  | "check"
  | "clock"
  | "close"
  | "expand"
  | "mail"
  | "map"
  | "menu"
  | "phone"
  | "shower"
  | "tv"
  | "users"
  | "wifi";

const icons: Record<IconName, ReactNode> = {
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
      <path d="M6 19v2M18 19v2" />
    </>
  ),
  bed: (
    <>
      <path d="M3 19v-8h18v8M3 16h18M7 11V7h4a3 3 0 0 1 3 3v1" />
      <path d="M3 19v2M21 19v2" />
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
      <path d="M5 17h14M7 17v2M17 17v2M7.5 13h.01M16.5 13h.01" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  expand: (
    <>
      <path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5" />
    </>
  ),
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
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  phone: (
    <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-2-2 2c-3.3-1.4-5.6-3.7-7-7l2-2-3-5Z" />
  ),
  shower: (
    <>
      <path d="M4 5a4 4 0 0 1 8 0v2" />
      <path d="M9 10h6l-1-3h-4l-1 3ZM10 14v.01M13 14v.01M16 14v.01M11 18v.01M14 18v.01" />
    </>
  ),
  tv: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="m9 2 3 4 3-4M9 22h6" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  wifi: (
    <>
      <path d="M5 12.6a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0" />
      <circle cx="12" cy="20" r=".5" fill="currentColor" />
    </>
  ),
};

function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
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
      {icons[name]}
    </svg>
  );
}

const services: { icon: IconName; title: string; detail: string }[] = [
  { icon: "wifi", title: "Wifi gratis", detail: "Conexión disponible para nuestros huéspedes." },
  { icon: "car", title: "Parqueadero", detail: "Consulta condiciones al reservar." },
  { icon: "bath", title: "Baño privado", detail: "Comodidad y privacidad en tu estadía." },
  { icon: "shower", title: "Agua caliente", detail: "Para empezar y terminar bien el día." },
  {
    icon: "tv",
    title: "Televisión por cable",
    detail: "Entretenimiento para tus momentos de descanso.",
  },
  {
    icon: "clock",
    title: "Atención 24 horas",
    detail: "Estamos disponibles cuando nos necesites.",
  },
];

const gallery = [
  { id: 1, label: "Habitación · fotografía por validar", className: "room-one" },
  { id: 2, label: "Espacio interior · fotografía por validar", className: "room-two" },
  { id: 3, label: "Detalle de habitación · fotografía por validar", className: "room-three" },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a
      href="#inicio"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="Hotel Duvanchu’s, inicio"
    >
      <span className="brand-mark">D</span>
      <span>
        <strong>Hotel Duvanchu’s</strong>
        <small>Seguridad y Confort</small>
      </span>
    </a>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "outline" | "light";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button type={type} className={`button button-${variant} ${className}`} onClick={onClick}>
      {children}
      <Icon name="arrow" size={18} />
    </button>
  );
}

function PhotoPlaceholder({
  item,
  onOpen,
  tall = false,
}: {
  item: (typeof gallery)[number];
  onOpen: () => void;
  tall?: boolean;
}) {
  return (
    <button
      className={`photo-placeholder ${item.className} ${tall ? "photo-tall" : ""}`}
      onClick={onOpen}
      aria-label={`Ampliar: ${item.label}`}
    >
      <span className="placeholder-lines" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="photo-label">
        <span>{item.label}</span>
        <Icon name="expand" size={18} />
      </span>
    </button>
  );
}

function Header({ onConsult }: { onConsult: () => void }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Habitaciones", "#habitaciones"],
    ["Servicios", "#servicios"],
    ["Nosotros", "#nosotros"],
    ["Ubicación", "#ubicacion"],
  ];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegación principal">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <button className="header-cta" onClick={onConsult}>
          Consultar disponibilidad
        </button>
        <button
          className="menu-button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav className="mobile-menu" id="mobile-menu" aria-label="Navegación móvil">
          {links.map(([label, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {label}
              <Icon name="arrow" size={18} />
            </a>
          ))}
          <Button
            onClick={() => {
              setOpen(false);
              onConsult();
            }}
          >
            Consultar disponibilidad
          </Button>
          <div className="menu-contact">
            <Icon name="phone" size={17} />
            <a href="tel:+573229069022">+57 322 906 9022</a> · Atención 24 horas
          </div>
        </nav>
      )}
    </header>
  );
}

function ConsultationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [guests, setGuests] = useState("2");
  const [errors, setErrors] = useState<{ arrival?: string; departure?: string }>({});
  const [ready, setReady] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setReady(false);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => closeRef.current?.focus(), 0);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) return null;
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: typeof errors = {};
    if (!arrival) nextErrors.arrival = "Selecciona la fecha de llegada.";
    if (!departure) nextErrors.departure = "Selecciona la fecha de salida.";
    else if (arrival && departure <= arrival)
      nextErrors.departure = "La salida debe ser posterior a la llegada.";
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) setReady(true);
  };
  const dateLabel = (date: string) =>
    new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "long", year: "numeric" }).format(
      new Date(`${date}T12:00:00`),
    );
  const message = `Hola, quisiera consultar disponibilidad en Hotel Duvanchu's. Llegada: ${arrival}. Salida: ${departure}. Huéspedes: ${guests}.`;
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        className="consult-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="consult-title"
      >
        <div className="modal-top">
          <div>
            <span className="eyebrow">Consulta directa</span>
            <h2 id="consult-title">
              {ready ? "Tu consulta está lista" : "Cuéntanos sobre tu estadía"}
            </h2>
          </div>
          <button
            ref={closeRef}
            className="icon-button"
            onClick={onClose}
            aria-label="Cerrar consulta"
          >
            <Icon name="close" />
          </button>
        </div>
        {!ready ? (
          <form onSubmit={submit} noValidate>
            <p className="modal-intro">
              Prepara tu mensaje con los datos básicos. El hotel te confirmará disponibilidad y
              tarifa.
            </p>
            <div className="field-grid">
              <label className={errors.arrival ? "field-error" : ""}>
                <span>Fecha de llegada</span>
                <div className="field-control">
                  <Icon name="calendar" size={18} />
                  <input
                    type="date"
                    value={arrival}
                    min={new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setArrival(e.target.value);
                      setErrors({ ...errors, arrival: undefined });
                    }}
                    aria-describedby={errors.arrival ? "arrival-error" : undefined}
                  />
                </div>
                {errors.arrival && <small id="arrival-error">{errors.arrival}</small>}
              </label>
              <label className={errors.departure ? "field-error" : ""}>
                <span>Fecha de salida</span>
                <div className="field-control">
                  <Icon name="calendar" size={18} />
                  <input
                    type="date"
                    value={departure}
                    min={arrival || new Date().toISOString().split("T")[0]}
                    onChange={(e) => {
                      setDeparture(e.target.value);
                      setErrors({ ...errors, departure: undefined });
                    }}
                    aria-describedby={errors.departure ? "departure-error" : undefined}
                  />
                </div>
                {errors.departure && <small id="departure-error">{errors.departure}</small>}
              </label>
            </div>
            <label>
              <span>Número de huéspedes</span>
              <div className="field-control">
                <Icon name="users" size={18} />
                <select value={guests} onChange={(e) => setGuests(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "huésped" : "huéspedes"}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <Button type="submit" className="modal-submit">
              Preparar consulta
            </Button>
            <p className="privacy-note">No se realizará ninguna reserva ni envío automático.</p>
          </form>
        ) : (
          <div className="summary">
            <div className="summary-check">
              <Icon name="check" size={25} />
            </div>
            <p className="modal-intro">
              Revisa los datos antes de continuar. El hotel te confirmará disponibilidad y tarifa.
            </p>
            <dl>
              <div>
                <dt>Llegada</dt>
                <dd>{dateLabel(arrival)}</dd>
              </div>
              <div>
                <dt>Salida</dt>
                <dd>{dateLabel(departure)}</dd>
              </div>
              <div>
                <dt>Huéspedes</dt>
                <dd>
                  {guests} {guests === "1" ? "persona" : "personas"}
                </dd>
              </div>
            </dl>
            <a
              className="button button-primary modal-submit"
              href={`https://wa.me/573229069022?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noreferrer"
            >
              Continuar a WhatsApp
              <Icon name="arrow" size={18} />
            </a>
            <button className="text-button" onClick={() => setReady(false)}>
              Editar datos
            </button>
            <p className="privacy-note">
              WhatsApp abrirá con el mensaje preparado. Tú decides si lo envías.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function Lightbox({
  item,
  onClose,
}: {
  item: (typeof gallery)[number] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const listener = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [item, onClose]);
  if (!item) return null;
  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada de fotografía"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="lightbox-close" onClick={onClose} aria-label="Cerrar vista ampliada">
        <Icon name="close" />
      </button>
      <div className={`lightbox-image ${item.className}`}>
        <span className="placeholder-lines">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="lightbox-caption">
        <span>{item.label}</span>
        <small>Espacio reservado para imagen real confirmada</small>
      </div>
    </div>
  );
}

export default function App() {
  const [consultOpen, setConsultOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<(typeof gallery)[number] | null>(null);
  return (
    <div id="inicio">
      <Header onConsult={() => setConsultOpen(true)} />
      <main>
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <i /> Hotel familiar en Chiquinquirá
            </span>
            <h1>Tu descanso en Chiquinquirá empieza aquí</h1>
            <p>
              Un hotel atendido por sus propietarios, con el confort que necesitas y una ubicación
              cerca del terminal.
            </p>
            <div className="hero-actions">
              <Button onClick={() => setConsultOpen(true)}>Consultar disponibilidad</Button>
              <a className="button button-outline" href="#habitaciones">
                Ver habitaciones
                <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="hero-benefits">
              <span>
                <Icon name="clock" size={19} />
                Atención 24 horas
              </span>
              <span>
                <Icon name="wifi" size={19} />
                Wifi gratis
              </span>
              <span>
                <Icon name="car" size={19} />
                Parqueadero
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <PhotoPlaceholder item={gallery[0]} onOpen={() => setLightboxItem(gallery[0])} tall />
            <div className="hero-note">
              <span>En El Bosque</span>
              <strong>
                Una pausa tranquila
                <br />
                cerca del terminal
              </strong>
            </div>
          </div>
        </section>

        <section className="intro-strip" aria-label="Presentación">
          <span>01</span>
          <p>Un lugar sencillo y acogedor para descansar durante tu paso por la ciudad.</p>
          <span>Chiquinquirá · Boyacá</span>
        </section>

        <section className="section rooms" id="habitaciones">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Habitaciones</span>
              <h2>
                Conoce dónde vas
                <br />a descansar
              </h2>
            </div>
            <div className="heading-copy">
              <p>
                Contamos con camas sencillas y dobles, según la información publicada actualmente.
              </p>
              <p>Consulta las opciones y la tarifa para tus fechas.</p>
              <Button variant="outline" onClick={() => setConsultOpen(true)}>
                Consultar habitaciones
              </Button>
            </div>
          </div>
          <div className="room-gallery">
            <PhotoPlaceholder item={gallery[0]} onOpen={() => setLightboxItem(gallery[0])} />
            <div className="gallery-stack">
              <PhotoPlaceholder item={gallery[1]} onOpen={() => setLightboxItem(gallery[1])} />
              <PhotoPlaceholder item={gallery[2]} onOpen={() => setLightboxItem(gallery[2])} />
            </div>
          </div>
          <p className="gallery-note">
            <Icon name="expand" size={17} />
            Selecciona una imagen para verla en detalle
          </p>
        </section>

        <section className="section services-section" id="servicios">
          <div className="services-heading">
            <span className="eyebrow">Todo lo esencial</span>
            <h2>
              Servicios pensados
              <br />
              para tu tranquilidad
            </h2>
            <p>
              Comodidades claras para que descanses con confianza y tengas lo que necesitas a la
              mano.
            </p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <article className="service-item" key={service.title}>
                <span className="service-number">0{index + 1}</span>
                <div className="service-icon">
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section about" id="nosotros">
          <div className="about-visual">
            <PhotoPlaceholder item={gallery[1]} onOpen={() => setLightboxItem(gallery[1])} tall />
            <div className="about-badge">
              Atendido por
              <br />
              <strong>sus propietarios</strong>
            </div>
          </div>
          <div className="about-copy">
            <span className="eyebrow">Sobre nosotros</span>
            <h2>La cercanía de un hotel familiar</h2>
            <p className="about-lead">
              Creemos que una buena estadía empieza por sentirse bien recibido.
            </p>
            <p>
              En Hotel Duvanchu’s encontrarás atención cercana, un ambiente tranquilo y los
              servicios esenciales para descansar en Chiquinquirá.
            </p>
            <div className="signature">
              <span>Hotel Duvanchu’s</span>
              <small>Seguridad y Confort</small>
            </div>
          </div>
        </section>

        <section className="location-section" id="ubicacion">
          <div className="location-card">
            <span className="eyebrow">Ubicación</span>
            <h2>
              Encuéntranos en
              <br />
              Chiquinquirá
            </h2>
            <div className="address-block">
              <Icon name="map" />
              <div>
                <small>Dirección</small>
                <strong>Calle 4B # 7-132</strong>
                <span>Barrio El Bosque, Chiquinquirá, Boyacá</span>
              </div>
            </div>
            <p>Cerca del Terminal de Transportes.</p>
            <a
              className="button button-light"
              href="https://www.google.com/maps/search/?api=1&query=Calle+4B+%23+7-132+Chiquinquira+Boyaca"
              target="_blank"
              rel="noreferrer"
            >
              Cómo llegar
              <Icon name="arrow" size={18} />
            </a>
          </div>
          <div className="map-placeholder" aria-label="Mapa pendiente de verificar">
            <div className="map-lines" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <div className="map-pin">
              <Icon name="map" size={27} />
              <span>Punto exacto por verificar</span>
            </div>
            <span className="map-label">Mapa de ubicación</span>
          </div>
        </section>

        <section className="contact-section">
          <span className="eyebrow">Estamos para ayudarte</span>
          <h2>Consulta tu próxima estadía</h2>
          <p>Escríbenos o llámanos. Te atenderemos directamente para resolver tus preguntas.</p>
          <div className="contact-links">
            <a href="tel:+573229069022">
              <span>
                <Icon name="phone" />
              </span>
              <small>Teléfono</small>
              <strong>+57 322 906 9022</strong>
              <Icon name="arrow" />
            </a>
            <a href="mailto:hotelduvanchus1@gmail.com">
              <span>
                <Icon name="mail" />
              </span>
              <small>Correo</small>
              <strong>hotelduvanchus1@gmail.com</strong>
              <Icon name="arrow" />
            </a>
          </div>
          <Button onClick={() => setConsultOpen(true)}>Consultar disponibilidad</Button>
        </section>
      </main>
      <footer>
        <div className="footer-top">
          <Brand light />
          <p>Un hotel familiar en Chiquinquirá, atendido por sus propietarios.</p>
          <div className="footer-nav">
            <span>Explora</span>
            <a href="#habitaciones">Habitaciones</a>
            <a href="#servicios">Servicios</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#ubicacion">Ubicación</a>
          </div>
          <div className="footer-address">
            <span>Visítanos</span>
            <p>
              Calle 4B # 7-132
              <br />
              Barrio El Bosque
              <br />
              Chiquinquirá, Boyacá
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Hotel Duvanchu’s</span>
          <span>Seguridad y Confort</span>
        </div>
      </footer>
      <div className="mobile-bottom-bar">
        <a href="tel:+573229069022">
          <Icon name="phone" size={19} />
          Llamar
        </a>
        <button onClick={() => setConsultOpen(true)}>
          <Icon name="calendar" size={19} />
          Consultar
        </button>
      </div>
      <ConsultationModal open={consultOpen} onClose={() => setConsultOpen(false)} />
      <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
    </div>
  );
}
