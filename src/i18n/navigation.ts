import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Link y hooks que agregan el prefijo del idioma solos: <Link href="/" locale="en"> va a /en.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
