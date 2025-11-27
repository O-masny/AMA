"use client";

import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
    const { t } = useTranslation("common");

    const socialLinks = [
        { icon: <FaInstagram />, href: "https://www.instagram.com/adebscure", label: t("social.instagram") },
        { icon: <FaTiktok />, href: "https://www.tiktok.com/@adebscure", label: t("social.tiktok") },
    ];

    return (
        <footer className="relative z-10 bg-gradient-to-b from-foreground via-foreground/95 to-background pt-24 pb-40 overflow-hidden">
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,
                        <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
                            <filter id='noiseFilter'>
                                <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/>
                            </filter>
                            <rect width='100%' height='100%' filter='url(%23noiseFilter)'/>
                        </svg>")`,
                    backgroundRepeat: "repeat",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Branding */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-display md:text-heading font-display font-bold tracking-widest mb-6 text-background"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {t("brand.name")}
                    </motion.h2>

                    <motion.p
                        className="font-sans text-background/80 max-w-xl mx-auto text-lg md:text-xl italic"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Trans
                            i18nKey="brand.tagline"
                            t={t}
                            components={{ 1: <span className="text-primary" /> }}
                        />
                    </motion.p>
                </div>

                {/* Socials */}
                <motion.div
                    className="flex justify-center gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {socialLinks.map((link) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={link.label}
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-background/30 text-background/80 hover:text-primary hover:border-primary transition-colors"
                            whileHover={{ scale: 1.15, rotate: 6 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="border-t border-background/20 pt-6">
                    <motion.p
                        className="font-sans text-sm text-background/60 text-center tracking-wide"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        {t("rights")}
                    </motion.p>

                    {/* Designer credit */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 0.5 }}
                        whileHover={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="mt-4 text-center text-sm font-sans text-background/50"
                    >
                        Created by ------
                        <a
                            href="https://masny.xyz"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-primary transition-colors duration-300"
                        >
                            masny.xyz
                        </a>
                        ------
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
