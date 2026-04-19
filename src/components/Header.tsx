"use client";

import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useCart } from "@/context/CartContext";

function HeaderContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { itemCount, isMounted } = useCart();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    // Only replace URL, don't trigger a scroll event to top of page
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <header className="bg-[#115b9c] text-white w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-white text-[#115b9c] rounded-xl flex items-center justify-center font-black text-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
              WB
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 hidden sm:block">
              WhatBytes
            </span>
          </Link>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-2xl px-4 hidden sm:flex">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-300" />
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchParams.get('search')?.toString() || ""}
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full pl-10 pr-3 py-2.5 border border-blue-400 rounded-md leading-5 bg-[#115b9c] text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-white focus:border-white sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {/* Right: Cart + Profile */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-[#0b2847] hover:bg-[#07192d] px-5 py-2.5 rounded-md transition-colors shadow-sm"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="font-semibold text-sm">Cart</span>
            {/* Item Count Badge */}
            {isMounted && itemCount > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 text-[10px] font-bold leading-none text-white bg-blue-600 rounded-full border-2 border-[#115b9c]">
                {itemCount}
              </span>
            )}
          </Link>

          {/* Profile Avatar */}
          <button 
            className="w-10 h-10 rounded-full bg-[#0b2847] hover:bg-[#07192d] flex items-center justify-center transition-colors border-2 border-white/20 hover:border-white/40"
            aria-label="User profile"
          >
            <User className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      
      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search for products..."
            value={searchParams.get('search')?.toString() || ""}
            onChange={(e) => handleSearch(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-blue-400 rounded-md leading-5 bg-[#115b9c] text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:white sm:text-sm"
          />
        </div>
      </div>
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={<header className="bg-[#115b9c] h-20 w-full sticky top-0 z-50"></header>}>
      <HeaderContent />
    </Suspense>
  );
}
