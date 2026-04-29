import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo.png";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const { t } = useTranslation();
  const { locale } = useParams();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to={`/${locale}`} className="flex items-center gap-2">
          <img src={logo} alt="PatenteYes" className="h-9 w-9 object-contain" />
          <span className="font-bold text-lg hidden sm:inline">
            <span className="text-primary">Patente</span>
            <span className="text-secondary">Yes</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-smooth">{t("nav.howItWorks")}</a>
          <a href="#features" className="hover:text-foreground transition-smooth">{t("nav.features")}</a>
          <a href="#pricing" className="hover:text-foreground transition-smooth">{t("nav.pricing")}</a>
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Button asChild variant="hero" size="default" className="hidden sm:inline-flex">
            <a href="#join">{t("nav.joinWaitlist")}</a>
          </Button>
        </div>
      </div>
    </header>
  );
};
