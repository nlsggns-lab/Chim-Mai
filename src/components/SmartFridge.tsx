import React, { useState, useMemo } from "react";
import { Recipe } from "../types";
import { Plus, X, Refrigerator, Search, Check, Sparkles, GraduationCap, Flame } from "lucide-react";
import RecipeCard from "./RecipeCard";
import { UI_TRANSLATIONS, DORM_EQUIPMENT_PRESETS } from "../data";

interface SmartFridgeProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  bookmarks: string[];
  onBookmarkToggle: (recipeId: string, event: React.MouseEvent) => void;
  lang: "en" | "th";
  dormMode: boolean;
  dormEquipments: string[];
  setDormEquipments: (equip: string[]) => void;
}

// Common ingredients harvested from our recipes database
const KNOWN_INGREDIENTS = [
  "Chicken", "Pork", "Beef", "Shrimp", "Tofu", "Eggs", "Mozzarella",
  "Garlic", "White onion", "Shallots", "Ginger", "Green onions", "Fresh milk", "Processed cheese",
  "Noodles", "Rice noodles", "Pizza dough", "Flour", "Cocoa powder", "Sugar"
];

export default function SmartFridge({
  recipes,
  onSelectRecipe,
  bookmarks,
  onBookmarkToggle,
  lang,
  dormMode,
  dormEquipments,
  setDormEquipments
}: SmartFridgeProps) {
  const [fridgeIngredients, setFridgeIngredients] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const t = UI_TRANSLATIONS[lang];

  // Suggestion filtering
  const suggestedIngredients = useMemo(() => {
    return KNOWN_INGREDIENTS.filter(ing => {
      const alreadyInFridge = fridgeIngredients.some(f => f.toLowerCase() === ing.toLowerCase());
      const matchesSearch = ing.toLowerCase().includes(searchQuery.toLowerCase());
      return !alreadyInFridge && matchesSearch;
    });
  }, [searchQuery, fridgeIngredients]);

  const addIngredient = (item: string) => {
    if (!fridgeIngredients.some(f => f.toLowerCase() === item.toLowerCase())) {
      setFridgeIngredients([...fridgeIngredients, item]);
    }
    setSearchQuery("");
  };

  const removeIngredient = (item: string) => {
    setFridgeIngredients(fridgeIngredients.filter(f => f !== item));
  };

  const clearFridge = () => {
    setFridgeIngredients([]);
  };

  // Smart Fridge matching calculations
  const recipeMatchDetails = useMemo(() => {
    if (fridgeIngredients.length === 0) return [];

    return recipes.map(recipe => {
      const missing: string[] = [];
      const matched: string[] = [];

      recipe.ingredients.forEach(ing => {
        const isMatched = fridgeIngredients.some(f => {
          const mainItem = ing.item.toLowerCase();
          const fridgeItem = f.toLowerCase();
          return mainItem.includes(fridgeItem) || fridgeItem.includes(mainItem);
        });

        if (isMatched) {
          matched.push(ing.item);
        } else {
          missing.push(ing.item);
        }
      });

      return {
        recipe,
        matched,
        missing,
        matchPercentage: Math.round((matched.length / recipe.ingredients.length) * 100)
      };
    });
  }, [recipes, fridgeIngredients]);

  const groupedMatches = useMemo(() => {
    if (fridgeIngredients.length === 0) {
      return { perfect: [], partial: [], unrelated: recipes };
    }
    const perfect = recipeMatchDetails.filter(m => m.missing.length === 0);
    const partial = recipeMatchDetails
      .filter(m => m.missing.length > 0 && m.missing.length <= 2)
      .sort((a, b) => a.missing.length - b.missing.length);
    return { perfect, partial };
  }, [recipeMatchDetails, fridgeIngredients, recipes]);

  // Handle Dorm Equipment selection
  const handleToggleEquipment = (eqId: string) => {
    if (dormEquipments.includes(eqId)) {
      setDormEquipments(dormEquipments.filter(e => e !== eqId));
    } else {
      setDormEquipments([...dormEquipments, eqId]);
    }
  };

  return (
    <div id="smart-fridge-container" className="space-y-8 animate-fade-in">
      
      {/* Dynamic Header based on active Mode */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm transition-all duration-300 ${
          dormMode ? "bg-purple-600 scale-110" : "bg-[#FF6F61]"
        }`}>
          {dormMode ? <GraduationCap className="h-5.5 w-5.5" /> : <Refrigerator className="h-5 w-5" />}
        </div>
        <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a]">
          {dormMode ? t.dorm_room_whats_in : t.fridge_intro}
        </h2>
        <p className="text-sm text-[#5c5852] font-serif italic leading-relaxed">
          {dormMode 
            ? (lang === "en" ? "Check the appliances available in your room to reveal student-friendly cooking creations." : "ระบุอุปกรณ์ไฟฟ้าที่คุณมีในห้องหอ แล้วเราจะแสดงสูตรอาหารเด็ดๆ ที่ทำได้ง่ายๆ ให้คุณ")
            : t.fridge_desc}
        </p>
      </div>

      {dormMode ? (
        /* DORM MODE: Equipment checklist view */
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-purple-50/70 via-teal-50/20 to-purple-50/70 border border-purple-200/50 rounded-2xl p-6 max-w-3xl mx-auto shadow-sm">
            <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-purple-700 uppercase block mb-4">
              {t.active_dorm_filters}
            </span>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {DORM_EQUIPMENT_PRESETS.map((eq) => {
                const isChecked = dormEquipments.includes(eq.id);
                const label = lang === "th" ? eq.labelTh : eq.label;
                return (
                  <button
                    key={eq.id}
                    onClick={() => handleToggleEquipment(eq.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                      isChecked
                        ? "bg-purple-700 border-purple-700 text-white shadow-sm"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    <span className="text-xs font-sans font-bold uppercase tracking-wider">{label}</span>
                    <span className={`h-4 w-4 rounded-full border flex items-center justify-center text-[8px] ${isChecked ? "bg-white border-white text-purple-700" : "border-neutral-300"}`}>
                      {isChecked && "✓"}
                    </span>
                  </button>
                );
              })}
            </div>

            {dormEquipments.length > 0 && (
              <div className="mt-4 flex items-center justify-end">
                <button
                  onClick={() => setDormEquipments([])}
                  className="text-[9px] font-sans font-bold tracking-widest text-purple-700 hover:text-purple-900 cursor-pointer uppercase"
                >
                  {lang === "en" ? "CLEAR FILTERS" : "ล้างตัวกรอง"}
                </button>
              </div>
            )}
          </div>

          {/* Dorm Results Grid */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-700 text-white shadow-sm">
                <Flame className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-light text-[#1a1a1a]">
                  {lang === "en" ? "Compatible Dorm Meals" : "เมนูห้องหอที่ทำได้"} ({recipes.length})
                </h3>
                <p className="text-xs text-gray-500">
                  {dormEquipments.length === 0 
                    ? (lang === "en" ? "Showing all student recipes. Select filters above to refine." : "แสดงสูตรอาหารเด็กหอทั้งหมด ระบุตัวกรองด้านบนเพื่อคัดกรอง")
                    : (lang === "en" ? "Filtered recipes matching your room equipment." : "สูตรอาหารที่ผ่านการกรองตามเครื่องใช้ไฟฟ้าที่คุณมี")}
                </p>
              </div>
            </div>

            {recipes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-purple-200 bg-purple-50/20 rounded-2xl max-w-lg mx-auto">
                <p className="text-purple-950 font-serif italic text-sm">No compatible dorm meals found for these appliances.</p>
                <p className="text-[10px] text-gray-500 uppercase font-sans tracking-wider mt-1">Try enabling more equipment or clearing filters!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    isBookmarked={bookmarks.includes(recipe.id)}
                    onBookmarkToggle={onBookmarkToggle}
                    onSelect={() => onSelectRecipe(recipe)}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* NORMAL MODE: Ingredient list selection view */
        <div className="space-y-8">
          <div className="bg-[#faf9f7] rounded-2xl p-6 border border-[#eeece8] max-w-3xl mx-auto shadow-sm">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#5a6a5a] uppercase">
              {lang === "en" ? "Kitchen Stock Manager" : "จัดการวัตถุดิบที่มี"}
            </span>

            {/* Current Fridge Items */}
            <div className="min-h-[50px] flex flex-wrap gap-2 items-center border-b border-neutral-150 pb-4 mb-4 mt-2">
              {fridgeIngredients.length === 0 ? (
                <p className="text-xs text-neutral-400 italic font-sans">
                  {lang === "en" ? "Your list is currently empty. Select from suggestions below!" : "คุณยังไม่ได้ระบุวัตถุดิบเลย เลือกวัตถุดิบด่วนด้านล่างได้นะ!"}
                </p>
              ) : (
                <>
                  {fridgeIngredients.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-xs"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#FF6F61]"></span>
                      <span>{item}</span>
                      <button
                        onClick={() => removeIngredient(item)}
                        className="text-neutral-400 hover:text-red-500 hover:bg-neutral-50 rounded-full p-0.5 transition-colors cursor-pointer"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={clearFridge}
                    className="text-[9px] font-sans font-bold tracking-widest text-red-500 hover:text-red-700 px-2 cursor-pointer uppercase"
                  >
                    {t.clear_all}
                  </button>
                </>
              )}
            </div>

            {/* Ingredient Search Box */}
            <div className="relative">
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 h-4 w-4 text-neutral-400" />
                <input
                  id="fridge-ingredient-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.fridge_placeholder}
                  className="w-full h-11 pl-10 pr-4 rounded-full border border-neutral-200 bg-white text-xs tracking-wider focus:outline-none focus:border-[#FF6F61] text-neutral-800"
                />
              </div>

              {/* Suggestions Dropdown */}
              {searchQuery && (
                <div className="absolute left-0 right-0 z-30 mt-1.5 max-h-52 overflow-y-auto rounded-xl border border-neutral-200 bg-white p-2 shadow-md">
                  {suggestedIngredients.length === 0 ? (
                    <div className="p-3 text-xs text-neutral-400 italic text-center font-sans">
                      {lang === "en" ? "No matching ingredients found. Select from popular ones." : "ไม่พบวัตถุดิบที่เข้ากัน ลองเลือกจากกลุ่มยอดนิยมด้านล่างดูนะ"}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                      {suggestedIngredients.map((ing) => (
                        <button
                          key={ing}
                          onClick={() => addIngredient(ing)}
                          className="flex items-center justify-between text-left px-3 py-2 rounded-lg hover:bg-neutral-50 text-xs text-neutral-700 transition-colors cursor-pointer"
                        >
                          <span>{ing}</span>
                          <Plus className="h-3.5 w-3.5 text-[#FF6F61]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Popular Tags Fast Select */}
            <div className="mt-4">
              <p className="text-[9px] font-sans text-neutral-400 uppercase tracking-widest font-bold mb-2">
                {lang === "en" ? "Pantry Essentials suggestions" : "ส่วนผสมแนะนำที่มักมีติดบ้าน"}
              </p>
              <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pb-1 scrollbar-none">
                {KNOWN_INGREDIENTS.filter(ing => !fridgeIngredients.includes(ing)).map((ing) => (
                  <button
                    key={ing}
                    onClick={() => addIngredient(ing)}
                    className="flex items-center gap-1 bg-white hover:bg-neutral-50 text-neutral-700 text-[10px] uppercase tracking-wider font-bold px-3.5 py-2 rounded-full border border-neutral-200 transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{ing}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MATCHED RESULTS VIEW */}
          {fridgeIngredients.length === 0 ? (
            <div className="text-center py-16 border border-[#eeece8] rounded-2xl bg-[#faf9f7] max-w-3xl mx-auto shadow-sm">
              <p className="text-[#5c5852] font-serif italic text-sm">
                {lang === "en" ? "Add ingredients to discover matching recipes instantly!" : "เพิ่มวัตถุดิบที่คุณมีในกล่องด้านบน เพื่อคำนวณหาสูตรอาหารดั้งเดิม"}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center max-w-md mx-auto">
                {["Chicken", "Soy sauce", "Eggs", "Noodles"].map((sug) => (
                  <button
                    key={sug}
                    onClick={() => addIngredient(sug)}
                    className="text-[10px] uppercase tracking-wider font-bold text-white bg-[#FF6F61] hover:bg-[#e05649] px-4 py-2.5 rounded-full cursor-pointer transition-all shadow-xs"
                  >
                    {lang === "en" ? `Try "${sug}"` : `ลองใส่วัตถุดิบ "${sug}"`}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-12">
              
              {/* Perfect Matches */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6F61] text-white">
                    <Check className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-neutral-800">
                      {lang === "en" ? "Ready to Cook Now" : "วัตถุดิบครบถ้วนพร้อมทำทันที"} ({groupedMatches.perfect.length})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {lang === "en" ? "You have 100% of the required ingredients for these dishes!" : "คุณมีส่วนผสมจำเป็นครบ 100% สำหรับการทำอาหารมรดกวัฒนธรรมเหล่านี้!"}
                    </p>
                  </div>
                </div>

                {groupedMatches.perfect.length === 0 ? (
                  <div className="p-8 text-center bg-[#faf9f7] border border-[#eeece8] rounded-2xl">
                    <p className="text-xs text-[#5c5852] font-serif italic">
                      {lang === "en" ? "No perfect matches yet. Add more items, or check suggestions below!" : "ยังไม่มีเมนูที่มีวัตถุดิบครบถ้วน ลองพิมพ์เพิ่มส่วนผสมหรือพิจารณารายการเกือบสมบูรณ์ด้านล่าง"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedMatches.perfect.map(({ recipe }) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isBookmarked={bookmarks.includes(recipe.id)}
                        onBookmarkToggle={onBookmarkToggle}
                        onSelect={() => onSelectRecipe(recipe)}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Almost There Matches */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6F61] text-white">
                    <Sparkles className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-neutral-800">
                      {lang === "en" ? "Almost There" : "ส่วนผสมเกือบครบ ขาดนิดเดียว"} ({groupedMatches.partial.length})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {lang === "en" ? "Missing only 1 or 2 items — missing ingredients are highlighted on each card!" : "ขาดวัตถุดิบหลักเพียง 1-2 อย่างเท่านั้น — มีวงเล็บเน้นเตือนส่วนที่ขาดในบัตรแต่ละชิ้น"}
                    </p>
                  </div>
                </div>

                {groupedMatches.partial.length === 0 ? (
                  <div className="p-8 text-center bg-[#faf9f7] border border-[#eeece8] rounded-2xl">
                    <p className="text-xs text-[#5c5852] font-serif italic">
                      {lang === "en" ? "No partial matches. Try adding some basic seasoning like garlic, soy sauce, or butter!" : "ยังไม่มีเมนูเกือบสมบูรณ์ ลองระบุส่วนผสมพื้นฐาน เช่น กระเทียม, ไข่ไก่ หรือโชยุ ดูนะ"}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groupedMatches.partial.map(({ recipe, missing }) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        isBookmarked={bookmarks.includes(recipe.id)}
                        onBookmarkToggle={onBookmarkToggle}
                        onSelect={() => onSelectRecipe(recipe)}
                        missingIngredients={missing}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
