import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Reescribe / → /es por dentro y redirige /es a la URL sin prefijo.
export default createMiddleware(routing);

export const config = {
  // Todo menos archivos (con punto), _next y _vercel.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
