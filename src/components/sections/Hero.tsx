import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Sparkles, MessageCircle, BookOpen } from "lucide-react";

export const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-start">
            <Badge variant="secondary" className="bg-secondary/10 text-secondary border-secondary/20 px-3 py-1">
              <Sparkles className="size-3 me-1.5" /> {t("hero.badge")}
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center lg:justify-start">
              <Button asChild variant="hero" size="xl">
                <a href="#join">{t("hero.cta")}</a>
              </Button>
              <Button asChild variant="outline" size="xl">
                <a href="#how-it-works">{t("hero.ctaSecondary")}</a>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground pt-2">
              <span className="inline-block size-2 rounded-full bg-secondary me-2 animate-pulse" />
              {t("hero.earlyBird")}
            </p>
          </div>

          <div className="relative mx-auto lg:mx-0 max-w-sm w-full">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
};

// TODO: replace with real app screenshot
const PhoneMockup = () => {
  const { t } = useTranslation();
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-brand rounded-[3rem] blur-3xl opacity-20 scale-95" />
      <div className="relative aspect-[9/19] bg-card rounded-[2.5rem] border-8 border-foreground/90 shadow-elevated overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-6 bg-foreground/90 z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-4 bg-foreground rounded-full" />
        </div>
        <div className="h-full bg-gradient-hero p-6 pt-10 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-full bg-gradient-brand flex items-center justify-center text-primary-foreground font-bold">
              A
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ahmed</p>
              <p className="text-sm font-semibold">{t("solution.f2Title")}</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            <div className="bg-card rounded-2xl rounded-tl-sm p-3 shadow-card max-w-[85%]">
              <p className="text-xs leading-snug text-foreground">السلام عليكم! ما الفرق بين إشارة "الوقوف" و "الأولوية"؟</p>
            </div>
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 shadow-card max-w-[85%] ms-auto">
              <p className="text-xs leading-snug">إشارة الوقوف (STOP) ثماني الأضلاع تتطلب توقفاً كاملاً...</p>
            </div>
            <div className="bg-card rounded-2xl p-3 shadow-card border-l-4 border-secondary max-w-[90%]">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="size-3 text-secondary" />
                <p className="text-[10px] font-semibold text-secondary uppercase">Quiz</p>
              </div>
              <p className="text-xs text-foreground">12/15 ✓</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-around bg-card rounded-2xl p-2 shadow-card">
            <MessageCircle className="size-5 text-primary" />
            <BookOpen className="size-5 text-muted-foreground" />
            <Sparkles className="size-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};
