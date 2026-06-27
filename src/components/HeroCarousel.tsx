import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { ArrowRight, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UI_TRANSLATIONS } from "../data";

interface HeroCarouselProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  lang: "en" | "th";
  dormMode: boolean;
}

export default function HeroCarousel({ recipes, onSelectRecipe, lang, dormMode }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const t = UI_TRANSLATIONS[lang];

  // Take the top recipes
  const trendingRecipes = [...recipes]
    .sort((a, b) => b.todayViews - a.todayViews)
    .slice(0, 3);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % trendingRecipes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, trendingRecipes.length]);

  if (trendingRecipes.length === 0) return null;

  const activeRecipe = trendingRecipes[activeIndex];

  // Helper to render budget badge
  const getBudgetBadge = (recipe: Recipe) => {
    if (!recipe.estimatedCost) return null;
    const { amount } = recipe.estimatedCost;
    return {
      text: `฿${amount} Est.`,
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200"
    };
  };

  const budgetBadge = getBudgetBadge(activeRecipe);

  return (
    <div 
      id="hero-carousel-container"
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        dormMode 
          ? "bg-[#faf6ff] border-purple-200/50 shadow-md" 
          : "bg-white border-neutral-200/80 shadow-xs"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative min-h-[460px] w-full flex flex-col md:flex-row">
        
        {/* Carousel Info Card */}
        <div className="flex-1 flex flex-col justify-between p-8 sm:p-12 md:w-1/2">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRecipe.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 flex-1 flex flex-col justify-center"
            >
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 text-white text-[9px] uppercase tracking-[0.2em] font-bold rounded-full mb-4 ${
                  dormMode ? "bg-purple-600" : "bg-[#FF6F61]"
                }`}>
                  {dormMode && <GraduationCap className="h-3 w-3" />}
                  {dormMode ? (lang === "en" ? "Dorm Picks of the Day" : "เมนูเด่นเด็กหอวันนี้") : (lang === "en" ? "Featured Creation" : "สูตรเด็ดแนะนำ")}
                </span>
                
                {/* Title & Origin */}
                <div className="space-y-2">
                  <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#FF6F61] uppercase flex items-center gap-1.5 flex-wrap">
                    <span>{activeRecipe.origin.flag}</span>
                    <span className={dormMode ? "text-purple-700" : "text-neutral-500"}>
                      {activeRecipe.origin.cuisine} &bull; {activeRecipe.origin.region}
                    </span>
                    {budgetBadge && (
                      <span className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full border ${budgetBadge.bg}`}>
                        {budgetBadge.text}
                      </span>
                    )}
                  </span>
                  
                  <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] text-neutral-800 tracking-tight">
                    {activeRecipe.title}
                  </h1>
                  
                  <p className="text-neutral-500 font-sans italic text-base leading-relaxed max-w-lg pt-1">
                    "{activeRecipe.subtitle}"
                  </p>
                </div>
              </div>

              {/* Stat details in Clean Minimalism style */}
              <div className="flex gap-8 border-t border-b border-neutral-100 py-4 my-2">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">{t.label_prep_time}</span>
                  <span className="text-sm font-display font-semibold text-neutral-700">{activeRecipe.prepTime}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">{t.label_difficulty}</span>
                  <span className="text-sm font-display font-semibold text-neutral-700">
                    {activeRecipe.difficulty === "Beginner" ? t.filter_beginner : activeRecipe.difficulty}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Rating</span>
                  <span className="text-sm font-display font-semibold text-[#feb300] flex items-center gap-0.5">
                    {activeRecipe.rating} ★
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id={`hero-view-recipe-${activeRecipe.id}`}
                  onClick={() => onSelectRecipe(activeRecipe)}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-full uppercase tracking-[0.2em] text-[10px] sm:text-[11px] font-bold text-white transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:shadow-md active:scale-98 ${
                    dormMode 
                      ? "bg-purple-700 hover:bg-purple-800" 
                      : "bg-[#FF6F61] hover:bg-[#e05649]"
                  }`}
                >
                  <span>{t.start_cooking}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots Navigation / Indicator */}
          <div className="flex items-center gap-2 mt-8">
            {trendingRecipes.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex 
                    ? dormMode ? "w-6 bg-purple-600" : "w-6 bg-[#FF6F61]" 
                    : "w-2 bg-neutral-200 hover:bg-neutral-300"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Carousel Image */}
        <div className="relative h-64 md:h-auto w-full md:w-1/2 overflow-hidden bg-neutral-100 md:border-l border-neutral-200/60">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeRecipe.id}
              src={activeRecipe.image}
              alt={activeRecipe.title}
              referrerPolicy="no-referrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t md:hidden from-white/95 to-transparent h-full" />
        </div>

      </div>
    </div>
  );
}
