import { Button } from "@/components/ui/button";
import { Parallax, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { motion } from "framer-motion";

const Hero = () => {
    return (
        <section className="relative w-full min-h-screen overflow-hidden">
            {/* --- Background Image + Overlay --- */}
            <div className="absolute inset-0">
                <img
                    src="/assets/pic4.jpg"
                    alt="Artistic Background"
                    className="w-full h-full object-cover object-center opacity-80"
                />
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
            </div>

            {/* --- Floating Geometric Shapes --- */}
            <Parallax speed={0.15}>
                <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-primary/30 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-1/3 right-1/5 w-32 h-32 bg-accent/25 rounded-full blur-2xl animate-float-medium"></div>
                <div className="absolute top-3/4 right-1/6 w-48 h-48 bg-secondary/25 rounded-full blur-3xl animate-float-slow"></div>
            </Parallax>

            {/* --- Hero Content Container --- */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-12 gap-8 items-center min-h-[80vh]">
                {/* --- Text Block --- */}
                <div className="col-span-12 lg:col-span-7 space-y-6 lg:space-y-10">
                    <ScrollReveal>
                        <motion.h1
                            className="text-[8rem] lg:text-[12rem] font-playfair font-extrabold leading-none tracking-tight text-foreground -rotate-1"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            UMĚNÍ
                        </motion.h1>

                        <motion.h2
                            className="text-5xl lg:text-6xl font-playfair font-light italic text-muted-foreground -translate-x-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                        >
                            které mluví
                        </motion.h2>

                        <motion.p
                            className="text-xl lg:text-2xl font-inter text-muted-foreground max-w-2xl leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Objevte svět barev, emocí a příběhů skrze má plátna. Každé dílo je
                            jedinečným oknem do světa fantazie a reality.
                        </motion.p>
                    </ScrollReveal>

                    {/* --- CTA Buttons --- */}
                    <ScrollReveal direction="up" delay={0.9}>
                        <div className="flex flex-wrap gap-4 pt-8">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    className="bg-transparent border-2 border-foreground text-foreground px-10 py-4 text-lg font-light tracking-wider rounded-full hover:bg-foreground hover:text-background transition-transform duration-300"
                                    onClick={() =>
                                        document
                                            .getElementById("gallery")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                >
                                    Prohlédnout galerii
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-foreground text-foreground px-10 py-4 text-lg font-light tracking-wider rounded-full hover:bg-foreground hover:text-background transition-transform duration-300"
                                    onClick={() =>
                                        document
                                            .getElementById("about")
                                            ?.scrollIntoView({ behavior: "smooth" })
                                    }
                                >
                                    O autorovi
                                </Button>
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* --- Artwork / Image --- */}
                <div className="col-span-12 lg:col-span-5 relative">
                    <ScrollReveal direction="right" delay={0.4}>
                        <motion.div
                            className="group relative w-full h-[28rem] lg:h-[36rem] overflow-hidden shadow-2xl 
              [clip-path:polygon(10%_0%,100%_5%,90%_100%,0%_95%)] 
              hover:ring-4 hover:ring-primary/30 transition-all duration-500"
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
                                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/40 rounded-full blur-2xl"></div>
                            </Parallax>
                            <Parallax speed={-0.1}>
                                <div className="absolute -top-6 -left-6 w-28 h-28 bg-accent/30 rounded-full blur-xl"></div>
                            </Parallax>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default Hero;
