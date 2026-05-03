import { useTranslation } from "react-i18next";
import { Languages, Wallet, RotateCcw } from "lucide-react";

export const Problem = () => {
  const { t } = useTranslation();
  const items = [
    { icon: Languages, title: t("problem.p1Title"), desc: t("problem.p1Desc"), icon_bg: "bg-icon-pink", shadow: "shadow-pink" },
    { icon: Wallet, title: t("problem.p2Title"), desc: t("problem.p2Desc"), icon_bg: "bg-icon-orange", shadow: "shadow-orange" },
    { icon: RotateCcw, title: t("problem.p3Title"), desc: t("problem.p3Desc"), icon_bg: "bg-icon-red", shadow: "shadow-red" },
  ];
  return (
    <section className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{t("problem.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("problem.subtitle")}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, desc, icon_bg, shadow }) => (
          <div key={title} className={`rounded-2xl bg-card p-8 ${shadow} hover:-translate-y-1 transition-smooth`}>
            <div className={`size-14 rounded-2xl ${icon_bg} text-white flex items-center justify-center mb-5`}>
              <Icon className="size-7" />
            </div>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-body leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
