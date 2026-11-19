# Notas de diseño — Hotel Duvanchu’s

Estas notas son para el equipo de diseño y el propietario. No se muestran en la interfaz para huéspedes.

## Versiones para presentar

- **Demo 1 — Editorial y serena:** abrir la URL de vista previa con `?demo=1`.
- **Demo 2 — Fotográfica e inmersiva:** abrir con `?demo=2` o sin parámetros.
- Los archivos fuente están separados en `src/demos/DemoOne.tsx`, `src/demos/DemoTwo.tsx` y `src/demos/demo-two.css`.
- La Demo 2 usa fotografías de referencia de Unsplash, identificadas dentro de la interfaz. Deben sustituirse por material real confirmado antes de presentarla como representación del hotel.

## Pendientes antes de publicar

- Validar nombre, lema, dirección, teléfono, correo y todos los servicios con el propietario.
- Confirmar si el número `+57 322 906 9022` recibe consultas por WhatsApp. El prototipo prepara el mensaje, pero no lo envía automáticamente.
- Verificar el punto exacto del mapa y reemplazar el marcador provisional.
- Solicitar fotografías originales en alta resolución y confirmar por escrito cuáles pertenecen al hotel.
- Reemplazar los espacios reservados de portada, habitaciones y sección “Nosotros” por fotografías confirmadas. No ampliar archivos pequeños o borrosos.
- Definir categorías reales de habitación, capacidades, configuración de camas y tarifas. La demo solo comunica “camas sencillas y dobles”, sin convertir este dato en categorías.
- Verificar condiciones del parqueadero y disponibilidad de cada servicio.

## Componentes preparados

- Cabecera responsive con menú móvil abierto/cerrado.
- Botones principales, secundarios y claros.
- Galería editable con vista ampliada.
- Cuadrícula reutilizable de servicios.
- Formulario de consulta con estados inicial, error y resumen.
- Barra de acciones fija en móvil.
- Tokens de color, tipografía y espaciado definidos en `src/index.css`.
