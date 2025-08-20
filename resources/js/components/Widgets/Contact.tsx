import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

import { Variants, easeOut } from "framer-motion";

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (custom: number = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: custom * 0.2,
            duration: 0.8,
            ease: easeOut, // správný typ pro Easing
        },
    }),
};

const Contact = () => {
    return (
        <section id="contact" className="relative py-32 overflow-hidden">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-art-rose via-art-mint to-art-lavender opacity-20 animate-gradient-slow pointer-events-none"></div>

            <div className="px-6 md:px-10 pt-16 pb-24 md:pt-24 relative z-10">
                {/* Large Stylized Heading */}
                <motion.h2
                    initial={{ opacity: 0, x: -150 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="font-playfair font-extrabold leading-none
                     text-[14vw] md:text-[12vw] xl:text-[10vw]
                     text-foreground line-through decoration-primary decoration-[2px]">
                    CONTACT
                </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto px-6">
                {/* Intro Text */}
                <div className="text-center mb-20">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeUp}
                        className="text-display font-playfair font-bold text-primary mb-6">
                        Kontakt
                    </motion.h2>
                    <motion.p
                        initial="hidden"
                        whileInView="visible"
                        variants={fadeUp}
                        className="text-xl font-inter text-muted-foreground max-w-2xl mx-auto">
                        Pojďme spolu vytvořit něco krásného. Kontaktujte mě pro zakázky,
                        výstavy nebo jen tak pro umělecký rozhovor.
                    </motion.p>
                </div>

                <div className="magazine-layout gap-16">
                    {/* Left Contact Info */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        className="col-span-12 lg:col-span-5 space-y-8">
                        <motion.div custom={1} variants={fadeUp}>
                            <h3 className="font-playfair font-bold text-2xl text-foreground mb-6">
                                Spojme se
                            </h3>
                            <div className="space-y-6">
                                {/* Email */}
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-art-rose rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-inter font-medium text-foreground">Email</div>
                                        <a href="mailto:atelier@example.com" className="font-inter text-muted-foreground hover:text-primary transition-colors">
                                            atelier@example.com
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Phone */}
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-art-lavender rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-inter font-medium text-foreground">Telefon</div>
                                        <a href="tel:+420123456789" className="font-inter text-muted-foreground hover:text-primary transition-colors">
                                            +420 123 456 789
                                        </a>
                                    </div>
                                </motion.div>

                                {/* Address */}
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-art-mint rounded-xl flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-inter font-medium text-foreground">Ateliér</div>
                                        <div className="font-inter text-muted-foreground">
                                            Umělecká čtvrť<br />
                                            Praha 7, Česká republika
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Social Media */}
                        <motion.div custom={2} variants={fadeUp}>
                            <h4 className="font-playfair font-bold text-xl text-foreground mb-4">
                                Sledujte mě
                            </h4>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="rounded-full border-art-rose hover:bg-art-rose transition-all duration-300">
                                    <Instagram className="w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full border-art-lavender hover:bg-art-lavender transition-all duration-300">
                                    <Facebook className="w-5 h-5" />
                                </Button>
                            </div>
                        </motion.div>

                        {/* Atelier Card */}
                        <motion.div custom={3} variants={fadeUp}>
                            <Card className="p-6 border-0 bg-gradient-artistic hover:shadow-2xl transition-shadow duration-500">
                                <h4 className="font-playfair font-bold text-lg text-foreground mb-4">
                                    Ateliér - návštěvy
                                </h4>
                                <div className="space-y-2 font-inter text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-foreground">Po předchozí domluvě</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground">Sobota</span>
                                        <span className="text-muted-foreground">10:00 - 16:00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-foreground">Neděle</span>
                                        <span className="text-muted-foreground">Zavřeno</span>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </motion.div>

                    {/* Right Contact Form */}
                    <motion.div initial="hidden" whileInView="visible" className="col-span-12 lg:col-span-7">
                        <Card className="p-8 border-0 shadow-artistic hover:shadow-2xl transition-shadow duration-500">
                            <h3 className="font-playfair font-bold text-2xl text-foreground mb-6">
                                Napište mi
                            </h3>
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block font-inter font-medium text-foreground mb-2">
                                            Jméno
                                        </label>
                                        <Input
                                            placeholder="Vaše jméno"
                                            className="border-border focus:ring-primary transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-inter font-medium text-foreground mb-2">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="vas@email.com"
                                            className="border-border focus:ring-primary transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-inter font-medium text-foreground mb-2">
                                        Předmět
                                    </label>
                                    <Input
                                        placeholder="Čeho se dotaz týká?"
                                        className="border-border focus:ring-primary transition-all duration-300"
                                    />
                                </div>

                                <div>
                                    <label className="block font-inter font-medium text-foreground mb-2">
                                        Zpráva
                                    </label>
                                    <Textarea
                                        placeholder="Vaše zpráva..."
                                        rows={6}
                                        className="border-border focus:ring-primary resize-none transition-all duration-300"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium rounded-full transition-all duration-300"
                                >
                                    Odeslat zprávu
                                </Button>
                            </form>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
