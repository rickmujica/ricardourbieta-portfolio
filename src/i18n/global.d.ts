import type messages from "./messages/es.json";
import type { routing } from "./routing";

// Le dice a TypeScript qué claves existen: una clave mal escrita da error al compilar.
// es.json es la referencia.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
