import { notFound } from "next/navigation";

// Siempre responde 404: la sacamos de la validación de navegación instantánea de Next.
export const instant = false;

// Cualquier URL desconocida dentro de un idioma (/en/algo) muestra el 404 traducido.
export default function CatchAllPage() {
  notFound();
}
