import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from './locales/en.json';
import arTranslation from './locales/ar.json';
import hiTranslation from './translations/hi.json';

// Initialize i18next only on client side
const initI18n = () => {
  if (!i18n.isInitialized) {
    i18n
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        resources: {
          en: {
            translation: enTranslation
          },
          ar: {
            translation: arTranslation
          },
          hi: {
            translation: hiTranslation
          }
        },
        fallbackLng: 'en',
        debug: false,
        interpolation: {
          escapeValue: false
        },
        react: {
          useSuspense: false
        }
      });
  }
  return i18n;
};

// Only initialize if we're in the browser
if (typeof window !== 'undefined') {
  initI18n();
}

export default i18n;