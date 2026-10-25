import { useTranslations } from "next-intl";
import { Link } from "@/i18n";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-xs text-muted">404</p>
      <h1 className="text-2xl font-semibold tracking-tight">{t("title")}</h1>
      <Link href="/" className="text-sm text-muted underline underline-offset-4 hover:text-white">
        {t("back")}
      </Link>
    </main>
  );
}
