"use client";

import { Artwork } from "@/components/data/artworks";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface GalleryProps {
    featuredArtworks: Artwork[];
}

const Gallery = ({ featuredArtworks }: GalleryProps) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Intro fade
    const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

    // CTA fade
    const ctaOpacity = useTransform(scrollYProgress, [0.75, 0.95], [0, 1]);
    const ctaScale = useTransform(scrollYProgress, [0.75, 0.95], [0.9, 1]);

    return (
        <section ref={ref} id="gallery" className="relative h-[600vh] bg-background">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {/* INTRO */}
                <motion.div
                    style={{ opacity: introOpacity }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                    <h2 className="font-playfair font-extrabold text-[12vw] md:text-[8vw] text-foreground tracking-tight">
                        GALLERY
                    </h2>
                    <p className="mt-6 text-lg md:text-xl max-w-xl text-muted-foreground">
                        Kolekce děl zachycující různé období a styly mé tvorby
                    </p>
                </motion.div>

                {/* IMAGE SEQUENCE */}
                <div className="relative w-full h-full">
                    {featuredArtworks.slice(0, 4).map((artwork, i) => {
                        // Vytvoříme individuální scroll interval pro každý obrázek
                        const start = 0.2 + i * 0.15;
                        const end = start + 0.25;

                        const opacity = useTransform(
                            scrollYProgress,
                            [start, start + 0.05, end - 0.05, end],
                            [0, 1, 1, 0]
                        );
                        const scale = useTransform(
                            scrollYProgress,
                            [start, end],
                            [0.9, 1.1]
                        );
                        const y = useTransform(
                            scrollYProgress,
                            [start, end],
                            [100, -100]
                        );

                        return (
                            <motion.div
                                key={artwork.id}
                                style={{ opacity, scale, y }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="relative w-[70vw] md:w-[40vw] h-[70vh] rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src={`/storage/${artwork.image}`}
                                        alt={artwork.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                                        <div>
                                            <h3 className="font-playfair font-bold text-3xl text-white mb-2">
                                                {artwork.title}
                                            </h3>
                                            <p className="font-inter text-white/80">
                                                {artwork.year} · {artwork.category}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* CTA BLOCK */}
                <motion.div
                    style={{ opacity: ctaOpacity, scale: ctaScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center bg-background"
                >
                    <h2 className="font-playfair font-extrabold text-[10vw] md:text-[6vw] text-foreground mb-6">
                        Explore More
                    </h2>
                    <p className="mb-8 text-lg md:text-xl max-w-lg text-muted-foreground">
                        Objev celou galerii s více než 50 originálními díly
                    </p>
                    <Button size="lg" asChild>
                        <a href="/gallery">View Full Gallery</a>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Gallery;
