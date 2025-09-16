"use client";

import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const About = () => {
    const ref = useRef<HTMLElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isDesktop = windowWidth >= 1024;

    // --- Step opacity pro texty
    const stepsOpacity = [
        useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]),
        useTransform(scrollYProgress, [0.3, 0.45, 0.65], [0, 1, 0]),
        useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]),
    ];

    // --- Hue rotate pro obrázky
    const hueRotate = useTransform(scrollYProgress, [0, 1], isDesktop ? [0, 120] : [0, 60]);
    const filterStyle = useMotionTemplate`hue-rotate(${hueRotate}deg)`;

    const images = ["/assets/pic1.jpg", "/assets/pic2.jpg", "/assets/pic3.jpg"];

    return (
        <section ref={ref} className="relative h-[350vh]" aria-label="O autorovi">
            <div className="sticky top-0 h-screen flex flex-col lg:flex-row items-start lg:items-center overflow-visible">
                {/* --- TITLE */}
                <motion.h2
                    initial={{ opacity: 0, y: -100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="font-playfair font-extrabold leading-none select-none 
    text-[clamp(5rem,18vw,10rem)] line-through decoration-primary decoration-[2px] 
    text-foreground/20 mix-blend-overlay absolute top-0 left-0 z-0">
                    ABOUT ME
                </motion.h2>

                {/* --- LEFT: Timeline --- */}
                <div className="relative flex-1 flex items-center justify-center">
                    <div className="relative h-[80%] w-1 bg-gradient-to-b from-primary to-art-rose rounded-full" />

                    {[
                        {
                            title: "Experimenty s barvou",
                            text: "Dialog mezi barvou a emocí – někdy jemně, někdy explozivně.",
                        },
                        {
                            title: "Spojení reality a fantazie",
                            text: "Malba je nástrojem, jak realitu přetavit do snového světa.",
                        },
                        {
                            title: "Moje mise",
                            text: "Chci vytvářet vizuální příběhy, které se dotýkají emocí.",
                        },
                    ].map((step, index) => {
                        const opacity = useTransform(
                            scrollYProgress,
                            [0 + index * 0.3, 0.2 + index * 0.3, 0.4 + index * 0.3],
                            [0, 1, 0]
                        );
                        const y = useTransform(
                            scrollYProgress,
                            [0 + index * 0.3, 0.2 + index * 0.3, 0.4 + index * 0.3],
                            [40, 0, -40]
                        );

                        return (
                            <motion.div
                                key={index}
                                style={{ opacity, y }}
                                className={`absolute left-6 flex flex-col space-y-2 ${index === 0 ? "top-[10%]" : index === 1 ? "top-[40%]" : "top-[70%]"
                                    }`}
                            >
                                <div className="w-6 h-6 rounded-full bg-primary shadow-lg mb-2" />
                                <h3 className="font-playfair text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground max-w-xs">{step.text}</p>
                            </motion.div>
                        );
                    })}
                </div>


                {/* --- RIGHT: paralax */}
                <div
                    className={`relative w-full lg:w-1/2 ${isDesktop ? "h-[90vh]" : "h-[50vh] mt-6"
                        } rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl`}
                >
                    {images.map((src, index) => {
                        const y = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -50 : 50]);
                        return (
                            <motion.div
                                key={index}
                                className="absolute inset-0 bg-cover bg-center pointer-events-none"
                                style={{
                                    backgroundImage: `url('${src}')`,
                                    opacity: stepsOpacity[index],
                                    filter: filterStyle,
                                    y,
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default About;
