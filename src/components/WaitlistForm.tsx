import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LANGUAGE_NAMES, type Locale } from "@/i18n/config";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";

const STUDY_LANGS: Locale[] = ["it", "ar", "ur", "hi", "zh"];

const emailSchema = z.string().trim().email().max(255);

interface Props {
  variant?: "inline" | "stacked";
  className?: string;
}

export const WaitlistForm = ({ variant = "stacked", className = "" }: Props) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState<Locale>(
    (i18n.language as Locale) === "en" ? "it" : (i18n.language as Locale) || "it"
  );
  const [step, setStep] = useState<"email" | "language" | "success" | "duplicate">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(t("waitlist.invalidEmail"));
      return;
    }
    setStep("language");
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("waitlist-signup", {
        body: {
          email: email.trim().toLowerCase(),
          preferred_language: language,
          source_locale: i18n.language,
        },
      });
      if (fnError) throw fnError;
      if (data?.duplicate) {
        setStep("duplicate");
      } else {
        setStep("success");
      }
    } catch (err) {
      console.error("Waitlist signup error:", err);
      setError(t("waitlist.error"));
    } finally {
      setLoading(false);
    }
  };

  if (step === "success") {
    return (
      <div className={`rounded-xl bg-secondary-soft border-2 border-secondary/30 p-6 text-center ${className}`}>
        <CheckCircle2 className="mx-auto mb-3 size-10 text-secondary" />
        <h3 className="text-lg font-bold text-foreground mb-1">{t("waitlist.successTitle")}</h3>
        <p className="text-sm text-muted-foreground">{t("waitlist.successBody")}</p>
      </div>
    );
  }

  if (step === "duplicate") {
    return (
      <div className={`rounded-xl bg-primary-soft border-2 border-primary/30 p-6 text-center ${className}`}>
        <CheckCircle2 className="mx-auto mb-3 size-10 text-primary" />
        <p className="text-base font-medium text-foreground">{t("waitlist.duplicate")}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {step === "email" && (
        <form onSubmit={handleEmailSubmit} className={variant === "inline" ? "flex flex-col sm:flex-row gap-3" : "space-y-3"}>
          <Input
            type="email"
            inputMode="email"
            placeholder={t("waitlist.emailPlaceholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-base rounded-xl border-2"
            required
            maxLength={255}
            aria-label={t("waitlist.emailPlaceholder")}
          />
          <Button type="submit" variant="hero" size="lg" className="sm:w-auto w-full">
            {t("waitlist.submit")}
          </Button>
        </form>
      )}

      {step === "language" && (
        <div className="rounded-xl border-2 border-primary/20 bg-card p-6 shadow-soft space-y-4">
          <Label className="text-base font-semibold">{t("waitlist.languageQuestion")}</Label>
          <RadioGroup value={language} onValueChange={(v) => setLanguage(v as Locale)} className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {STUDY_LANGS.map((l) => (
              <label
                key={l}
                className={`flex items-center gap-2 rounded-lg border-2 p-3 cursor-pointer transition-smooth ${
                  language === l ? "border-primary bg-primary-soft" : "border-border hover:border-primary/40"
                }`}
              >
                <RadioGroupItem value={l} />
                <span className="text-sm font-medium">{LANGUAGE_NAMES[l].native}</span>
              </label>
            ))}
          </RadioGroup>
          <Button onClick={handleFinalSubmit} variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" /> {t("waitlist.submitting")}
              </>
            ) : (
              t("waitlist.submit")
            )}
          </Button>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
    </div>
  );
};
