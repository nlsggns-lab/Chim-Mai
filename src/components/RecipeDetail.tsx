import React, { useState } from "react";
import { Recipe, Ingredient, CommunitySubmission } from "../types";
import { ArrowLeft, Clock, ChefHat, Users, Flame, Info, Check, Plus, Minus, ShoppingCart, Play, Sparkles, Heart, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UI_TRANSLATIONS } from "../data";

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
  onEnterCookingMode: () => void;
  onAddIngredientsToShoppingList: (ingredients: Ingredient[], recipeTitle: string) => void;
  communitySubmissions: CommunitySubmission[];
  onAddCommunitySubmission: (submission: Omit<CommunitySubmission, "id" | "date" | "likes">) => void;
  lang: "en" | "th";
  dormMode: boolean;
}

export default function RecipeDetail({
  recipe,
  onBack,
  isBookmarked,
  onBookmarkToggle,
  onEnterCookingMode,
  onAddIngredientsToShoppingList,
  communitySubmissions,
  onAddCommunitySubmission,
  lang,
  dormMode
}: RecipeDetailProps) {
  const [servings, setServings] = useState(recipe.servings);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const [shoppingListAdded, setShoppingListAdded] = useState(false);

  const t = UI_TRANSLATIONS[lang];

  // Scale calculations for ingredients
  const scaleRatio = servings / recipe.servings;

  const parseAndScaleAmount = (amountStr: string, ratio: number): string => {
    const match = amountStr.match(/^(\d+(\.\d+)?|\d+\/\d+|\d+\s+\d+\/\d+)?\s*(.*)$/);
    if (!match || !match[1]) return amountStr;

    const numPart = match[1];
    const unitPart = match[3];

    let numericVal = 0;
    if (numPart.includes("/")) {
      if (numPart.includes(" ")) {
        const parts = numPart.split(/\s+/);
        const whole = parseFloat(parts[0]);
        const fracParts = parts[1].split("/");
        numericVal = whole + (parseFloat(fracParts[0]) / parseFloat(fracParts[1]));
      } else {
        const parts = numPart.split("/");
        numericVal = parseFloat(parts[0]) / parseFloat(parts[1]);
      }
    } else {
      numericVal = parseFloat(numPart);
    }

    const scaled = numericVal * ratio;
    const formatted = scaled % 1 === 0 ? scaled.toFixed(0) : scaled.toFixed(1);
    return `${formatted} ${unitPart}`;
  };

  const handleServingChange = (delta: number) => {
    setServings((prev) => Math.max(1, prev + delta));
  };

  const toggleIngredientCheck = (item: string) => {
    if (checkedIngredients.includes(item)) {
      setCheckedIngredients(checkedIngredients.filter(i => i !== item));
    } else {
      setCheckedIngredients([...checkedIngredients, item]);
    }
  };

  const handleGenerateShoppingList = () => {
    const list = recipe.ingredients.map(ing => ({
      item: ing.item,
      amount: parseAndScaleAmount(ing.amount, scaleRatio),
      note: ing.note
    }));
    onAddIngredientsToShoppingList(list, recipe.title);
    setShoppingListAdded(true);
    setTimeout(() => setShoppingListAdded(false), 3000);
  };

  const handleIMadeThisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);

    onAddCommunitySubmission({
      userName: lang === "en" ? "You (Chef in Training)" : "คุณ (เชฟฝึกหัดพรีเมียม)",
      userAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150",
      comment: newComment,
      userImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400"
    });

    setNewComment("");
  };

  // Human readable appliance names
  const applianceNames = {
    en: { kettle: "Electric Kettle 🫖", microwave: "Microwave Oven ⚡", rice_cooker: "Rice Cooker 🍚", toaster: "Toaster Oven 🍞" },
    th: { kettle: "กาต้มน้ำไฟฟ้า 🫖", microwave: "ไมโครเวฟ ⚡", rice_cooker: "หม้อหุงข้าว 🍚", toaster: "เตาอบโทสเตอร์ 🍞" }
  };

  return (
    <div id="recipe-detail-container" className="space-y-8 pb-16 animate-fade-in">
      
      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-2xl p-8 max-w-sm text-center space-y-4 border border-[#eeece8] shadow-sm text-neutral-800"
            >
              <div className="text-4xl">🎉</div>
              <h3 className="font-serif text-2xl font-light text-purple-700 italic">
                {lang === "en" ? "You Cooked It!" : "คุณทำอาหารสำเร็จแล้ว!"}
              </h3>
              <p className="text-xs text-[#5c5852] font-serif leading-relaxed">
                {lang === "en" 
                  ? "Congratulations on completing this heritage recipe. Your log has been added to your Kitchen Journal's cooking history!"
                  : "ยินดีด้วยที่ทำเมนูเด็ดสำเร็จ บันทึกการทำอาหารของคุณถูกเพิ่มลงในหน้า บันทึกห้องครัว (Journal) เรียบร้อยแล้ว!"}
              </p>
              <button 
                onClick={() => setShowCelebration(false)}
                className="w-full h-10 rounded-sm bg-purple-900 text-white font-bold text-[10px] uppercase tracking-widest cursor-pointer hover:bg-purple-850"
              >
                {lang === "en" ? "Wonderful!" : "เยี่ยมยอด!"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          id="detail-back-btn"
          className="inline-flex items-center gap-1.5 rounded-sm border border-[#eeece8] bg-white px-3.5 py-2 text-[10px] uppercase tracking-widest font-bold text-[#2d2a26] hover:bg-neutral-50 cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{lang === "en" ? "Back to Explore" : "กลับหน้าสำรวจ"}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={onBookmarkToggle}
            className={`inline-flex items-center gap-1.5 rounded-sm border px-3.5 py-2 text-[10px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
              isBookmarked
                ? "bg-purple-50/50 border-purple-200 text-purple-700"
                : "bg-white border-[#eeece8] text-gray-500 hover:text-gray-900"
            }`}
          >
            <Heart className={`h-4 w-4 ${isBookmarked ? "fill-purple-600 text-purple-600" : ""}`} />
            <span>{isBookmarked ? t.saved : t.save_for_later}</span>
          </button>

          {/* Quick Cooking Mode Enter */}
          <button
            onClick={onEnterCookingMode}
            className={`inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold text-white cursor-pointer transition-all shadow-sm ${
              dormMode 
                ? "bg-purple-700 hover:bg-purple-800" 
                : "bg-[#FF6F61] hover:bg-[#e05649]"
            }`}
          >
            <Play className="h-3.5 w-3.5 fill-white text-white" />
            <span>{t.start_cooking}</span>
          </button>
        </div>
      </div>

      {/* Full Hero block with overlay */}
      <div className="relative rounded-2xl overflow-hidden min-h-[320px] md:min-h-[400px] flex items-end border border-neutral-200 bg-[#f0ede9]">
        <img
          src={recipe.image}
          alt={recipe.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        <div className="relative z-10 p-6 sm:p-10 text-white max-w-3xl space-y-3">
          <span className="text-[10px] font-sans font-bold tracking-[0.25em] text-gray-300 uppercase flex items-center gap-1.5">
            <span>{recipe.origin.flag}</span>
            <span>{recipe.origin.cuisine} &bull; {recipe.origin.region}</span>
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-none text-white">
            {recipe.title}
          </h1>
          <p className="text-gray-200 text-sm sm:text-base italic max-w-xl font-serif">
            "{recipe.subtitle}"
          </p>
        </div>
      </div>

      {/* Grid Layout: Main info vs Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Origin Story Card */}
          <div className="rounded-2xl border border-neutral-200/60 bg-[#faf9f7] p-6 sm:p-8 space-y-4">
            <span className="text-[10px] font-sans font-bold tracking-[0.2em] text-[#5a6a5a] uppercase flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              {lang === "en" ? "The Cultural Origin & Legend" : "ประวัติความเป็นมาและเรื่องเล่าทางวัฒนธรรม"}
            </span>
            <div className="space-y-3">
              <p className="text-[#2d2a26] text-sm sm:text-base leading-relaxed font-serif italic">
                {recipe.origin.story}
              </p>
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[10px] uppercase tracking-wider text-gray-400">
                <span>{lang === "en" ? "Attribution & Heritage:" : "แหล่งที่มาและคุณค่าวัฒนธรรม:"}</span>
                <span className="font-semibold text-[#1a1a1a]">{recipe.origin.source}</span>
              </div>
            </div>
          </div>

          {/* Cooking steps section */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-light text-[#1a1a1a]">
                  {lang === "en" ? "Step-by-Step Guide" : "ขั้นตอนและกรรมวิธีโดยละเอียด"}
                </h3>
                <p className="text-xs text-gray-400 font-sans uppercase tracking-wider">
                  {lang === "en" ? "Follow traditional methods carefully." : "กรุณาปฏิบัติตามกรรมวิธีดั้งเดิมทีละขั้นตอน"}
                </p>
              </div>

              <button
                onClick={onEnterCookingMode}
                className={`inline-flex items-center gap-1.5 rounded-full border px-5 py-2 text-[9px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                  dormMode 
                    ? "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100" 
                    : "bg-orange-50 text-[#FF6F61] border-orange-200 hover:bg-orange-100"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{lang === "en" ? "Enter Full Cooking Mode" : "เข้าสู่โหมดทำอาหารไร้สิ่งรบกวน"}</span>
              </button>
            </div>

            <div className="space-y-4">
              {recipe.steps.map((step) => (
                <div 
                  key={step.number} 
                  className={`group flex gap-4 p-5 rounded-xl border bg-white transition-all duration-300 ${
                    dormMode ? "hover:border-purple-400" : "hover:border-[#FF6F61]"
                  } border-neutral-200`}
                >
                  <div className={`flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-sm font-sans font-bold text-sm ${
                    dormMode ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-[#faf9f7] text-[#5a6a5a] border border-[#eeece8]"
                  }`}>
                    {step.number}
                  </div>
                  <div className="space-y-2 flex-1">
                    <p className="text-[#1a1a1a] text-sm sm:text-base leading-relaxed font-sans">
                      {step.instruction}
                    </p>
                    
                    {step.tip && (
                      <p className="text-xs text-[#5c5852] italic bg-[#faf9f7] border border-neutral-200/50 p-3 rounded-sm font-serif">
                        <span className="font-sans font-bold uppercase tracking-widest text-[9px] text-purple-700 not-italic block mb-1">
                          {lang === "en" ? "Heritage Tip: " : "ข้อเสนอแนะสูตรดั้งเดิม: "}
                        </span> {step.tip}
                      </p>
                    )}

                    {step.timer && (
                      <div className="inline-flex items-center gap-1.5 rounded-sm bg-[#faf9f7] border border-neutral-200 px-2.5 py-1 text-[9px] uppercase tracking-wider text-gray-400 font-sans mt-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                        <span>{lang === "en" ? "Timer Required" : "จับเวลาที่ต้องการ"}: {step.timer.label} ({step.timer.duration >= 3600 ? `${step.timer.duration/3600} hr` : `${step.timer.duration/60} min`})</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Community Panel */}
          <div className="space-y-6 pt-6 border-t border-neutral-200">
            <div>
              <h3 className="font-serif text-2xl font-light text-[#1a1a1a]">
                {lang === "en" ? "Community Journal" : "บันทึกจากผู้ใช้งานคนอื่น"}
              </h3>
              <p className="text-xs text-gray-400">
                {lang === "en" ? "View notes and logs from other heritage cooks." : "ข้อเสนอแนะและภาพถ่ายประกอบจริงจากสมาชิกกลุ่มนักทำอาหารรสชาติแท้"}
              </p>
            </div>

            {/* "I made this" submission prompt card */}
            <form onSubmit={handleIMadeThisSubmit} className="bg-[#faf9f7] border border-neutral-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                  {lang === "en" ? "Have you prepared this?" : "คุณเคยทำเมนูนี้มาบ้างหรือยัง?"}
                </span>
                <span className="text-[9px] text-purple-700 font-bold uppercase tracking-wider flex items-center gap-1 bg-white px-2.5 py-1 rounded-sm border border-neutral-200">
                  ⭐ +15XP {lang === "en" ? "Heritage score" : "คะแนนทำอาหารสำเร็จ"}
                </span>
              </div>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={lang === "en" ? "Share your log, substitute ingredients, or hurdles you mastered... (e.g. 'Outstanding crisp!')" : "พิมพ์แบ่งปันประสบการณ์การทำอาหาร การสลับใช้วัตถุดิบ หรือเทคนิคพิเศษที่คุณพบ..."}
                className="w-full h-24 p-3.5 rounded-sm border border-neutral-200 bg-white text-xs focus:outline-none focus:border-purple-600 text-[#2d2a26] placeholder:text-gray-400 font-sans"
              />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-sans">
                  {lang === "en" ? "A reference dish photo will be posted automatically!" : "ภาพจำลองอาหารจริงจะถูกแนบโพสต์โดยอัตโนมัติ!"}
                </span>
                <button
                  type="submit"
                  disabled={!newComment.trim()}
                  className="h-10 px-5 rounded-sm text-[9px] uppercase tracking-widest font-bold text-white bg-purple-950 hover:bg-purple-900 disabled:opacity-40 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{lang === "en" ? "Log Cooking Accomplishment" : "บันทึกผลงานการปรุงอาหาร"}</span>
                  <Check className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
              {communitySubmissions.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">
                  {lang === "en" ? "No logs logged yet. Be the first to share your dish!" : "ยังไม่มีคนบันทึกไว้เลย เข้ามาเขียนเป็นคนแรกได้นะ!"}
                </p>
              ) : (
                communitySubmissions.map((sub) => (
                  <div key={sub.id} className="p-4 rounded-xl border border-neutral-200 bg-white flex flex-col sm:flex-row gap-4">
                    <img 
                      src={sub.userAvatar} 
                      alt={sub.userName} 
                      className="h-10 w-10 rounded-sm object-cover border border-neutral-200 flex-shrink-0"
                    />
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#1a1a1a]">{sub.userName}</span>
                        <span className="text-[9px] text-gray-400 uppercase tracking-widest font-sans">{sub.date}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#2d2a26] font-sans leading-relaxed">
                        {sub.comment}
                      </p>

                      {sub.userImage && (
                        <div className="relative rounded-sm overflow-hidden max-w-sm max-h-48 border border-neutral-200 mt-2">
                          <img 
                            src={sub.userImage} 
                            alt="Cooked dish" 
                            className="w-full object-cover" 
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-[9px] font-sans uppercase tracking-widest text-gray-400 pt-2 border-t border-neutral-100 mt-2">
                        <span>❤️ {sub.likes} {lang === "en" ? "votes" : "คนถูกใจ"}</span>
                        <span>{lang === "en" ? "Reply &bull; Share" : "ตอบกลับ &bull; แชร์"}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

        {/* Sidebar Column: Recipe stats, Servings Adjuster, Ingredients checklist */}
        <div className="space-y-6">
          
          {/* Servings & At-a-glance panel */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-6">
            
            {/* Quick stats badges */}
            <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-200">
              <div className="space-y-1">
                <span className="text-[9px] font-sans text-gray-400 tracking-wider uppercase">{t.label_prep_time}</span>
                <p className="font-serif text-sm text-[#1a1a1a] font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#5a6a5a]" />
                  <span>{recipe.prepTime}</span>
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-sans text-gray-400 tracking-wider uppercase">{lang === "en" ? "Cook Time" : "เวลาปรุง"}</span>
                <p className="font-serif text-sm text-[#1a1a1a] font-medium flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#5a6a5a]" />
                  <span>{recipe.cookTime}</span>
                </p>
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[9px] font-sans text-gray-400 tracking-wider uppercase">{t.label_difficulty}</span>
                <p className="font-serif text-sm text-[#1a1a1a] font-medium flex items-center gap-1.5">
                  <ChefHat className="h-4 w-4 text-[#5a6a5a]" />
                  <span>{recipe.difficulty === "Beginner" ? t.filter_beginner : recipe.difficulty}</span>
                </p>
              </div>
              <div className="space-y-1 pt-2">
                <span className="text-[9px] font-sans text-gray-400 tracking-wider uppercase">{lang === "en" ? "Cooked By" : "ทำมาแล้ว"}</span>
                <p className="font-serif text-sm text-[#1a1a1a] font-medium flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#5a6a5a]" />
                  <span>{recipe.communityMadeCount} {lang === "en" ? "cooks" : "คน"}</span>
                </p>
              </div>
            </div>

            {/* If Dorm Mode is ON and there is equipment/cost, show beautiful Student Dorm Card */}
            {recipe.dormFriendly && (
              <div className="rounded-xl bg-gradient-to-tr from-purple-50/80 via-teal-50/30 to-purple-50/80 border border-purple-200 p-4 space-y-3 shadow-xs">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-purple-700 animate-pulse" />
                  <span className="text-[10px] font-sans font-black text-purple-950 uppercase tracking-wider">
                    {lang === "en" ? "DORM CHEAP MEAL AUDIT" : "รายงานต้นทุนสไตล์เด็กหอ"}
                  </span>
                </div>

                {recipe.estimatedCost && (
                  <div className="space-y-0.5">
                    <span className="text-[8px] uppercase tracking-wider font-sans text-neutral-400">{lang === "en" ? "ESTIMATED BUDGET" : "งบประมาณเฉลี่ย"}</span>
                    <div className="text-sm font-serif font-black text-purple-900 flex items-baseline gap-1">
                      <span>฿{recipe.estimatedCost.amount}</span>
                      <span className="text-[9px] text-gray-500 font-sans font-normal">/ {lang === "en" ? "serving" : "ที่"}</span>
                    </div>
                    <span className="text-[9px] text-neutral-500 font-sans block leading-tight">
                      * {recipe.estimatedCost.tier === "green" 
                          ? (lang === "th" ? "ราคาสุดประหยัด สบายกระเป๋า" : "Very budget friendly")
                          : recipe.estimatedCost.tier === "yellow"
                          ? (lang === "th" ? "ราคาปานกลาง คุ้มค่าโภชนาการ" : "Moderate cost")
                          : (lang === "th" ? "วัตถุดิบคุณภาพดีเยี่ยม" : "Premium ingredients")
                        }
                    </span>
                  </div>
                )}

                {recipe.equipment && recipe.equipment.length > 0 && (
                  <div className="space-y-1 pt-1.5 border-t border-purple-200/40">
                    <span className="text-[8px] uppercase tracking-wider font-sans text-neutral-400">{lang === "en" ? "REQUIRED APPLIANCES" : "เครื่องใช้ไฟฟ้าที่ต้องการ"}</span>
                    <div className="flex flex-wrap gap-1">
                      {recipe.equipment.map((eqId) => {
                        const name = lang === "th" ? applianceNames.th[eqId as keyof typeof applianceNames.th] : applianceNames.en[eqId as keyof typeof applianceNames.en];
                        return (
                          <span key={eqId} className="px-2 py-0.5 rounded-sm bg-purple-950 text-white font-sans text-[8px] font-bold uppercase tracking-wider">
                            {name || eqId}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Adjustable Servings Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                  {lang === "en" ? "Adjust Servings" : "ปรับสัดส่วนจำนวนจาน"}
                </span>
                <span className="text-[9px] text-purple-700 bg-[#faf9f7] border border-neutral-200 font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
                  {lang === "en" ? "Auto-Scales" : "คำนวณอัตโนมัติ"}
                </span>
              </div>
              
              <div className="flex items-center justify-between bg-[#faf9f7] rounded-lg p-2 border border-neutral-200">
                <button
                  onClick={() => handleServingChange(-1)}
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-white text-[#2d2a26] hover:bg-neutral-100 border border-neutral-200 active:scale-95 transition-all cursor-pointer"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-serif text-sm font-medium text-[#1a1a1a]">
                  {servings} {servings === 1 ? (lang === "en" ? "serving" : "ที่") : (lang === "en" ? "servings" : "ที่")}
                </span>
                <button
                  onClick={() => handleServingChange(1)}
                  className="flex h-9 w-9 items-center justify-center rounded-sm bg-white text-[#2d2a26] hover:bg-neutral-100 border border-neutral-200 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Nutrition Information */}
            <div className="space-y-3 pt-4 border-t border-neutral-200">
              <span className="text-[9px] font-sans font-bold text-gray-400 tracking-widest uppercase">
                {lang === "en" ? "Nutrition Summary" : "สรุปคุณค่าทางโภชนาการ"}
              </span>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-[#faf9f7] border border-neutral-200 p-2 rounded-sm">
                  <span className="block text-[8px] font-sans text-gray-400 tracking-wider uppercase">CAL</span>
                  <span className="font-serif font-bold text-xs text-[#5a6a5a]">{recipe.nutrition.calories}</span>
                </div>
                <div className="bg-[#faf9f7] border border-neutral-200 p-2 rounded-sm">
                  <span className="block text-[8px] font-sans text-gray-400 tracking-wider uppercase">PRO</span>
                  <span className="font-serif font-bold text-xs text-[#5a6a5a]">{recipe.nutrition.protein}</span>
                </div>
                <div className="bg-[#faf9f7] border border-neutral-200 p-2 rounded-sm">
                  <span className="block text-[8px] font-sans text-gray-400 tracking-wider uppercase">CARB</span>
                  <span className="font-serif font-bold text-xs text-[#5a6a5a]">{recipe.nutrition.carbs}</span>
                </div>
                <div className="bg-[#faf9f7] border border-neutral-200 p-2 rounded-sm">
                  <span className="block text-[8px] font-sans text-gray-400 tracking-wider uppercase">FAT</span>
                  <span className="font-serif font-bold text-xs text-[#5a6a5a]">{recipe.nutrition.fat}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Ingredients Checklist Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-serif text-xl font-light text-[#1a1a1a]">{t.label_ingredients}</h4>
                <p className="text-[10px] uppercase tracking-wider text-gray-400">
                  {lang === "en" ? "Tick items in stock." : "ติ๊กส่วนผสมที่คุณมีแล้ว"}
                </p>
              </div>

              {/* Add to Shopping List Button */}
              <button
                onClick={handleGenerateShoppingList}
                className={`flex h-9 w-9 items-center justify-center rounded-sm border transition-all active:scale-90 bg-white border-neutral-200 text-gray-400 hover:text-purple-700 cursor-pointer`}
                title={lang === "en" ? "Send all to Shopping List" : "ส่งวัตถุดิบทั้งหมดเข้าหน้ารายการซื้อของ"}
              >
                {shoppingListAdded ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
              </button>
            </div>

            {/* Shopping List Trigger confirmation toast inside sidebar */}
            {shoppingListAdded && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="p-2.5 rounded-sm bg-purple-50 border border-purple-200 text-purple-700 text-[10px] uppercase tracking-wider font-bold text-center"
              >
                ✓ {lang === "en" ? "Copied to Kitchen Journal!" : "คัดลอกลงในบันทึกของคุณแล้ว!"}
              </motion.div>
            )}

            <div className="space-y-2.5">
              {recipe.ingredients.map((ing, i) => {
                const isChecked = checkedIngredients.includes(ing.item);
                const scaledAmount = parseAndScaleAmount(ing.amount, scaleRatio);
                
                return (
                  <div
                    key={i}
                    onClick={() => toggleIngredientCheck(ing.item)}
                    className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#faf9f7] transition-colors cursor-pointer text-xs"
                  >
                    <div className={`mt-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-sm border transition-all ${
                      isChecked 
                        ? "bg-purple-900 border-purple-900 text-white" 
                        : "border-gray-300 text-transparent bg-white"
                    }`}>
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                    <div className="flex-1 flex justify-between gap-2">
                      <div className="text-[#2d2a26]">
                        <span className={isChecked ? "line-through text-gray-400" : "font-medium font-sans"}>
                          {ing.item}
                        </span>
                        {ing.note && (
                          <span className="block text-[9px] text-gray-400 font-serif italic">
                            ({ing.note})
                          </span>
                        )}
                      </div>
                      <span className={`font-serif font-bold ${isChecked ? "text-gray-400" : "text-purple-700"}`}>
                        {scaledAmount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleGenerateShoppingList}
              className={`w-full h-11 rounded-sm text-white font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                dormMode 
                  ? "bg-purple-950 hover:bg-purple-900" 
                  : "bg-[#5a6a5a] hover:bg-[#4a5a4a]"
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>{lang === "en" ? "Send to Shopping List" : "ส่งเข้าหน้ารายการซื้อของ"}</span>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
