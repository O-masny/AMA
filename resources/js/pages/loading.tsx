"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface LoadingScreenProps {
    isActive: boolean;
    onFinish?: () => void;
}

// A painterly, artist-focused loading screen: draws a brush stroke SVG,
// then gently spawns colored paint blobs while revealing the site name.
const LoadingScreen = ({ isActive, onFinish }: LoadingScreenProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isActive) setVisible(true);
        if (!isActive) setVisible(false);
    }, [isActive]);

    useEffect(() => {
        if (!visible) return;
        const timer = setTimeout(() => {
            // Auto-finish after the sequence (matches splash timing)
            onFinish?.();
        }, 2600);
        return () => clearTimeout(timer);
    }, [visible, onFinish]);

    const { t } = useTranslation("common");

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.4 } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--background))]"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--primary)/6%,transparent_30%)] mix-blend-overlay" />

                    <div className="relative z-10 flex flex-col items-center gap-6 p-6">
                        <svg viewBox="0 0 600 140" className="w-64 h-auto" aria-hidden>
                            <defs>
                                <linearGradient id="g1" x1="0%" x2="100%">
                                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d="M20 90 C120 10, 300 10, 580 80"
                                fill="none"
                                stroke="url(#g1)"
                                strokeWidth="18"
                                strokeLinecap="round"
                                strokeDasharray="600"
                                strokeDashoffset="600"
                                initial={{ strokeDashoffset: 600 }}
                                animate={{ strokeDashoffset: 0 }}
                                transition={{ duration: 1.6, ease: "easeInOut" }}
                            />
                            <motion.text
                                x="50%"
                                y="92"
                                textAnchor="middle"
                                className="font-display text-[18px] fill-[hsl(var(--foreground))]"
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.6, duration: 0.6 }}
                            >
                                {t("brand.name")}
                            </motion.text>
                        </svg>

                        {/* paint blobs */}
                        <div className="relative w-40 h-12">
                            {[
                                { x: 6, color: "#FF7A7A", d: 0 },
                                { x: 34, color: "#FFD57A", d: 120 },
                                { x: 64, color: "#8DE1C8", d: 240 },
                            ].map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: [0, 1.1, 1], opacity: [0, 1, 1] }}
                                    transition={{ delay: 1 + i * 0.18, duration: 0.7, ease: "easeOut" }}
                                    style={{ left: `${b.x}px`, background: b.color }}
                                    className="absolute top-0 w-6 h-6 rounded-full shadow-md"
                                />
                            ))}
                        </div>

                        <div className="text-sm text-muted-foreground/80">{t("splash.loading")}</div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
