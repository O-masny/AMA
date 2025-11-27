"use client";

import { Artwork } from "@/components/data/artworks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MagneticButton } from "../magnetic-button";

interface GalleryProps {
    artworks: Artwork[];
}

const Gallery = ({ artworks }: GalleryProps) => {
    const { t } = useTranslation("common");
    const ref = useRef<HTMLElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLElement>) : undefined;

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
    const ctaScale = useTransform(scrollYProgress, [0.75, 0.95], [0.9, 1]);

    return (
        <section ref={ref} id="gallery" className="relative h-[600vh] bg-background">
            <div
                className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
                style={{
                    transform: "translateZ(0)",
                    backfaceVisibility: "hidden",
                    backgroundColor: "hsl(var(--background) / 1)",
                }}
            >                {/* INTRO */}
                <motion.div
                    style={{ opacity: introOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <h2 className="font-display font-extrabold text-display huge-display md:text-heading text-foreground tracking-tight">
                        {t("gallery.title")}
                    </h2>
                    <p className="mt-6 text-lg md:text-xl max-w-xl text-muted-foreground">
                        {t("gallery.intro")}
                    </p>
                </motion.div>
                <div className="relative w-full h-full">
                    {artworks.slice(0, 4).map((artwork, i) => {
                        const start = 0.2 + i * 0.15;
                        const end = start + 0.25;

                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.05, end - 0.05, end],
                            [0, 1, 1, 0]
                        );
                        const scale = useTransform(scrollYProgress, [start, end], [0.9, 1.1]);
                        const y = useTransform(scrollYProgress, [start, end], [100, -100]);

                        return (
                            <motion.div
                                key={artwork.id}
                                style={{ opacity, scale, y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="relative w-[70vw] md:w-[40vw] h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
                                    <motion.img
                                        src={`/storage/${artwork.image}`}
                                        alt={artwork.title}
                                        className="w-full h-full object-cover"
                                        style={{
                                            scale: useTransform(scrollYProgress, [start, end], [1.15, 1]),
                                        }}
                                        transition={{ ease: "easeOut" }}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8"
                                        style={{
                                            opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
                                            y: useTransform(scrollYProgress, [start, end], [30, 0]),
                                        }}
                                    >
                                        <div>
                                            <h3 className="font-display font-bold text-title text-white mb-2">
                                                {artwork.title}
                                            </h3>
                                            <p className="font-sans text-white/80">
                                                {artwork.year} · {artwork.category}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                        );
                    })}
                </div>

                {/* CTA BLOCK */}
                <motion.div
                    style={{ opacity: ctaOpacity, scale: ctaScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center bg-background px-6"
                >
                    <h2 className="font-display font-extrabold text-display huge-display text-foreground tracking-tight leading-none mb-6">
                        {t("gallery.cta.title")}
                    </h2>

                    <p className="max-w-xl text-balance text-muted-foreground/90 text-body md:text-title leading-relaxed font-light mb-12">
                        {t("gallery.cta.text")}
                    </p>

                    <MagneticButton href="/gallery">
                        {t("gallery.cta.button")}
                    </MagneticButton>
                </motion.div>

            </div>
        </section>
    );
};

export default Gallery;
