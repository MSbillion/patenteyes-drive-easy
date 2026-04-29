import { useEffect } from "react";
import { useParams, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, RTL_LOCALES, DEFAULT_LOCALE, type Locale } from "@/i18n/config";

export const LocaleLayout = () => {
  const { locale } = useParams<{ locale: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n } = useTranslation();

  const isValid = SUPPORTED_LOCALES.includes(locale as Locale);

  useEffect(() => {
    if (!isValid) {
      navigate(`/${DEFAULT_LOCALE}${location.pathname}`, { replace: true });
      return;
    }
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
    document.documentElement.lang = locale!;
    document.documentElement.dir = RTL_LOCALES.includes(locale as Locale) ? "rtl" : "ltr";
  }, [locale, isValid, navigate, location.pathname, i18n]);

  if (!isValid) return null;
  return <Outlet />;
};

export const LocaleRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Detect from cookie or browser
    const cookieMatch = document.cookie.match(/patenteyes-locale=([a-z]{2})/);
    const cookieLocale = cookieMatch?.[1] as Locale | undefined;
    const browserLocale = navigator.language.slice(0, 2) as Locale;
    const detected =
      cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)
        ? cookieLocale
        : SUPPORTED_LOCALES.includes(browserLocale)
        ? browserLocale
        : DEFAULT_LOCALE;
    navigate(`/${detected}`, { replace: true });
  }, [navigate]);
  return null;
};
