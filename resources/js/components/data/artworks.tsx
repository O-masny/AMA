export interface Artwork {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    description: string;
    technique: string;
    dimensions: string;
    price?: string;
    available: boolean;
    story?: string;
}

export const artworks: Artwork[] = [
    {
        id: "1",
        title: "Pastelové sny",
        category: "Abstraktní",
        year: "2024",
        image: "/assets/pic1.jpg",
        description: "Jemná kompozice v pastelových tónech",
        technique: "Akryl na plátně",
        dimensions: "80 x 60 cm",
        price: "15 000 Kč",
        available: true,
        story: "Toto dílo vzniklo během tiché zimní noci, kdy jsem meditoval nad křehkostí okamžiku. Pastelové barvy zde reprezentují jemnost lidských emocí a jejich proměnlivost v čase."
    },
    {
        id: "2",
        title: "Energie barev",
        category: "Abstraktní",
        year: "2024",
        image: "/assets/pic2.jpg",
        description: "Dynamické ztvárnění emocí",
        technique: "Olej na plátně",
        dimensions: "100 x 80 cm",
        price: "25 000 Kč",
        available: true,
        story: "Exploze barev a energie - takto vnímám život ve své plnosti. Každý tah štětce zde má svůj důvod, každá barva svůj hlas v symfonii vizuálních emocí."
    },
    {
        id: "3",
        title: "Tiché momenty",
        category: "Krajiny",
        year: "2023",
        image: "/assets/pic1.jpg",
        description: "Meditativní pohledy na přírodu",
        technique: "Akvarel",
        dimensions: "50 x 70 cm",
        price: "12 000 Kč",
        available: false,
        story: "Série zachycující okamžiky klidu v přírodě. Každý detail je malován s láskou k tichu, které nás obklopuje v momentech hlubokého pozorování."
    },
    {
        id: "4",
        title: "Lidská povaha",
        category: "Portréty",
        year: "2023",
        image: "/assets/pic2.jpg",
        description: "Studie charakterů a výrazů",
        technique: "Uhel a pastel",
        dimensions: "60 x 80 cm",
        price: "18 000 Kč",
        available: true,
        story: "Portréty nejsou jen zobrazením tváře - jsou okny do duše. V každé linii hledám pravdu o člověku, kterého maluji."
    },
    {
        id: "5",
        title: "Městské rytmy",
        category: "Experimentální",
        year: "2024",
        image: "/assets/pic1.jpg",
        description: "Abstraktní interpretace městského života",
        technique: "Smíšená technika",
        dimensions: "120 x 90 cm",
        price: "30 000 Kč",
        available: true,
        story: "Město má svou vlastní hudbu - zvuky aut, kroky lidí, šepot větru mezi budovami. Toto dílo je mou vizuální interpretací této městské symfonie."
    },
    {
        id: "6",
        title: "Vzpomínky na léto",
        category: "Krajiny",
        year: "2023",
        image: "/assets/pic2.jpg",
        description: "Nostalgické zachycení letních momentů",
        technique: "Akryl na plátně",
        dimensions: "90 x 70 cm",
        price: "20 000 Kč",
        available: true,
        story: "Léto je v mé paměti spojeno s nekonečnými dny plnými světla a tepla. Tyto vzpomínky se snažím zachytit v každém tahu štětce."
    }
];

export const categories = ["Vše", "Abstraktní", "Portréty", "Krajiny", "Experimentální"];