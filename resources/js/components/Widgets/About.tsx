"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutArtist() {
    const { t, i18n } = useTranslation("common");

    return (
        <section id="about" className="relative min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-neutral-200 px-8 section section--lg">
            {/* headline */}
            <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-display huge-display lg:text-6xl font-display font-extrabold tracking-tight text-center text-white leading-[1.1]"
            >
                {t("about.title")}
            </motion.h1>

            {/* text */}
            <motion.p
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.3, ease: "easeOut" }}
                className="mt-10 max-w-[70ch] text-center text-body leading-relaxed text-neutral-400 font-light"
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
