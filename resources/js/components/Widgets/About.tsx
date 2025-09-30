"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutArtist() {
    const { t, i18n } = useTranslation("common");

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-200 px-8 py-32 ">
            {/* language switch */}
            <div className="absolute top-8 right-8 flex gap-3 text-sm text-neutral-500">
                <button
                    onClick={() => i18n.changeLanguage("cs")}
                    className={`hover:text-white transition-colors ${i18n.language === "cs" ? "text-white font-medium" : ""
                        }`}
                >
                    CZ
                </button>
                <span>·</span>
                <button
                    onClick={() => i18n.changeLanguage("en")}
                    className={`hover:text-white transition-colors ${i18n.language === "en" ? "text-white font-medium" : ""
                        }`}
                >
                    EN
                </button>
            </div>

            {/* headline */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-[clamp(2.5rem,7vw,6rem)] font-playfair font-black tracking-tight text-center text-white leading-[1.1]"
            >
                {t("about.title")}
            </motion.h1>

            {/* text */}
            <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                className="mt-10 max-w-[70ch] text-center text-[1.2rem] leading-relaxed text-neutral-400 font-light"
            >
                {t("about.text")}
            </motion.p>

            {/* signature */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 1 }}
                className="mt-16 text-center text-neutral-500 text-sm tracking-wider uppercase"
            >
                {t("about.signature")}
            </motion.div>
        </section>
    );
}
