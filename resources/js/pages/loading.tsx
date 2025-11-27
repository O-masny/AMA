"use client";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
    isActive: boolean;
    onFinish?: () => void;
}

const LoadingScreen = ({ isActive, onFinish }: LoadingScreenProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!overlayRef.current) return;

        if (isActive) {
            setVisible(true);

            // Reset positions
            gsap.set(overlayRef.current, { y: "100%", display: "flex" });
            gsap.set(logoRef.current, { opacity: 0, scale: 0.8 });

            const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

            // Entrance
            tl.to(overlayRef.current, { y: "0%", duration: 1.2 })
                .to(logoRef.current, { opacity: 1, scale: 1, duration: 1 }, "-=0.6")
                .to(logoRef.current, { opacity: 0, scale: 1.2, duration: 0.8, delay: 0.4 })
                .to(overlayRef.current, {
                    y: "-100%",
                    duration: 1.2,
                    onComplete: () => {
                        setVisible(false);
                        onFinish?.();
                    },
                });
        }
    }, [isActive, onFinish]);

    if (!visible && !isActive) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        >
            {/* Gradient background like liquid silk */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-art-rose/80 to-art-mint/80 animate-gradient-x blur-3xl" />

            {/* Light rays */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_20%,white_0%,transparent_70%)]" />

            {/* Animated Logo */}
            <div
                ref={logoRef}
                className="relative z-10 text-heading font-display font-extrabold text-white drop-shadow-lg tracking-wide"
            >
                Atelier AMA
            </div>

            {/* Subtle SVG texture */}
            <svg
                className="absolute bottom-0 left-0 w-full h-full opacity-30"
                viewBox="0 0 1440 960"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,960 Q360,780 720,960 T1440,960 V0 H0 Z"
                    fill="url(#gradient1)"
                />
                <path
                    d="M0,960 Q480,720 960,960 T1440,960 V0 H0 Z"
                    fill="url(#gradient2)"
                    opacity="0.6"
                />
                <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#f15bb5" />
                        <stop offset="100%" stopColor="#fee440" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#9b5de5" />
                        <stop offset="100%" stopColor="#00bbf9" />
                    </linearGradient>
                </defs>
            </svg>

            <style >{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 6s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
