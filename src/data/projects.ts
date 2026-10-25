import type { Localized } from "@/data/site";

// Para agregar un proyecto, suma un objeto a esta lista (el primero se muestra destacado).
// `poster` es la captura que se ve antes de cargar la vista en vivo: guárdala en public/projects/.
export type Project = {
  slug: string;
  title: string;
  description: Localized;
  year: number;
  stack: string[];
  // Sitio desplegado. Si es null, la tarjeta abre el repositorio.
  url: string | null;
  repo: string;
  poster: string;
  // Color de acento del brillo de la tarjeta.
  accent: string;
};

export const projects: Project[] = [
  {
    slug: "portal-inmobiliario",
    title: "Portal Inmobiliario",
    description: {
      es: "Portal de propiedades para Paraguay con búsqueda en mapa, favoritos, avisos por correo y un diferencial: video aéreo y tours 3D por fotogrametría con dron.",
      en: "Real estate portal for Paraguay with map search, favorites, email alerts and a twist: aerial video and 3D tours made with drone photogrammetry.",
    },
    year: 2026,
    stack: ["Next.js 16", "TypeScript", "Supabase", "PostGIS", "Cloudflare R2", "MapLibre"],
    url: "https://portal-inmobiliario-xi.vercel.app",
    repo: "https://github.com/rickmujica/portal-inmobiliario",
    poster: "/projects/portal-inmobiliario.jpg",
    accent: "#34d399",
  },
  {
    slug: "macrozone",
    title: "MacroZone",
    description: {
      es: "App móvil para registrar calorías y macros, con metas calculadas desde tu perfil, historial semanal y recordatorios. Todo queda en el dispositivo.",
      en: "Mobile app to track calories and macros, with goals calculated from your profile, weekly history and reminders. Everything stays on the device.",
    },
    year: 2026,
    stack: ["React Native", "Expo SDK 56", "Expo Router", "Reanimated"],
    url: null,
    repo: "https://github.com/rickmujica/macrostats",
    poster: "/projects/macrozone.jpg",
    accent: "#60a5fa",
  },
  {
    slug: "earth-threejs",
    title: "Earth",
    description: {
      es: "La Tierra renderizada en tiempo real: texturas de día y noche, nubes, atmósfera con shader Fresnel y un campo de estrellas.",
      en: "Earth rendered in real time: day and night textures, clouds, a Fresnel shader atmosphere and a starfield.",
    },
    year: 2025,
    stack: ["Three.js", "WebGL", "Vite"],
    url: "https://earth-threejs-rho.vercel.app",
    repo: "https://github.com/rickmujica/earthThreejs",
    poster: "/projects/earth-threejs.jpg",
    accent: "#818cf8",
  },
  {
    slug: "nike-3d",
    title: "Nike 3D Renders",
    description: {
      es: "Visor 3D de productos Nike con modelos glTF, carga progresiva y controles de órbita. Incluye un escaneo 3D de mis propias Jordan.",
      en: "3D viewer for Nike products with glTF models, progressive loading and orbit controls. Includes a 3D scan of my own Jordans.",
    },
    year: 2025,
    stack: ["Three.js", "glTF", "Vite"],
    url: "https://nike-3d-renders-three-js.vercel.app",
    repo: "https://github.com/rickmujica/Nike3DrendersThreeJS",
    poster: "/projects/nike-3d.jpg",
    accent: "#f97316",
  },
  {
    slug: "crossy-road",
    title: "Crossy Road 3D",
    description: {
      es: "Clon jugable de Crossy Road con generación de carriles, tráfico, detección de colisiones y controles de teclado y táctiles.",
      en: "Playable Crossy Road clone with procedural lanes, traffic, collision detection and keyboard and touch controls.",
    },
    year: 2025,
    stack: ["Three.js", "JavaScript", "Vite"],
    url: "https://crossy-road-three-js-am6k.vercel.app",
    repo: "https://github.com/rickmujica/crossy-road-ThreeJS",
    poster: "/projects/crossy-road.jpg",
    accent: "#a3e635",
  },
];
