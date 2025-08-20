import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const socialLinks = [
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn" },
];

const Footer = () => {
    return (
        <footer className="bg-foreground text-background relative z-10 py-16">
            <div className="max-w-7xl mx-auto px-6">
                {/* Branding */}
                <div className="text-center mb-12">
                    <motion.h2
                        className="text-4xl md:text-5xl font-playfair font-bold mb-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Ateliér AMA
                    </motion.h2>
                    <motion.p
                        className="font-inter text-background/70 max-w-lg mx-auto text-lg md:text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Umění, které mluví k srdci. Každé dílo je příběhem.
                    </motion.p>
                </div>

                {/* Social Icons */}
                <motion.div
                    className="flex justify-center gap-6 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-background/80 text-2xl md:text-3xl hover:text-primary transition-colors"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {link.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Divider */}
                <div className="border-t border-background/20 pt-6">
                    <motion.p
                        className="font-inter text-sm text-background/60 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        © 2024 Ateliér Adéla Masná Bočková. Všechna práva vyhrazena.
                    </motion.p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
