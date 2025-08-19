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
