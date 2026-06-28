import { Compass, BookOpen, User, GraduationCap } from "lucide-react";
import { UI_TRANSLATIONS } from "../data";

const logoImage = new URL("../assets/images/chim_mai_logo_1782628669011.jpg", import.meta.url).href;

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
          className="flex cursor-pointer items-center group transition-transform active:scale-95 shrink-0"
        >
          <img 
            src={logoImage} 
            alt="Chim Mai? recipe" 
            className="h-10 sm:h-14 md:h-16 max-w-[120px] sm:max-w-[180px] object-contain mix-blend-multiply transition-all duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
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
