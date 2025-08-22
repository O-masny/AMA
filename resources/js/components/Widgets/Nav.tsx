"use client";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Image, Menu, Phone, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const lastScroll = useRef(0);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);
    const { url } = usePage<{ url: string }>().props;

    useEffect(() => {
        const onScroll = () => {
            const current = window.scrollY;
            if (current > lastScroll.current && current > 50) {
                // scroll down
                setIsCollapsed(true);
            } else if (current < lastScroll.current) {
                // scroll up
                setIsCollapsed(false);
            }
            lastScroll.current = current;
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navItems = [
        { name: "Galerie", hash: "gallery", icon: <Image className="w-5 h-5" /> },
        { name: "Vernisáže", hash: "exhibitions", icon: <Home className="w-5 h-5" /> },
        { name: "O mně", hash: "about", icon: <User className="w-5 h-5" /> },
        { name: "Kontakt", hash: "contact", icon: <Phone className="w-5 h-5" /> },
    ];

    const leftNav = navItems.slice(0, 2);
    const rightNav = navItems.slice(2);

    const getHref = (hash: string) => (url === "/" ? `#${hash}` : `/${`#${hash}`}`);

    return (
        <>
            <motion.nav
                className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto"
                initial={false}
                animate={{ height: isCollapsed ? 60 : 96 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
            >
                <motion.div
                    className="relative flex items-center justify-between bg-background/80 backdrop-blur-lg border border-border shadow-artistic rounded-2xl px-6 py-4 md:px-12 md:py-6 transition-all duration-300 w-full"
                >
                    {/* efekt parallaxu kurzoru */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ x: cursorPos.x / 20, y: cursorPos.y / 20 }}
                        transition={{ type: "spring", stiffness: 80, damping: 30 }}
                    >
                        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                    </motion.div>

                    {/* Left nav items */}
                    <motion.div
                        className="hidden md:flex items-center space-x-12"
                        animate={{ width: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        {leftNav.map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="font-playfair text-lg font-semibold text-foreground transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>

                    {/* Logo always centered */}
                    <Link href="/" className="mx-4 md:mx-8 flex-shrink-0">
                        <motion.div
                            className="text-2xl md:text-3xl font-playfair font-bold text-primary tracking-wide"
                            whileHover={{ scale: 1.05 }}
                        >
                            AMA
                        </motion.div>
                    </Link>

                    {/* Right nav items */}
                    <motion.div
                        className="hidden md:flex items-center space-x-12"
                        animate={{ width: isCollapsed ? 0 : "auto", opacity: isCollapsed ? 0 : 1 }}
                        transition={{ type: "spring", stiffness: 120, damping: 20 }}
                    >
                        {rightNav.map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="font-playfair text-lg font-semibold text-foreground transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>

                    {/* Mobile dock */}
                    <div className="flex md:hidden items-center space-x-4">
                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </motion.div>
            </motion.nav>


            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-12"
                    >
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="text-3xl font-playfair font-bold text-foreground hover:text-primary transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
