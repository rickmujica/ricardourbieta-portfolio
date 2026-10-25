import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// next-intl llama a esta función para saber el idioma y los textos del pedido.
// rootParams.locale() lee el segmento [locale] de la URL.
export default getRequestConfig(async ({ locale: override }) => {
  const locale = override ?? (await rootParams.locale());
  if (!hasLocale(routing.locales, locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
