import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome to our platform",
      "description": "Find your ideal cofounder based on interests and skills."
    }
  },
  es: {
    translation: {
      "welcome": "Bienvenido a nuestra plataforma",
      "description": "Encuentra a tu cofundador ideal basado en intereses y habilidades."
    }
  }
};

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
