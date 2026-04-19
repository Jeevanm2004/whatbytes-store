"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Review } from "@/types";

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  // Directly pull the relevant product payload
  const product = products.find((p) => p.id.toString() === params.id);
  
  if (!product) {
    return notFound();
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mt-4">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-[#1462b4] hover:text-[#0b3c68] transition font-medium">
            <ArrowLeft size={20} className="mr-2" />
            Back to Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left Column: Huge Image Wrapper */}
          <div className="bg-gray-50/50 rounded-3xl h-[400px] md:h-[500px] flex items-center justify-center border border-gray-100 p-8 relative overflow-hidden">
            <Image 
              src={product.image} 
              alt={product.title} 
              fill
              className="object-contain p-8 mix-blend-multiply"
            />
          </div>
          
          {/* Right Column: Context Details */}
          <div className="flex flex-col justify-center">
            {/* Category */}
            <span className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">
              {product.category}
            </span>
            
            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
              {product.title}
            </h1>
            
            {/* Price & Stars container */}
            <div className="flex items-center gap-6 mb-8 mt-2">
              <p className="text-3xl text-[#1462b4] font-black">${product.price}</p>
              
              <div className="flex items-center gap-1 border-l-2 border-gray-100 pl-6 h-8">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={22} 
                    className={i < Math.round(product.rating || 5) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-2 font-bold mt-1">{product.rating}</span>
              </div>
            </div>
            
            {/* Description Text */}
            <p className="text-gray-600 mb-10 leading-relaxed text-lg pb-10 border-b border-gray-100">
              {product.description}
            </p>
            
            {/* Cart Utilities Area */}
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 mb-4 mt-2">
              
              {/* Quantity Adjuster */}
              <div>
                <span className="block text-sm font-bold text-gray-500 mb-3 uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden bg-white h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-full flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>

              {/* Add to Cart Dispatch Trigger */}
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-14 bg-[#1462b4] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(20,98,180,0.39)] hover:shadow-[0_6px_20px_rgba(20,98,180,0.23)] hover:bg-[#115b9c] transition-all active:scale-[0.98] text-lg flex items-center justify-center gap-3"
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Extension Block */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 mt-8 mb-12">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {product.reviews && product.reviews.length > 0 ? (
            product.reviews.map((review: Review) => (
              <div key={review.id} className="bg-gray-50/50 p-6 rounded-xl border border-gray-100 flex flex-col hover:border-gray-200 transition-colors">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"} 
                    />
                  ))}
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{review.title}</h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">
                  &quot;{review.body}&quot;
                </p>
                <span className="text-sm font-bold text-gray-400">— {review.name}</span>
              </div>
            ))
          ) : (
            <div className="col-span-full py-8 text-center bg-gray-50 rounded-xl border border-gray-100">
               <p className="text-gray-500 font-medium">No reviews yet for this product. Be the first!</p>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
