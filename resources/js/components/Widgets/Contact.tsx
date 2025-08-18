import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
    return (
        <section id="contact" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="text-display font-playfair font-bold text-primary mb-6">
                        Kontakt
                    </h2>
                    <p className="text-xl font-inter text-muted-foreground max-w-2xl mx-auto">
                        Pojďme spolu vytvořit něco krásného. Kontaktujte mě pro zakázky,
                        výstavy nebo jen tak pro umělecký rozhovor.
                    </p>
                </div>

                <div className="magazine-layout gap-16">
                    {/* Contact Info */}
                    <div className="col-span-12 lg:col-span-5 space-y-8">
                        <div>
                            <h3 className="font-playfair font-bold text-2xl text-foreground mb-6">
                                Spojme se
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-art-rose rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-inter font-medium text-foreground">Email</div>
                                        <a href="mailto:atelier@example.com" className="font-inter text-muted-foreground hover:text-primary transition-colors">
                                            atelier@example.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-art-lavender rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-foreground" />
                                    </div>
                                    <div>
                                        <div className="font-inter font-medium text-foreground">Telefon</div>
                                        <a href="tel:+420123456789" className="font-inter text-muted-foreground hover:text-primary transition-colors">
                                            +420 123 456 789
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
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
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div>
                            <h4 className="font-playfair font-bold text-xl text-foreground mb-4">
                                Sledujte mě
                            </h4>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="rounded-full border-art-rose hover:bg-art-rose">
                                    <Instagram className="w-5 h-5" />
                                </Button>
                                <Button variant="outline" size="icon" className="rounded-full border-art-lavender hover:bg-art-lavender">
                                    <Facebook className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Gallery Hours */}
                        <Card className="p-6 border-0 bg-gradient-artistic">
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
                    </div>

                    {/* Contact Form */}
                    <div className="col-span-12 lg:col-span-7">
                        <Card className="p-8 border-0 shadow-artistic">
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
                                            className="border-border focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-inter font-medium text-foreground mb-2">
                                            Email
                                        </label>
                                        <Input
                                            type="email"
                                            placeholder="vas@email.com"
                                            className="border-border focus:ring-primary"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-inter font-medium text-foreground mb-2">
                                        Předmět
                                    </label>
                                    <Input
                                        placeholder="Čeho se dotaz týká?"
                                        className="border-border focus:ring-primary"
                                    />
                                </div>

                                <div>
                                    <label className="block font-inter font-medium text-foreground mb-2">
                                        Zpráva
                                    </label>
                                    <Textarea
                                        placeholder="Vaše zpráva..."
                                        rows={6}
                                        className="border-border focus:ring-primary resize-none"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-inter font-medium rounded-full"
                                >
                                    Odeslat zprávu
                                </Button>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;