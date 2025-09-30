"use client";
import { Link } from "@inertiajs/react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExhibitionsProps } from "../data/exhibitions";


const Exhibitions = ({ exhibitions }: ExhibitionsProps) => {
    const [active, setActive] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    const springX = useSpring(0, { stiffness: 200, damping: 25 });
    const springY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        if (isTouchDevice) return;
        const handleMove = (e: MouseEvent) => {
            springX.set(e.clientX + 32);
            springY.set(e.clientY + 32);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [isTouchDevice]);

    const handleHover = (id: number | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(id), 120);
    };

    const a = exhibitions.find((e) => e.id === active);
    const imgs = a?.images ?? [];

    const [imgIndex, setImgIndex] = useState(0);
    useEffect(() => {
        if (imgs.length > 1) {
            const interval = setInterval(() => {
                setImgIndex((i) => (i + 1) % imgs.length);
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [imgs]);

    const touchX = typeof window !== "undefined" ? window.innerWidth / 2 - 192 : 0;
    const touchY = typeof window !== "undefined" ? window.innerHeight / 2 - 240 : 0;

    return (
        <section id="exhibitions" className="relative w-full min-h-screen flex flex-col bg-background">
            <div className="px-6 md:px-10 pt-16 pb-24 md:pt-24">
                <h2 className="font-playfair font-extrabold leading-none text-[14vw] md:text-[12vw] xl:text-[10vw] text-foreground line-through decoration-primary decoration-[2px]">
                    EXHIBITIONS
                </h2>
            </div>

            <div className="relative z-10 w-full px-6 md:px-10 pb-24">
                <div className="flex justify-end items-end">
                    <ul className="flex-1 md:space-y-12">
                        {exhibitions.map((ex) => (
                            <li
                                key={ex.id}
                                className="relative cursor-pointer group pb-4"
                                onMouseEnter={!isTouchDevice ? () => handleHover(ex.id) : undefined}
                                onMouseLeave={!isTouchDevice ? () => handleHover(null) : undefined}
                            >
                                <Link href={`/exhibitions/${ex.id}`}>
                                    <span
                                        className={`block font-playfair font-bold text-5xl md:text-6xl transition-colors ${active === ex.id ? "text-primary" : "text-foreground group-hover:text-primary/80"
                                            }`}
                                    >
                                        {ex.title}
                                    </span>
                                </Link>
                                <span className="block text-base md:text-lg text-muted-foreground italic">
                                    {ex.date} · {ex.gallery}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <AnimatePresence>
                {active && a && imgs.length > 0 && (
                    <motion.div
                        style={{ x: isTouchDevice ? touchX : springX, y: isTouchDevice ? touchY : springY }}
                        className="fixed top-0 left-0 z-50"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25 }}
                    >
                        <motion.div className="relative w-[24rem] h-[30rem] overflow-hidden rounded-2xl shadow-2xl">
                            <motion.img
                                key={imgs[imgIndex]?.id}
                                src={imgs[imgIndex]?.image}
                                alt={a.title}
                                className="w-full h-full object-cover"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 flex flex-col justify-end">
                                <motion.h4 className="text-2xl font-playfair font-bold mb-2">{a.title}</motion.h4>
                                <p className="text-sm text-muted-foreground">{a.date}</p>
                                <p className="text-sm text-muted-foreground">{a.gallery}, {a.location}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Exhibitions;
