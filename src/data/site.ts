import type { Locale } from "@/i18n/routing";

// Texto en los dos idiomas del sitio.
export type Localized<T = string> = Record<Locale, T>;

// Datos personales del sitio. Cambia aquí el texto, los enlaces y el correo.
export const site = {
  name: "Ricardo Urbieta",
  role: {
    es: "Desarrollador full-stack",
    en: "Full-stack developer",
  },
  tagline: {
    es: "Diseño y construyo productos web, móviles y 3D, de la idea al deploy.",
    en: "I design and build web, mobile and 3D products, from idea to deploy.",
  },
  location: "Paraguay",
  // Dirección pública del portafolio, sin "/" final. Se usa para SEO y la imagen OG.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricardourbieta.vercel.app",
  email: "ricardo.urbieta@gmail.com",
  available: true,
  socials: [
    { label: "GitHub", href: "https://github.com/rickmujica" },
  ],
  about: {
    es: [
      "Me gusta trabajar en el punto donde se cruzan el producto y la ingeniería: interfaces cuidadas, datos bien modelados y detalles que hacen que una app se sienta rápida.",
      "Últimamente construyo con Next.js, Supabase y Expo, y exploro gráficos en tiempo real con Three.js.",
    ],
    en: [
      "I like working where product and engineering meet: polished interfaces, well-modeled data and the small details that make an app feel fast.",
      "Lately I build with Next.js, Supabase and Expo, and explore real-time graphics with Three.js.",
    ],
  },
} as const;
