import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

const options = {
  fallbackLng: "en",
  detection: {
    order: ["cookie", "localStorage", "sessionStorage", "navigator"],
    caches: ["localStorage", "cookie"],
  },
  react: {
    useSuspense: true
  },
};

i18n.use(initReactI18next).use(LanguageDetector).use(HttpBackend).init(options);
