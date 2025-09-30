// src/i18n/lib/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 🗂️ správné importy podle tvé struktury
import cs from "@/src/i18n/locales/cs/common.json";
import en from "@/src/i18n/locales/en/common.json";

i18n.use(initReactI18next).init({
    resources: {
        cs: { common: cs },
        en: { common: en },
    },
    lng: "cs", // výchozí jazyk
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
