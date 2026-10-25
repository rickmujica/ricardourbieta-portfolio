# ricardourbieta-portfolio

Portafolio personal de Ricardo Urbieta. Una sola página: hero, galería de proyectos recientes como "portales", sobre mí y contacto.

Cada proyecto se muestra como una tarjeta con marco de navegador. Al pasar el cursor, la captura se reemplaza por el sitio en vivo (un iframe escalado). Al hacer clic, la tarjeta se expande a pantalla completa y el sitio queda navegable dentro del portafolio, con salida por `Esc` y un botón para abrirlo en una pestaña nueva.

## Stack

- Next.js 16 (App Router, salida estática) y TypeScript
- Tailwind CSS v4 con la fuente Geist
- Motion (Framer Motion) para la transición de la tarjeta al portal
- Componentes de [React Bits](https://reactbits.dev): `LightRays`, `BlurText`, `DecryptedText` y `SpotlightCard`, copiados en `src/components/reactbits/`

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Editar el contenido

- **Datos personales** (nombre, rol, correo, redes, texto de "sobre mí"): `src/data/site.ts`.
- **Proyectos**: `src/data/projects.ts`. Para agregar uno, suma un objeto a la lista y guarda su captura (1280×800) en `public/projects/`. El primero se muestra destacado. Si `url` es `null`, la tarjeta abre el repositorio.
- **Idiomas**: español en `/` e inglés en `/en` (next-intl). Los textos de la interfaz están en `src/i18n/messages/es.json` y `en.json`; los textos personales y las descripciones de proyectos tienen su versión `es` y `en` en los archivos de `src/data/`. El botón de la barra cambia de idioma.
- **Dirección del sitio** para SEO y la imagen Open Graph: variable de entorno `NEXT_PUBLIC_SITE_URL` (sin `/` final).

## Despliegue

En Vercel: importar el repositorio, agregar `NEXT_PUBLIC_SITE_URL` con el dominio final y desplegar. No necesita otra configuración.

Los sitios de los proyectos tienen que permitir que se muestren en un iframe (sin `X-Frame-Options: DENY` ni `frame-ancestors` restrictivo). Los despliegues por defecto de Vercel lo permiten.
