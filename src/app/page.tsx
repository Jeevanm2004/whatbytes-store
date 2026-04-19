"use client";

import Link from "next/link";
import { products } from "@/data/products";
import FiltersSidebar from "@/components/FiltersSidebar";
import BrandFilterCard from "@/components/BrandFilterCard";
import ProductCard from "@/components/ProductCard";
import FeaturedProductCard from "@/components/FeaturedProductCard";
import { useMemo, useCallback, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

function StoreContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Mobile filter panel toggle
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Read all filter state directly from URL params (single source of truth)
  const searchQuery = searchParams.get('search')?.toLowerCase() || "";
  const selectedCategory = searchParams.get('category') || "All";
  const maxPrice = Number(searchParams.get('price') || 2500);
  const selectedBrand = searchParams.get('brand') || "All";

  // Helper: update URL params without full page reload
  const updateParams = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Wrapped setters that push changes into URL
  const setSelectedCategory = useCallback((cat: string) => {
    updateParams({ category: cat === "All" ? null : cat });
  }, [updateParams]);

  const setMaxPrice = useCallback((price: number) => {
    updateParams({ price: price === 2500 ? null : String(price) });
  }, [updateParams]);

  const setSelectedBrand = useCallback((brand: string) => {
    updateParams({ brand: brand === "All" ? null : brand });
  }, [updateParams]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesPrice = product.price <= maxPrice;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery);
      const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
      return matchesCategory && matchesPrice && matchesSearch && matchesBrand;
    });
  }, [selectedCategory, maxPrice, searchQuery, selectedBrand]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      
      {/* Desktop Left Sidebar — stacked vertically, hidden on mobile */}
      <aside className="hidden md:flex flex-col gap-6">
        <FiltersSidebar 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
        <BrandFilterCard
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
        />
      </aside>

      {/* Main Content */}
      <section className="flex-1">
        {/* Header row with Filter toggle button on mobile */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-[#1a2f4c]">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Product Listing"}
            </h1>
            <span className="text-gray-500 font-medium bg-white px-3 py-1 rounded-full shadow-sm text-sm border border-gray-100 whitespace-nowrap">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'}
            </span>
          </div>

          {/* Mobile Filter Toggle Button — only visible below md */}
          <div className="md:hidden">
            <button
              onClick={() => setShowMobileFilters((prev) => !prev)}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#1462b4] text-white font-semibold rounded-xl shadow-sm hover:bg-[#115b9c] transition-colors active:scale-[0.98] text-sm"
            >
              {showMobileFilters ? (
                <>
                  <X size={17} />
                  Hide Filters
                </>
              ) : (
                <>
                  <SlidersHorizontal size={17} />
                  Filter
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Filter Panel — slides in below the button */}
        {showMobileFilters && (
          <div className="md:hidden flex flex-col gap-4 mb-6">
            <FiltersSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <BrandFilterCard
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
          </div>
        )}
        
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 p-16 flex flex-col items-center justify-center text-center mt-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-gray-400 text-3xl">🔍</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-md mb-8">We couldn't find any items matching your current filters and search query.</p>
            <button 
              onClick={() => router.replace(pathname, { scroll: false })}
              className="px-8 py-3 bg-[#e8f1fc] text-[#1462b4] font-bold rounded-lg hover:bg-[#d8e6fa] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              product.id === 1
                ? <FeaturedProductCard key={product.id} product={product} />
                : <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 pb-16">
      <Suspense fallback={<div className="h-screen flex justify-center items-center font-bold text-gray-400">Loading store...</div>}>
        <StoreContent />
      </Suspense>
    </main>
  );
}
