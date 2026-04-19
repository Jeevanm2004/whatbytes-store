import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

import { Product } from "@/types";

type ProductProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 rounded-xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_8px_20px_-6px_rgba(6,81,237,0.15)] border border-gray-50 flex flex-col transition-all duration-300 h-full overflow-hidden group relative">
      
      {/* Absolute routing layer filling the card */}
      <Link href={`/product/${product.id}`} className="absolute inset-0 z-0" aria-label={`View details for ${product.title}`} />

      {/* Visual Content (locked beneath pointer events to let the Link tag absorb clicks natively) */}
      <div className="bg-gray-50/50 h-56 rounded-lg mb-4 flex items-center justify-center p-6 relative overflow-hidden z-10 pointer-events-none">
        <div className="relative w-full h-full">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>
      <h3 className="font-bold text-[16px] text-gray-900 mb-1 leading-tight relative z-10 pointer-events-none px-1">{product.title}</h3>
      <p className="font-bold text-[18px] text-gray-900 mb-2 relative z-10 pointer-events-none px-1">${product.price}</p>

      {/* Star Rating Row */}
      <div className="flex items-center gap-0.5 mb-3 relative z-10 pointer-events-none px-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={i < Math.round(product.rating || 0) ? "#1462b4" : "#d1d5db"}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
        <span className="text-xs text-gray-400 font-medium ml-1">{product.rating}</span>
      </div>
      
      {/* Interactive Trigger Component overriding the absolute Link */}
      <button 
        onClick={(e) => {
          e.preventDefault(); 
          addToCart(product, 1);
        }}
        className="mt-auto w-full py-2.5 bg-[#1462b4] text-white font-medium rounded-lg hover:bg-[#115b9c] transition-colors text-center shadow-sm active:scale-[0.98] relative z-20"
      >
        Add to Cart
      </button>

    </div>
  );
}
