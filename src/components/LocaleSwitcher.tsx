"use client";

import { useLocale, useTranslations } from "next-intl";
import { getPathname } from "@/i18n";
import { FlagPY, FlagUS } from "./flags";

// Enlace a la portada en el otro idioma, igual que en el portal inmobiliario:
// muestra el idioma al que se cambia, con su bandera (EN 🇺🇸 o ES 🇵🇾).
// Es un <a> común (carga completa) y no <Link>: así <html lang> se actualiza y la
// página anterior no queda oculta en el DOM con los mismos ids de las secciones.
export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const target = locale === "es" ? "en" : "es";
  const Flag = target === "en" ? FlagUS : FlagPY;

  return (
    <a
      href={getPathname({ href: "/", locale: target })}
      hrefLang={target}
      aria-label={t("switchLanguage")}
      className="ml-1 inline-flex h-8 items-center gap-1.5 rounded-md border border-line px-2.5 font-mono text-xs uppercase text-muted transition-colors hover:border-white/25 hover:bg-white/5 hover:text-white"
    >
      <Flag />
      {target}
    </a>
  );
}
