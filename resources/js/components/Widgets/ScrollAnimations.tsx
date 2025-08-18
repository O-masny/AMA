import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ReactNode, useRef } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
    duration?: number;
    className?: string;
}

export const ScrollReveal = ({
    children,
    direction = "up",
    delay = 0,
    duration = 0.6,
    className = ""
}: ScrollRevealProps) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={variants}
            transition={{ duration, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface ParallaxProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export const Parallax = ({ children, speed = 0.5, className = "" }: ParallaxProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100]);
    const springY = useSpring(y, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            ref={ref}
            style={{ y: springY }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

interface StickyScrollProps {
    children: ReactNode;
    className?: string;
}

export const StickyScroll = ({ children, className = "" }: StickyScrollProps) => {
    return (
        <div className={`sticky top-0 ${className}`}>
            {children}
        </div>
    );
};

interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export const HorizontalScroll = ({ children, className = "" }: HorizontalScrollProps) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className={`relative h-[300vh] ${className}`}>
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex gap-8"
                >
                    {children}
                </motion.div>
            </div>
        </section>
    );
};

interface FadeInStaggerProps {
    children: ReactNode[];
    staggerDelay?: number;
    className?: string;
}

export const FadeInStagger = ({ children, staggerDelay = 0.1, className = "" }: FadeInStaggerProps) => {
    const [ref, inView] = useInView({
        threshold: 0.1,
        triggerOnce: true
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
        }
    };

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
            className={className}
        >
            {children.map((child, index) => (
                <motion.div key={index} variants={itemVariants} transition={{ duration: 0.6 }}>
                    {child}
                </motion.div>
            ))}
        </motion.div>
    );
};