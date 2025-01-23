import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import TranslationEn from "./Local/en.json";
import TranslationAr from "./Local/ar.json";

const resources = {
  EN: {
    translation: TranslationEn,
  },
  AR: {
    translation: TranslationAr,
  },
};

const setDirection = (lang) => {
  const dir = lang === 'AR' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
};

const loadLanguageFromLocalStorage = () => {
  const storedLanguage = localStorage.getItem('userLanguage');
  return storedLanguage || 'EN';
};

const saveLanguageToLocalStorage = (lang) => {
  localStorage.setItem('userLanguage', lang);
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: loadLanguageFromLocalStorage(),
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on('languageChanged', (lang) => {
  setDirection(lang);
  saveLanguageToLocalStorage(lang); 
});

setDirection(i18n.language); 

export default i18n;