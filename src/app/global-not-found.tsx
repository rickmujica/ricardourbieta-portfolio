import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "404" };

// Último recurso para URLs que no pasan por [locale] (ej. un idioma que no existe).
// No usa ningún layout, por eso trae su propio <html>.
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="font-mono text-xs text-muted">404</p>
        <h1 className="text-2xl font-semibold tracking-tight">No encontramos esta página</h1>
        <Link href="/" className="text-sm text-muted underline underline-offset-4">
          Volver al inicio
        </Link>
      </body>
    </html>
  );
}
