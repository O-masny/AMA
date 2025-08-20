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

    // Plynulé sledování kurzoru (s malým offsetem, aby modal nekryl pointer)
    const springX = useSpring(0, { stiffness: 200, damping: 25 });
    const springY = useSpring(0, { stiffness: 200, damping: 25 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            springX.set(e.clientX + 32);
            springY.set(e.clientY + 32);
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [springX, springY]);

    // Debounce přepínání aktivního itemu (omezí blikání při rychlém přejezdu)
    const handleHover = (id: number | null) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setActive(id), 120);
    };

    const a = exhibitions.find((e) => e.id === active);

    return (
        <section
            id="exhibitions"
            className="relative w-full min-h-screen flex flex-col bg-background"
        >
            {/* Header nad seznamem */}
            <div className="px-6 md:px-10 pt-16 pb-24 md:pt-24">
                <h2 className="font-playfair font-extrabold leading-none
                       text-[14vw] md:text-[12vw] xl:text-[10vw]
                       text-foreground line-through decoration-primary decoration-[12px]">
                    EXHIBITIONS
                </h2>
            </div>
            {/* Obsah – list vlevo, modal se drží kurzoru */}
            <div className="relative z-10  w-full px-6 md:px-10 pb-24">
                <div className="flex justify-end items-end ">
                    {/* List u boku (vlevo), více prostoru (max-w-3xl) */}
                    <ul className="flex-1   md:space-y-12 ">
                        {exhibitions.map((ex) => (
                            <li
                                key={ex.id}
                                className="relative cursor-pointer group pb-4
                           after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0
                           after:h-px after:bg-border"
                                onMouseEnter={() => handleHover(ex.id)}
                                onMouseMove={() => handleHover(ex.id)}
                                onMouseLeave={() => handleHover(null)}
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

                                {/* Aktivní divider (plynule se přesouvá pod aktivní řádek) */}
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

            {/* Cursor Preview modal – zachováno chování nad kurzorem jako ve tvém funkčním snippetu */}
            <AnimatePresence>
                {active && a && (
                    <motion.div
                        style={{ x: springX, y: springY }}
                        className="fixed top-0 left-0 z-50 pointer-events-none"
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.86 }}
                        transition={{ duration: 0.22 }}
                    >
                        <div
                            className="relative w-[24rem] md:w-[26rem] h-[30rem] md:h-[32rem] overflow-hidden
                         bg-card border border-border shadow-2xl backdrop-blur-lg
                         [clip-path:polygon(8%_0%,100%_0%,92%_100%,0%_100%)]"
                        >
                            {/* dekorativní glow okraj */}
                            <div className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-70 mix-blend-screen
                              bg-[radial-gradient(120px_120px_at_20%_10%,hsl(var(--primary)/.35),transparent_60%),radial-gradient(140px_140px_at_90%_90%,hsl(var(--accent)/.28),transparent_60%)]" />

                            <img
                                src={a.image}
                                alt={a.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Skleněný overlay pro text */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/45 to-transparent p-6 flex flex-col justify-end">
                                <h4 className="text-2xl md:text-3xl font-playfair font-bold text-foreground mb-2">
                                    {a.title}
                                </h4>
                                <p className="text-sm md:text-base text-muted-foreground mb-1">{a.date}</p>
                                <p className="text-sm md:text-base text-muted-foreground mb-2">
                                    {a.gallery}, {a.location}
                                </p>
                                <p className="text-sm md:text-base text-muted-foreground line-clamp-3">
                                    {a.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Exhibitions;
