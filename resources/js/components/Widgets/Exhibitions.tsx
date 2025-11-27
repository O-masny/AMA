"use client";

import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ExhibitionsProps } from "../data/exhibitions";
import { MagneticButton } from "../magnetic-button";


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
    console.log(exhibitions)
    const touchX = typeof window !== "undefined" ? window.innerWidth / 2 - 192 : 0;
    const touchY = typeof window !== "undefined" ? window.innerHeight / 2 - 240 : 0;
    const firstImage = a?.galleries?.[0]?.image ?? null;

    return (
        <section
            id="exhibitions"
            className="relative w-full min-h-screen bg-gradient-to-b from-[hsl(var(--background))] to-[hsl(var(--accent)/.25)]"
        >
            {/* Intro */}
            <div className="px-6 md:px-10 pt-24 md:pt-32 pb-16">
                <motion.h2
                    className="font-display font-extrabold leading-none text-display text-foreground tracking-tight"
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
                                <div className="flex items-center gap-6">
                                    {/* Left thumbnail (always visible) */}
                                    <div className="w-16 h-16 md:w-28 md:h-20 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                                        <img
                                            src={ex.galleries?.[0]?.image ? `/storage/${ex.galleries[0].image}` : `/assets/placeholder.png`}
                                            alt={ex.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <span
                                            className={`block font-display font-semibold text-heading md:text-display transition-colors ${active === ex.id
                                                ? "text-primary"
                                                : "text-foreground group-hover:text-primary/80"
                                                }`}
                                        >
                                            {ex.title}
                                        </span>
                                        <span className="block text-base md:text-lg text-muted-foreground italic">
                                            {ex.date} · {ex.gallery}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Floating preview */}
            <AnimatePresence>
                {active && a && firstImage && (
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
                                        src={`/storage/${firstImage}`}
                                        alt={a.title ?? ""}
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

            {/* Right-side thumbnails (desktop) */}
            <AnimatePresence>
                {active && a && a.galleries && a.galleries.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4"
                    >
                        {a.galleries.slice(0, 6).map((g, idx) => (
                            <div
                                key={g.image + idx}
                                className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg cursor-pointer group"
                                aria-hidden
                            >
                                <img
                                    src={`/storage/${g.image}`}
                                    alt={a.title ?? ''}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <span className="absolute top-1 left-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-semibold rounded">{(idx + 1).toString().padStart(2, '0')}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA */}
            <motion.div
                className="relative z-20 py-32 flex flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h3 className="font-display text-display md:text-heading leading-none text-foreground mb-6 tracking-tight">
                    {t("exhibitions.cta_title", "Celá výstava")}
                </h3>
                <p className="max-w-xl text-muted-foreground text-lg md:text-xl mb-12">
                    {t(
                        "exhibitions.cta_text",
                        "Objevte všechny série v kompletní výstavě – příběhy, které spojuje světlo, barva a introspekce."
                    )}
                </p>
                <Link href="/exhibitions">
                    <MagneticButton className="text-lg">
                        {t("exhibitions.cta_button", "Zobrazit výstavu")}
                    </MagneticButton>
                </Link>
            </motion.div>
        </section>
    );
};

export default Exhibitions;
