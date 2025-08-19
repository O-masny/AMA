"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type Props = { onFinish: () => void };

export const SplashScreen = ({ onFinish }: Props) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // počkej na načtení fontu
        document.fonts.ready.then(() => setShow(true));
    }, []);

    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(() => onFinish(), 1200);
        }, 4000);

        return () => clearTimeout(timer);
    }, [show, onFinish]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    key="splash"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="fixed inset-0 bg-black z-50 flex items-center justify-center overflow-visible"
                >
                    {/* Jemné animované pozadí */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-800 via-pink-600 to-red-500 opacity-20 animate-pulse"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />

                    {/* Psací font */}
                    <motion.h1
                        className="relative text-white font-[adelia] text-8xl sm:text-7xl md:text-9xl p-12"
                        initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0, scale: 0.9 }}
                        animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1, scale: 1 }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                    >
                        adela masna
                    </motion.h1>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
