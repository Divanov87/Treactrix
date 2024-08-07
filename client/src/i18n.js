import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Home": "Home",
        "Events": "Events",
        "Theater": "Theater",
        "Concerts": "Concerts",
        "Search": "Search",
        "Profile": "Profile",
        "Users": "Users",
        "Add Event": "Add Event",
        "Logout": "Logout",
        "Register": "Register",
        "Login": "Login",
        "Contacts": "Contacts",
        "About": "About",
        "Sign in": "Sign in",
        "Subscribe for our FREE bulletin": "Subscribe for our FREE bulletin",
        "Get weekly updates about the hottest performances and events, exclusive discounts, & more!": "Get weekly updates about the hottest performances and events, exclusive discounts, & more!",
        "Get started": "Get started"
      }
    },
    bg: {
      translation: {
        "Home": "Начало",
        "Events": "Събития",
        "Theater": "Театър",
        "Concerts": "Концерти",
        "Search": "Търсене",
        "Profile": "Профил",
        "Users": "Потребители",
        "Add Event": "Добави събитие",
        "Logout": "Изход",
        "Register": "Регистрация",
        "Login": "Вход",
        "Contacts": "Контакти",
        "About": "Относно",
        "Sign in": "Вход",
        "Subscribe for our FREE bulletin": "Абонирайте се за нашия БЕЗПЛАТЕН бюлетин",
        "Get weekly updates about the hottest performances and events, exclusive discounts, & more!": "Получавайте седмични актуализации за най-горещите изпълнения и събития, ексклузивни отстъпки и още!",
        "Get started": "Започнете"
      }
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
