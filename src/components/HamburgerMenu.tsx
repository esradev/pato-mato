import React from 'react';
import { useShop, PageType } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import {
  X,
  Luggage,
  Backpack,
  Briefcase,
  Compass,
  Heart,
  PackageCheck,
  PhoneCall,
  Sparkles,
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers,
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const HamburgerMenu: React.FC = () => {
  const { isMenuOpen, setIsMenuOpen, navigateTo, wishlist, cartTotalCount } = useShop();

  if (!isMenuOpen) return null;

  const handleNav = (page: PageType, params?: { categorySlug?: string; productId?: string }) => {
    navigateTo(page, params);
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        aria-hidden="true"
      />

      {/* Drawer panel (RTL right-aligned) */}
      <div className="absolute inset-y-0 right-0 max-w-sm sm:max-w-md w-full bg-stone-50 shadow-2xl flex flex-col z-10 border-l border-stone-200 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black font-serif text-stone-950">پتو متو</span>
            <span className="text-xs text-amber-700 font-medium">| فهرست دسته‌بندی و صفحات</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="بستن منو"
            className="p-2 text-stone-500 hover:text-stone-950 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable menu content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Direct Category Access */}
          <div>
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-stone-400">
              <span>دسته‌بندی‌های تخصصی</span>
              <button
                onClick={() => handleNav('category', { categorySlug: 'all' })}
                className="text-amber-800 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>مشاهده همه محصولات</span>
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNav('category', { categorySlug: cat.slug })}
                  className="w-full text-right p-3 rounded-xl bg-white border border-stone-200/80 hover:border-amber-600/60 hover:bg-amber-50/40 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700 group-hover:bg-amber-100 group-hover:text-amber-900 transition-colors">
                      {cat.slug === 'suitcases' && <Luggage className="w-5 h-5" />}
                      {cat.slug === 'backpacks' && <Backpack className="w-5 h-5" />}
                      {cat.slug === 'totes' && <Layers className="w-5 h-5" />}
                      {cat.slug === 'business' && <Briefcase className="w-5 h-5" />}
                      {cat.slug === 'accessories' && <Sparkles className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-900 group-hover:text-amber-950">
                        {cat.name}
                      </div>
                      <div className="text-[11px] text-stone-500">
                        {toPersianDigits(cat.itemCount)} محصول موجود
                      </div>
                    </div>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-stone-400 group-hover:text-amber-800 group-hover:-translate-x-1 transition-transform" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access to Specialized Pages (Zero modals) */}
          <div className="pt-2 border-t border-stone-200/80">
            <span className="text-xs font-semibold text-stone-400 block mb-3">
              صفحات اختصاصی و راهنماها
            </span>

            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleNav('size-guide')}
                className="w-full text-right p-3 rounded-xl bg-amber-900/5 border border-amber-900/15 hover:bg-amber-900/10 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Compass className="w-5 h-5 text-amber-700" />
                  <div>
                    <span className="text-sm font-semibold text-amber-950 block">
                      راهنمای ابعاد کابین پرواز
                    </span>
                    <span className="text-[11px] text-amber-800/80">
                      بررسی سازگاری چمدان با ایرلاین‌های داخلی و خارجی
                    </span>
                  </div>
                </div>
                <ChevronLeft className="w-4 h-4 text-amber-700" />
              </button>

              <button
                onClick={() => handleNav('tracking')}
                className="w-full text-right p-3 rounded-xl bg-white border border-stone-200/80 hover:bg-stone-100/60 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <PackageCheck className="w-5 h-5 text-stone-700" />
                  <span className="text-sm font-medium text-stone-800">
                    پیگیری وضعیت سفارش
                  </span>
                </div>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => handleNav('wishlist')}
                className="w-full text-right p-3 rounded-xl bg-white border border-stone-200/80 hover:bg-stone-100/60 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-5 h-5 text-stone-700" />
                  <span className="text-sm font-medium text-stone-800">
                    لیست نشان‌شده‌ها ({toPersianDigits(wishlist.length)})
                  </span>
                </div>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>

              <button
                onClick={() => handleNav('cart')}
                className="w-full text-right p-3 rounded-xl bg-white border border-stone-200/80 hover:bg-stone-100/60 transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-gentle-pulse"></div>
                  <span className="text-sm font-medium text-stone-800">
                    مشاهده سبد خرید ({toPersianDigits(cartTotalCount)} قلم کالا)
                  </span>
                </div>
                <ChevronLeft className="w-4 h-4 text-stone-400" />
              </button>
            </div>
          </div>

          {/* Brand & Boutique Links */}
          <div className="pt-2 border-t border-stone-200/80 space-y-1">
            <span className="text-xs font-semibold text-stone-400 block mb-2">درباره پتو متو</span>
            <button
              onClick={() => handleNav('about')}
              className="w-full text-right py-2 text-sm text-stone-700 hover:text-stone-950 font-medium transition-colors cursor-pointer"
            >
              داستان متریال و ساخت لوکس
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="w-full text-right py-2 text-sm text-stone-700 hover:text-stone-950 font-medium transition-colors cursor-pointer"
            >
              شعب حضوری و تماس با ما
            </button>
          </div>
        </div>

        {/* Drawer Footer with Consultation Assistance */}
        <div className="p-4 bg-white border-t border-stone-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-stone-900">مشاوره تلفنی خرید چمدان</div>
            <div className="text-[11px] text-stone-500">شنبه تا پنج‌شنبه: ۹ الی ۲۱</div>
          </div>
          <a
            href="tel:02188880000"
            className="flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>۰۲۱-۸۸۸۸۰۰۰۰</span>
          </a>
        </div>
      </div>
    </div>
  );
};
