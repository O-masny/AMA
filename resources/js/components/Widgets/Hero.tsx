"use client";

import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { MagneticButton } from "../magnetic-button";

const Hero = ({ isReady }: { isReady: boolean }) => {
    const { t } = useTranslation("common");
    const ref = useRef<HTMLDivElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLDivElement>) : undefined;

    const { scrollYProgress } = useScroll({
        target: targetRef,
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
            className="relative w-full min-h-screen px-6 overflow-hidden"
            style={{ background }}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 80 },
                visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: "easeOut" } },
            }}
        >
            {/* Diagonal split: left visual, right content (desktop). Mobile remains stacked and centered. */}
            <div className="relative w-full min-h-screen flex flex-col md:flex-row">
                {/* Left visual pane */}
                <div
                    className="hidden md:block md:w-1/2 h-[80vh] relative"
                    style={{
                        clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0 100%)',
                        backgroundImage: `linear-gradient(130deg, rgba(0,0,0,0.05), rgba(0,0,0,0.15)), url('/assets/hero.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Right content pane */}
                <div className="w-full md:w-1/2 flex items-center justify-center text-center md:text-left px-6 md:px-20 py-24">
                    <div className="max-w-3xl">
                        <motion.h1 className="text-display huge-display font-display font-extrabold leading-[0.9] tracking-tight text-[hsl(var(--foreground))]">
                            {Array.from(title).map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="inline-block"
                                    initial={{ opacity: 0, y: 80 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: i * 0.03,
                                        duration: 0.5,
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.h2 className="mt-10 text-title md:text-heading font-sans text-[hsl(var(--muted-foreground))] tracking-wide" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }}>
                            {t('hero.subtitle')}
                        </motion.h2>

                        <motion.p className="max-w-2xl mt-8 text-body md:text-body font-sans text-[hsl(var(--muted-foreground))]/90 leading-relaxed" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}>
                            {t('hero.description')}
                        </motion.p>

                        <motion.div className="flex flex-wrap gap-6 mt-14" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.3 }}>
                            <MagneticButton href="#gallery" className="text-lg font-sans font-medium px-10 py-4">
                                {t('hero.ctaGallery')}
                            </MagneticButton>

                            <MagneticButton href="#about" variant="outline" className="text-lg font-sans font-medium px-10 py-4">
                                {t('hero.ctaAbout')}
                            </MagneticButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
