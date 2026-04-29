import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import { LANGUAGE_NAMES, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";
import { useNavigate, useLocation, useParams } from "react-router-dom";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams();

  const switchTo = (l: Locale) => {
    document.cookie = `patenteyes-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    i18n.changeLanguage(l);
    const parts = location.pathname.split("/").filter(Boolean);
    parts[0] = l;
    navigate(`/${parts.join("/")}`);
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <img src={logo} alt="PatenteYes" className="h-10 w-10 object-contain" />
              <span className="font-bold text-xl">
                <span className="text-primary">Patente</span>
                <span className="text-secondary">Yes</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">{t("footer.tagline")}</p>
          </div>

          <FooterCol title={t("footer.product")} items={[t("footer.howItWorks"), t("footer.features"), t("footer.pricing")]} />
          <FooterCol title={t("footer.company")} items={[t("footer.about"), t("footer.contact"), t("footer.press")]} />
          <FooterCol title={t("footer.legal")} items={[t("footer.privacy"), t("footer.terms"), t("footer.cookies")]} />
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            {t("footer.language")}
          </p>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_LOCALES.map((l) => (
              <button
                key={l}
                onClick={() => switchTo(l)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-smooth ${
                  l === locale
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-primary-soft text-foreground border border-border"
                }`}
              >
                {LANGUAGE_NAMES[l].native}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">{t("footer.copyright")}</p>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="font-semibold text-sm mb-3">{title}</h4>
    <ul className="space-y-2 text-sm text-muted-foreground">
      {items.map((item) => (
        <li key={item}>
          <a href="#" className="hover:text-foreground transition-smooth">{item}</a>
        </li>
      ))}
    </ul>
  </div>
);
