"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutTitle = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLDivElement>) : undefined;
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    // délka path je cca 600px (změníme podle konkrétního SVG)
    const dashOffset = useTransform(scrollYProgress, [0, 1], [600, 0]);

    return (
        <div ref={ref} className="relative h-[60vh] flex items-center justify-center">
            <h2 className="relative font-display font-extrabold text-display md:text-heading text-center text-foreground leading-none">
                ABOUT ME
                {/* Brush stroke overlay */}
                <motion.svg
                    viewBox="0 0 600 120"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[120%] pointer-events-none"
                >
                    <motion.path
                        d="M 10 60 Q 150 20 300 60 T 590 60"  // hladká vlna
                        fill="none"
                        stroke="url(#grad)"
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray="600"
                        style={{ strokeDashoffset: dashOffset }}
                    />
                    {/* Barevný gradient pro „malířský“ efekt */}
                    <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff5a5f" />
                            <stop offset="50%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                    </defs>
                </motion.svg>
            </h2>
        </div>
    );
};

export default AboutTitle;
