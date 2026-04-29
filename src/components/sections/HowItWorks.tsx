import { useTranslation } from "react-i18next";

export const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    { n: "1", title: t("howItWorks.s1Title"), desc: t("howItWorks.s1Desc") },
    { n: "2", title: t("howItWorks.s2Title"), desc: t("howItWorks.s2Desc") },
    { n: "3", title: t("howItWorks.s3Title"), desc: t("howItWorks.s3Desc") },
    { n: "4", title: t("howItWorks.s4Title"), desc: t("howItWorks.s4Desc") },
  ];
  return (
    <section id="how-it-works" className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{t("howItWorks.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("howItWorks.subtitle")}</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {steps.map((s) => (
          <div key={s.n} className="relative">
            <div className="rounded-2xl bg-card border border-border p-7 shadow-card h-full">
              <div className="size-12 rounded-full bg-gradient-brand text-primary-foreground font-bold text-lg flex items-center justify-center mb-4">
                {s.n}
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
