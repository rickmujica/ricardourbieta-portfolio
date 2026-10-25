import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { site } from "@/data/site";

export function Nav() {
  const t = useTranslations("Nav");
  const links = [
    { href: "#trabajo", label: t("work") },
    { href: "#sobre-mi", label: t("about") },
    { href: "#contacto", label: t("contact") },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-black/60 backdrop-blur-md">
      <nav
        aria-label={t("label")}
        className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <a href="#" className="flex items-center gap-2 text-sm font-medium tracking-tight">
          <span aria-hidden className="grid size-6 place-items-center rounded-full bg-white text-[11px] font-semibold text-black">
            RU
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </a>
        <div className="flex items-center">
          <ul className="flex items-center text-sm text-muted sm:gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-md px-2 py-1.5 transition-colors hover:bg-white/5 hover:text-white sm:px-3"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
