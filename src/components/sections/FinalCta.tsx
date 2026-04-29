import { useTranslation } from "react-i18next";
import { WaitlistForm } from "../WaitlistForm";

export const FinalCta = () => {
  const { t } = useTranslation();
  return (
    <section id="join" className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-brand" />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "radial-gradient(circle at 20% 30%, white 0, transparent 50%), radial-gradient(circle at 80% 70%, white 0, transparent 40%)"
      }} />
      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 text-primary-foreground">
            {t("finalCta.title")}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8">{t("finalCta.subtitle")}</p>
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-elevated">
            <WaitlistForm variant="inline" />
          </div>
          <p className="text-sm text-primary-foreground/80 mt-5">{t("finalCta.trust")}</p>
        </div>
      </div>
    </section>
  );
};
