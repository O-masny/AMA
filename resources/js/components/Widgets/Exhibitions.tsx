"use client";

import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { MagneticButton } from "../magnetic-button";

export type Exhibition = {
    id: number;
    title: string;
    gallery: string;
    date: string;
    location: string;
    description: string;
    visitors?: string;
    images: { id: number; image: string; caption?: string }[];
};

export interface ExhibitionsProps {
    exhibitions: Exhibition[];
}

const Exhibitions = ({ exhibitions }: ExhibitionsProps) => {
    const { t } = useTranslation();
    const { url } = usePage(); // kdybys chtěl vědět aktuální route apod.

    const [active, setActive] = useState<number | null>(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const springX = useSpring(0, { stiffness: 200, damping: 25 });
    const springY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        if (isTouchDevice) return;
        const handleMove = (e: MouseEvent) => {
            const boxW = 384,
                boxH = 480,
                margin = 24;
            const nearRight = e.clientX + boxW + margin > window.innerWidth;
            const nearBottom = e.clientY + boxH + margin > window.innerHeight;
            const offsetX = nearRight ? -boxW - margin : 32;
            const offsetY = nearBottom ? -boxH - margin : 32;
            springX.set(e.clientX + offsetX);
            springY.set(e.clientY + offsetY);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [isTouchDevice, springX, springY]);

    const handleHover = (id: number | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(id), 100);
    };

    const a = exhibitions.find((e) => e.id === active);

    const touchX = typeof window !== "undefined" ? window.innerWidth / 2 - 192 : 0;
    const touchY = typeof window !== "undefined" ? window.innerHeight / 2 - 240 : 0;

    return (
        <section
            id="exhibitions"
            className="relative w-full min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent)/.25)]"
        >
            {/* Intro */}
            <div className="px-6 md:px-10 pt-24 md:pt-32 pb-16">
                <motion.h2
                    className="font-display font-black leading-none text-[14vw] md:text-[10vw] text-foreground tracking-tight"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {t("exhibitions.title", "SERIES")}
                </motion.h2>

                <motion.p
                    className="mt-8 max-w-2xl text-lg md:text-2xl text-muted-foreground leading-relaxed font-light"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {t(
                        "exhibitions.description",
                        "Každá série představuje jedinečné téma – od introspektivních portrétů po abstraktní krajiny. Vstupte do jednotlivých světů, které dohromady tvoří mozaiku mé tvorby."
                    )}
                </motion.p>
            </div>

            {/* Series list */}
            <div className="relative z-10 w-full px-6 md:px-10 pb-32">
                <ul className="md:space-y-12">
                    {exhibitions.map((ex) => (
                        <li
                            key={ex.id}
                            className="relative cursor-pointer group pb-6"
                            onMouseEnter={!isTouchDevice ? () => handleHover(ex.id) : undefined}
                            onMouseLeave={!isTouchDevice ? () => handleHover(null) : undefined}
                        >
                            <Link href={`/exhibitions/${ex.id}`} className="block">
                                <span
                                    className={`block font-display font-semibold text-5xl md:text-7xl transition-colors ${active === ex.id
                                        ? "text-primary"
                                        : "text-foreground group-hover:text-primary/80"
                                        }`}
                                >
                                    {ex.title}
                                </span>
                                <span className="block text-base md:text-lg text-muted-foreground italic">
                                    {ex.date} · {ex.gallery}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Floating preview */}
            <AnimatePresence>
                {active && a && (
                    <>
                        {!isTouchDevice && (
                            <motion.div
                                style={{ x: springX, y: springY }}
                                className="fixed top-0 left-0 z-50 pointer-events-none"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                            >
                                <div className="relative w-[24rem] h-[30rem] overflow-hidden rounded-3xl shadow-artistic">
                                    <motion.img
                                        src={a.images[0]?.image}
                                        alt={a.title}
                                        className="w-full h-full object-cover"
                                        initial={{ scale: 1 }}
                                        animate={{ scale: 1.05 }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background)/.95)] via-[hsl(var(--background)/.5)] to-transparent p-6 flex flex-col justify-end">
                                        <h4 className="text-2xl font-display font-semibold mb-1">
                                            {a.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">{a.location}</p>
                                        <p className="text-sm text-muted-foreground">{a.date}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </>
                )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div
                className="relative z-20 py-32 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="font-display text-[10vw] md:text-[6vw] leading-none text-foreground mb-6 tracking-tight">
                    {t("exhibitions.cta_title", "Celá výstava")}
                </h3>
                <p className="max-w-xl text-muted-foreground text-lg md:text-xl mb-12">
                    {t(
                        "exhibitions.cta_text",
                        "Objevte všechny série v kompletní výstavě – příběhy, které spojuje světlo, barva a introspekce."
                    )}
                </p>
                <Link href="/exhibition">
                    <MagneticButton className="text-lg">
                        {t("exhibitions.cta_button", "Zobrazit výstavu")}
                    </MagneticButton>
                </Link>
            </motion.div>
        </section>
    );
};

export default Exhibitions;
