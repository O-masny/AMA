"use client";

import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";

interface MagneticButtonProps {
    href?: string;
    children: React.ReactNode;
    className?: string;
    strength?: number; // magnet strength multiplier
    variant?: "default" | "outline" | "light";
}

export const MagneticButton = ({
    href,
    children,
    className = "",
    strength = 0.45,
    variant = "default",
}: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const magnetRadius = 150; // px radius where effect starts

        if (distance < magnetRadius) {
            const pull = (1 - distance / magnetRadius) * strength;
            x.set(deltaX * pull);
            y.set(deltaY * pull);
        } else {
            x.set(0);
            y.set(0);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const baseStyle =
        "relative inline-flex items-center justify-center px-10 py-5 rounded-full font-sans font-medium tracking-wide select-none cursor-pointer transition-all duration-300 active:scale-[0.97]";

    const variants = {
        default: `
      bg-[hsl(var(--foreground))] text-[hsl(var(--background))]
      shadow-[0_10px_25px_rgba(0,0,0,0.15)]
      hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)]
      hover:scale-[1.03]
    `,
        outline: `
      border-2 border-[hsl(var(--foreground))]
      text-[hsl(var(--foreground))]
      hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]
      hover:scale-[1.03]
    `,
        light: `
      bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]
      hover:bg-[hsl(var(--accent)/0.8)]
      hover:scale-[1.04]
    `,
    };

    const ButtonContent = (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: springX, y: springY }}
            className={clsx(baseStyle, variants[variant], className)}
        >
            <span className="relative z-10 text-lg">{children}</span>

            {/* Glow aura */}
            <motion.div
                className="absolute inset-0 rounded-full bg-[hsl(var(--primary))/40] blur-xl"
                animate={{ opacity: [0.2, 0.6, 0.2], scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            />
        </motion.div>
    );

    return href ? (
        <Link href={href} className="inline-block">
            {ButtonContent}
        </Link>
    ) : (
        ButtonContent
    );
};
