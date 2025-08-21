import { motion } from "framer-motion";

interface CategoryFilterProps {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <section className="py-16 bg-background/90">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-8 py-4 rounded-full font-inter font-medium text-lg transition-all duration-500 ${selectedCategory === category
                                    ? "bg-primary text-primary-foreground shadow-soft scale-110"
                                    : "bg-card text-card-foreground hover:bg-art-rose hover:text-foreground hover:scale-105"
                                }`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryFilter;
