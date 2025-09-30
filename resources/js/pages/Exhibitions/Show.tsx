"use client";

import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { MagneticButton } from "@/components/magnetic-button";
import { useTranslation } from "react-i18next";

export interface Exhibition {
    id: number;
    title: string;
    description: string;
    location: string;
    date: string;
    images: { id: number; image: string; caption?: string }[];
}

interface Props {
    exhibition: Exhibition;
}

export default function ExhibitionShow({ exhibition }: Props) {
    const { t } = useTranslation("common");

    return (
        <section className="relative min-h-screen bg-background text-foreground overflow-hidden">
            {/* Header */}
            <div className="relative h-[90vh] overflow-hidden">
                <motion.img
                    src={exhibition.images[0]?.image}
                    alt={exhibition.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.2 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.8, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                <div className="absolute bottom-16 left-10 max-w-4xl">
                    <motion.h1
                        className="font-boska text-[clamp(3rem,8vw,7rem)] leading-none font-bold tracking-tight text-primary mb-4"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {exhibition.title}
                    </motion.h1>
                    <p className="font-synonym text-lg md:text-xl text-muted-foreground">
                        {exhibition.date} · {exhibition.location}
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="max-w-4xl mx-auto py-24 px-6 md:px-0">
                <motion.p
                    className="font-synonym text-lg md:text-2xl leading-relaxed text-muted-foreground"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {exhibition.description}
                </motion.p>
            </div>

            {/* Image gallery */}
            <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto pb-32 px-6 md:px-0">
                {exhibition.images.slice(1).map((img) => (
                    <motion.div
                        key={img.id}
                        className="relative overflow-hidden rounded-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <img src={img.image} alt={img.caption} className="w-full h-[70vh] object-cover" />
                        {img.caption && (
                            <p className="absolute bottom-4 left-4 text-sm text-white/80 italic">{img.caption}</p>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* CTA back */}
            <div className="flex justify-center pb-32">
                <Link href="/exhibitions">
                    <MagneticButton strength={0.4}>
                        {t("exhibitions.back", "← Zpět na výstavy")}
                    </MagneticButton>
                </Link>
            </div>
        </section>
    );
}
