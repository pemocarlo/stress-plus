import i18n from "i18next";
import Backend from "i18next-http-backend";
import {initReactI18next} from "react-i18next";

import {BUILD_TIME, IS_DEVELOPMENT} from "stress-app";

i18n
  .use(Backend) // load translation using http https://github.com/i18next/i18next-http-backend
  .use(initReactI18next) // pass the i18n instance to react-i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    // Fixes the language to english.
    // If we later want to support more languages we would need some kind of language selection or detection
    // https://github.com/i18next/i18next-browser-languageDetector
    lng: "en",

    fallbackLng: "en",
    debug: IS_DEVELOPMENT,

    ns: "stress-app",
    defaultNS: "stress-app",

    backend: {
      queryStringParams: {"build-time": BUILD_TIME},
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
