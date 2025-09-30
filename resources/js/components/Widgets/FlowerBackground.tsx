"use client";

import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FlowerBackground() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        // napojení GSAP na Lenis – ale jen update, žádné refresh smyčky
        function raf(time: number) {
            lenis.raf(time);
            ScrollTrigger.update(); // jen update (žádné refresh)
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // scrollerProxy pro ScrollTrigger
        ScrollTrigger.scrollerProxy(document.body, {
            scrollTop(value) {
                if (typeof value === "number") {
                    lenis.scrollTo(value);
                } else {
                    return lenis.scroll.instance.scroll.y;
                }
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
        });

        // ✨ žádné ScrollTrigger.addEventListener("refresh")!
        ScrollTrigger.defaults({ scroller: document.body });
        ScrollTrigger.refresh();

        // 🌸 animace rostlin
        const ctx = gsap.context(() => {
            const stems = gsap.utils.toArray<SVGPathElement>(".stem path");

            stems.forEach((stem, i) => {
                const length = stem.getTotalLength();

                gsap.set(stem, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });

                gsap.to(stem, {
                    strokeDashoffset: 0,
                    opacity: 1,
                    duration: 2.5,
                    delay: i * 0.5,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: stem,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });

                gsap.to(stem, {
                    yPercent: gsap.utils.random(-10, 20),
                    xPercent: gsap.utils.random(-5, 5),
                    duration: gsap.utils.random(3, 6),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: i * 0.3,
                });
            });
        }, containerRef);

        return () => {
            ctx.revert();
            lenis.destroy();
            ScrollTrigger.killAll();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 pointer-events-none z-0 overflow-visible"
            aria-hidden
        >
            <svg
                viewBox="0 0 800 1200"
                className="absolute w-full h-full"
                style={{ filter: "blur(0.4px) opacity(0.65)" }}
            >
                <g className="stem" fill="none" strokeWidth={1.8}>
                    <path stroke="hsl(var(--accent))" d="M400,1200 C410,900 380,600 400,300" />
                    <path stroke="hsl(var(--primary))" d="M380,1200 C370,850 420,550 380,250" />
                    <path stroke="hsl(var(--muted-foreground))" d="M420,1200 C440,950 410,650 420,350" />
                    <path stroke="hsl(var(--foreground))" d="M440,1200 C430,1000 390,700 440,280" />
                </g>
            </svg>
        </div>
    );
}
