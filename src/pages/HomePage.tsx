import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, ASSETS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Luggage,
  Shield,
  Plane,
  Sparkles,
  ArrowLeft,
  Compass,
  CheckCircle2,
  ChevronLeft,
  RotateCcw,
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { navigateTo } = useShop();

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured);
  const newArrivals = PRODUCTS.filter((p) => p.isNew);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Campaign Section with Floating Visual Badges */}
      <section className="relative overflow-hidden bg-stone-900 text-white rounded-3xl mx-4 sm:mx-6 lg:mx-8 mt-4 shadow-2xl border border-stone-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px] items-center">
          {/* Text Content */}
          <div className="p-8 sm:p-12 lg:p-16 lg:col-span-6 z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800/80 border border-stone-700/80 text-amber-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-gentle-pulse"></span>
              <span>کلکسیون نوین مسافرتی ۲۰۲۶ · پتو متو</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.2] text-stone-100">
              سفری بی‌دغدغه با{' '}
              <span className="text-amber-400 font-serif">سبک‌ترین و مقاوم‌ترین</span>{' '}
              چمدان‌ها
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl">
              تلفیق پلی‌کربنات نشکن آلمانی، چرخ‌های ژاپنی هینوموتو با گردش بی‌صدا و قفل‌های هوشمند بین‌المللی TSA. پتو متو تجربه متفاوتی از اصالت و آسودگی را در فرودگاه‌های جهان برای شما رقم می‌زند.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigateTo('category', { categorySlug: 'suitcases' })}
                className="py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-sm font-bold shadow-lg hover:shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>مشاهده چمدان‌های پروازی</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigateTo('size-guide')}
                className="py-3.5 px-5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-stone-200 text-sm font-medium border border-stone-700 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-400" />
                <span>راهنمای ابعاد کابین ایرلاین‌ها</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>گارانتی ۵ ساله پتو متو</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>استاندارد جهانی IATA</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Showcase with Gentle Floating Elements */}
          <div className="relative lg:col-span-6 h-full min-h-[380px] lg:min-h-[640px] flex items-center justify-center p-6 lg:p-12 overflow-hidden">
            <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 group">
              <img
                src={ASSETS.hero}
                alt="چمدان‌های لوکس پتو متو"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent pointer-events-none" />

              {/* Gentle Floating Spec Badges */}
              <div className="absolute top-4 right-4 animate-gentle-float bg-stone-900/90 backdrop-blur-md border border-stone-700 text-stone-100 p-2.5 rounded-xl shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold">پلی‌کربنات Makrolon آلمان</div>
                  <div className="text-[10px] text-stone-400">انعطاف‌پذیر و نشکن در برابر ضربه</div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 animate-gentle-float-delayed bg-stone-900/90 backdrop-blur-md border border-stone-700 text-stone-100 p-2.5 rounded-xl shadow-xl flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold">چرخ‌های ژاپنی Hinomoto</div>
                  <div className="text-[10px] text-stone-400">گردش ۳۶۰ درجه فوق‌العاده بی‌صدا</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Visual Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider block mb-1">
              دسته‌بندی‌های برگزیده
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              مجموعه‌های پتو متو
            </h2>
          </div>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'all' })}
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>مشاهده همه محصولات</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.slice(0, 3).map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigateTo('category', { categorySlug: cat.slug })}
              className="group relative rounded-2xl overflow-hidden bg-stone-900 h-80 cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 border border-stone-200/50"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-85 group-hover:opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/30 to-transparent pointer-events-none" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end space-y-2">
                <span className="text-[11px] font-medium text-amber-400 tracking-wide">
                  {cat.englishName}
                </span>
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-200 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-stone-300">
                  <span>{toPersianDigits(cat.itemCount)} محصول آماده ارسال</span>
                  <div className="flex items-center gap-1 text-amber-400 group-hover:-translate-x-1 transition-transform">
                    <span>مشاهده محصولات</span>
                    <ChevronLeft className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider block mb-1">
              پیشنهادات ویژه
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              پرفروش‌ترین‌های این فصل
            </h2>
          </div>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'all' })}
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>مشاهده همه</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Interactive Flight Baggage Teaser Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-amber-950 text-amber-50 rounded-3xl p-8 sm:p-12 border border-amber-900/60 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/50 text-amber-300 text-xs font-semibold">
              <Plane className="w-3.5 h-3.5" />
              <span>ابزار تخصصی مسافران هوایی</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-serif text-white">
              آیا چمدان شما مجاز به ورود به کابین هواپیما است؟
            </h3>
            <p className="text-sm text-amber-200/90 leading-relaxed">
              با استفاده از ابزار هوشمند پتو متو، قوانین ابعاد و وزن بار مجاز ایرلاین‌های مختلف مانند ماهان، ایران‌ایر، امارات، ترکیش و قطر ایرویز را قبل از خرید بررسی کنید.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <button
              onClick={() => navigateTo('size-guide')}
              className="py-3.5 px-6 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Compass className="w-4 h-4" />
              <span>ورود به راهنمای کابین و ایرلاین‌ها</span>
            </button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-xs font-bold text-amber-700 tracking-wider block mb-1">
              جدیدترین کالکشن
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
              تازه‌رسیده‌ها به بوتیک پتو متو
            </h2>
          </div>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'all' })}
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>مشاهده همه محصولات جدید</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
