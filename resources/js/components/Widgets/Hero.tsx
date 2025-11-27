"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MagneticButton } from "../magnetic-button";

const Hero = ({ isReady }: { isReady: boolean }) => {
    const { t } = useTranslation("common");
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 25, mass: 0.3 });
    const hueShift = useTransform(smooth, [0, 1], [0, 45]);

    const background = useMotionTemplate`
    linear-gradient(
      130deg,
      hsl(var(--primary) / 1) 0%,
      hsl(var(--accent) / 1) 100%
    ) hue-rotate(${hueShift}deg)
  `;

    const title = t("hero.title");

    return (
        <motion.section
            ref={ref}
            className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 text-center overflow-hidden"
            style={{ background }}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 80 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
            }}
        >
            {/* Jemný overlay pro hloubku */}
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none bg-[hsl(var(--background))]"
                style={{
                    opacity: useTransform(smooth, [0, 0.6, 1], [0.25, 0.12, 0.06]),
                    mixBlendMode: "soft-light",
                }}
            />

            {/* Title */}
            <motion.h1
                className="text-display font-display font-extrabold leading-[0.9] tracking-tight text-[hsl(var(--foreground))]"
            >
                {Array.from(title).map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 80 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: i * 0.045,
                            duration: 0.6,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </motion.h1>

            {/* Subtitle */}
            <motion.h2
                className="mt-10 text-title md:text-heading font-sans text-[hsl(var(--muted-foreground))] tracking-wide"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
            >
                {t("hero.subtitle")}
            </motion.h2>

            {/* Description */}
            <motion.p
                className="max-w-2xl mt-8 text-body md:text-body font-sans text-[hsl(var(--muted-foreground))]/90 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                {t("hero.description")}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                className="flex flex-wrap gap-6 mt-14"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
            >
                <MagneticButton
                    href="#gallery"
                    className="text-lg font-sans font-medium px-10 py-4"
                >
                    {t("hero.ctaGallery")}
                </MagneticButton>

                <MagneticButton
                    href="#about"
                    variant="outline"
                    className="text-lg font-sans font-medium px-10 py-4"
                >
                    {t("hero.ctaAbout")}
                </MagneticButton>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
