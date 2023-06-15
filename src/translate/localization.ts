import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEN from "./en/translateEN.json";
import translationUA from "./ua/translateUA.json";
import translationRU from "./ru/translateRU.json";

const options = {
  detection: {
    order: ["cookie", "localStorage", "sessionStorage", "navigator"],
    lookupQuerystring: "lng",
    caches: ["localStorage", "cookie"],
  },
  resources: {
    en: {
      translation: translationEN,
    },
    ru: {
      translation: translationRU,
    },
    ua: {
      translation: translationUA,
    },
  },
  interpolation: {
    escapeValue: false,
  },
};

const initLocalization = () => {
  i18n.use(initReactI18next).use(LanguageDetector).init(options);
};

export default initLocalization;
