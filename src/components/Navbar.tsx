import { Compass, BookOpen, User, GraduationCap } from "lucide-react";
import { UI_TRANSLATIONS } from "../data";

interface NavbarProps {
  activeTab: "explore" | "fridge" | "journal";
  setActiveTab: (tab: "explore" | "fridge" | "journal") => void;
  savedCount: number;
  shoppingListCount: number;
  lang: "en" | "th";
  setLang: (lang: "en" | "th") => void;
  dormMode: boolean;
  setDormMode: (mode: boolean) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  savedCount,
  shoppingListCount,
  lang,
  setLang,
  dormMode,
  setDormMode
}: NavbarProps) {
  const t = UI_TRANSLATIONS[lang];

  return (
    <header 
      id="tasteorigin-navbar" 
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        dormMode 
          ? "border-purple-200/50 bg-[#faf6ff]/90" 
          : "border-neutral-200/80 bg-[#fcf9f8]/90"
      } backdrop-blur-md`}
    >
      <div className="mx-auto flex max-w-7xl h-22 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Elegant 'Chim Mai? recipe' Logo matching the new minimal branding design */}
        <div 
          onClick={() => setActiveTab("explore")}
          className="flex cursor-pointer items-center gap-2 group transition-transform active:scale-95"
        >
          <div className="flex flex-col items-start leading-none select-none">
            <div className="flex items-baseline font-sans font-bold text-xl sm:text-2xl tracking-tight text-[#2d2a26]">
              <span>Chim Ma</span>
              <span className="relative inline-block px-[1px]">
                {/* Cute minimal shrimp SVG sitting directly on top of the dotless 'ı' */}
                <span className="absolute -top-[14px] left-1/2 -translate-x-1/2 w-[22px] h-[22px] pointer-events-none group-hover:scale-110 transition-transform duration-300" title="Chim Mai Shrimp">
                  <svg className="h-full w-full text-[#ff8170]" viewBox="0 0 100 100" fill="currentColor">
                    {/* Tail Fins */}
                    <path d="M 24 54 C 15 50, 8 38, 4 42 C 8 46, 16 51, 20 54 Z" fill="#ff6b6b" />
                    <path d="M 24 54 C 18 61, 12 68, 8 63 C 11 59, 18 56, 21 55 Z" fill="#ff6b6b" />
                    {/* Main Curved Body */}
                    <path d="M 28 44 C 50 22, 76 27, 82 42 C 87 52, 78 62, 68 62 C 53 62, 43 55, 28 44 Z" fill="#ff8a80" />
                    {/* Light colored back segments / stripes */}
                    <path d="M 44 36 C 48 42, 51 50, 50 56" stroke="#ffe5da" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M 56 38 C 61 44, 64 51, 63 59" stroke="#ffe5da" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M 68 41 C 72 46, 74 52, 72 59" stroke="#ffe5da" strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    {/* Eye */}
                    <circle cx="36" cy="42" r="3" fill="#1a1a1a" />
                  </svg>
                </span>
                <span className="text-[#2d2a26]">ı</span>
              </span>
              <span className="text-[#fca11a] font-serif font-black ml-0.5 text-2xl sm:text-3xl leading-none">?</span>
            </div>
            {/* Elegant small tracking-widest subtitle */}
            <span className="text-[10px] font-sans tracking-[0.25em] text-[#7a756e] uppercase ml-0.5 mt-0.5 font-bold">
              {lang === "en" ? "recipe" : "รีซิปี"}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* Explore Tab */}
          <button
            id="nav-explore-btn"
            onClick={() => setActiveTab("explore")}
            className={`flex items-center gap-1.5 px-2.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "explore"
                ? dormMode 
                  ? "bg-gradient-to-r from-purple-600 to-teal-500 text-white shadow-sm rounded-sm"
                  : "bg-[#5a6a5a] text-white rounded-sm"
                : "text-[#2d2a26]/60 hover:bg-[#f5f2ed] hover:text-[#1a1a1a] rounded-sm"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{lang === "en" ? "Explore" : "สำรวจ"}</span>
          </button>

          {/* Smart Fridge Tab */}
          <button
            id="nav-fridge-btn"
            onClick={() => setActiveTab("fridge")}
            className={`flex items-center gap-1.5 px-2.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "fridge"
                ? dormMode 
                  ? "bg-gradient-to-r from-purple-600 to-teal-500 text-white shadow-sm rounded-sm"
                  : "bg-[#5a6a5a] text-white rounded-sm"
                : "text-[#2d2a26]/60 hover:bg-[#f5f2ed] hover:text-[#1a1a1a] rounded-sm"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            <span>{dormMode ? (lang === "en" ? "Dorm Box" : "กล่องเด็กหอ") : (lang === "en" ? "Smart Fridge" : "ตู้เย็น") }</span>
          </button>

          {/* My Kitchen Journal Tab */}
          <button
            id="nav-journal-btn"
            onClick={() => setActiveTab("journal")}
            className={`flex items-center gap-1.5 px-2.5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
              activeTab === "journal"
                ? dormMode 
                  ? "bg-gradient-to-r from-purple-600 to-teal-500 text-white shadow-sm rounded-sm"
                  : "bg-[#5a6a5a] text-white rounded-sm"
                : "text-[#2d2a26]/60 hover:bg-[#f5f2ed] hover:text-[#1a1a1a] rounded-sm"
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span className="flex items-center gap-1">
              <span className="hidden sm:inline">{lang === "en" ? "Journal" : "บันทึก"}</span>
              {(savedCount > 0 || shoppingListCount > 0) && (
                <span className="flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#1a1a1a] px-1 text-[9px] font-bold text-white">
                  {savedCount + shoppingListCount}
                </span>
              )}
            </span>
          </button>
        </nav>

        {/* Global Controls: Language and Dorm Mode Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-4 pl-2 border-l border-neutral-200">
          
          {/* Language Toggle Button with Elegant Flag */}
          <button
            onClick={() => setLang(lang === "en" ? "th" : "en")}
            className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-sm bg-neutral-100 hover:bg-neutral-200/80 active:scale-95 transition-all text-xs font-bold border border-neutral-200 cursor-pointer"
            title={lang === "en" ? "สลับภาษาเป็นภาษาไทย" : "Switch to English"}
          >
            <span className="text-sm">{lang === "en" ? "🇹🇭" : "🇬🇧"}</span>
            <span className="text-[10px] uppercase tracking-wider font-sans text-[#2d2a26] hidden md:inline">
              {lang === "en" ? "TH" : "EN"}
            </span>
          </button>

          {/* Dorm Mode Toggle Switch - Minimalist without Emojis / Stickers */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setDormMode(!dormMode)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                dormMode ? "bg-purple-700" : "bg-neutral-200"
              }`}
              title={dormMode ? "Switch to Normal Mode" : "Switch to Student Dorm Mode"}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  dormMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="hidden lg:flex flex-col select-none">
              <span className={`text-[10px] font-sans font-black uppercase tracking-wider ${dormMode ? "text-purple-700" : "text-neutral-500"}`}>
                {t.dorm_mode}
              </span>
            </span>
          </div>

        </div>

      </div>
    </header>
  );
}
