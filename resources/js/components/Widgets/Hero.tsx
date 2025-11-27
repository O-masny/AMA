"use client";

import CTAButton from "@/components/ui/CTAButton";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const Hero = ({ isReady }: { isReady: boolean }) => {
    const { t } = useTranslation("common");
    const ref = useRef<HTMLDivElement | null>(null);
    const targetRef = ref.current ? ({ current: ref.current } as React.RefObject<HTMLDivElement>) : undefined;

    // subtle hue shift driven by scroll for liveliness
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] });
    const hue = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const hueShift = useSpring(hue, { stiffness: 100, damping: 20 });
    const background = useMotionTemplate`
      linear-gradient(130deg, hsl(var(--primary) / 1) 0%, hsl(var(--accent) / 1) 100%) hue-rotate(${hueShift}deg)
    `;

    return (
        <motion.section
            ref={ref}
            className="relative w-full min-h-screen px-6 overflow-hidden"
            style={{ background }}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.9 } } }}
        >
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 py-24 md:py-36">
                <div className="md:w-1/2 w-full order-2 md:order-1 px-6 md:px-0">
                    <h1 className="font-display huge-display font-extrabold leading-tight text-foreground">
                        {t("hero.title")}
                    </h1>
                    <p className="mt-6 text-body text-muted-foreground max-w-2xl">
                        {t("hero.subtitle")}
                    </p>

                    <div className="flex gap-4 mt-8">
                        <CTAButton href="#gallery">{t("hero.ctaGallery")}</CTAButton>
                        <CTAButton href="#about" className="bg-transparent border border-white/10 text-foreground">{t("hero.ctaAbout")}</CTAButton>
                    </div>
                </div>

                <div className="md:w-1/2 w-full order-1 md:order-2 px-6 md:px-0">
                    <div className="rounded-2xl overflow-hidden shadow-xl h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: "url('/assets/hero.jpg')" }} />
                </div>
            </div>
        </motion.section>
    );
};

export default Hero;
