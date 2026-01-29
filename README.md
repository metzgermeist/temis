# Estudio Jurídico Canevaro

Sitio web corporativo para el Estudio Jurídico Canevaro, una firma de abogados con sede en Buenos Aires, Argentina.

## Descripción

Landing page moderna y profesional que presenta los servicios legales del estudio, el equipo de abogados, valores institucionales y múltiples puntos de contacto para potenciales clientes.

## Tecnologías

- **React** 18.3.1 - Biblioteca de UI
- **Vite** 7.2.4 - Build tool y dev server
- **CSS** vanilla - Estilos sin preprocesadores
- **Google Fonts** - Playfair Display y Source Sans 3

## Estructura del Proyecto

```
canevaro/
├── src/
│   ├── atoms/                  # Componentes base reutilizables
│   │   ├── BotonPrimario.jsx
│   │   ├── BotonWhatsApp.jsx
│   │   ├── BotonWhatsAppFlotante.jsx
│   │   ├── TarjetaAbogado.jsx
│   │   ├── TarjetaCaso.jsx
│   │   └── ItemValor.jsx
│   ├── molecules/              # Componentes compuestos (secciones)
│   │   ├── Navegador.jsx
│   │   ├── SeccionPortada.jsx
│   │   ├── SeccionQuienesSomos.jsx
│   │   ├── SeccionValores.jsx
│   │   ├── SeccionCasos.jsx
│   │   ├── SeccionBlog.jsx
│   │   └── PieDePagina.jsx
│   ├── pages/                  # Páginas
│   │   └── Inicio.jsx
│   ├── Aplicacion.jsx          # Componente raíz
│   ├── Aplicacion.css          # Estilos globales y variables CSS
│   └── main.jsx                # Punto de entrada
├── img/                        # Recursos gráficos
├── dist/                       # Build de producción
├── index.html
├── package.json
└── vite.config.js
```

## Arquitectura

El proyecto sigue el patrón **Atomic Design** con tres niveles:

### Atoms
Componentes pequeños y reutilizables:
- `BotonPrimario` - Botón CTA principal
- `BotonWhatsApp` - Enlace de contacto WhatsApp
- `BotonWhatsAppFlotante` - Botón flotante de WhatsApp
- `TarjetaAbogado` - Tarjeta de perfil profesional
- `TarjetaCaso` - Tarjeta de servicio legal
- `ItemValor` - Item de valores institucionales

### Molecules
Secciones completas de la página:
- `Navegador` - Header con navegación sticky
- `SeccionPortada` - Hero con estadísticas animadas
- `SeccionQuienesSomos` - Perfiles del equipo
- `SeccionValores` - Valores del estudio
- `SeccionCasos` - Grid de servicios legales
- `SeccionBlog` - Sección de blog (próximamente)
- `PieDePagina` - Footer con contacto

### Pages
- `Inicio` - Página principal que orquesta todas las secciones

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>

# Navegar al directorio
cd canevaro

# Instalar dependencias
npm install
```

## Scripts Disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Generar build de producción
npm run build

# Previsualizar build de producción
npm run preview
```

## Variables CSS

El proyecto define variables de diseño en `Aplicacion.css`:

```css
--color-primario: #2b1d12       /* Marrón oscuro */
--color-secundario: #7b4e24     /* Marrón medio */
--color-acento: #c79a56         /* Dorado */
--color-claro: #f7f1e7          /* Beige claro */
--color-texto: #1a120b          /* Negro */
--color-texto-suave: #5b4636    /* Marrón texto */
```

## Características

- **Responsive Design** - Optimizado para móvil, tablet y desktop
- **Accesibilidad** - Atributos ARIA, roles semánticos, alt text
- **SEO** - Metadatos Open Graph, estructura semántica
- **Animaciones** - Contadores animados en el hero con IntersectionObserver
- **Contacto integrado** - WhatsApp flotante, CTAs estratégicos

## Servicios Legales

El sitio presenta 6 áreas de especialización:
1. Derecho civil y comercialización
2. Derecho laboral
3. Derecho constitucional - Amparos
4. Derecho administrativo
5. Derecho de familia y sucesiones
6. Derecho penal

## Equipo

- **Dr. Carlos Canevaro** - Derecho constitucional
- **Dr. Lucas Montero** - Derecho laboral y penal económico

## Contacto

- **Dirección:** Av. Libertador 1234, Piso 8, Buenos Aires
- **Email:** contacto@estudiocanevaro.com
- **Teléfono:** +54 11 2345 6789

## Licencia

Todos los derechos reservados - Estudio Jurídico Canevaro
