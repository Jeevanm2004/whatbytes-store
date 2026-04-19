"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

import { Product } from "@/types";

type FeaturedProductProps = {
  product: Product;
};

export default function FeaturedProductCard({ product }: FeaturedProductProps) {
  const { addToCart } = useCart();

  return (
    <div className="col-span-1 sm:col-span-2 bg-white rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(6,81,237,0.15)] border border-gray-50 transition-all duration-300 overflow-hidden group relative">
      
      {/* Invisible full-card link layer */}
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${product.title}`} />

      <div className="flex flex-col sm:flex-row h-full">
        {/* Left: Product Image */}
        <div className="bg-gray-50/50 sm:w-[280px] flex-shrink-0 flex items-center justify-center p-8 relative min-h-[240px] pointer-events-none z-10">
          <div className="relative w-full h-[200px]">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between z-10 pointer-events-none">
          <div>
            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              {product.title}
            </h2>

            {/* Price */}
            <p className="text-2xl font-black text-gray-900 mb-2">${product.price}</p>

            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(product.rating || 0) ? "#1462b4" : "#d1d5db"}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
              <span className="text-xs text-gray-400 font-medium ml-1">{product.rating}</span>
            </div>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-4">{product.description}</p>

            {/* Category */}
            <div className="mb-5">
              <p className="text-sm text-gray-400">Category</p>
              <p className="text-sm font-semibold text-gray-700">{product.category}</p>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-full sm:w-auto px-8 py-3 bg-[#1462b4] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(20,98,180,0.3)] hover:bg-[#115b9c] hover:shadow-[0_6px_20px_rgba(20,98,180,0.2)] transition-all active:scale-[0.98] text-base flex items-center justify-center gap-2 pointer-events-auto z-20 relative"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
