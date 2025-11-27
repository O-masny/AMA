"use client";

import { motion } from "framer-motion";

interface CategoryFilterProps {
    categories?: string[] | null;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
    categories,
    selectedCategory,
    setSelectedCategory,
}) => {
    const hasCategories = categories && categories.length > 0;

    return (
        <section className="py-8 bg-background/90 sticky top-0 z-30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-center gap-4 overflow-x-auto scrollbar-hide">
                    {hasCategories ? (
                        categories!.map((category, index) => {
                            const isSelected = selectedCategory === category;
                            return (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`relative px-6 py-3 rounded-full font-sans font-medium text-base md:text-lg transition-all duration-500 whitespace-nowrap
                  ${isSelected
                                            ? "text-primary-foreground"
                                            : "text-card-foreground hover:text-foreground"
                                        }`}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.08 }}
                                >
                                    {category}
                                    {isSelected && (
                                        <motion.span
                                            layoutId="activeCategory"
                                            className="absolute inset-0 rounded-full bg-primary shadow-md -z-10"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.3,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                </motion.button>
                            );
                        })
                    ) : (
                        <motion.span
                            className="text-muted-foreground font-sans text-base md:text-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Žádné kategorie k dispozici
                        </motion.span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CategoryFilter;
