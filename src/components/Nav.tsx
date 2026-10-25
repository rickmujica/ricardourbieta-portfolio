import { site } from "@/data/site";

const links = [
  { href: "#trabajo", label: "Trabajo" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-black/60 backdrop-blur-md">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span aria-hidden className="grid size-6 place-items-center rounded-full bg-white text-[11px] font-semibold text-black">
            RU
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>
        <ul className="flex items-center gap-1 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-md px-3 py-1.5 transition-colors hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
