import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShoppingBag, ArrowLeft, ShieldCheck } from 'lucide-react';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const FloatingCartBadge: React.FC = () => {
  const { cartTotalCount, finalCartTotal, navigateTo, currentPage } = useShop();

  // Hide on cart or checkout page to keep those views clean
  if (currentPage === 'cart' || currentPage === 'checkout' || cartTotalCount === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-6 z-30 animate-gentle-float">
      <button
        onClick={() => navigateTo('cart')}
        className="group bg-stone-950/95 hover:bg-stone-900 text-white rounded-full p-2.5 sm:px-4 sm:py-3 shadow-2xl border border-stone-800 backdrop-blur-md flex items-center gap-3 transition-all hover:scale-105 cursor-pointer"
        aria-label="رفتن به سبد خرید"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs font-black flex items-center justify-center">
            {toPersianDigits(cartTotalCount)}
          </span>
        </div>

        <div className="hidden sm:flex flex-col text-right">
          <span className="text-[11px] text-stone-300">سبد خرید شما</span>
          <span className="text-xs font-bold text-amber-400 tabular-nums">
            {formatToman(finalCartTotal)}
          </span>
        </div>

        <div className="hidden sm:flex items-center text-stone-400 group-hover:text-white transition-colors mr-1">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
      </button>
    </div>
  );
};
