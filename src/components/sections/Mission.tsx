import { useTranslation } from "react-i18next";

export const Mission = () => {
  const { t } = useTranslation();
  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">{t("mission.tag")}</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6">{t("mission.title")}</h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">{t("mission.body")}</p>
      </div>
    </section>
  );
};
