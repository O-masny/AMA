// useLenis.ts
import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";

export const useLenis = () => {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Inicializace Lenis pouze na klientovi
        lenisRef.current = new Lenis({
            smoothWheel: true,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        const raf = (time: number) => {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            // Cleanup při unmount
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
};
