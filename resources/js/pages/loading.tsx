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
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--background))]"
            aria-hidden={!isActive}
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--primary)/10%,transparent_30%)] mix-blend-overlay" />

            <div className="relative z-10 flex flex-col items-center gap-6 p-6">
                <div
                    ref={logoRef}
                    className="text-heading font-display font-extrabold text-foreground drop-shadow-lg tracking-wide text-center text-4xl md:text-5xl"
                >
                    Atelier AMA
                </div>

                {/* Subtle spinner */}
                <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />

                <div className="text-sm text-muted-foreground/80">Prosím chvíli vyčkejte…</div>
            </div>
        </div>
    );
};

export default LoadingScreen;
