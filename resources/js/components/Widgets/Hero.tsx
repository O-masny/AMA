"use client";

import CTAButton from "@/components/ui/CTAButton";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

const HeroVariant2 = ({ isReady }: { isReady: boolean }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

    // more subtle offsets to match site feel
    const xLeft = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const xRight = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

    const { t } = useTranslation("common");

    return (
        <section ref={ref} className="relative w-full min-h-screen bg-background overflow-hidden">
            {/* Floating geometric shapes */}
            <motion.div
                className="absolute top-20 right-1/4 w-32 h-32 border-4 border-black rotate-45"
                animate={{
                    y: [0, -20, 0],
                    rotate: [45, 60, 45]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute bottom-32 left-1/3 w-24 h-24 bg-black rounded-full"
                animate={{
                    scale: [1, 1.2, 1],
                    y: [0, 15, 0]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 6,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-1/3 left-1/4 w-16 h-16"
                animate={{
                    rotate: [0, 360]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 20,
                    ease: "linear"
                }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" stroke="black" strokeWidth="2" fill="none" />
                    <line x1="50" y1="10" x2="50" y2="90" stroke="black" strokeWidth="2" />
                </svg>
            </motion.div>

            <div className="max-w-7xl mx-auto h-screen flex items-start md:items-center px-6">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full items-center pt-24 md:pt-12 lg:pt-0"
                    initial="hidden"
                    animate={isReady ? "visible" : "hidden"}
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
                >
                    {/* Left Side - Text */}
                    <motion.div
                        style={{ x: xLeft }}
                        className="space-y-8 z-10"
                    >
                        <motion.div
                            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-1 bg-black" />
                                <span className="text-sm font-mono tracking-widest">{t("hero.portfolio")}</span>
                            </div>

                            <h1 className="font-display font-extrabold leading-tight text-foreground mb-8 text-6xl md:text-7xl lg:text-7xl">
                                {t("hero.mainHeading")}
                            </h1>
                        </motion.div>

                        <motion.p
                            className="text-xl text-muted-foreground max-w-md leading-relaxed"
                            variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
                        >
                            {t("hero.description")}
                        </motion.p>

                        <motion.div className="flex items-center gap-6 pt-4" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}>
                            <CTAButton href="#gallery">{t("hero.ctaGallery")}</CTAButton>
                            <a href="#contact" className="text-foreground font-semibold flex items-center gap-2 group">{t("nav.contact")}
                                <motion.span className="text-2xl" animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Visual */}
                    <motion.div style={{ x: xRight }} className="relative h-[520px] md:h-[600px]">
                        <motion.div
                            className="absolute inset-0 grid grid-cols-2 gap-4"
                            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } }}
                        >
                            <motion.div className="relative overflow-hidden" variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }} whileHover={{ scale: 1.03 }} style={{ scale }}>
                                <img src="/assets/pic1.jpg" alt="Ukázka tvorby - 1" className="w-full h-full object-cover" />
                                <motion.div className="absolute inset-0 bg-transparent hover:bg-black/5 transition-colors duration-300" />
                            </motion.div>

                            <motion.div className="relative overflow-hidden mt-12"
                                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src="/assets/pic2.jpg" alt="Ukázka tvorby - 2" className="w-full h-full object-cover" />
                                <motion.div
                                    className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
                                />
                            </motion.div>

                            <motion.div className="relative overflow-hidden -mt-12"
                                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src="/assets/pic4.jpg" alt="Ukázka tvorby - 4" className="w-full h-full object-cover" />
                                <motion.div
                                    className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
                                />
                            </motion.div>

                            <motion.div className="relative overflow-hidden"
                                variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } } }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <img src="/assets/pic1.jpg" alt="Ukázka tvorby - 1" className="w-full h-full object-cover" />
                                <motion.div
                                    className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom accent line */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-2 bg-black"
                initial={{ scaleX: 0 }}
                animate={isReady ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.8 }}
                style={{ originX: 0 }}
            />
        </section>
    );
};

export default HeroVariant2;