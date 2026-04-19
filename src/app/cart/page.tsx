"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isMounted } = useCart();

  // Hydration safety wall (Prevents UI mismatch on first render)
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
        <div className="text-gray-400 font-bold animate-pulse text-lg">Loading Cart Data...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Row */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-3 bg-white rounded-full shadow-sm border border-gray-100 text-gray-400 hover:text-[#1462b4] hover:border-blue-100 transition-all">
            <ArrowLeft size={22} />
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 sm:p-24 flex flex-col items-center justify-center text-center">
            <div className="w-28 h-28 bg-[#f5f9ff] rounded-full flex items-center justify-center mb-6 shadow-inner">
              <span className="text-4xl relative right-1">🛒</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#1a2f4c] mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-10 max-w-md text-lg leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover some of our premium top-rated items!
            </p>
            <Link 
              href="/"
              className="px-10 py-4 bg-[#1462b4] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(20,98,180,0.39)] hover:shadow-[0_6px_20px_rgba(20,98,180,0.23)] hover:bg-[#115b9c] transition-all text-lg"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Column: Cart Items List */}
            <div className="flex-1 w-full bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.06)] border border-gray-100 overflow-hidden">
              <ul className="divide-y divide-gray-100">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 group hover:bg-gray-50/30 transition-colors">
                    
                    {/* Item Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-2xl relative flex-shrink-0 flex items-center justify-center p-4 border border-gray-100">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-contain p-3 mix-blend-multiply hover:scale-105 transition-transform"
                      />
                    </div>
                    
                    {/* Item Details */}
                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1 pr-4">
                          <Link href={`/product/${item.id}`} className="hover:text-[#1462b4] transition-colors">
                            <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{item.title}</h3>
                          </Link>
                          <p className="text-[#1462b4] font-black text-xl">${item.price.toFixed(2)}</p>
                        </div>
                        
                        {/* Adjuster Container */}
                        <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-start gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-10 text-center font-bold text-gray-700">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-50 transition"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Remove Trigger */}
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 sm:p-1.5 rounded-lg transition-colors flex items-center gap-2"
                            title="Remove completely"
                          >
                            <Trash2 size={20} />
                            <span className="text-sm font-bold sm:hidden">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Column: Dynamic Price Summary Block */}
            <div className="w-full lg:w-[400px] flex-shrink-0 sticky top-28">
              <div className="bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.06)] border border-gray-100 p-8 sm:p-10">
                <h2 className="text-2xl font-extrabold text-[#1a2f4c] mb-8">Order Summary</h2>
                
                <div className="space-y-5 text-gray-600 mb-8 border-b border-gray-100 pb-8">
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-500">Subtotal</span>
                    <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-500">Shipping Estimate</span>
                    <span className="font-bold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-500">Tax Estimate</span>
                    <span className="font-medium text-gray-400 text-sm">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-10">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-black text-[#1462b4]">${cartTotal.toFixed(2)}</span>
                </div>
                
                <button 
                  className="w-full py-4 sm:py-5 bg-[#1462b4] text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(20,98,180,0.39)] hover:shadow-[0_6px_20px_rgba(20,98,180,0.23)] hover:bg-[#115b9c] transition-all active:scale-[0.98] text-xl"
                  onClick={() => alert("Checkout initiated! (Mock functionality)")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
            
          </div>
        )}
      </div>
    </main>
  );
}
