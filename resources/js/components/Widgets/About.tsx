import { Parallax, ScrollReveal } from "@/components/Widgets/ScrollAnimations";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section
            className="relative w-full min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 overflow-hidden flex items-center"
            aria-label="O autorovi"
        >
            {/* --- Floating Background Shapes (optimized, minimal layers) --- */}
            <Parallax speed={0.1}>
                <div className="absolute top-16 left-1/4 w-48 h-48 bg-pink-300 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
            </Parallax>
            <Parallax speed={-0.05}>
                <div className="absolute bottom-20 right-1/3 w-60 h-60 bg-purple-300 rounded-full opacity-15 blur-2xl pointer-events-none"></div>
            </Parallax>

            {/* --- Main Content Wrapper --- */}
            <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">

                {/* --- Hero Text Section --- */}
                <div className="col-span-12 lg:col-span-6 space-y-8 lg:space-y-12">
                    <ScrollReveal>
                        <motion.h1
                            className="text-6xl lg:text-8xl font-playfair font-extrabold text-primary leading-tight tracking-tight -rotate-1"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            O autorovi
                        </motion.h1>

                        <motion.p
                            className="text-lg lg:text-xl font-inter text-foreground max-w-xl leading-relaxed"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                        >
                            Jsem vášnivý umělec a tvůrce vizuálních příběhů. Moje práce kombinuje barvy, emoce a příběhy, které propojují fantazii s realitou. Každý obraz je experiment s formou a prostorem, kde hledám unikátní vizuální jazyk.
                        </motion.p>

                        <motion.div
                            className="flex flex-wrap gap-4 pt-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-inter px-8 py-4 rounded-full transition-all">
                                Kontaktovat mě
                            </Button>
                            <Button variant="outline" size="lg" className="border border-primary text-primary hover:bg-primary hover:text-white font-inter px-8 py-4 rounded-full transition-all">
                                Moje portfolio
                            </Button>
                        </motion.div>
                    </ScrollReveal>
                </div>

                {/* --- Hero Visual Section --- */}
                <div className="col-span-12 lg:col-span-6 relative flex justify-center lg:justify-end">
                    <ScrollReveal direction="right" delay={0.3}>
                        <motion.div
                            className="relative w-80 h-[28rem] lg:w-96 lg:h-[36rem] rounded-3xl overflow-hidden shadow-2xl cursor-pointer"
                            whileHover={{ scale: 1.05, rotate: 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <motion.img
                                src="/assets/pic1.jpg"
                                alt="Autor"
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.7 }}
                            />

                            {/* --- Floating Info Cards (optimized) --- */}
                            <Parallax speed={0.15}>
                                <div className="absolute -top-6 -left-10 w-24 h-24 bg-yellow-300 rounded-2xl opacity-50 blur-xl pointer-events-none"></div>
                            </Parallax>
                            <Parallax speed={-0.1}>
                                <div className="absolute bottom-6 right-6 w-28 h-28 bg-pink-300 rounded-2xl opacity-40 blur-lg pointer-events-none"></div>
                            </Parallax>
                        </motion.div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
};

export default About;
