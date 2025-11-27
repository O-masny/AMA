"use client";

import { ExhibitionsProps } from "@/components/data/exhibitions";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import CTAButton from "@/components/ui/CTAButton";
import Footer from "@/components/Widgets/Footer";
import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ExhibitionsIndex({ exhibitions }: ExhibitionsProps) {
    const { t } = useTranslation("common");

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))] overflow-hidden">
            {/* Hero intro */}
            <div className="max-w-6xl mx-auto px-6 md:px-0 pt-20 pb-12">
                <div className="pt-6">
                    <Breadcrumbs items={[{ label: t("nav.home", "Domů"), href: "/" }, { label: t("exhibitions.index_title", "Výstavy") }]} />
                </div>
                <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-7">
                        <motion.h1
                            className="font-display text-display font-black text-foreground tracking-tight leading-none"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            {t("exhibitions.index_title", "Výstavy & Série")}
                        </motion.h1>
                        <motion.p
                            className="font-sans text-muted-foreground text-body md:text-title mt-6 max-w-2xl leading-relaxed"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            {t(
                                "exhibitions.index_intro",
                                "Každá výstava je kapitola – prostor, kde se barva, světlo a introspekce potkávají ve fyzické formě."
                            )}
                        </motion.p>
                    </div>
                    <div className="md:col-span-5 hidden md:block">
                        <div className="relative rounded-2xl overflow-hidden h-48">
                            <img src={`/storage/${exhibitions[0]?.galleries?.[0]?.image}`} alt="hero" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mosaic Grid */}
            <div className="max-w-6xl mx-auto px-6 md:px-0 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 auto-rows-fr">
                    {exhibitions.map((ex, i) => {
                        // pattern for asymmetric mosaic
                        const pattern = i % 6;
                        // default small-screen layout: full width items
                        let spanClass = "col-span-1 row-span-1";
                        // small screens: 2-column pattern
                        if (pattern === 0) spanClass = "sm:col-span-2 md:col-span-3 md:row-span-2";
                        if (pattern === 1) spanClass = "sm:col-span-1 md:col-span-3 md:row-span-1";
                        if (pattern === 2) spanClass = "sm:col-span-1 md:col-span-2 md:row-span-1";
                        if (pattern === 3) spanClass = "sm:col-span-2 md:col-span-4 md:row-span-2";
                        if (pattern === 4) spanClass = "sm:col-span-1 md:col-span-2 md:row-span-1";
                        if (pattern === 5) spanClass = "sm:col-span-2 md:col-span-6 md:row-span-1";

                        return (
                            <motion.div
                                key={ex.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.06 }}
                                className={`${spanClass} group relative overflow-hidden rounded-2xl shadow-lg bg-background`}
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={`/storage/${ex.galleries[0]?.image}`}
                                        alt={ex.title}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                                </div>

                                {/* Text Overlay */}
                                <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end">
                                    <motion.h3 className="font-display text-title md:text-heading text-white mb-2 tracking-tight">
                                        {ex.title}
                                    </motion.h3>
                                    <p className="text-white/80 text-body max-w-lg mb-4">{ex.description}</p>
                                    <Link href={`/exhibitions/${ex.id}`} className="inline-block">
                                        <CTAButton href={`/exhibitions/${ex.id}`} className="px-4 py-2 bg-[hsl(var(--background))] text-primary">{t("exhibitions.view_series", "Zobrazit sérii →")}</CTAButton>
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <Footer />
        </section>
    );
}
