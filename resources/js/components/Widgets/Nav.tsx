import { Button } from "@/components/ui/button";
import { Link } from "@inertiajs/react";
import { useState } from "react";

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: "Galerie", href: "#gallery" },
        { name: "Vernisáže", href: "#exhibitions" },
        { name: "O mně", href: "#about" },
        { name: "Kontakt", href: "#contact" }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/">
                        <div className="text-2xl font-playfair font-bold text-primary">
                            AMA
                        </div>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <div className="w-6 h-6 flex flex-col justify-center">
                            <span
                                className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-1" : ""
                                    }`}
                            />
                            <span
                                className={`block h-0.5 w-6 bg-foreground mt-1 transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-1" : ""
                                    }`}
                            />
                        </div>
                    </Button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-border">
                        <div className="flex flex-col space-y-4 pt-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="font-inter font-medium text-foreground hover:text-primary transition-colors duration-200"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;