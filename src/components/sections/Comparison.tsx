import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react";

export const Comparison = () => {
  const { t } = useTranslation();

  const rows = [
    { label: t("comparison.row1"), us: t("comparison.row1a"), school: t("comparison.row1b"), other: t("comparison.row1c") },
    { label: t("comparison.row2"), us: t("comparison.row2a"), school: t("comparison.row2b"), other: t("comparison.row2c") },
    { label: t("comparison.row3"), us: true, school: false, other: false },
    { label: t("comparison.row4"), us: true, school: false, other: true },
    { label: t("comparison.row5"), us: true, school: false, other: true },
  ];

  const Cell = ({ v }: { v: string | boolean }) => {
    if (typeof v === "boolean") {
      return v ? (
        <Check className="size-5 text-secondary mx-auto" strokeWidth={3} />
      ) : (
        <X className="size-5 text-muted-foreground/50 mx-auto" strokeWidth={2.5} />
      );
    }
    return <span className="font-medium">{v}</span>;
  };

  return (
    <section id="pricing" className="container py-20 md:py-28">
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">{t("comparison.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("comparison.subtitle")}</p>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-border shadow-card">
        <table className="w-full bg-card text-sm md:text-base">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-start p-4 md:p-6 font-semibold text-muted-foreground">{t("comparison.feature")}</th>
              <th className="p-4 md:p-6 bg-primary-soft border-x-2 border-primary relative">
                <div className="absolute -top-3 start-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-0.5 rounded-full whitespace-nowrap">
                  {t("comparison.popular")}
                </div>
                <span className="font-bold text-primary text-base md:text-lg">{t("comparison.patenteyes")}</span>
              </th>
              <th className="p-4 md:p-6 font-semibold text-muted-foreground">{t("comparison.school")}</th>
              <th className="p-4 md:p-6 font-semibold text-muted-foreground">{t("comparison.otherApps")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="p-4 md:p-6 font-medium">{r.label}</td>
                <td className="p-4 md:p-6 text-center bg-primary-soft border-x-2 border-primary">
                  <Cell v={r.us} />
                </td>
                <td className="p-4 md:p-6 text-center text-muted-foreground"><Cell v={r.school} /></td>
                <td className="p-4 md:p-6 text-center text-muted-foreground"><Cell v={r.other} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
