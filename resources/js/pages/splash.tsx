"use client";
import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

export type SplashScreenProps = {
    onComplete?: () => void;
    logoText?: string;
    bgColor?: string; // pozadí celé sekce
    accent?: string; // barva expand vrstvy
    logoColor?: string; // počáteční barva loga
    logoTargetColor?: string; // cílová barva loga
};

const SplashScreen: React.FC<SplashScreenProps> = ({
    onComplete,
    logoText = "LOGO",
    bgColor = "#191919",
    accent = "#f5d300",
    logoColor = "#ffffff",
    logoTargetColor = "#292929",
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const layerMinRef = useRef<HTMLDivElement>(null);
    const layerExpRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        const min = layerMinRef.current;
        const exp = layerExpRef.current;
        const logo = logoRef.current;
        if (!root || !min || !exp || !logo) return;

        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const prevOverflow = document.documentElement.style.overflow;
        document.documentElement.style.overflow = "hidden";

        const ctx = gsap.context(() => {
            gsap.set(root, { opacity: 1 });
            gsap.set(logo, { opacity: 1, color: logoColor });
            gsap.set(min, {
                opacity: 1,
                backgroundColor: accent,
                clipPath: "polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh)",
            });
            gsap.set(exp, {
                opacity: 1,
                backgroundColor: accent,
                clipPath: "polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh)",
            });

            if (prefersReduced) {
                gsap.set(min, { opacity: 0 });
                gsap.set(exp, {
                    clipPath: "polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh)",
                    backgroundColor: accent,
                });
                document.documentElement.style.overflow = prevOverflow;
                onComplete?.();
                return;
            }

            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                onComplete: () => {
                    document.documentElement.style.overflow = prevOverflow;
                    onComplete?.();
                },
            });

            // 1) Shrink/minimize
            tl.addLabel("minStart", 1.0)
                .to(
                    min,
                    {
                        clipPath: "polygon(45vw 40vh, 55vw 40vh, 55vw 60vh, 45vw 60vh)",
                        duration: 0.2,
                        ease: "power1.out",
                    },
                    "minStart"
                )
                .to(min, { opacity: 0, duration: 1.3, ease: "power1.out" }, "minStart+=0.2");

            // 2) Logo → změní barvu, ale už nezmizí!
            tl.addLabel("logoColor", 1.5).to(
                logo,
                { color: logoTargetColor, duration: 0.3, ease: "power1.in" },
                "logoColor"
            );

            // 3) Expand vrstva
            tl.addLabel("expand", 2.7).to(
                exp,
                {
                    keyframes: [
                        {
                            clipPath: "polygon(0 0, 55vw 40vh, 55vw 60vh, 45vw 60vh)",
                            backgroundColor: "#ffffff",
                            duration: 0.7 * 0.25,
                        },
                        {
                            clipPath: "polygon(0 0, 100vw 0, 55vw 60vh, 45vw 60vh)",
                            backgroundColor: accent,
                            duration: 0.7 * 0.25,
                        },
                        {
                            clipPath: "polygon(0 0, 100vw 0, 55vw 60vh, 0 100vh)",
                            backgroundColor: "#ffffff",
                            duration: 0.7 * 0.25,
                        },
                        {
                            clipPath: "polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh)",
                            backgroundColor: accent,
                            duration: 0.7 * 0.25,
                        },
                    ],
                    ease: "none",
                },
                "expand"
            );

            // 4) Final fullscreen
            tl.to(
                exp,
                {
                    clipPath: "polygon(0 0, 100vw 0, 100vw 100vh, 0 100vh)",
                    backgroundColor: accent,
                    duration: 0.6,
                },
                3.7
            );
        }, root);

        return () => {
            ctx.revert();
            document.documentElement.style.overflow = prevOverflow;
        };
    }, [onComplete, accent, logoColor, logoTargetColor]);

    return (
        <section
            ref={rootRef}
            className="relative w-full h-screen flex items-center justify-center z-10"
            style={{ backgroundColor: bgColor }}
        >
            {/* LOGO – zůstává i po animaci */}
            <div
                ref={logoRef}
                className="text-3xl md:text-5xl font-semibold tracking-wide relative z-50"
                style={{ color: logoColor }}
            >
                {logoText}
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-8 h-px bg-neutral-500" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-2 w-8 h-px bg-neutral-500" />
            </div>

            <div ref={layerMinRef} className="absolute inset-0 z-10" />
            <div ref={layerExpRef} className="absolute inset-0 z-20" />
        </section>
    );
};

export default SplashScreen;
