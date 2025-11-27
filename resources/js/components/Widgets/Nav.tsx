"use client";

import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTiktok } from "react-icons/fa";

const MotionMenu = motion.create ? motion.create(Menu) : motion(Menu);
const MotionX = motion.create ? motion.create(X) : motion(X);

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
    const { t } = useTranslation("common");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const lastScroll = useRef(0);
    const { url } = usePage();

    const navItems = [
        { name: t("nav.gallery"), hash: "gallery" },
        { name: t("nav.exhibitions"), hash: "exhibitions" },
        { name: t("nav.about"), hash: "about" },
        { name: t("nav.contact"), hash: "contact" },
    ];

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

    // When on the homepage, return a fragment so clicks scroll locally.
    // When off-homepage: for `contact` navigate to dedicated `/contact` page;
    // for other anchors navigate to the homepage with fragment so the index can scroll on mount.
    const getHref = (hash: string) => {
        if (url === "/") return `#${hash}`;
        if (hash === "contact") return "/contact";
        return `/#${hash}`;
    };

    const handleAnchorClick = (e: React.MouseEvent, hash: string) => {
        // If we're already on the homepage, intercept and smooth-scroll
        if (url === "/") {
            e.preventDefault();
            const id = hash;
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "start" });
            } else {
                // fallback: set the hash so other handlers may pick it up
                window.location.hash = `#${id}`;
            }
            setIsMenuOpen(false);
        }
        // otherwise allow Link/Inertia to navigate to the home or contact page
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
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
                aria-label="Main navigation"
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%]"
                animate={{ height: isCollapsed ? 56 : 88 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <div
                    className="relative flex items-center justify-between 
          bg-background/70 backdrop-blur-xl border border-border 
          rounded-2xl px-6 py-3 md:px-20 md:py-5 
          shadow-[0_0_25px_-5px_var(--tw-shadow-color)] shadow-primary/20"
                >
                    {/* Desktop left nav */}
                    <motion.div
                        className="hidden md:flex items-center space-x-10 flex-1 justify-start"
                        animate={{ opacity: isCollapsed ? 0 : 1, y: isCollapsed ? -10 : 0 }}
                    >
                        {navItems.slice(0, 2).map((item) => (
                            <Link
                                key={item.hash}
                                href={getHref(item.hash)}
                                onClick={(e) => handleAnchorClick(e, item.hash)}
                                className="font-medium text-lg text-foreground relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-hover:left-0" />
                            </Link>
                        ))}
                    </motion.div>

                    {/* Center logo */}
                    <Link href="/" aria-label={t("nav.home")} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
                        <motion.div
                            animate={{ scale: isCollapsed ? 0.8 : 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="relative w-10 h-10 md:w-28 md:h-14 flex items-center justify-center"
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

                    {/* Desktop right nav */}
                    <motion.div
                        className="hidden md:flex items-center space-x-10 flex-1 justify-end"
                        animate={{ opacity: isCollapsed ? 0 : 1, y: isCollapsed ? -10 : 0 }}
                    >
                        {navItems.slice(2).map((item) => (
                            <Link
                                key={item.hash}
                                href={getHref(item.hash)}
                                onClick={(e) => handleAnchorClick(e, item.hash)}
                                className="font-medium text-lg text-foreground relative group"
                            >
                                {item.name}
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary transition-all group-hover:w-full group-hover:left-0" />
                            </Link>
                        ))}
                    </motion.div>
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
                                    <MotionX
                                        key="x"
                                        initial={{ opacity: 0, rotate: -90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: 90 }}
                                        className="w-6 h-6"
                                    />
                                ) : (
                                    <MotionMenu
                                        key="menu"
                                        initial={{ opacity: 0, rotate: 90 }}
                                        animate={{ opacity: 1, rotate: 0 }}
                                        exit={{ opacity: 0, rotate: -90 }}
                                        className="w-6 h-6"
                                    />
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
                        className="fixed inset-0 bg-background/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div className="w-full max-w-lg px-8" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col items-start space-y-6 py-8">
                                {navItems.map((item) => (
                                    <motion.div key={item.hash} variants={itemVariants}>
                                        <Link
                                            href={getHref(item.hash)}
                                            onClick={(e) => { handleAnchorClick(e, item.hash); /* also close menu */ setIsMenuOpen(false); }}
                                            className="text-title font-bold text-foreground hover:text-primary transition-colors block"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social links + dismiss hint */}
                            <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <a href="https://www.instagram.com/adebscure" target="_blank" rel="noopener noreferrer" className="text-2xl text-primary-foreground hover:text-accent transition" aria-label="Instagram">
                                        <FaInstagram />
                                    </a>
                                    <a href="https://www.tiktok.com/@adebscure" target="_blank" rel="noopener noreferrer" className="text-2xl text-primary-foreground hover:text-accent transition" aria-label="TikTok">
                                        <FaTiktok />
                                    </a>
                                </div>

                                <div className="text-sm text-muted-foreground/80">Tap outside to dismiss</div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Navigation;
