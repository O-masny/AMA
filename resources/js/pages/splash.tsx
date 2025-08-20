"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const SplashScreen = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1️⃣ Animace abstraktního pozadí (květiny)
        const flowers = container.querySelectorAll<SVGPathElement>(".flower path");
        if (flowers.length) {
            gsap.fromTo(
                flowers,
                { strokeDashoffset: 1000, opacity: 0 },
                {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 2,
                    stagger: 0.2,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.inOut",
                }
            );
        }

        // 2️⃣ Animace sekcí při scrollu
        const sections = container.querySelectorAll<HTMLElement>(".section");
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        end: "bottom top",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full">
            {/* 🌸 Animované pozadí */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 600"
            >
                <g className="flower" fill="none" strokeWidth={2}>
                    <path stroke="purple" d="M300,300 C350,250 400,350 300,300" />
                    <path stroke="pink" d="M300,300 C250,350 350,400 300,300" />
                    <path stroke="red" d="M300,300 C280,200 320,400 300,300" />
                    {/* Přidejte více path pro složitější efekt */}
                </g>
            </svg>

            {/* ✨ Splash screen text */}
            <h1 className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl font-[adelia] text-white z-20">
                adela masna
            </h1>

            {/* 📄 Obsahové sekce */}
            <div className="relative z-10">
                <section className="section min-h-screen flex items-center justify-center text-white text-4xl">
                    Sekce 1
                </section>
                <section className="section min-h-screen flex items-center justify-center text-white text-4xl">
                    Sekce 2
                </section>
                <section className="section min-h-screen flex items-center justify-center text-white text-4xl">
                    Sekce 3
                </section>
            </div>
        </div>
    );
};
