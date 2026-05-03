import { useTranslation } from "react-i18next";
import { Globe2, Bot, BookOpenCheck } from "lucide-react";

export const Solution = () => {
  const { t } = useTranslation();
  const items = [
    { icon: Globe2, title: t("solution.f1Title"), desc: t("solution.f1Desc"), bg: "bg-gradient-purple", icon_bg: "bg-icon-purple", shadow: "shadow-purple" },
    { icon: Bot, title: t("solution.f2Title"), desc: t("solution.f2Desc"), bg: "bg-gradient-orange", icon_bg: "bg-icon-orange", shadow: "shadow-orange" },
    { icon: BookOpenCheck, title: t("solution.f3Title"), desc: t("solution.f3Desc"), bg: "bg-gradient-teal", icon_bg: "bg-icon-teal", shadow: "shadow-teal" },
  ];
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{t("solution.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("solution.subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, title, desc, bg, icon_bg, shadow }) => (
            <div key={title} className={`relative overflow-hidden rounded-2xl ${bg} p-8 ${shadow} hover:-translate-y-1 transition-smooth deco-corner`}>
              <div className={`size-14 rounded-2xl ${icon_bg} text-white flex items-center justify-center mb-5 shadow-soft`}>
                <Icon className="size-7" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
              <p className="text-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
