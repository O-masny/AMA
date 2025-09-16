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
        <footer className="relative z-10 py-24 bg-gradient-to-b from-foreground via-foreground/95 to-background overflow-hidden">
            {/* subtle grain / texture */}
            <div
                className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,
      <svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'>
        <filter id='noiseFilter'>
          <feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/>
        </filter>
        <rect width='100%' height='100%' filter='url(%23noiseFilter)' />
      </svg>")`,
                    backgroundRepeat: "repeat",
                }}
            />

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Branding */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-5xl md:text-6xl font-playfair font-bold tracking-widest mb-6 text-background"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Ateliér AMA
                    </motion.h2>
                    <motion.p
                        className="font-inter text-background/80 max-w-xl mx-auto text-lg md:text-xl italic"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Umění, které mluví k&nbsp;srdci. <span className="text-primary">Každé dílo je příběhem.</span>
                    </motion.p>
                </div>

                {/* Social Icons */}
                <motion.div
                    className="flex justify-center gap-6 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {socialLinks.map((link, index) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center rounded-full border border-background/30 text-background/80 hover:text-primary hover:border-primary transition-colors"
                            whileHover={{ scale: 1.15, rotate: 6 }}
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
                        className="font-inter text-sm text-background/60 text-center tracking-wide"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
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
