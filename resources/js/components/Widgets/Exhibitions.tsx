"use client";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Exhibition = {
    id: number;
    title: string;
    gallery: string;
    date: string;
    location: string;
    description: string;
    image: string;
    visitors: string;
};

const Exhibitions = () => {
    const exhibitions: Exhibition[] = [
        {
            id: 1,
            title: "Pastelové vize",
            gallery: "Galerie Moderna",
            date: "15. září - 30. listopadu 2024",
            location: "Praha",
            description:
                "Retrospektivní výstava zaměřená na pastelové kompozice posledních dvou let.",
            image: "/assets/pic1.jpg",
            visitors: "2,400+",
        },
        {
            id: 2,
            title: "Barvy emocí",
            gallery: "Kunsthalle Brno",
            date: "3. května - 15. července 2024",
            location: "Brno",
            description:
                "Společná výstava s mladými současnými malíři exploring emocionální rozměry umění.",
            image: "/assets/pic2.jpg",
            visitors: "3,100+",
        },
        {
            id: 3,
            title: "Dialogy s plátnami",
            gallery: "Městská galerie",
            date: "12. ledna - 28. března 2024",
            location: "Ostrava",
            description:
                "První samostatná výstava představující vývoj autorského stylu.",
            image: "/assets/pic3.jpg",
            visitors: "1,800+",
        },
    ];

    const [active, setActive] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Rozlišení zařízení
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    useEffect(() => {
        setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    // Plynulé sledování kurzoru
    const springX = useSpring(0, { stiffness: 200, damping: 25 });
    const springY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        if (isTouchDevice) return; // touch device neřeší myš
        const handleMove = (e: MouseEvent) => {
            springX.set(e.clientX + 32);
            springY.set(e.clientY + 32);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [springX, springY, isTouchDevice]);

    const handleHover = (id: number | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(id), 120);
    };

    const a = exhibitions.find((e) => e.id === active);

    // Výpočet pozice pro mobil (střed obrazovky)
    const touchX = typeof window !== "undefined" ? window.innerWidth / 2 - 192 : 0; // 24rem / 2
    const touchY = typeof window !== "undefined" ? window.innerHeight / 2 - 240 : 0; // 30rem / 2

    return (
        <section
            id="exhibitions"
            className="relative w-full min-h-screen flex flex-col bg-background"
        >
            <div className="px-6 md:px-10 pt-16 pb-24 md:pt-24">
                <h2
                    className="font-playfair font-extrabold leading-none
                     text-[14vw] md:text-[12vw] xl:text-[10vw]
                     text-foreground line-through decoration-primary decoration-[2px]"
                >
                    EXHIBITIONS
                </h2>
            </div>

            <div className="relative z-10 w-full px-6 md:px-10 pb-24">
                <div className="flex justify-end items-end">
                    <ul className="flex-1 md:space-y-12">
                        {exhibitions.map((ex) => (
                            <li
                                key={ex.id}
                                className="relative cursor-pointer group pb-4 ..."
                                onMouseEnter={!isTouchDevice ? () => handleHover(ex.id) : undefined}
                                onMouseMove={!isTouchDevice ? () => handleHover(ex.id) : undefined}
                                onMouseLeave={!isTouchDevice ? () => handleHover(null) : undefined}
                                onTouchStart={isTouchDevice ? () => setActive(active === ex.id ? null : ex.id) : undefined}
                            >
                                <span
                                    className={`block font-playfair font-bold
                          text-5xl md:text-6xl transition-colors
                          ${active === ex.id ? "text-primary" : "text-foreground group-hover:text-primary/80"}`}
                                >
                                    {ex.title}
                                </span>
                                <span className="block text-base md:text-lg text-muted-foreground italic">
                                    {ex.date} · {ex.gallery}
                                </span>

                                {active === ex.id && (
                                    <motion.div
                                        layoutId="active-underline"
                                        className="absolute bottom-0 left-0 h-[3px] bg-primary rounded-full"
                                        initial={false}
                                        animate={{ width: "100%" }}
                                        transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <AnimatePresence>
                {active && a && (
                    <>
                        {isTouchDevice && (
                            <div
                                className="fixed inset-0 z-40 bg-black/20"
                                onClick={() => setActive(null)}
                            />
                        )}
                        <motion.div
                            style={{
                                x: isTouchDevice ? touchX : springX,
                                y: isTouchDevice ? touchY : springY,
                            }}
                            className="fixed top-0 left-0 z-50"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25 }}
                        >
                            <motion.div
                                className="relative w-[24rem] h-[30rem] overflow-hidden rounded-2xl shadow-2xl"
                                whileHover={{ scale: 1.02 }}
                            >
                                <motion.img
                                    src={a.image}
                                    alt={a.title}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-6 flex flex-col justify-end">
                                    <motion.h4
                                        className="text-2xl font-playfair font-bold mb-2"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                    >
                                        {a.title}
                                    </motion.h4>
                                    <p className="text-sm text-muted-foreground">{a.date}</p>
                                    <p className="text-sm text-muted-foreground">{a.gallery}, {a.location}</p>
                                    <p className="text-sm text-muted-foreground">{a.visitors} návštěvníků</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

        </section>
    );
};

export default Exhibitions;
