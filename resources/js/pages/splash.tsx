"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export type SplashScreenProps = {
    onComplete?: () => void;
    logoSrc?: string;
    bgColor?: string; // Tailwind bg class, e.g. "bg-primary"
    accent?: string;  // Tailwind color var, e.g. "var(--color-accent)"
};

const SplashScreen: React.FC<SplashScreenProps> = ({
    onComplete,
    logoSrc = "/assets/logo.svg",
    bgColor = "bg-primary",
    accent = "var(--color-accent)",
}) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
            onComplete?.();
        }, 3200);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {show && (
                <motion.section
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className={`fixed inset-0 flex items-center justify-center ${bgColor} z-50 overflow-hidden`}
                >
                    {/* Background morph */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                            scale: [0, 1.2, 10],
                            borderRadius: ["50%", "20%", "0%"],
                            backgroundColor: [accent, "hsl(var(--background))"],
                        }}
                        transition={{ duration: 2.6, ease: "easeInOut" }}
                        className="absolute inset-0"
                    />

                    {/* Logo entrance */}
                    <motion.img
                        src={logoSrc}
                        alt="Logo"
                        className="relative z-10 w-32 h-auto"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                </motion.section>

            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
