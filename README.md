# Aura Agency | Sitio web v1

Sitio estático (HTML, CSS y JS sin frameworks) para auragency.net. Paleta **B2 Uva cálida**, mobile-first, pensado para que el cliente escriba por WhatsApp.

## Abrir en Visual Studio Code

1. Descomprime `aura-web.zip` y abre la carpeta `aura-web` en VS Code (Archivo > Abrir carpeta).
2. Instala la extensión **Live Server** (Ritwick Dey).
3. Clic derecho en `index.html` > **Open with Live Server**. Se abre en el navegador y se recarga al guardar.

No hace falta instalar nada más: no hay `npm` ni proceso de build.

## Estructura

```
aura-web/
├── index.html            Homepage
├── precios.html          Planes completos
├── assets/
│   ├── css/
│   │   ├── tokens.css    Colores, tipografía, espaciado, radios (fuente única de verdad)
│   │   └── styles.css    Componentes y layout
│   ├── js/main.js        Menú móvil, enlaces de WhatsApp, año del footer
│   └── img/favicon.svg   Favicon provisional
└── README.md
```

## Cómo cambiar cosas comunes

| Quiero cambiar | Dónde |
| --- | --- |
| Un color o la tipografía | `assets/css/tokens.css` |
| El número de WhatsApp | `AURA_WHATSAPP` en `assets/js/main.js` y los `href="https://wa.me/..."` de respaldo en los HTML |
| El mensaje prellenado de un botón | Atributo `data-wa="..."` de ese enlace |
| Precios o qué incluye cada plan | `precios.html` y el bloque "Planes" de `index.html` |

## Pendientes antes de publicar (buscar `TODO` y `[` en el código)

- [ ] Logo en versión oscura (SVG) para fondo claro: reemplazar el texto "Aura" en el header y footer
- [ ] Foto real del hero (600x760): dueña de negocio dominicana o equipo Aura
- [ ] 5 logos de clientes con permiso
- [ ] 3 casos reales con cifras de antes y después y su periodo
- [ ] Métricas reales del panel de agentes (anonimizadas, con mes)
- [ ] Datos del chat de ejemplo: precio del servicio
- [ ] Respuestas de 4 preguntas frecuentes
- [ ] Ciudad de la oficina en el footer
- [ ] Imagen Open Graph 1200x630 en `assets/img/og-aura.jpg`
- [ ] Enlace de agenda (Calendly u otro) para "Agendar diagnóstico gratis"
- [ ] Confirmar plan Growth Pro: "SEO optimizado" (en la web anterior el texto estaba cortado)
- [ ] Confirmar si los precios incluyen impuestos y si hay permanencia
- [ ] Rutas `/blog` y `/nosotros`: conectar con las páginas existentes o crearlas

## Decisiones de diseño

- **Una sola acción principal:** WhatsApp. En móvil hay una barra fija abajo; en escritorio, el botón del hero y el cierre.
- **Contenido siempre visible:** no hay animaciones que oculten secciones al hacer scroll. El chat del hero anima suave y respeta "reducir movimiento".
- **Accesibilidad:** contraste AA en todos los textos, objetivos táctiles de 44 px, foco visible, enlace "Saltar al contenido", preguntas con `<details>` nativo.
- **SEO:** título y descripción por página, Open Graph, `lang="es"` y datos estructurados `ProfessionalService`.

## Siguientes páginas recomendadas

Una página por servicio (empezar por Automatización IA & WhatsApp) y una por industria. Sirven como landing pages para las campañas de Aura en Meta y Google. Se construyen copiando la estructura de `precios.html` y reutilizando los componentes de `styles.css`.
