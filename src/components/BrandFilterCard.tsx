"use client";

type BrandFilterCardProps = {
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
};

export default function BrandFilterCard({
  selectedBrand,
  setSelectedBrand,
  maxPrice,
  setMaxPrice,
}: BrandFilterCardProps) {
  return (
    <div className="w-64 bg-white text-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 h-fit flex-shrink-0">
      {/* Brand radio list */}
      <h2 className="text-[20px] font-bold mb-5 text-gray-900">Brand</h2>
      <div className="space-y-3 flex flex-col mb-7">
        {["All", "Samsung", "Apple", "H&M", "Zara", "IKEA"].map((brand) => (
          <label key={brand} className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="brand-card"
              value={brand}
              checked={selectedBrand === brand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-[18px] h-[18px] border-2 border-gray-300 rounded-full appearance-none cursor-pointer
                checked:border-[#1462b4] checked:bg-[#1462b4]
                [&:checked]:ring-2 [&:checked]:ring-offset-1 [&:checked]:ring-[#1462b4]
                transition-all"
            />
            <span className="text-[15px] text-gray-700 group-hover:text-gray-900 transition-colors">{brand}</span>
          </label>
        ))}
      </div>

      {/* Price number input */}
      <h3 className="text-[16px] font-bold text-gray-900 mb-3">Price</h3>
      <div className="relative">
        <input
          type="number"
          min={0}
          max={2500}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-800 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#1462b4]/30 focus:border-[#1462b4] transition-all bg-gray-50"
        />
      </div>
    </div>
  );
}
