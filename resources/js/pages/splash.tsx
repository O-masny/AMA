"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export type SplashScreenProps = {
    onComplete?: () => void;
    logoSrc?: string;
    bgColor?: string;
    accent?: string;
};

const SplashScreen: React.FC<SplashScreenProps> = ({
    onComplete,
    logoSrc = "/assets/logo.svg", // defaultní cesta k logu
    bgColor = "#191919",
    accent = "#f5d300",
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
                    exit={{ opacity: 0, transition: { duration: 0.6 } }}
                    className="splash-screen fixed inset-0 flex items-center justify-center z-50"
                    style={{ backgroundColor: bgColor }}
                >
                    {/* LOGO IMAGE */}
                    <motion.img
                        src={logoSrc}
                        alt="Logo"
                        className="relative z-50 w-28 md:w-40 h-auto"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{
                            scale: [0.9, 1.05, 1],
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1.6,
                            ease: "easeInOut",
                            times: [0, 0.6, 1],
                        }}
                    />

                    {/* EXPANDING LAYER */}
                    <motion.div
                        initial={{ scale: 0, borderRadius: "50%" }}
                        animate={{
                            scale: [0, 2, 20],
                            borderRadius: ["50%", "30%", "0%"],
                            backgroundColor: [accent, "#fff", accent],
                        }}
                        transition={{ duration: 2.2, ease: "easeInOut" }}
                        className="absolute inset-0 z-20"
                    />
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default SplashScreen;
