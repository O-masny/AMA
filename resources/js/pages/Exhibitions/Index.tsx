"use client";

import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export interface Exhibition {
    id: number;
    title: string;
    description: string;
    cover: string;
    date: string;
    location: string;
}

interface Props {
    exhibitions: Exhibition[];
}

export default function ExhibitionsIndex({ exhibitions }: Props) {
    const { t } = useTranslation("common");

    return (
        <section className="relative w-full min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--muted))] overflow-hidden">
            {/* Header */}
            <div className="text-center pt-32 pb-16">
                <motion.h1
                    className="font-boska text-[clamp(4rem,10vw,8rem)] font-black text-foreground tracking-tight leading-none"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {t("exhibitions.index_title", "Výstavy & Série")}
                </motion.h1>
                <motion.p
                    className="font-synonym text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
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

            {/* Grid */}
            <div className="relative grid md:grid-cols-2 gap-24 px-6 md:px-16 pb-48">
                {exhibitions.map((ex, i) => (
                    <motion.div
                        key={ex.id}
                        initial={{ opacity: 0, y: 60 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl shadow-artistic bg-background"
                    >
                        {/* Image */}
                        <div className="overflow-hidden relative">
                            <motion.img
                                src={ex.cover}
                                alt={ex.title}
                                className="w-full h-[70vh] object-cover transition-transform duration-[3000ms] group-hover:scale-105"
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700"
                            />
                        </div>

                        {/* Text Overlay */}
                        <div className="absolute bottom-0 left-0 p-10 text-white">
                            <motion.h2
                                className="font-boska text-6xl md:text-7xl mb-4 leading-none tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {ex.title}
                            </motion.h2>
                            <motion.p
                                className="font-synonym text-lg max-w-md text-white/80"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                {ex.description}
                            </motion.p>

                            <Link href={`/exhibitions/${ex.id}`}>
                                <motion.span
                                    className="inline-block mt-6 text-primary font-synonym text-xl underline underline-offset-4 decoration-primary/50 hover:decoration-primary"
                                    whileHover={{ x: 4 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {t("exhibitions.view_series", "Zobrazit sérii →")}
                                </motion.span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
