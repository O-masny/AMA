"use client";
import { Artwork } from "@/components/data/artworks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSectionProps {
    artworks?: Artwork[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ artworks = [] }) => {
    if (artworks.length === 0) {
        return (
            <section className="relative h-[80vh] flex items-center justify-center bg-black">
                <h1 className="text-heading md:text-display font-bold text-white">
                    Žádná díla nejsou k dispozici
                </h1>
            </section>
        );
    }

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

    const mainScale = useTransform(scrollYProgress, [0, 0.8], [1.1, 1.4]);
    const mainY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const mainOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const titleY = useTransform(scrollYProgress, [0, 0.6], [0, -150]);
    const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    const subtitleOpacity = useTransform(scrollYProgress, [0.2, 0.6], [1, 0]);

    return (
        <section ref={ref} className="relative h-[200vh] overflow-hidden bg-black">
            <div className="sticky top-0 h-screen flex items-center justify-center">
                <motion.img
                    src={`/storage/${artworks[0].image}`}
                    alt={artworks[0].title}
                    style={{ scale: mainScale, y: mainY, opacity: mainOpacity }}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80" />

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        style={{ y: titleY, opacity: titleOpacity }}
                        className="text-display md:text-heading font-display font-extrabold text-white mix-blend-difference leading-none"
                    >
                        GALERIE
                    </motion.h1>
                    <motion.p
                        style={{ opacity: subtitleOpacity }}
                        className="mt-6 text-body md:text-title text-white/80 max-w-2xl mx-auto"
                    >
                        Vstup do vizuálního prostoru, kde obrazy ožívají.
                    </motion.p>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
