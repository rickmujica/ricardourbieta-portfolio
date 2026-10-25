// Datos personales del sitio. Cambia aquí el texto, los enlaces y el correo.
export const site = {
  name: "Ricardo Urbieta",
  role: "Desarrollador full-stack",
  tagline: "Diseño y construyo productos web, móviles y 3D, de la idea al deploy.",
  location: "Paraguay",
  // Dirección pública del portafolio, sin "/" final. Se usa para SEO y la imagen OG.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ricardourbieta.vercel.app",
  // TODO: reemplazar por el correo de contacto público.
  email: "hola@ricardourbieta.com",
  available: true,
  socials: [
    { label: "GitHub", href: "https://github.com/rickmujica" },
  ],
  about: [
    "Me gusta trabajar en el punto donde se cruzan el producto y la ingeniería: interfaces cuidadas, datos bien modelados y detalles que hacen que una app se sienta rápida.",
    "Últimamente construyo con Next.js, Supabase y Expo, y exploro gráficos en tiempo real con Three.js.",
  ],
} as const;
