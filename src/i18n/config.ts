import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import it from "./locales/it.json";
import en from "./locales/en.json";
import ar from "./locales/ar.json";
import ur from "./locales/ur.json";
import hi from "./locales/hi.json";
import zh from "./locales/zh.json";

export const SUPPORTED_LOCALES = ["it", "en", "ar", "ur", "hi", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const RTL_LOCALES: Locale[] = ["ar", "ur"];
export const DEFAULT_LOCALE: Locale = "it";

export const LANGUAGE_NAMES: Record<Locale, { native: string; english: string }> = {
  it: { native: "Italiano", english: "Italian" },
  en: { native: "English", english: "English" },
  ar: { native: "العربية", english: "Arabic" },
  ur: { native: "اردو", english: "Urdu" },
  hi: { native: "हिन्दी", english: "Hindi" },
  zh: { native: "中文", english: "Chinese" },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: it },
      en: { translation: en },
      ar: { translation: ar },
      ur: { translation: ur },
      hi: { translation: hi },
      zh: { translation: zh },
    },
    fallbackLng: DEFAULT_LOCALE,
    supportedLngs: SUPPORTED_LOCALES as unknown as string[],
    interpolation: { escapeValue: false },
    detection: {
      order: ["path", "cookie", "navigator"],
      lookupCookie: "patenteyes-locale",
      caches: ["cookie"],
      cookieMinutes: 60 * 24 * 365,
    },
  });

export default i18n;
