"use client";

import { Artwork } from "@/components/data/artworks";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SpatialGalleryProps {
    artworks: Artwork[];
}

const SpatialGallery: React.FC<SpatialGalleryProps> = ({ artworks }) => {
    const ref = useRef<HTMLElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLElement>) : undefined;
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    return (
        <section
            ref={ref}
            className="relative h-[400vh] bg-background overflow-hidden"
        >
            <div className="sticky top-0 h-screen flex items-center justify-center perspective-[1500px]">
                {artworks.slice(0, 6).map((art, i) => {
                    // pro každý obraz jiný z-posun a rotace
                    const z = useTransform(scrollYProgress, [0, 1], [0, -(i + 1) * 600]);
                    const rotate = useTransform(
                        scrollYProgress,
                        [0, 1],
                        [0, i % 2 === 0 ? 15 : -15]
                    );
                    const opacity = useTransform(
                        scrollYProgress,
                        [i * 0.1, i * 0.3],
                        [1, 0]
                    );

                    return (
                        <motion.div
                            key={art.id}
                            style={{
                                opacity,
                                transform: `translateZ(${z.get()}px) rotateY(${rotate.get()}deg)`,
                            }}
                            className="absolute w-[40vw] max-h-[70vh] object-cover rounded-xl shadow-2xl"
                        >
                            <img
                                src={`/storage/${art.image}`}
                                alt={art.title}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
};

export default SpatialGallery;
