import { useState, useEffect } from "react";
import { Recipe } from "../types";
import { X, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, ListCollapse, Timer, Sparkles, Film } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { UI_TRANSLATIONS } from "../data";

interface CookingModeProps {
  recipe: Recipe;
  onClose: () => void;
  lang: "en" | "th";
  dormMode: boolean;
}

export default function CookingMode({ recipe, onClose, lang, dormMode }: CookingModeProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(() => {
    try {
      const saved = localStorage.getItem(`cooking_progress_${recipe.id}`);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (parsed >= 0 && parsed < recipe.steps.length) {
          return parsed;
        }
      }
    } catch (e) {
      // ignore
    }
    return 0;
  });
  const [showIngredientsDrawer, setShowIngredientsDrawer] = useState(false);

  // Timer states for the current step
  const currentStep = recipe.steps[currentStepIdx];
  const stepTimerConfig = currentStep?.timer;
  
  const [timeLeft, setTimeLeft] = useState(stepTimerConfig?.duration || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const t = UI_TRANSLATIONS[lang];
  const accentColor = dormMode ? "#A29BFE" : "#FF6F61";
  const accentBgClass = dormMode ? "bg-purple-600 hover:bg-purple-700" : "bg-[#FF6F61] hover:bg-[#e05649]";
  const accentTextClass = dormMode ? "text-purple-400" : "text-[#FF6F61]";
  const accentBorderClass = dormMode ? "border-purple-500/30" : "border-[#FF6F61]/30";

  // Save current step progress whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(`cooking_progress_${recipe.id}`, currentStepIdx.toString());
    } catch (e) {
      // ignore
    }
  }, [currentStepIdx, recipe.id]);

  // Reset timer whenever step changes
  useEffect(() => {
    if (stepTimerConfig) {
      setTimeLeft(stepTimerConfig.duration);
    } else {
      setTimeLeft(0);
    }
    setIsTimerRunning(false);
  }, [currentStepIdx, stepTimerConfig]);

  // Timer tick effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timeLeft]);

  const handleNext = () => {
    if (currentStepIdx < recipe.steps.length - 1) {
      setCurrentStepIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    if (stepTimerConfig) {
      setTimeLeft(stepTimerConfig.duration);
    }
    setIsTimerRunning(false);
  };

  const adjustTimer = (secs: number) => {
    setTimeLeft((prev) => Math.max(0, prev + secs));
  };

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      id="cooking-mode-overlay" 
      className="fixed inset-0 z-50 flex flex-col bg-[#111111] text-neutral-100 font-sans"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-neutral-800/80 bg-neutral-900/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{recipe.origin.flag}</span>
          <div>
            <h4 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-[160px] sm:max-w-[320px]">
              {lang === "en" ? "Cooking:" : "กำลังปรุง:"} {recipe.title}
            </h4>
            <span className={`text-[9px] font-sans tracking-[0.25em] font-extrabold uppercase ${accentTextClass}`}>
              {lang === "en" ? "Distraction-Free Mode" : "โหมดทำอาหารไร้สิ่งรบกวน"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Quick Ingredients Reference Button */}
          <button
            onClick={() => setShowIngredientsDrawer(true)}
            className="flex items-center gap-2 rounded-full bg-neutral-800 hover:bg-neutral-700 px-4 py-2 text-[10px] uppercase tracking-widest font-extrabold text-white cursor-pointer border border-neutral-700 transition-all active:scale-95 shadow-sm"
            title="View Ingredients"
          >
            <ListCollapse className="h-4 w-4" style={{ color: accentColor }} />
            <span>{lang === "en" ? "Ingredients" : "วัตถุดิบ"}</span>
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-full bg-red-950/40 border border-red-500/20 hover:bg-red-950/60 p-2 text-red-400 transition-all active:scale-90 cursor-pointer shadow-sm"
            title="Exit Cooking Mode"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-neutral-800 h-2">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: `${((currentStepIdx + 1) / recipe.steps.length) * 100}%`,
            backgroundColor: accentColor
          }}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-6 overflow-y-auto items-stretch justify-center">
        
        {/* Left Hand: Step Instructions & Timer */}
        <div className="flex-1 flex flex-col justify-center space-y-6 md:max-w-2xl">
          
          {/* Step Number Display */}
          <div className="flex items-center justify-between">
            <span className={`font-sans text-[11px] font-extrabold tracking-[0.3em] uppercase ${accentTextClass}`}>
              {lang === "en" ? `Step ${currentStepIdx + 1} of ${recipe.steps.length}` : `ขั้นตอนที่ ${currentStepIdx + 1} จาก ${recipe.steps.length}`}
            </span>
            <span className="text-[10px] font-sans uppercase tracking-widest text-neutral-500 font-bold">
              {Math.round(((currentStepIdx + 1) / recipe.steps.length) * 100)}% {lang === "en" ? "Complete" : "เสร็จสิ้น"}
            </span>
          </div>

          {/* Active Step Core Text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Extra large instruction text */}
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug tracking-tight text-white select-none">
                {currentStep.instruction}
              </h1>

              {/* Step Tip Banner if exists */}
              {currentStep.tip && (
                <div className="p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-neutral-300 text-sm sm:text-base italic leading-relaxed">
                  <span className={`font-sans font-extrabold uppercase tracking-widest text-[10px] block mb-2 not-italic ${accentTextClass}`}>
                    {lang === "en" ? "💡 Heritage Insight:" : "💡 ความรู้ทางวัฒนธรรม:"}
                  </span>
                  "{currentStep.tip}"
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Step-Specific Live Timer Widget */}
          {stepTimerConfig && (
            <div className={`p-6 rounded-2xl bg-neutral-900 border ${accentBorderClass} flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl`}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-850 border border-neutral-800 text-neutral-300">
                  <Timer className={`h-6 w-6 ${isTimerRunning ? "animate-pulse" : ""}`} style={{ color: accentColor }} />
                </div>
                <div>
                  <h4 className="font-display text-sm text-white font-bold">{stepTimerConfig.label}</h4>
                  <p className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                    {lang === "en" ? "Interactive Step Timer" : "ตัวจับเวลาความร้อนอัจฉริยะ"}
                  </p>
                </div>
              </div>

              {/* Timer Number Display */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <span 
                    onClick={() => adjustTimer(30)}
                    className={`font-mono text-3xl sm:text-4xl font-bold tracking-tighter cursor-pointer hover:opacity-80 transition-opacity select-none ${timeLeft === 0 ? "text-red-400 animate-pulse" : "text-white"}`}
                    title={lang === "en" ? "Click to add 30 seconds" : "คลิกเพื่อเพิ่มเวลา 30 วินาที"}
                  >
                    {formatTime(timeLeft)}
                  </span>
                  
                  {/* Manual adjustment buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => adjustTimer(-30)}
                      className="text-[9px] font-sans font-bold text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-2 py-0.5 rounded-full border border-neutral-700 transition-colors cursor-pointer"
                      title={lang === "en" ? "Reduce 30s" : "ลด 30 วินาที"}
                    >
                      -30s
                    </button>
                    <button
                      onClick={() => adjustTimer(30)}
                      className="text-[9px] font-sans font-bold text-neutral-400 hover:text-white bg-neutral-800 hover:bg-neutral-750 px-2 py-0.5 rounded-full border border-neutral-700 transition-colors cursor-pointer"
                      title={lang === "en" ? "Add 30s" : "เพิ่ม 30 วินาที"}
                    >
                      +30s
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTimer}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-white cursor-pointer transition-transform active:scale-95 shadow-sm ${accentBgClass}`}
                  >
                    {isTimerRunning ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </button>
                  <button
                    onClick={resetTimer}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 cursor-pointer transition-colors"
                    title="Reset Timer"
                  >
                    <RotateCcw className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Hand: AI Video Demonstration Panel */}
        <div className="flex-1 flex flex-col justify-center md:max-w-md">
          <div className="bg-neutral-900 border border-neutral-800/80 rounded-2xl p-4.5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-neutral-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
                <span>AI Chef Demo Assistant</span>
              </span>
              <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-bold">
                HD 1080P
              </span>
            </div>
            
            {/* Elegant Custom Video Box Card representing dynamic step demonstration */}
            <div className="relative aspect-video rounded-xl bg-neutral-950 border border-neutral-800 overflow-hidden group/video flex items-center justify-center">
              <div className="absolute inset-0 bg-cover bg-center opacity-60 filter blur-[1px]" style={{ backgroundImage: `url(${recipe.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
              
              {/* Spinning chef helper overlay pattern or animation element */}
              <div className="absolute z-10 flex flex-col items-center justify-center text-center p-4">
                <div className={`h-11 w-11 rounded-full flex items-center justify-center text-white mb-2 shadow-lg backdrop-blur-md border border-white/20 bg-neutral-900/60 group-hover/video:scale-105 transition-transform cursor-pointer`}>
                  <Film className="h-5 w-5" style={{ color: accentColor }} />
                </div>
                <p className="text-white text-xs font-bold leading-tight drop-shadow-sm">
                  {lang === "en" ? `Demonstrating Step ${currentStepIdx + 1}` : `วิดีโอสาธิตขั้นตอนที่ ${currentStepIdx + 1}`}
                </p>
                <p className="text-[9px] text-neutral-300 mt-1 uppercase tracking-wider font-sans">
                  {recipe.title}
                </p>
              </div>

              {/* Status footer inside video */}
              <div className="absolute bottom-2.5 left-3.5 z-10 flex items-center gap-1.5 text-[8px] font-bold text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>{lang === "en" ? "Streaming Live AI Assistant Preview..." : "กำลังแสดงวิดีโอผู้ช่วยสาธิต..."}</span>
              </div>
            </div>

            {/* Quick Helper Tips summary */}
            <div className="bg-neutral-950/60 border border-neutral-800 p-3.5 rounded-xl text-[11px] text-neutral-400 font-sans leading-relaxed">
              <span className="font-extrabold text-white block mb-1">
                {lang === "en" ? "💡 AI Chef Pro Tip:" : "💡 เคล็ดลับจากเอไอเชฟ:"}
              </span>
              {lang === "en" 
                ? "Watch the visual demo above to check the cooking consistency, bubble velocity, and color parity." 
                : "สังเกตวิดีโอช่วยสอนด้านบนเพื่อเช็คความข้นหนืดของซอส, ความเร็วฟองเดือด และโทนสีวัตถุดิบที่เหมาะสม"}
            </div>
          </div>
        </div>

      </div>

      {/* Floating Ingredients Drawer Overlay */}
      <AnimatePresence>
        {showIngredientsDrawer && (
          <div 
            id="ingredients-drawer-backdrop"
            className="absolute inset-0 z-45 bg-black/70 backdrop-blur-sm flex justify-end"
            onClick={() => setShowIngredientsDrawer(false)}
          >
            <motion.div
              id="ingredients-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-neutral-900 border-l border-neutral-800 h-full p-6 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
                  <h3 className="font-display text-lg font-extrabold text-white flex items-center gap-2">
                    📋 {t.label_ingredients}
                  </h3>
                  <button 
                    onClick={() => setShowIngredientsDrawer(false)}
                    className="p-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
                  {recipe.ingredients.map((ing, i) => (
                    <div 
                      key={i} 
                      className="flex items-start justify-between py-2 border-b border-neutral-800/60 text-xs font-sans"
                    >
                      <span className="text-neutral-200 font-medium">{ing.item}</span>
                      <span className="font-extrabold text-right" style={{ color: accentColor }}>{ing.amount}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 mt-4 text-[11px] text-neutral-400 italic leading-relaxed">
                {lang === "en" ? "Tap anywhere on the dark backdrop to return to cooking instructions." : "แตะที่บริเวณมืดด้านข้างเพื่อกลับเข้าสู่หน้าจอขั้นตอนใหญ่ปราศจากสิ่งรบกวนตามปกติ"}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Nav Controls */}
      <div className="bg-neutral-900 border-t border-neutral-800 px-4 py-4 sm:px-6 flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStepIdx === 0}
          className={`flex items-center justify-center gap-1.5 h-12 px-5 rounded-full text-[10px] uppercase tracking-widest font-extrabold transition-all cursor-pointer border ${
            currentStepIdx === 0 
              ? "opacity-30 cursor-not-allowed bg-neutral-800/40 text-neutral-500 border-neutral-800/20" 
              : "bg-neutral-800 hover:bg-neutral-750 text-white border-neutral-700 active:scale-95 shadow-sm"
          }`}
        >
          <ChevronLeft className="h-5 w-5" />
          <span>{lang === "en" ? "Previous Step" : "ขั้นตอนก่อนหน้า"}</span>
        </button>

        <span className="text-[10px] uppercase tracking-wider font-sans text-neutral-400 font-bold">
          {lang === "en" ? `Step ${currentStepIdx + 1} / ${recipe.steps.length}` : `ขั้นตอนที่ ${currentStepIdx + 1} / ${recipe.steps.length}`}
        </span>

        {currentStepIdx === recipe.steps.length - 1 ? (
          <button
            onClick={onClose}
            className={`flex items-center justify-center gap-1.5 h-12 px-6 rounded-full text-[10px] uppercase tracking-widest font-extrabold text-white cursor-pointer transition-transform active:scale-95 shadow-md ${accentBgClass}`}
          >
            <span>{lang === "en" ? "Finish & Celebrate 🎉" : "ปรุงเสร็จสิ้นฉลองเมนูอร่อย! 🎉"}</span>
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-1.5 h-12 px-6 rounded-full text-[10px] uppercase tracking-widest font-extrabold bg-white text-neutral-900 hover:bg-neutral-100 cursor-pointer transition-transform active:scale-95 shadow-md"
          >
            <span>{lang === "en" ? "Next Step" : "ขั้นตอนถัดไป"}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

    </div>
  );
}
