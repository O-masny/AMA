import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Image, Menu, Phone, User, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const { url } = usePage<{ url: string }>().props; // aktuální route

    useEffect(() => {
        const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);
        return () => window.removeEventListener("mousemove", move);
    }, []);

    const navItems = [
        { name: "Galerie", hash: "gallery", icon: <Image className="w-5 h-5" /> },
        { name: "Vernisáže", hash: "exhibitions", icon: <Home className="w-5 h-5" /> },
        { name: "O mně", hash: "about", icon: <User className="w-5 h-5" /> },
        { name: "Kontakt", hash: "contact", icon: <Phone className="w-5 h-5" /> },
    ];

    const leftNav = navItems.slice(0, 2);
    const rightNav = navItems.slice(2);

    const getHref = (hash: string) =>
        url === "/" ? `#${hash}` : `/${`#${hash}`}`; // Pokud nejsme na home, přesměruj na /

    return (
        <>
            {/* --- Bottom Navbar --- */}
            <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto">
                <div className="relative flex items-center justify-between bg-background/80 backdrop-blur-lg border border-border shadow-artistic rounded-2xl px-6 py-4 md:px-12 md:py-6 transition-all duration-300">
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ x: cursorPos.x / 20, y: cursorPos.y / 20 }}
                        transition={{ type: "spring", stiffness: 80, damping: 30 }}
                    >
                        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
                    </motion.div>

                    <div className="hidden md:flex items-center space-x-12">
                        {leftNav.map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="relative font-playfair text-lg font-semibold text-foreground"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <Link href="/" className="mx-8">
                        <motion.div
                            className="text-2xl md:text-3xl font-playfair font-bold text-primary tracking-wide"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            AMA
                        </motion.div>
                    </Link>

                    <div className="hidden md:flex items-center space-x-12">
                        {rightNav.map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="relative font-playfair text-lg font-semibold text-foreground"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* --- Mobile Dock --- */}
                    <div className="flex md:hidden items-center justify-between w-full space-x-4">
                        {navItems.slice(0, 3).map((item) => (
                            <Link
                                key={item.name}
                                href={getHref(item.hash)}
                                className="flex flex-col items-center text-foreground hover:text-primary transition-colors"
                            >
                                {item.icon}
                                <span className="text-xs">{item.name}</span>
                            </Link>
                        ))}

                        <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground transition"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </Button>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-12"
                    >
                        {navItems.map((item, i) => (
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
