import { CATEGORIES, DORM_CATEGORIES, UI_TRANSLATIONS } from "../data";

interface FilterBarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: "en" | "th";
  dormMode: boolean;
}

export default function FilterBar({
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  lang,
  dormMode
}: FilterBarProps) {
  const categoriesList = dormMode ? DORM_CATEGORIES : CATEGORIES;
  const t = UI_TRANSLATIONS[lang];

  return (
    <div id="filter-bar-container" className="space-y-5">
      
      {/* Search Input in Clean Minimalism Style */}
      <div className="relative max-w-xl mx-auto">
        <input
          id="recipe-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={lang === "en" ? "Search recipes, origins, techniques..." : "ค้นหาสูตรอาหาร, แหล่งที่มา, กรรมวิธี..."}
          className={`w-full h-11 pl-11 pr-16 rounded-full border transition-all text-xs tracking-wider uppercase focus:outline-none text-[#2d2a26] placeholder:text-gray-400 font-sans shadow-xs ${
            dormMode 
              ? "bg-purple-50/40 border-purple-150 focus:border-purple-500 focus:bg-white" 
              : "bg-[#fcf9f8] border-neutral-200 focus:border-[#FF6F61] focus:bg-white"
          }`}
        />
        <svg
          className="absolute left-4 top-3.5 h-4.5 w-4.5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-3.5 text-[9px] font-sans font-bold uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] transition-colors cursor-pointer"
          >
            {lang === "en" ? "CLEAR" : "ล้าง"}
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroller */}
      <div className="relative">
        <div className="flex overflow-x-auto pb-1.5 scrollbar-none gap-2 px-1 py-1 -mx-4 sm:mx-0 snap-x">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const categoryLabel = lang === "th" ? cat.labelTh : cat.label;
            return (
              <button
                key={cat.id}
                id={`filter-pill-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                }}
                className={`relative flex-shrink-0 snap-start px-5 py-2 rounded-full text-[10px] uppercase tracking-wider font-bold transition-all duration-200 select-none cursor-pointer border ${
                  isActive
                    ? dormMode
                      ? "bg-purple-700 border-purple-700 text-white shadow-sm"
                      : "bg-[#2D2D2D] border-[#2D2D2D] text-white shadow-sm"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-[#2D2D2D]"
                }`}
              >
                <span>{categoryLabel}</span>
              </button>
            );
          })}
        </div>
        
        {/* Subtle right fade indicating scrollability */}
        <div className="absolute right-0 top-0 bottom-1.5 w-8 bg-gradient-to-l from-[#fdfcfb] to-transparent pointer-events-none md:hidden" />
      </div>

    </div>
  );
}
