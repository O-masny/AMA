"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { Artwork } from "@/components/data/artworks";
import About from "@/components/Widgets/About";
import Contact from "@/components/Widgets/Contact";
import Exhibitions from "@/components/Widgets/Exhibitions";
import Footer from "@/components/Widgets/Footer";
import Gallery from "@/components/Widgets/Gallery";
import Hero from "@/components/Widgets/Hero";
import Navigation from "@/components/Widgets/Nav";
import LoadingProvider from "./loading_provider";

gsap.registerPlugin(ScrollTrigger);

interface IndexProps {
    featuredArtworks: Artwork[];
}

export const Index = ({ featuredArtworks }: IndexProps) => {
    const bgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = bgRef.current;
        if (!container) return;

        // 🌸 Animace abstraktního pozadí
        const flowers = container.querySelectorAll<SVGPathElement>(".flower path");
        gsap.fromTo(
            flowers,
            { strokeDashoffset: 1000, opacity: 0 },
            {
                strokeDashoffset: 0,
                opacity: 1,
                duration: 3,
                stagger: 0.3,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            }
        );

        // 🎯 Scroll animace jednotlivých sekcí (fade + rise)
        const sections = document.querySelectorAll<HTMLElement>("main > section");
        sections.forEach((section) => {
            gsap.fromTo(
                section,
                { opacity: 0, y: 50 },
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
        <LoadingProvider>


            <div className="relative min-h-screen">
                {/* Sticky animované pozadí */}
                <div
                    ref={bgRef}
                    className="fixed inset-0 w-full h-full z-0 pointer-events-none"
                >
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        <g className="flower" fill="none" strokeWidth={2}>
                            <path stroke="purple" d="M300,300 C350,250 400,350 300,300" />
                            <path stroke="pink" d="M300,300 C250,350 350,400 300,300" />
                            <path stroke="red" d="M300,300 C280,200 320,400 300,300" />
                            {/* Přidej víc path pro komplexní efekt */}
                        </g>
                    </svg>


                </div>

                {/* Obsah nad pozadím */}
                <Navigation />
                <main className="relative z-20">
                    <Hero />
                    <Gallery featuredArtworks={featuredArtworks} />
                    <Exhibitions />
                    <About />
                    <Contact />
                </main>
                <Footer />
            </div>
        </LoadingProvider>

    );
};

export default Index;
