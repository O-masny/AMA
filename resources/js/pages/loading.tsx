"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
    isActive: boolean;
    onFinish?: () => void;
}

const LoadingScreen = ({ isActive, onFinish }: LoadingScreenProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!overlayRef.current) return;

        if (isActive) {
            setVisible(true);
            // Reset overlay
            gsap.set(overlayRef.current, { y: "100%", display: "flex" });

            // Animate overlay rising from bottom
            gsap.to(overlayRef.current, {
                y: "0%",
                duration: 1.2,
                ease: "power4.inOut",
            });
        } else if (visible) {
            // Animate overlay back down
            gsap.to(overlayRef.current, {
                y: "100%",
                duration: 1.2,
                ease: "power4.inOut",
                onComplete: () => {
                    setVisible(false);
                    onFinish?.();
                },
            });
        }
    }, [isActive, visible, onFinish]);

    if (!visible && !isActive) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black pointer-events-none"
        >
            {/* Logo */}
            <div className="relative z-10 font-playfair text-5xl font-bold text-white drop-shadow-xl">
                🎨 MyLogo
            </div>

            {/* Optional: liquid effect background */}
            <svg
                className="absolute bottom-0 left-0 w-full h-full"
                viewBox="0 0 1440 960"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,960 Q360,800 720,960 T1440,960 V0 H0 Z"
                    fill="url(#gradient1)"
                />
                <path
                    d="M0,960 Q480,700 960,960 T1440,960 V0 H0 Z"
                    fill="url(#gradient2)"
                    opacity="0.7"
                />
                <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#9b5de5" />
                        <stop offset="100%" stopColor="#f15bb5" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#fee440" />
                        <stop offset="100%" stopColor="#00bbf9" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default LoadingScreen;
