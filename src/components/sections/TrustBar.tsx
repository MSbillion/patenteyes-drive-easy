import { useTranslation } from "react-i18next";
import { Users, Globe, Sparkles, Tag } from "lucide-react";

export const TrustBar = () => {
  const { t } = useTranslation();
  const items = [
    { icon: Globe, text: t("trust.stat2") },
    { icon: Sparkles, text: t("trust.stat3") },
    { icon: Tag, text: t("trust.stat4") },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="container py-6">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
          {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2">
              <Icon className="size-4 text-primary" />
              <span className="font-medium">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
