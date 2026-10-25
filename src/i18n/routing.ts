import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // Español sin prefijo (/), inglés con prefijo (/en).
  localePrefix: "as-needed",
  // El idioma lo decide la URL, no el navegador: así Google indexa las dos versiones.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
