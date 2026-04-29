import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { LANGUAGE_NAMES, type Locale } from "@/i18n/config";

const STUDY_LANGS: Locale[] = ["it", "ar", "ur", "hi", "zh"];

export const Languages = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const switchTo = (l: Locale) => {
    document.cookie = `patenteyes-locale=${l}; path=/; max-age=${60 * 60 * 24 * 365}`;
    i18n.changeLanguage(l);
    const parts = location.pathname.split("/").filter(Boolean);
    parts[0] = l;
    navigate(`/${parts.join("/")}`);
  };

  const fontFor = (l: Locale) => {
    if (l === "ar" || l === "ur") return "font-arabic";
    if (l === "hi") return "font-devanagari";
    if (l === "zh") return "font-chinese";
    return "font-sans";
  };

  return (
    <section className="bg-gradient-hero py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{t("languages.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("languages.subtitle")}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {STUDY_LANGS.map((l) => (
            <button
              key={l}
              onClick={() => switchTo(l)}
              className="group rounded-2xl bg-card border-2 border-border p-8 shadow-card hover:shadow-elevated hover:-translate-y-1 hover:border-primary transition-smooth text-center"
            >
              <p className={`text-3xl md:text-4xl font-bold text-primary mb-2 ${fontFor(l)}`} dir={l === "ar" || l === "ur" ? "rtl" : "ltr"}>
                {LANGUAGE_NAMES[l].native}
              </p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{l}</p>
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-6">{t("languages.switchHint")}</p>
      </div>
    </section>
  );
};
