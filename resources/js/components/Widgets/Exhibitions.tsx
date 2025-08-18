import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

const Exhibitions = () => {
    const exhibitions = [
        {
            id: 1,
            title: "Pastelové vize",
            gallery: "Galerie Moderna",
            date: "15. září - 30. listopadu 2024",
            location: "Praha",
            description: "Retrospektivní výstava zaměřená na pastelové kompozice posledních dvou let.",
            image: "/assets/pic1.jpg",
            status: "current",
            visitors: "2,400+"
        },
        {
            id: 2,
            title: "Barvy emocí",
            gallery: "Kunsthalle Brno",
            date: "3. května - 15. července 2024",
            location: "Brno",
            description: "Společná výstava s mladými současnými malíři exploring emocionální rozměry umění.",
            image: "/assets/pic1.jpg",
            status: "past",
            visitors: "3,100+"
        },
        {
            id: 3,
            title: "Dialogy s plátnami",
            gallery: "Městská galerie",
            date: "12. ledna - 28. března 2024",
            location: "Ostrava",
            description: "První samostatná výstava představující vývoj autorského stylu.",
            image: "/assets/pic1.jpg",
            status: "past",
            visitors: "1,800+"
        }
    ];

    const currentExhibitions = exhibitions.filter(ex => ex.status === "current");
    const pastExhibitions = exhibitions.filter(ex => ex.status === "past");

    return (
        <section id="exhibitions" className="py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2 className="text-display font-playfair font-bold text-primary mb-6">
                        Vernisáže & Výstavy
                    </h2>
                    <p className="text-xl font-inter text-muted-foreground max-w-2xl mx-auto">
                        Přehled aktuálních a proběhlých výstav, kde můžete spatřit má díla
                    </p>
                </div>

                {/* Current Exhibitions */}
                {currentExhibitions.length > 0 && (
                    <div className="mb-20">
                        <h3 className="text-heading font-playfair font-bold text-foreground mb-10 text-center">
                            Aktuální výstavy
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {currentExhibitions.map((exhibition) => (
                                <Card key={exhibition.id} className="overflow-hidden border-0 shadow-artistic bg-gradient-artistic p-1">
                                    <div className="bg-card rounded-lg overflow-hidden">
                                        <div className="relative h-64">
                                            <img
                                                src={exhibition.image}
                                                alt={exhibition.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-inter font-medium">
                                                    Aktuální
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-8">
                                            <h4 className="font-playfair font-bold text-2xl text-foreground mb-3">
                                                {exhibition.title}
                                            </h4>
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="font-inter">{exhibition.date}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="font-inter">{exhibition.gallery}, {exhibition.location}</span>
                                                </div>
                                                <div className="flex items-center gap-3 text-muted-foreground">
                                                    <Users className="w-4 h-4" />
                                                    <span className="font-inter">{exhibition.visitors} návštěvníků</span>
                                                </div>
                                            </div>
                                            <p className="font-inter text-foreground leading-relaxed mb-6">
                                                {exhibition.description}
                                            </p>
                                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-inter rounded-full">
                                                Více informací
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Past Exhibitions */}
                <div>
                    <h3 className="text-heading font-playfair font-bold text-foreground mb-10 text-center">
                        Proběhlé výstavy
                    </h3>
                    <div className="space-y-8">
                        {pastExhibitions.map((exhibition, index) => (
                            <Card
                                key={exhibition.id}
                                className={`overflow-hidden border-0 shadow-soft bg-card ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                                    } lg:flex`}
                            >
                                <div className="lg:w-1/2 relative">
                                    <img
                                        src={exhibition.image}
                                        alt={exhibition.title}
                                        className="w-full h-64 lg:h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                                </div>
                                <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                                    <h4 className="font-playfair font-bold text-2xl text-foreground mb-3">
                                        {exhibition.title}
                                    </h4>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Calendar className="w-4 h-4" />
                                            <span className="font-inter">{exhibition.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <MapPin className="w-4 h-4" />
                                            <span className="font-inter">{exhibition.gallery}, {exhibition.location}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Users className="w-4 h-4" />
                                            <span className="font-inter">{exhibition.visitors} návštěvníků</span>
                                        </div>
                                    </div>
                                    <p className="font-inter text-foreground leading-relaxed">
                                        {exhibition.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Exhibitions;