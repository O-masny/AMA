"use client";

import { Artwork } from "@/components/data/artworks";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";

interface HeroSliderProps {
    artwork: Artwork;
}

export default function HeroSlider({ artwork }: HeroSliderProps) {
    const x = useMotionValue(0);
    const ref = useRef<HTMLDivElement>(null);

    // slider width = procento viditelné levé strany
    const leftWidth = useTransform(x, [-300, 0, 300], ["70%", "50%", "30%"]);

    return (
        <section
            ref={ref}
            className="relative h-screen overflow-hidden bg-black flex"
        >
            {/* Left side with text */}
            <motion.div
                style={{ width: leftWidth }}
                className="relative h-full bg-popover/60 backdrop-blur-md p-12 flex flex-col justify-center text-white transition-all duration-300"
            >
                <h1 className="text-heading md:text-display font-display font-bold mb-6">
                    {artwork.title}
                </h1>
                <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
                    {artwork.description}
                </p>
            </motion.div>

            {/* Right side with clean image */}
            <div className="relative flex-1 h-full">
                <img
                    src={`/storage/${artwork.image}`}
                    alt={artwork.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Draggable handle */}
            <motion.div
                drag="x"
                dragConstraints={{ left: -300, right: 300 }}
                style={{ x }}
                className="absolute inset-y-0 left-1/2 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
            >
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-lg">
                    ⇆
                </div>
            </motion.div>
        </section>
    );
}
