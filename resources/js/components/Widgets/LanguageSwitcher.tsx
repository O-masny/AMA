"use client";

import i18n from "@/src/i18n/lib/i18n";
import { motion } from "framer-motion";
import { useState } from "react";

const LanguageSwitcher = () => {
    const [lang, setLang] = useState(i18n.language);

    const toggleLanguage = () => {
        const newLang = lang === "cs" ? "en" : "cs";
        i18n.changeLanguage(newLang);
        setLang(newLang);
    };

    return (
        <motion.button
            onClick={toggleLanguage}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-foreground text-background font-medium tracking-wide shadow-lg hover:bg-primary"
        >
            {lang.toUpperCase()}
        </motion.button>
    );
};

export default LanguageSwitcher;
