"use client";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
    { name: "Galerie", hash: "gallery" },
    { name: "Vernisáže", hash: "exhibitions" },
    { name: "O mně", hash: "about" },
    { name: "Kontakt", hash: "contact" },
];

const overlayVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { duration: 0.3, when: "beforeChildren", staggerChildren: 0.1 },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } },
};

const Navigation = ({ isReady }: { isReady: boolean }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const lastScroll = useRef(0);
    const { url } = usePage();

    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;
            if (current > lastScroll.current && current > 50) setIsCollapsed(true);
            else if (current < lastScroll.current) setIsCollapsed(false);
            lastScroll.current = current;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const getHref = (hash: string) => (url === "/" ? `#${hash}` : `/#${hash}`);

    return (
        <>
            <motion.section
                initial="hidden"
                animate={isReady ? "visible" : "hidden"}
                variants={{
                    hidden: { opacity: 0, y: 60 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 1, ease: "easeOut" },
                    },
                }}
            >
                <motion.nav
                    role="navigation"
                    aria-label="Main"
                    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto"
                    animate={{ height: isCollapsed ? 56 : 88 }}
                    transition={{ type: "spring", stiffness: 120, damping: 20 }}
                >
                    <div className="relative flex items-center justify-between 
          bg-background/70 backdrop-blur-xl border border-border 
          rounded-2xl px-6 py-3 md:px-12 md:py-5 
          shadow-[0_0_25px_-5px_var(--tw-shadow-color)] shadow-primary/20">

                        {/* Desktop nav left */}
                        <motion.div
                            className="hidden md:flex items-center space-x-10"
                            animate={{ opacity: isCollapsed ? 0 : 1, y: isCollapsed ? -10 : 0 }}
                        >
                            {navItems.slice(0, 2).map((item) => (
                                <Link
                                    key={item.name}
                                    href={getHref(item.hash)}
                                    className="font-medium text-lg text-foreground relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-hover:left-0" />
                                </Link>
                            ))}
                        </motion.div>

                        <Link href="/" aria-label="Domů" className="mx-4 md:mx-8 flex-shrink-0">
                            <motion.div
                                animate={{ scale: isCollapsed ? 0.8 : 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className="relative w-20 h-10 md:w-28 md:h-14"
                            >
                                <img
                                    src="/assets/logo_white.svg"
                                    alt="AMA logo"
                                    className="object-contain"
                                    height={64}
                                    width={64}
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop nav right */}
                        <motion.div
                            className="hidden md:flex items-center space-x-10"
                            animate={{ opacity: isCollapsed ? 0 : 1, y: isCollapsed ? -10 : 0 }}
                        >
                            {navItems.slice(2).map((item) => (
                                <Link
                                    key={item.name}
                                    href={getHref(item.hash)}
                                    className="font-medium text-lg text-foreground relative group"
                                >
                                    {item.name}
                                    <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-hover:left-0" />
                                </Link>
                            ))}
                        </motion.div>

                        {/* Mobile button */}
                        <div className="flex md:hidden items-center">
                            <Button
                                size="icon"
                                variant="outline"
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                                className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {isMenuOpen ? (
                                        <motion.div
                                            key="x"
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                        >
                                            <X className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ opacity: 0, rotate: 90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: -90 }}
                                        >
                                            <Menu className="w-6 h-6" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>
                        </div>
                    </div>
                </motion.nav>

                {/* Mobile overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="show"
                            exit="exit"
                            className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center space-y-10"
                        >
                            {navItems.map((item) => (
                                <motion.div key={item.name} variants={itemVariants}>
                                    <Link
                                        href={getHref(item.hash)}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-3xl font-bold text-foreground hover:text-primary transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.section>
        </>
    );
}
export default Navigation;