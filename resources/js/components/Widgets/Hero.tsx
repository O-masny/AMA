import { Button } from "@/components/ui/button";
import { Parallax, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-pink-50 via-yellow-50 to-purple-100">

            {/* --- Background Layers --- */}
            <Parallax speed={0.2}>
                <div className="absolute inset-0">
                    <motion.div
                        className="w-full h-full bg-gradient-to-tr from-pink-400 via-pink-200 to-yellow-100 opacity-20"
                        animate={{ scale: [1, 1.05, 1], rotate: [0, 1, -1] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </Parallax>

            {/* --- Floating Shapes --- */}
            <motion.div
                className="absolute top-1/4 left-1/3 w-6 h-6 bg-green-300 rounded-full opacity-80"
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-pink-300 rounded-full opacity-60"
                animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            />
            <motion.div
                className="absolute top-3/4 right-1/6 w-8 h-8 bg-purple-300 rounded-full opacity-50"
                animate={{ y: [0, -15, 0], x: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* --- Content Container --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">

                {/* --- Typographic Hero --- */}
                <div className="col-span-12 lg:col-span-7 space-y-6 lg:space-y-10">
                    <ScrollReveal>
                        <motion.h1
                            className="text-[6rem] lg:text-[8rem] font-playfair font-black text-primary leading-none -rotate-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            UMĚNÍ
                        </motion.h1>
                        <motion.h2
                            className="text-4xl lg:text-5xl font-playfair font-bold text-foreground leading-tight"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            které mluví
                        </motion.h2>
                        <motion.p
                            className="text-xl font-inter text-muted-foreground max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Objevte svět barev, emocí a příběhů skrze má plátna. Každé dílo je jedinečným oknem do světa fantazie a reality.
                        </motion.p>
                    </ScrollReveal>

                    {/* --- CTA Buttons --- */}
                    <ScrollReveal direction="up" delay={0.9}>
                        <div className="flex flex-wrap gap-4 pt-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    className="bg-primary hover:bg-primary/90 text-white font-inter font-medium px-8 py-6 text-lg rounded-full"
                                    onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    Prohlédnout galerii
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border border-primary text-primary hover:bg-primary hover:text-white font-inter font-medium px-8 py-6 text-lg rounded-full"
                                    onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                                >
                                    O autorovi
                                </Button>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* --- Artwork --- */}
                <div className="col-span-12 lg:col-span-5 relative">
                    <ScrollReveal direction="right" delay={0.4}>
                        <motion.div
                            className="group relative w-full h-[28rem] lg:h-[36rem] overflow-hidden rounded-[2rem] shadow-2xl"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <motion.img
                                src="/assets/pic2.jpg"
                                alt="Ukázka z tvorby"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.7 }}
                            />

                            {/* Layered floating shapes */}
                            <Parallax speed={0.2}>
                                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-pink-300 rounded-full opacity-60 blur-2xl"></div>
                            </Parallax>
                            <Parallax speed={-0.1}>
                                <div className="absolute -top-6 -left-6 w-28 h-28 bg-purple-300 rounded-full opacity-40 blur-xl"></div>
                            </Parallax>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
