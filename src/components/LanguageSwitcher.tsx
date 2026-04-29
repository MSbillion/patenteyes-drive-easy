import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LANGUAGE_NAMES, SUPPORTED_LOCALES, type Locale } from "@/i18n/config";

export const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { locale } = useParams();
  const { i18n } = useTranslation();

  const switchTo = (newLocale: Locale) => {
    document.cookie = `patenteyes-locale=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    i18n.changeLanguage(newLocale);
    const pathParts = location.pathname.split("/").filter(Boolean);
    pathParts[0] = newLocale;
    navigate(`/${pathParts.join("/")}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5">
          <Globe className="size-4" />
          <span className="text-xs uppercase font-semibold">{locale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {SUPPORTED_LOCALES.map((l) => (
          <DropdownMenuItem
            key={l}
            onClick={() => switchTo(l)}
            className={l === locale ? "bg-primary-soft font-semibold" : ""}
          >
            <span className="font-medium">{LANGUAGE_NAMES[l].native}</span>
            <span className="ms-auto text-xs text-muted-foreground">{l.toUpperCase()}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
