import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next).use(Backend).use(LanguageDetector).init({
  fallbackLng: "en",
  debug: false,
  backend: { loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json` },
});

export default i18n;
