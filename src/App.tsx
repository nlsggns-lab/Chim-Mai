import React, { useState, useEffect, useMemo } from "react";
import { getTranslatedRecipes, UI_TRANSLATIONS, CATEGORIES, DORM_CATEGORIES, DORM_EQUIPMENT_PRESETS } from "./data";
import { Recipe, ShoppingListItem, CommunitySubmission } from "./types";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import FilterBar from "./components/FilterBar";
import RecipeCard from "./components/RecipeCard";
import SmartFridge from "./components/SmartFridge";
import RecipeDetail from "./components/RecipeDetail";
import CookingMode from "./components/CookingMode";
import ProfileJournal from "./components/ProfileJournal";
import { Compass, GraduationCap, Sparkles } from "lucide-react";
import { AnimatePresence } from "motion/react";

const INITIAL_COMMUNITY_SUBMISSIONS: { [recipeId: string]: CommunitySubmission[] } = {
  "neapolitan-pizza": [
    {
      id: "sub-1",
      userName: "Marco R.",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      comment: "Absolutely pristine sourdough rise. Baked at high temp on a pizza steel, crust charred beautifully just like at Da Michele!",
      userImage: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400",
      date: "2 days ago",
      likes: 14,
    }
  ],
  "pad-thai": [
    {
      id: "sub-2",
      userName: "Siriporn P.",
      userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150",
      comment: "Classic tamarind balance! Substituted with raw brown palm sugar and added dried shrimp. Tasted just like street venders in Bangkok.",
      userImage: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=400",
      date: "3 days ago",
      likes: 21,
    }
  ]
};

