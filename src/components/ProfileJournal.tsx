import React, { useState, useMemo } from "react";
import { Recipe, ShoppingListItem } from "../types";
import { BookOpen, Heart, ShoppingBag, Award, Clock, Flame, Calendar, Trash2, Copy, Check, GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { UI_TRANSLATIONS } from "../data";

interface ProfileJournalProps {
  recipes: Recipe[];
  bookmarks: string[];
  cookedRecipeIds: string[];
  shoppingList: ShoppingListItem[];
  onToggleShoppingItem: (id: string) => void;
  onClearShoppingItem: (id: string) => void;
  onClearAllShopping: () => void;
  onSelectRecipe: (recipe: Recipe) => void;
  onBookmarkToggle: (recipeId: string, event: React.MouseEvent) => void;
  lang: "en" | "th";
  dormMode: boolean;
}

export default function ProfileJournal({
  recipes,
  bookmarks,
  cookedRecipeIds,
  shoppingList,
  onToggleShoppingItem,
  onClearShoppingItem,
  onClearAllShopping,
  onSelectRecipe,
  onBookmarkToggle,
  lang,
  dormMode
}: ProfileJournalProps) {
  
  const [activeSubTab, setActiveSubTab] = useState<"stats" | "watchlist" | "shopping" | "history">("stats");
  const [copiedLink, setCopiedLink] = useState(false);

  const t = UI_TRANSLATIONS[lang];

  // Filter bookmarked recipes
  const bookmarkedRecipes = useMemo(() => {
    return recipes.filter(r => bookmarks.includes(r.id));
  }, [recipes, bookmarks]);

  // Filter cooked recipes
  const cookedRecipes = useMemo(() => {
    return recipes.filter(r => cookedRecipeIds.includes(r.id));
  }, [recipes, cookedRecipeIds]);

  // Personal metrics generator
  const stats = useMemo(() => {
    const totalCookTimeHrs = cookedRecipes.reduce((sum, r) => {
      const match = r.cookTime.match(/(\d+)/);
      const val = match ? parseInt(match[1]) : 1;
      return sum + (r.cookTime.includes("hour") ? val : val / 60);
    }, 0);

    // Determine favorite cuisine
    const cuisinesCount: { [key: string]: number } = {};
    cookedRecipes.forEach(r => {
      cuisinesCount[r.origin.cuisine] = (cuisinesCount[r.origin.cuisine] || 0) + 1;
    });
    
    let favoriteCuisine = lang === "en" ? "None yet" : "ยังไม่มี";
    let maxCount = 0;
    Object.entries(cuisinesCount).forEach(([cuisine, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favoriteCuisine = cuisine;
      }
    });

    return {
      cookedCount: cookedRecipes.length,
      favoriteCuisine,
      hoursCooked: totalCookTimeHrs.toFixed(1),
      watchlistCount: bookmarkedRecipes.length,
      points: cookedRecipes.length * 15 + bookmarkedRecipes.length * 5 + 10
    };
  }, [cookedRecipes, bookmarkedRecipes, lang]);

  const handleCopyShareableLink = () => {
    const textToCopy = (lang === "en" ? "🛒 My Chim Mai Recipe Shopping List:\n\n" : "🛒 รายการซื้อวัตถุดิบ ชิมไหม๋ รีซิปี:\n\n") + 
      shoppingList.map(item => `${item.completed ? "[✓]" : "[ ]"} ${item.item} - ${item.amount} (${item.recipeTitle})`).join("\n") +
      (lang === "en" ? "\n\nPlanned via Chim Mai? recipe - Traditional & Dorm Friendly" : "\n\nจัดเตรียมผ่านเว็บ ชิมไหม๋ รีซิปี - อร่อยสไตล์เด็กหอและสูตรดั้งเดิม");

    navigator.clipboard.writeText(textToCopy);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div id="kitchen-journal-container" className="space-y-8 animate-fade-in">
      
      {/* Journal Heading Card in Clean Minimalism Style */}
      <div className={`relative rounded-2xl overflow-hidden p-6 sm:p-10 border transition-all duration-300 ${
        dormMode 
          ? "bg-gradient-to-tr from-purple-50/70 via-teal-50/20 to-purple-50/70 border-purple-200" 
          : "bg-[#faf9f7] border-[#eeece8]"
      }`}>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest border ${
              dormMode 
                ? "bg-purple-100/80 border-purple-200 text-purple-700" 
                : "bg-[#5a6a5a]/10 border-[#5a6a5a]/20 text-[#5a6a5a]"
            }`}>
              {dormMode ? <GraduationCap className="h-3.5 w-3.5" /> : <Award className="h-3.5 w-3.5" />}
              <span>{dormMode ? (lang === "en" ? "Level 3 Dorm Master Chef" : "เซียนเมนูหอระดับ 3") : (lang === "en" ? "Level 3 Home Chef" : "เชฟระดับครัวเรือนขั้น 3")}</span>
            </div>
            <h2 className="font-serif text-3xl font-light tracking-tight text-[#1a1a1a]">
              {t.nav_profile}
            </h2>
            <p className="text-[#5c5852] text-sm font-serif italic max-w-lg leading-relaxed">
              {lang === "en"
                ? "Keep track of your bookmarks, active grocery lists, cooking accomplishments, and skills development."
                : "ติดตามรายการที่คุณบันทึก รายการซื้อของที่เตรียมไว้ บันทึกการทำอาหารสำเร็จ และทักษะเฉพาะตัวของคุณ"}
            </p>
          </div>

          {/* Cooking score */}
          <div className="bg-white border border-neutral-200 rounded-xl p-4 flex items-center gap-4 shadow-xs">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-white ${dormMode ? "bg-purple-850" : "bg-[#5a6a5a]"}`}>
              <Flame className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-[9px] font-sans font-bold tracking-widest text-neutral-400 uppercase">XP COOK SCORE</span>
              <span className={`text-xl font-light font-serif italic ${dormMode ? "text-purple-900" : "text-[#1a1a1a]"}`}>{stats.points} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile subnavigation bar in Clean Minimalism Style */}
      <div className="border-b border-neutral-200 flex overflow-x-auto pb-0.5 gap-2 scrollbar-none">
        {[
          { id: "stats", label: lang === "en" ? "Stats Dashboard" : "สรุปทักษะการทำอาหาร", icon: Award },
          { id: "watchlist", label: `${lang === "en" ? "Flavor Watchlist" : "รายการอาหารที่บันทึก"} (${bookmarkedRecipes.length})`, icon: Heart },
          { id: "shopping", label: `${lang === "en" ? "Shopping Lists" : "รายการซื้อวัตถุดิบ"} (${shoppingList.length})`, icon: ShoppingBag },
          { id: "history", label: `${lang === "en" ? "Cooking History" : "ประวัติการเข้าครัว"} (${cookedRecipes.length})`, icon: Clock }
        ].map((sub) => {
          const IconComp = sub.icon;
          const isSel = activeSubTab === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubTab(sub.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-[10px] uppercase tracking-widest font-bold border-b-2 transition-all flex-shrink-0 cursor-pointer ${
                isSel
                  ? dormMode ? "border-purple-800 text-purple-900" : "border-[#1a1a1a] text-[#1a1a1a]"
                  : "border-transparent text-gray-400 hover:text-[#1a1a1a] hover:border-neutral-200"
              }`}
            >
              <IconComp className="h-3.5 w-3.5" />
              <span>{sub.label}</span>
            </button>
          );
        })}
      </div>

      {/* SUB-TABS VIEWS */}
      <div className="py-2">
        
        {/* STATS VIEW */}
        {activeSubTab === "stats" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Stat Card 1 */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex items-center gap-4 shadow-xs">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${dormMode ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-[#faf9f7] text-[#5a6a5a] border-[#eeece8]"}`}>
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                    {lang === "en" ? "DISHES MASTERED" : "เมนูที่บรรลุแล้ว"}
                  </span>
                  <span className="text-sm font-serif font-bold text-[#1a1a1a]">{stats.cookedCount} {lang === "en" ? "recipes" : "เมนู"}</span>
                </div>
              </div>

              {/* Stat Card 2 */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex items-center gap-4 shadow-xs">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${dormMode ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-[#faf9f7] text-[#5a6a5a] border-[#eeece8]"}`}>
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                    {lang === "en" ? "TIME AT THE WOK" : "เวลาหน้าเตาปรุง"}
                  </span>
                  <span className="text-sm font-serif font-bold text-[#1a1a1a]">{stats.hoursCooked} {lang === "en" ? "hours" : "ชั่วโมง"}</span>
                </div>
              </div>

              {/* Stat Card 3 */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex items-center gap-4 shadow-xs">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${dormMode ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-[#faf9f7] text-[#5a6a5a] border-[#eeece8]"}`}>
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                    {lang === "en" ? "FAVORITE CUISINE" : "รสชาติสุดโปรด"}
                  </span>
                  <span className="text-sm font-serif font-bold text-[#1a1a1a]">{stats.favoriteCuisine}</span>
                </div>
              </div>

              {/* Stat Card 4 */}
              <div className="rounded-2xl border border-neutral-200 bg-white p-6 flex items-center gap-4 shadow-xs">
                <div className={`flex h-11 w-11 items-center justify-center rounded-full border ${dormMode ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-[#faf9f7] text-[#5a6a5a] border-[#eeece8]"}`}>
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <span className="block text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                    {lang === "en" ? "BOOKMARKED" : "สูตรที่บันทึกไว้"}
                  </span>
                  <span className="text-sm font-serif font-bold text-[#1a1a1a]">{stats.watchlistCount} {lang === "en" ? "on watch" : "รายการ"}</span>
                </div>
              </div>

            </div>

            {/* Chef Skill Radar Chart Mock banner */}
            <div className={`rounded-2xl border p-6 flex flex-col md:flex-row items-center justify-between gap-6 ${
              dormMode ? "bg-gradient-to-r from-purple-50/50 to-teal-50/20 border-purple-100" : "bg-[#faf9f7] border-neutral-200"
            }`}>
              <div className="space-y-1 max-w-xl">
                <h4 className="font-serif font-light text-xl text-[#1a1a1a] italic">
                  {lang === "en" ? "Your Culinary Competency" : "ความสามารถการปรุงอาหารของคุณ"}
                </h4>
                <p className="text-xs text-[#5c5852] font-sans leading-relaxed">
                  {dormMode
                    ? (lang === "en" ? "By mastering student-friendly microwave, kettle, and rice cooker secrets, you unlock maximum dorm efficiency! Currently, your single-pot boil and microwave mug cakes are highly optimized." : "เมื่อคุณเชี่ยวชาญการใช้เครื่องใช้ไฟฟ้าขนาดเล็กในห้องหอ คุณจะกลายเป็นสุดยอดเด็กหอ! ขณะนี้ขั้นตอนต้มน้ำใบเดียวระดับเซียนและเค้กถ้วยไมโครเวฟของคุณทำงานได้อย่างสมบูรณ์แบบ")
                    : (lang === "en" ? "By mastering traditional heritage dishes, you cultivate authentic techniques. Currently, your slow broth, crust baking, and precise timing are in active development!" : "ด้วยการฝึกฝนวัฒนธรรมอาหารสูตรดั้งเดิม คุณจะได้ซึมซับทักษะการปรุงอาหารที่แท้จริง ขณะนี้ทักษะการเคี่ยวน้ำซุป การอบเปลือกกรอบ และการกะเวลาปรุงของคุณกำลังก้าวหน้าอย่างต่อเนื่อง")}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] font-sans font-bold text-purple-950 bg-white border border-neutral-200 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                  {lang === "en" ? "SINGLE-POT BOIL: 90%" : "ต้มหม้อเดี่ยว: 90%"}
                </span>
                <span className="text-[9px] font-sans font-bold text-purple-950 bg-white border border-neutral-200 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                  {lang === "en" ? "MICROWAVE FLIGHT: 75%" : "ไมโครเวฟเซียน: 75%"}
                </span>
                <span className="text-[9px] font-sans font-bold text-purple-950 bg-white border border-neutral-200 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
                  {lang === "en" ? "BUDGET SQUEEZE: 85%" : "จัดงบประหยัด: 85%"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* WATCHLIST VIEW */}
        {activeSubTab === "watchlist" && (
          <div>
            {bookmarkedRecipes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-neutral-200 rounded-2xl bg-[#faf9f7] max-w-xl mx-auto">
                <p className="text-[#5c5852] font-serif italic text-sm">
                  {lang === "en" ? "You haven't bookmarked any recipes yet." : "คุณยังไม่ได้บันทึกสูตรใดๆ ไว้เลย"}
                </p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Bookmark recipes to easily retrieve them later when you're ready to cook!" : "กดปุ่มบันทึกในหน้าข้อมูลอาหารเพื่อให้ดึงรายการขึ้นมาแสดงด่วนที่นี่!"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarkedRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="relative border border-neutral-200 bg-white rounded-2xl overflow-hidden group flex flex-col h-full justify-between hover:shadow-sm transition-shadow duration-300"
                  >
                    <div>
                      {/* Image header */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#f0ede9] border-b border-neutral-200">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-300" 
                          loading="lazy"
                        />
                        <button
                          onClick={(e) => onBookmarkToggle(recipe.id, e)}
                          className="absolute top-2 right-2 h-7 w-7 rounded-full bg-white/95 flex items-center justify-center text-purple-700 border border-neutral-200 shadow-sm cursor-pointer"
                        >
                          <Heart className="h-4 w-4 fill-purple-600 text-purple-600" />
                        </button>
                        <span className="absolute bottom-2 left-2 text-[9px] uppercase tracking-widest font-bold bg-[#1a1a1a]/95 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                          <span>{recipe.origin.flag}</span>
                          <span>{recipe.origin.cuisine}</span>
                        </span>
                      </div>

                      {/* Title description */}
                      <div className="p-5 space-y-1">
                        <h4 className="font-serif text-lg text-[#1a1a1a] group-hover:text-purple-700 transition-colors leading-tight font-medium">
                          {recipe.title}
                        </h4>
                        <p className="text-xs text-[#7c7872] italic font-serif">"{recipe.subtitle}"</p>
                      </div>
                    </div>

                    <div className="p-5 border-t border-neutral-100 flex items-center justify-between uppercase tracking-wider text-[10px]">
                      <span className="font-sans text-[#5c5852] font-semibold">{recipe.prepTime} prep</span>
                      <button
                        onClick={() => onSelectRecipe(recipe)}
                        className={`text-[10px] uppercase tracking-widest font-bold text-white px-4 py-2.5 rounded-full cursor-pointer transition-all shadow-xs ${
                          dormMode ? "bg-purple-950 hover:bg-purple-900" : "bg-[#FF6F61] hover:bg-[#e05649]"
                        }`}
                      >
                        {lang === "en" ? "Start Recipe" : "เริ่มทำเลย"}
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SHOPPING LISTS VIEW */}
        {activeSubTab === "shopping" && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white border border-neutral-200 rounded-2xl p-6 space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif font-light text-xl text-[#1a1a1a] italic">
                    {lang === "en" ? "My Compiled Grocery List" : "รายการซื้อวัตถุดิบประกอบอาหารคัดลอกมา"}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {lang === "en" ? "Checkbox lists automatically sync here when compiled in recipes." : "วัตถุดิบทั้งหมดที่ติ๊กจากขั้นตอนในสูตรจะไหลมาสรุปรวมอยู่ที่ตู้นี้แบบอัจฉริยะ"}
                  </p>
                </div>

                {shoppingList.length > 0 && (
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {/* Share Link */}
                    <button
                      onClick={handleCopyShareableLink}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-[#faf9f7] hover:bg-neutral-100 text-[9px] uppercase tracking-widest font-bold text-[#2d2a26] transition-all cursor-pointer shadow-xs"
                    >
                      {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copiedLink ? (lang === "en" ? "Copied!" : "คัดลอกแล้ว!") : (lang === "en" ? "Share" : "แชร์รายการ")}</span>
                    </button>
                    
                    {/* Clear All */}
                    <button
                      onClick={onClearAllShopping}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 bg-white hover:bg-red-50 text-[9px] uppercase tracking-widest font-bold text-red-500 transition-all cursor-pointer shadow-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>{t.clear_all}</span>
                    </button>
                  </div>
                )}
              </div>

              {shoppingList.length === 0 ? (
                <div className="text-center py-12 bg-[#faf9f7] rounded-2xl border border-dashed border-neutral-200 max-w-md mx-auto">
                  <p className="text-[#5c5852] font-serif italic text-sm">
                    {lang === "en" ? "Your shopping list is empty." : "รายการซื้อวัตถุดิบว่างเปล่าอยู่ขณะนี้"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                    {lang === "en" ? "Visit details page and click 'Send to Shopping List' to populate!" : "ไปที่หน้าสูตรอาหารแล้วกด 'ส่งเข้าหน้ารายการซื้อของ' เพื่อเพิ่มวัตถุดิบที่ตู้นี้นะ!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {shoppingList.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between p-3.5 rounded-lg border border-neutral-200 hover:bg-[#faf9f7] transition-colors text-xs"
                    >
                      <div 
                        onClick={() => onToggleShoppingItem(item.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className={`flex h-4.5 w-4.5 items-center justify-center rounded-md border transition-all ${
                          item.completed 
                            ? "bg-purple-950 border-purple-950 text-white" 
                            : "border-gray-300 text-transparent bg-white"
                        }`}>
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                        <div>
                          <span className={item.completed ? "line-through text-gray-400 font-medium" : "font-semibold text-[#1a1a1a]"}>
                            {item.item}
                          </span>
                          <span className="block text-[9px] text-gray-400 font-serif italic">
                            {lang === "en" ? "Required for" : "จำเป็นสำหรับ"}: {item.recipeTitle}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className={`font-serif font-bold ${item.completed ? "text-gray-400" : "text-purple-700"}`}>
                          {item.amount}
                        </span>
                        
                        <button
                          onClick={() => onClearShoppingItem(item.id)}
                          className="text-gray-400 hover:text-red-500 hover:bg-neutral-100 rounded-full p-2 cursor-pointer transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

        {/* HISTORY VIEW */}
        {activeSubTab === "history" && (
          <div className="max-w-2xl mx-auto space-y-6">
            {cookedRecipes.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-neutral-200 rounded-3xl bg-[#faf9f7] max-w-md mx-auto">
                <p className="text-[#5c5852] font-serif italic text-sm">
                  {lang === "en" ? "No recipes cooked yet." : "คุณยังไม่มีประวัติการปรุงอาหารเลย"}
                </p>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">
                  {lang === "en" ? "Complete a recipe or submit comments to record your cooking triumphs!" : "เริ่มเข้าสู่หน้าวิธีทำทีละขั้นแล้วปรุงเมนูเด็ดสำเร็จเพื่อบันทึกประวัติของคุณ!"}
                </p>
              </div>
            ) : (
              <div className="relative border-l border-neutral-200 ml-4 space-y-8 pl-6">
                {cookedRecipes.map((recipe) => (
                  <div key={recipe.id} className="relative">
                    
                    <span className="absolute -left-[31px] top-1.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-purple-900 text-white ring-4 ring-[#faf9f7] shadow-xs">
                      <Check className="h-2 w-2 stroke-[4]" />
                    </span>

                    <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-3 shadow-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-sans text-gray-400 tracking-wider flex items-center gap-1 uppercase">
                          <Calendar className="h-3 w-3" />
                          <span>{lang === "en" ? "Cooked Heritage Achievement" : "ประวัติการสืบสานเมนูรสชาติดั้งเดิม"}</span>
                        </span>
                        <span className="text-[9px] font-sans font-bold text-purple-750 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full uppercase tracking-wider">
                          ✓ {lang === "en" ? "Mastered" : "เชี่ยวชาญสำเร็จ"}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <img 
                          src={recipe.image} 
                          alt={recipe.title} 
                          className="h-12 w-12 rounded-lg object-cover bg-[#f0ede9]" 
                        />
                        <div>
                          <h4 
                            onClick={() => onSelectRecipe(recipe)}
                            className="font-serif text-lg text-[#1a1a1a] hover:text-purple-700 cursor-pointer transition-colors leading-tight font-medium"
                          >
                            {recipe.title}
                          </h4>
                          <span className="text-xs text-[#5c5852] flex items-center gap-1 font-serif italic">
                            <span>{recipe.origin.flag}</span>
                            <span>{recipe.origin.cuisine} {lang === "en" ? "heritage" : "ดั้งเดิม"} • {recipe.difficulty === "Beginner" ? t.filter_beginner : recipe.difficulty}</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#5c5852] italic bg-[#faf9f7] border border-neutral-200/50 p-3.5 rounded-xl font-serif">
                        {lang === "en" 
                          ? "Your kitchen smelled fantastic! You successfully executed this creation, preserving culinary arts."
                          : "ห้องครัวส่งกลิ่นหอมตลบอบอวล! คุณปรุงความอร่อยดั้งเดิมระดับภัตตาคารเสร็จสมบูรณ์เรียบร้อย สานต่อวัฒนธรรมอาหารเลิศรส"}
                      </p>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
