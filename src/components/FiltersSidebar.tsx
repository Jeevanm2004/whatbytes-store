"use client";

type FiltersSidebarProps = {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
};

export default function FiltersSidebar({ 
  selectedCategory, 
  setSelectedCategory, 
  maxPrice, 
  setMaxPrice
}: FiltersSidebarProps) {
  return (
    <div className="w-64 bg-[#1462b4] text-white p-6 rounded-xl shadow-md h-fit flex-shrink-0">
      <h2 className="text-[22px] font-bold mb-6">Filters</h2>
      
      {/* Category Filter */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[15px]">Category</h3>
        <div className="space-y-3 flex flex-col">
          {["All", "Electronics", "Clothing", "Home"].map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-4 h-4">
                <input 
                  type="radio" 
                  name="category" 
                  value={cat} 
                  checked={selectedCategory === cat}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="peer appearance-none w-[18px] h-[18px] border-[1.5px] border-white rounded-full bg-transparent checked:bg-transparent outline-none ring-0 cursor-pointer" 
                />
                <div className="w-[8px] h-[8px] bg-white rounded-full absolute hidden peer-checked:block pointer-events-none"></div>
              </div>
              <span className="text-[15px] opacity-90 group-hover:opacity-100 transition-opacity">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-[15px]">Price</h3>
        <div className="relative w-full mb-3 flex items-center py-2">
          {/* Dual thumb track approximation */}
          <div className="absolute left-1 right-1 h-[2px] bg-white/40 rounded-full z-0 pointer-events-none flex items-center justify-between">
            <div className="w-3 h-3 bg-white rounded-full shadow-sm -ml-1.5 z-20"></div>
          </div>
          <input 
            type="range" 
            min="0" 
            max="2500" 
            step="10"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-[2px] bg-transparent appearance-none cursor-pointer z-10 relative outline-none
              [&::-webkit-slider-runnable-track]:bg-white [&::-webkit-slider-runnable-track]:h-[2px]
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:-mt-[6px]
              [&::-moz-range-track]:bg-white [&::-moz-range-track]:h-[2px]
              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0"
          />
        </div>
        <div className="flex justify-between text-[15px] font-medium mt-1">
          <span>$0</span>
          <span>${maxPrice}</span>
        </div>
      </div>

    </div>
  );
}
