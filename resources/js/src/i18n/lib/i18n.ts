import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import cs from "@/src/i18n/locales/cs/common.json";
import en from "@/src/i18n/locales/en/common.json";

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        cs: { translation: cs },
    },
    lng: "cs", // defaultní jazyk
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
