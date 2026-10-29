import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Menu, Search, ShoppingBag, Heart, X, Compass, ShieldCheck } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const Header: React.FC = () => {
  const {
    navigateTo,
    currentPage,
    cartTotalCount,
    wishlist,
    setIsMenuOpen,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('category', { categorySlug: 'all' });
      setShowSearchInput(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center font-normal flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-gentle-pulse"></span>
        <span>ارسال رایگان هوایی به سراسر کشور برای خریدهای بالای ۲ میلیون تومان</span>
        <span className="text-stone-500 hidden sm:inline">|</span>
        <button
          onClick={() => navigateTo('size-guide')}
          className="text-amber-300 hover:text-amber-200 underline font-medium cursor-pointer hidden sm:inline"
        >
          راهنمای ابعاد چمدان پرواز
        </button>
      </div>

      {/* Main 3-Zone Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Hamburger Menu Trigger & Brand Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setIsMenuOpen(true)}
            aria-label="باز کردن منوی دسته‌بندی‌ها"
            className="p-2 -mr-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/60 rounded-lg transition-colors cursor-pointer flex items-center gap-2 group"
          >
            <Menu className="w-6 h-6 transition-transform group-hover:scale-105" />
            <span className="text-xs font-semibold text-stone-700 hidden md:inline">منو و دسته‌بندی‌ها</span>
          </button>

          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer select-none group flex items-baseline gap-2"
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-950 font-serif">
              پتو متو
            </span>
            <span className="text-[11px] font-medium text-amber-700 tracking-wider hidden lg:inline">
              PETO METO
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Clean text, no pill wrappers) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
          <button
            onClick={() => navigateTo('category', { categorySlug: 'suitcases' })}
            className={`transition-colors hover:text-stone-950 cursor-pointer ${
              currentPage === 'category' ? 'text-stone-950 font-semibold' : ''
            }`}
          >
            چمدان مسافرتی
          </button>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'backpacks' })}
            className="transition-colors hover:text-stone-950 cursor-pointer"
          >
            کوله‌پشتی
          </button>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'totes' })}
            className="transition-colors hover:text-stone-950 cursor-pointer"
          >
            کیف چرم و دستی
          </button>
          <button
            onClick={() => navigateTo('size-guide')}
            className={`flex items-center gap-1.5 transition-colors hover:text-stone-950 cursor-pointer ${
              currentPage === 'size-guide' ? 'text-amber-800 font-semibold' : ''
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600" />
            راهنمای کابین پرواز
          </button>
          <button
            onClick={() => navigateTo('tracking')}
            className="transition-colors hover:text-stone-950 cursor-pointer text-stone-500"
          >
            پیگیری سفارش
          </button>
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search trigger / bar */}
          <div className="relative">
            {showSearchInput ? (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute left-0 -top-4 bg-white border border-stone-300 rounded-lg shadow-lg p-1.5 flex items-center gap-1.5 w-64 sm:w-80 z-50"
              >
                <input
                  type="text"
                  placeholder="جستجوی چمدان، کوله، چرم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs text-stone-900 bg-transparent px-2.5 py-1.5 outline-none font-sans"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 text-xs bg-stone-900 text-white rounded hover:bg-stone-800 transition-colors cursor-pointer"
                >
                  بیاب
                </button>
                <button
                  type="button"
                  onClick={() => setShowSearchInput(false)}
                  className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearchInput(true)}
                aria-label="جستجو در محصولات"
                className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Wishlist Link -> Dedicated Page */}
          <button
            onClick={() => navigateTo('wishlist')}
            aria-label="لیست علاقه‌مندی‌ها"
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 rounded-lg transition-colors cursor-pointer relative"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 left-1 bg-amber-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {toPersianDigits(wishlist.length)}
              </span>
            )}
          </button>

          {/* Cart Link -> Dedicated Cart Page */}
          <button
            onClick={() => navigateTo('cart')}
            aria-label="سبد خرید"
            className={`flex items-center gap-2 py-2 px-3.5 rounded-lg border transition-all cursor-pointer ${
              currentPage === 'cart'
                ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                : 'bg-stone-100/90 text-stone-900 border-stone-300 hover:bg-stone-200'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            <span className="text-xs font-semibold whitespace-nowrap">
              سبد خرید
            </span>
            <span className="w-5 h-5 bg-amber-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center">
              {toPersianDigits(cartTotalCount)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
