import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
        <p>© {site.name}</p>
        <p className="font-mono">Next.js · Motion · React Bits</p>
      </div>
    </footer>
  );
}
