import React from "react";
import { Recipe } from "../types";
import { Star, Clock, Heart, Users, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { UI_TRANSLATIONS } from "../data";

interface RecipeCardProps {
  key?: any;
  recipe: Recipe;
  isBookmarked: boolean;
  onBookmarkToggle: (recipeId: string, event?: any) => void;
  onSelect: () => void;
  missingIngredients?: string[]; // Used for Smart Fridge Filter
  lang?: "en" | "th";
}

export default function RecipeCard({
  recipe,
  isBookmarked,
  onBookmarkToggle,
  onSelect,
  missingIngredients = [],
  lang = "en"
}: RecipeCardProps) {
  const t = UI_TRANSLATIONS[lang];

  // Helper to render budget badge
  const difficultyLabels = {
    en: {
      Beginner: "Beginner",
      Intermediate: "Intermediate",
      Chef: "Hard"
    },
    th: {
      Beginner: "ระดับเริ่มต้น",
      Intermediate: "ระดับกลาง",
      Chef: "ระดับเซียน"
    }
  };

  const getDifficultyBadge = () => {
    if (recipe.dormFriendly) {
      return {
        text: lang === "en" ? "Dorm Special" : "เมนูเด็กหอ",
        className: "bg-purple-600 text-white shadow-sm font-semibold"
      };
    }
    const label = difficultyLabels[lang][recipe.difficulty] || recipe.difficulty;
    return {
      text: label,
      className: "bg-white/95 text-neutral-800 shadow-sm border border-neutral-150 font-semibold"
    };
  };

  const difficultyBadge = getDifficultyBadge();

  // Helper to format likes count dynamically from data
  const getLikesCount = () => {
    const rawVal = Math.round((recipe.communityMadeCount * 2.8) + (recipe.todayViews * 0.1) + 120);
    if (rawVal >= 1000) {
      return (rawVal / 1000).toFixed(1) + "k";
    }
    return rawVal.toString();
  };

  const likesCount = getLikesCount();

  // Helper to render beautiful budget badge (matches bottom right of image)
  const getBudgetBadge = () => {
    if (!recipe.estimatedCost) return null;
    const { amount, tier } = recipe.estimatedCost;
    
    let colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (tier === "yellow") {
      colorClass = "bg-amber-50 text-amber-700 border-amber-200";
    } else if (tier === "orange") {
      colorClass = "bg-orange-50 text-orange-700 border-orange-200";
    }
    
    return {
      text: `฿${amount} Est.`,
      className: `${colorClass} shadow-xs font-bold border`
    };
  };

  const budgetBadge = getBudgetBadge();

  return (
    <motion.div
      id={`recipe-card-${recipe.id}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onSelect}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white cursor-pointer h-full transition-shadow duration-300 hover:shadow-lg hover:border-neutral-300/60"
    >
      {/* Heart Button in Clean Minimalist Style */}
      <button
        id={`bookmark-btn-${recipe.id}`}
        onClick={(e) => onBookmarkToggle(recipe.id, e)}
        className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 backdrop-blur-md border border-neutral-150 text-gray-400 hover:text-red-500 transition-all active:scale-90 cursor-pointer shadow-sm"
        title={isBookmarked ? "Remove from Watchlist" : "Save to Watchlist"}
      >
        <Heart 
          className={`h-4.5 w-4.5 transition-transform ${isBookmarked ? "fill-red-500 text-red-500 scale-110" : "hover:scale-110"}`} 
        />
      </button>

      {/* Recipe Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Floating Difficulty Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`inline-block px-3.5 py-1 rounded-full text-[10px] tracking-wide uppercase ${difficultyBadge.className}`}>
            {difficultyBadge.text}
          </span>
        </div>

        {/* Floating Budget Badge (Bottom Right) */}
        {budgetBadge && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] ${budgetBadge.className}`}>
              {budgetBadge.text}
            </span>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="flex flex-1 flex-col p-5">
        
        {/* Origin Region and Likes Row */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider font-bold mb-2">
          <span className="text-[#FF6F61] flex items-center gap-1">
            <span>{recipe.origin.flag}</span>
            <span>{recipe.origin.region} ORIGIN</span>
          </span>
          <div className="flex items-center gap-1 text-red-500">
            <Heart className="h-3 w-3 fill-current text-red-500" />
            <span className="font-semibold text-neutral-600">{likesCount}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-base sm:text-lg font-bold text-neutral-800 tracking-tight group-hover:text-[#FF6F61] transition-colors leading-snug mb-2">
          {recipe.title}
        </h3>
        
        {/* Quick Stats Grid Footer */}
        <div className="mt-auto pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-medium text-neutral-500">
          
          {/* Prep time */}
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-neutral-400" />
            <span>{recipe.prepTime}</span>
          </span>

          {/* Cook count proof */}
          <span className="flex items-center gap-1">
            <span className="text-neutral-400">🍳</span>
            <span>
              {lang === "en" 
                ? `"I Made This!" (${recipe.communityMadeCount})` 
                : `"เคยทำสำเร็จ!" (${recipe.communityMadeCount})`}
            </span>
          </span>
        </div>

        {/* Missing Ingredient list footer for Smart Fridge */}
        {missingIngredients.length > 0 && (
          <div className="mt-3 text-[10px] border-t border-dashed border-neutral-200 pt-2 text-amber-700 bg-amber-50/50 p-2 rounded-lg uppercase tracking-wider">
            <span className="font-bold">{lang === "en" ? "Missing" : "ขาดวัตถุดิบ"}: </span>
            <span className="font-sans italic text-neutral-600 line-clamp-1">{missingIngredients.join(", ")}</span>
          </div>
        )}

      </div>
    </motion.div>
  );
}
