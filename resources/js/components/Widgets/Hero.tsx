"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = ({ isReady }: { isReady: boolean }) => {
    return (
        <motion.section
            className="relative flex flex-col items-center justify-center w-full min-h-screen px-6 text-center bg-background"
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            variants={{
                hidden: { opacity: 0, y: 60 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 1, ease: "easeOut" },
                },
            }}
        >
            {/* --- Dramatic Title --- */}
            <motion.h1
                className="text-[6rem] lg:text-[10rem] font-playfair font-extrabold leading-none tracking-tight text-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ staggerChildren: 0.08 }}
            >
                {Array.from("UMĚNÍ").map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h1>

            {/* --- Subheadline --- */}
            <motion.h2
                className="mt-6 text-3xl lg:text-5xl font-playfair italic font-light text-muted-foreground"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
            >
                které mluví
            </motion.h2>

            {/* --- Supporting Text --- */}
            <motion.p
                className="max-w-2xl mt-6 text-lg lg:text-xl font-inter text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
            >
                Objevte svět barev, emocí a příběhů skrze má plátna.
                Každé dílo je jedinečným oknem do světa fantazie a reality.
            </motion.p>

            {/* --- CTA Buttons --- */}
            <motion.div
                className="flex flex-wrap gap-4 mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
            >
                <Button
                    size="lg"
                    className="border-2 border-foreground bg-transparent text-foreground px-10 py-4 text-lg font-light tracking-wider rounded-full hover:bg-foreground hover:text-background transition-all"
                    onClick={() =>
                        document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    Prohlédnout galerii
                </Button>

                <Button
                    variant="outline"
                    size="lg"
                    className="border-2 border-foreground text-foreground px-10 py-4 text-lg font-light tracking-wider rounded-full hover:bg-foreground hover:text-background transition-all"
                    onClick={() =>
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
                    }
                >
                    O autorovi
                </Button>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
