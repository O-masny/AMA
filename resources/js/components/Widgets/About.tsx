"use client";
import { Button } from "@/components/ui/button";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const About = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // --- Krokové opacity pro texty
    const step1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
    const step2Opacity = useTransform(scrollYProgress, [0.3, 0.45, 0.65], [0, 1, 0]);
    const step3Opacity = useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]);

    // --- Posun textů (společný)
    const stepY = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

    // --- Hue rotate pro obrázky
    const hueRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
    const filterStyle = useMotionTemplate`hue-rotate(${hueRotate}deg)`;

    const images = [
        "/assets/pic1.jpg",
        "/assets/pic2.jpg",
        "/assets/pic3.jpg",
    ];

    // --- Mapování opacity obrázků přes stejný interval jako text
    const imageOpacities = [
        useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]),
        useTransform(scrollYProgress, [0.3, 0.45, 0.65], [0, 1, 0]),
        useTransform(scrollYProgress, [0.65, 0.8, 1], [0, 1, 1]),
    ];

    return (
        <section ref={ref} className="relative h-[350vh]" aria-label="O autorovi">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Background Title */}
                <motion.h2
                    className="absolute left-0 -top-10 font-playfair font-extrabold text-[18vw] md:text-[12vw] text-foreground/10 tracking-tight leading-none select-none"
                    style={{ y: stepY }}
                >
                    <h2 className="font-playfair font-extrabold leading-none
                       text-[14vw] md:text-[12vw] xl:text-[10vw]
                       text-foreground line-through decoration-primary decoration-[12px]">
                        ABOUT ME
                    </h2>
                </motion.h2>

                <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 items-center relative">



                    {/* LEFT – Texty */}
                    <div className="col-span-12 lg:col-span-5 relative space-y-10 z-10">
                        <motion.div style={{ opacity: step1Opacity, y: stepY }} className="space-y-6">
                            <h3 className="text-5xl lg:text-6xl font-bold font-playfair text-primary -rotate-1">
                                Experimenty s barvou
                            </h3>
                            <p className="text-lg text-foreground leading-relaxed">
                                V každém díle hledám dialog mezi barvou a emocí – někdy jemně, někdy explozivně.
                            </p>
                        </motion.div>

                        <motion.div style={{ opacity: step2Opacity, y: stepY }} className="space-y-6 absolute top-0 left-0">
                            <h3 className="text-5xl lg:text-6xl font-bold font-playfair text-primary rotate-1">
                                Spojení reality a fantazie
                            </h3>
                            <p className="text-lg text-foreground leading-relaxed">
                                Malba je pro mě nástrojem, jak realitu přetavit do snového světa a dát divákovi klíč k vlastní interpretaci.
                            </p>
                        </motion.div>

                        <motion.div style={{ opacity: step3Opacity, y: stepY }} className="space-y-6 absolute top-0 left-0">
                            <h3 className="text-5xl lg:text-6xl font-bold font-playfair text-primary">
                                Moje mise
                            </h3>
                            <p className="text-lg text-foreground leading-relaxed">
                                Chci vytvářet vizuální příběhy, které se dotýkají emocí a přinášejí unikátní perspektivu.
                            </p>
                            <div className="flex gap-4 pt-6">
                                <Button size="lg" className="bg-primary text-white rounded-full px-8">
                                    Kontaktovat mě
                                </Button>
                                <Button variant="outline" size="lg" className="rounded-full px-8">
                                    Moje portfolio
                                </Button>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT – Parallax Images */}
                    <div className="col-span-12 w-full  lg:col-span-7 relative h-[80vh] lg:h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl">
                        {images.map((src, index) => (
                            <motion.div
                                key={index}
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `url('${src}')`,
                                    opacity: imageOpacities[index],
                                    y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]),
                                    filter: filterStyle,
                                }}
                            />
                        ))}

                        {/* Dynamické overlayy */}
                        <motion.div style={{ opacity: step2Opacity }} className="absolute inset-0 bg-pink-500/20 mix-blend-overlay" />
                        <motion.div style={{ opacity: step3Opacity }} className="absolute inset-0 bg-black/40" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
