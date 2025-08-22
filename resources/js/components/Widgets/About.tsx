"use client";

import { Button } from "@/components/ui/button";
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
                    className="font-playfair font-extrabold tracking-tight leading-none select-none text-[clamp(5rem,18vw,10rem)] line-through decoration-primary decoration-[2px] mb-8 lg:mb-0 lg:absolute lg:top-0 lg:left-0 z-20"
                >
                    ABOUT ME
                </motion.h2>

                {/* --- LEFT: text */}
                <div className="flex-1 flex flex-col justify-center z-10 w-full lg:w-1/2 space-y-6">
                    {[
                        {
                            title: "Experimenty s barvou",
                            text: "V každém díle hledám dialog mezi barvou a emocí – někdy jemně, někdy explozivně.",
                            rotate: "-1deg",
                        },
                        {
                            title: "Spojení reality a fantazie",
                            text: "Malba je pro mě nástrojem, jak realitu přetavit do snového světa a dát divákovi klíč k vlastní interpretaci.",
                            rotate: "1deg",
                        },
                        {
                            title: "Moje mise",
                            text: "Chci vytvářet vizuální příběhy, které se dotýkají emocí a přinášejí unikátní perspektivu.",
                            rotate: "0deg",
                            buttons: true,
                        },
                    ].map((step, index) => (
                        <motion.div
                            key={index}
                            style={{ opacity: stepsOpacity[index] }}
                            className="flex flex-col space-y-3"
                        >
                            <h3
                                className="text-3xl md:text-4xl lg:text-6xl font-bold font-playfair text-primary"
                                style={{ rotate: step.rotate }}
                            >
                                {step.title}
                            </h3>
                            <p className="text-base md:text-lg text-foreground leading-relaxed">{step.text}</p>
                            {step.buttons && (
                                <div className="flex gap-4 pt-4 flex-wrap">
                                    <Button size="lg" className="bg-primary text-white rounded-full px-8">
                                        Kontaktovat mě
                                    </Button>
                                    <Button variant="outline" size="lg" className="rounded-full px-8">
                                        Moje portfolio
                                    </Button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* --- RIGHT: paralax */}
                <div
                    className={`relative w-full lg:w-1/2 ${isDesktop ? "h-[90vh]" : "h-[50vh] mt-6"
                        } rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl`}
                >
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="absolute inset-0 bg-cover bg-center pointer-events-none"
                            style={{
                                backgroundImage: `url('${src}')`,
                                opacity: stepsOpacity[index],
                                filter: filterStyle,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