export default function App() {
  // Top Navigation Tabs
  const [activeTab, setActiveTab] = useState<"explore" | "fridge" | "journal">("explore");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Bilingual Language State
  const [lang, setLang] = useState<"en" | "th">(() => {
    try {
      const saved = localStorage.getItem("chim_mai_lang");
      if (saved === "en" || saved === "th") return saved;
      const navLang = navigator.language.toLowerCase();
      return navLang.startsWith("th") ? "th" : "en";
    } catch {
      return "en";
    }
  });

  // Dorm Mode States
  const [dormMode, setDormMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem("chim_mai_dorm_mode");
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const [dormEquipments, setDormEquipments] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("chim_mai_dorm_equipments");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persistent States with local storage fallback
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("tasteorigin_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cookedRecipeIds, setCookedRecipeIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("tasteorigin_cooked_ids");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>(() => {
    try {
      const saved = localStorage.getItem("tasteorigin_shopping_list");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [communitySubmissions, setCommunitySubmissions] = useState<{ [recipeId: string]: CommunitySubmission[] }>(() => {
    try {
      const saved = localStorage.getItem("tasteorigin_community_submissions");
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_SUBMISSIONS;
    } catch {
      return INITIAL_COMMUNITY_SUBMISSIONS;
    }
  });

  // Sync states to local storage
  useEffect(() => {
    localStorage.setItem("chim_mai_lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("chim_mai_dorm_mode", JSON.stringify(dormMode));
    setSelectedCategory("all"); // Reset category on mode switch
  }, [dormMode]);

  useEffect(() => {
    localStorage.setItem("chim_mai_dorm_equipments", JSON.stringify(dormEquipments));
  }, [dormEquipments]);

  useEffect(() => {
    localStorage.setItem("tasteorigin_bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("tasteorigin_cooked_ids", JSON.stringify(cookedRecipeIds));
  }, [cookedRecipeIds]);

  useEffect(() => {
    localStorage.setItem("tasteorigin_shopping_list", JSON.stringify(shoppingList));
  }, [shoppingList]);

  useEffect(() => {
    localStorage.setItem("tasteorigin_community_submissions", JSON.stringify(communitySubmissions));
  }, [communitySubmissions]);

  // Translate and filter core recipes in one reactive step
  const RECIPES = useMemo(() => {
    return getTranslatedRecipes(lang, dormMode, dormEquipments);
  }, [lang, dormMode, dormEquipments]);

  // Translate selected/cooking recipe in real-time
  const activeSelectedRecipe = useMemo(() => {
    if (!selectedRecipe) return null;
    return RECIPES.find((r) => r.id === selectedRecipe.id) || null;
  }, [selectedRecipe, RECIPES]);

  const activeCookingRecipe = useMemo(() => {
    if (!cookingRecipe) return null;
    return RECIPES.find((r) => r.id === cookingRecipe.id) || null;
  }, [cookingRecipe, RECIPES]);

  const t = UI_TRANSLATIONS[lang];

  // Handle Bookmarks Toggle
  const handleBookmarkToggle = (recipeId: string, event?: React.MouseEvent) => {
    if (event) {
      event.stopPropagation();
    }
    setBookmarks((prev) => {
      if (prev.includes(recipeId)) {
        return prev.filter((id) => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };

  // Add items to Shopping List
  const handleAddIngredientsToShoppingList = (ingredients: any[], recipeTitle: string) => {
    setShoppingList((prev) => {
      const newItems = ingredients.map((ing) => ({
        id: `${recipeTitle}-${ing.item}-${Date.now()}-${Math.random()}`,
        item: ing.item,
        amount: ing.amount,
        recipeTitle: recipeTitle,
        completed: false,
      }));
      return [...prev, ...newItems];
    });
  };

  const handleToggleShoppingItem = (id: string) => {
    setShoppingList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const handleClearShoppingItem = (id: string) => {
    setShoppingList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearAllShopping = () => {
    setShoppingList([]);
  };

  // Add Comment/Submission
  const handleAddCommunitySubmission = (
    recipeId: string,
    sub: Omit<CommunitySubmission, "id" | "date" | "likes">
  ) => {
    if (!cookedRecipeIds.includes(recipeId)) {
      setCookedRecipeIds((prev) => [...prev, recipeId]);
    }

    const newSub: CommunitySubmission = {
      ...sub,
      id: `sub-${Date.now()}`,
      date: lang === "en" ? "Just now" : "เมื่อสักครู่",
      likes: 1,
    };

    setCommunitySubmissions((prev) => {
      const existing = prev[recipeId] || [];
      return {
        ...prev,
        [recipeId]: [newSub, ...existing],
      };
    });
  };

  // Grid Filter logic
  const filteredRecipes = useMemo(() => {
    return RECIPES.filter((recipe) => {
      // 1. Category Pill Filter
      if (selectedCategory !== "all") {
        if (selectedCategory === "vegetarian") {
          if (!recipe.tags.map((t) => t.toLowerCase()).includes("vegetarian")) {
            return false;
          }
        } else if (selectedCategory === "beginner") {
          if (recipe.difficulty !== "Beginner") {
            return false;
          }
        } else if (selectedCategory === "desserts") {
          if (!recipe.tags.map((t) => t.toLowerCase()).includes("desserts")) {
            return false;
          }
        } else {
          // Cuisine matching
          if (recipe.origin.cuisine.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }
      }

      // 2. Search Box Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const titleMatch = recipe.title.toLowerCase().includes(query);
        const subMatch = recipe.subtitle.toLowerCase().includes(query);
        const cuisineMatch = recipe.origin.cuisine.toLowerCase().includes(query);
        const regionMatch = recipe.origin.region.toLowerCase().includes(query);
        const tagMatch = recipe.tags.some((t) => t.toLowerCase().includes(query));
        return titleMatch || subMatch || cuisineMatch || regionMatch || tagMatch;
      }

      return true;
    });
  }, [RECIPES, selectedCategory, searchQuery]);

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      dormMode 
        ? "bg-[#faf6ff] text-neutral-900" 
        : "bg-[#fcf9f8] text-neutral-900"
    }`}>
      
      {/* Dynamic Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedRecipe(null); // Clear active detail screen when switching tabs
        }}
        savedCount={bookmarks.length}
        shoppingListCount={shoppingList.filter((item) => !item.completed).length}
        lang={lang}
        setLang={setLang}
        dormMode={dormMode}
        setDormMode={setDormMode}
      />

      {/* Main Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Explore / Home Tab */}
        {activeTab === "explore" && (
          <div className="space-y-8 animate-fade-in">
            
            {!activeSelectedRecipe ? (
              <>
                {/* Hero section */}
                <HeroCarousel 
                  recipes={RECIPES} 
                  onSelectRecipe={(recipe) => setSelectedRecipe(recipe)} 
                  lang={lang}
                  dormMode={dormMode}
                />

                {/* Filters */}
                <div className="space-y-4 pt-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
                    <div>
                      <h2 className="text-2xl font-light font-serif tracking-tight text-neutral-900 flex items-center gap-2">
                        {dormMode ? <GraduationCap className="h-5 w-5 text-purple-700" /> : <Compass className="h-5 w-5 text-neutral-800" />}
                        {dormMode 
                          ? (lang === "en" ? "Explore Student Masterpieces" : "สำรวจสุดยอดเมนูเด็กหอ")
                          : (lang === "en" ? "Explore Traditional Creations" : "สำรวจรสชาติวัฒนธรรมทางอาหาร")}
                      </h2>
                      <p className="text-xs text-neutral-500 font-sans tracking-wide">
                        {dormMode
                          ? (lang === "en" ? "Affordable, quick, and highly creative gourmet dishes for your room." : "สูตรอาหารทำง่าย ประหยัดงบ และแสนจะสร้างสรรค์สำหรับชีวิตเด็กหอ")
                          : (lang === "en" ? "Discover culinary legends, story origins, and cook like a professional." : "ร่วมตามรอยตำนาน แหล่งกำเนิดเรื่องเล่า และกรรมวิธีปรุงสไตล์ดั้งเดิม")}
                      </p>
                    </div>
                  </div>

                  <FilterBar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    lang={lang}
                    dormMode={dormMode}
                  />
                </div>

                {/* Recipe Grid */}
                {filteredRecipes.length === 0 ? (
                  <div className="text-center py-16 border border-dashed border-neutral-200 rounded-3xl bg-neutral-50/50 max-w-xl mx-auto">
                    <p className="text-neutral-500 font-serif italic text-sm">{lang === "en" ? "No matching recipes found." : "ไม่พบสูตรอาหารที่ระบุ"}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      {lang === "en" ? "Try resetting the category filter or searching for another keyword!" : "ลองเลือกประเภทอาหารอื่น หรือเปลี่ยนคำค้นหาใหม่อีกครั้งนะ"}
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className={`mt-4 px-6 h-10 rounded-full text-white font-bold text-[10px] uppercase tracking-widest cursor-pointer transition-all ${
                        dormMode ? "bg-purple-600 hover:bg-purple-700" : "bg-[#FF6F61] hover:bg-[#e05649]"
                      }`}
                    >
                      {lang === "en" ? "Reset All Filters" : "ล้างตัวกรองทั้งหมด"}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRecipes.map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isBookmarked={bookmarks.includes(recipe.id)}
                        onBookmarkToggle={handleBookmarkToggle}
                        onSelect={() => setSelectedRecipe(recipe)}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              /* Details page inside Explore Tab */
              <RecipeDetail
                recipe={activeSelectedRecipe}
                onBack={() => setSelectedRecipe(null)}
                isBookmarked={bookmarks.includes(activeSelectedRecipe.id)}
                onBookmarkToggle={() => handleBookmarkToggle(activeSelectedRecipe.id)}
                onEnterCookingMode={() => setCookingRecipe(activeSelectedRecipe)}
                onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
                communitySubmissions={communitySubmissions[activeSelectedRecipe.id] || []}
                onAddCommunitySubmission={(sub) => handleAddCommunitySubmission(activeSelectedRecipe.id, sub)}
                lang={lang}
                dormMode={dormMode}
              />
            )}

          </div>
        )}

        {/* Smart Fridge / Dorm Box Tab */}
        {activeTab === "fridge" && (
          <div className="space-y-8 animate-fade-in">
            {!activeSelectedRecipe ? (
              <SmartFridge
                recipes={RECIPES}
                bookmarks={bookmarks}
                onBookmarkToggle={handleBookmarkToggle}
                onSelectRecipe={(recipe) => setSelectedRecipe(recipe)}
                lang={lang}
                dormMode={dormMode}
                dormEquipments={dormEquipments}
                setDormEquipments={setDormEquipments}
              />
            ) : (
              <RecipeDetail
                recipe={activeSelectedRecipe}
                onBack={() => setSelectedRecipe(null)}
                isBookmarked={bookmarks.includes(activeSelectedRecipe.id)}
                onBookmarkToggle={() => handleBookmarkToggle(activeSelectedRecipe.id)}
                onEnterCookingMode={() => setCookingRecipe(activeSelectedRecipe)}
                onAddIngredientsToShoppingList={handleAddIngredientsToShoppingList}
                communitySubmissions={communitySubmissions[activeSelectedRecipe.id] || []}
                onAddCommunitySubmission={(sub) => handleAddCommunitySubmission(activeSelectedRecipe.id, sub)}
                lang={lang}
                dormMode={dormMode}
              />
            )}
          </div>
        )}

        {/* My Kitchen Journal Tab */}
        {activeTab === "journal" && (
          <ProfileJournal
            recipes={RECIPES}
            bookmarks={bookmarks}
            cookedRecipeIds={cookedRecipeIds}
            shoppingList={shoppingList}
            onToggleShoppingItem={handleToggleShoppingItem}
            onClearShoppingItem={handleClearShoppingItem}
            onClearAllShopping={handleClearAllShopping}
            onSelectRecipe={(recipe) => {
              setActiveTab("explore");
              setSelectedRecipe(recipe);
            }}
            onBookmarkToggle={handleBookmarkToggle}
            lang={lang}
            dormMode={dormMode}
          />
        )}

      </main>

      {/* Fullscreen Distraction-Free Cooking Mode Overlay */}
      <AnimatePresence>
        {activeCookingRecipe && (
          <CookingMode
            recipe={activeCookingRecipe}
            lang={lang}
            dormMode={dormMode}
            onClose={() => {
              // Add to history cooked list if finished
              if (!cookedRecipeIds.includes(activeCookingRecipe.id)) {
                setCookedRecipeIds((prev) => [...prev, activeCookingRecipe.id]);
              }
              setCookingRecipe(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-neutral-900 text-neutral-400 border-t border-neutral-800 mt-20 py-10 text-xs text-center font-sans space-y-2">
        <p className="text-neutral-200 font-serif italic tracking-wide font-medium text-sm">
          {lang === "en" ? "Chim Mai? recipe" : "ชิมไหม๋ รีซิปี"} &bull; {lang === "en" ? "Authentic Kitchen Companion" : "เพื่อนรักคนก้นครัว"}
        </p>
        <p className="max-w-md mx-auto text-neutral-500 px-4">
          {lang === "en" 
            ? "All recipes are adapted from legendary streets, traditional cooks, and master chefs around the world. We celebrate cultural roots and budget-friendly creations."
            : "สูตรอาหารทั้งหมดได้รับการดัดแปลงจากร้านริมทางระดับตำนาน นักทำอาหารดั้งเดิม และยอดเชฟฝีมือฉกาจทั่วทุกมุมโลก ร่วมสืบสานมรดกรสชาติดั้งเดิมและเปิดใจประหยัดงบสไตล์เด็กหอ"}
        </p>
        <p className="text-neutral-600 font-mono pt-4">&copy; {new Date().getFullYear()} Chim Mai? recipe. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
