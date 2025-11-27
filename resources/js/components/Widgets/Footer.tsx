"use client";

import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import CTAButton from "@/components/ui/CTAButton";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
    const { t } = useTranslation("common");

    const socialLinks = [
        { icon: <FaInstagram />, href: "https://www.instagram.com/adebscure", label: t("social.instagram") },
        { icon: <FaTiktok />, href: "https://www.tiktok.com/@adebscure", label: t("social.tiktok") },
    ];

    return (
        <footer className="relative z-10 bg-primary/95 text-primary-foreground">
            <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Branding */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div initial={{ opacity: 0, y: -8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                            <div className="uppercase text-sm tracking-widest text-primary-foreground/80">{t("brand.mono", "Atelier")}</div>
                            <div className="mt-2 font-display font-extrabold text-2xl md:text-3xl leading-tight">{t("brand.name")}</div>
                        </motion.div>

                        <motion.p className="mt-3 text-muted-foreground/85 max-w-md text-sm md:text-base italic" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
                            <Trans i18nKey="brand.tagline" t={t} components={{ 1: <span className="text-primary" /> }} />
                        </motion.p>
                    </div>

                    {/* Socials & CTA */}
                    <div className="flex flex-col items-center">
                        <motion.div className="flex gap-4 mb-4" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
                            {socialLinks.map((link) => (
                                <motion.a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/6 hover:bg-white/10 transition" whileHover={{ scale: 1.07 }}>
                                    <span className="text-xl text-primary-foreground/95">{link.icon}</span>
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
                            <CTAButton href="/contact" className="px-6 py-2 rounded-full bg-[hsl(var(--background))] text-foreground shadow-sm hover:shadow-md">
                                {t("contact.cta", "Kontaktovat")}
                            </CTAButton>
                        </motion.div>
                    </div>

                    {/* Legal / Credits */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right">
                        <div className="text-sm text-muted-foreground/80 mb-2">{t("rights")}</div>
                        <div className="text-sm text-muted-foreground/70">{t("footer.credits", "Design & code")}
                            <a href="https://masny.xyz" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 px-2">masny.xyz</a>
                        </div>
                    </div>
                </div>

                {/* Small bottom bar */}
                <div className="mt-8 border-t border-primary/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground/60">
                    <div>© {new Date().getFullYear()} {t("brand.name")}. All rights reserved.</div>
                    <div className="flex items-center gap-4">
                        <a href="/privacy" className="underline underline-offset-2">{t("footer.privacy", "Privacy")}</a>
                        <a href="/terms" className="underline underline-offset-2">{t("footer.terms", "Terms")}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
