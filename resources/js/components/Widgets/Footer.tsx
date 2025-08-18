const Footer = () => {
    return (
        <footer className="bg-foreground text-background py-12">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center">
                    <div className="text-3xl font-playfair font-bold mb-4">
                        Ateliér
                    </div>
                    <p className="font-inter text-background/80 mb-8 max-w-md mx-auto">
                        Umění, které mluví k srdci. Každé dílo je příběhem.
                    </p>

                    <div className="border-t border-background/20 pt-8">
                        <p className="font-inter text-sm text-background/60">
                            © 2024 Ateliér. Všechna práva vyhrazena.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;