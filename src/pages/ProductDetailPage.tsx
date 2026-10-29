import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, ProductColor } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Plane,
  Check,
  Minus,
  Plus,
  Star,
  ChevronLeft,
  Ruler,
  Weight,
  Sparkles,
  ArrowRight,
  Share2,
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../utils/formatters';

export const ProductDetailPage: React.FC = () => {
  const { selectedProductId, navigateTo, addToCart, toggleWishlist, isWishlisted } = useShop();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const isFavorite = isWishlisted(product.id);
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const handleDirectBuy = () => {
    addToCart(product, selectedColor, quantity);
    navigateTo('cart');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-stone-500 overflow-x-auto whitespace-nowrap">
        <button
          onClick={() => navigateTo('home')}
          className="hover:text-stone-900 transition-colors cursor-pointer"
        >
          صفحه نخست
        </button>
        <span aria-hidden="true" className="text-stone-300">/</span>
        <button
          onClick={() => navigateTo('category', { categorySlug: product.category })}
          className="hover:text-stone-900 transition-colors cursor-pointer"
        >
          {product.category === 'suitcases' && 'چمدان‌های مسافرتی'}
          {product.category === 'backpacks' && 'کوله‌پشتی‌ها'}
          {product.category === 'totes' && 'کیف‌های چرم'}
          {product.category === 'business' && 'کیف‌های اداری'}
          {product.category === 'accessories' && 'اکسسوری سفر'}
        </button>
        <span aria-hidden="true" className="text-stone-300">/</span>
        <span className="text-stone-900 font-medium truncate max-w-xs">{product.persianName}</span>
      </nav>

      {/* Main Product Showcase: 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery Column (Sticky left on desktop) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 sm:aspect-square bg-stone-100 rounded-3xl overflow-hidden border border-stone-200 shadow-sm flex items-center justify-center">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.persianName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Gentle Floating Highlights on Image */}
            {product.cabinApproved && (
              <div className="absolute top-4 right-4 animate-gentle-float bg-stone-950/85 backdrop-blur-md text-amber-300 text-xs px-3 py-1.5 rounded-xl border border-stone-800 flex items-center gap-1.5 shadow-lg">
                <Plane className="w-4 h-4 text-amber-400" />
                <span>سازگار با استاندارد کابین پرواز (IATA)</span>
              </div>
            )}

            <button
              onClick={handleCopyLink}
              className="absolute top-4 left-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md backdrop-blur-md transition-all cursor-pointer"
              title="اشتراک‌گذاری لینک محصول"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copiedLink && (
              <div className="absolute top-16 left-4 bg-stone-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-md">
                لینک کپی شد!
              </div>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer bg-stone-100 ${
                    activeImageIndex === idx
                      ? 'border-amber-700 shadow-md scale-102'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`تصویر ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Key Metric Highlights (Unboxed) */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-stone-100/70 rounded-2xl border border-stone-200/80 text-center">
            <div className="space-y-1">
              <span className="text-[11px] text-stone-500 block">ظرفیت بارگیری</span>
              <span className="text-sm font-bold text-stone-900">{product.capacity}</span>
            </div>
            <div className="space-y-1 border-r border-stone-200">
              <span className="text-[11px] text-stone-500 block">وزن بدنه چمدان</span>
              <span className="text-sm font-bold text-stone-900">{product.weight}</span>
            </div>
            <div className="space-y-1 border-r border-stone-200">
              <span className="text-[11px] text-stone-500 block">ابعاد فیزیکی (H×W×D)</span>
              <span className="text-sm font-bold text-stone-900 tabular-nums">
                {toPersianDigits(`${product.dimensions.height}×${product.dimensions.width}×${product.dimensions.depth}`)} cm
              </span>
            </div>
          </div>
        </div>

        {/* Purchase Module Column (Sticky right on desktop) */}
        <div className="lg:col-span-5 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200/90 shadow-sm">
          {/* Header & Subtitle */}
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-semibold text-amber-700 tracking-wider uppercase font-mono">
                {product.name}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                <span className="font-bold text-stone-900 tabular-nums">{toPersianDigits(product.rating)}</span>
                <span className="text-stone-400">({toPersianDigits(product.reviewsCount)} نظر)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-950 font-serif leading-snug">
              {product.persianName}
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-2 leading-relaxed">
              {product.subtitle}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-xs text-stone-500">قیمت نهایی با احتساب مالیات:</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-stone-950 tabular-nums">
                  {formatToman(product.discountPrice ?? product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-xs text-stone-400 line-through tabular-nums">
                    {formatToman(product.price)}
                  </span>
                )}
              </div>
            </div>

            {hasDiscount && (
              <div className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-1 rounded-lg">
                تخفیف ویژه
              </div>
            )}
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-stone-800">انتخاب رنگ‌بندی:</span>
              <span className="text-stone-500">{selectedColor.name}</span>
            </div>
            <div className="flex items-center gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 py-2 px-3 rounded-xl border transition-all cursor-pointer ${
                    selectedColor.id === c.id
                      ? 'border-stone-950 bg-stone-900 text-white shadow-sm'
                      : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-stone-300"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-medium">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              {/* Stepper */}
              <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-10 text-center font-bold text-sm tabular-nums text-stone-900">
                  {toPersianDigits(quantity)}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3.5 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                  addedNotice
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-950 hover:bg-stone-800 text-white'
                }`}
              >
                {addedNotice ? (
                  <>
                    <Check className="w-5 h-5 text-emerald-300" />
                    <span>به سبد خرید اضافه شد</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 text-amber-400" />
                    <span>افزودن به سبد خرید</span>
                  </>
                )}
              </button>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600 hover:bg-stone-50'
                }`}
                title="افزودن به علاقه‌مندی‌ها"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Direct Instant Checkout CTA */}
            <button
              onClick={handleDirectBuy}
              className="w-full py-3 px-4 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>خرید فوری و تسویه حساب</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Boutique Guarantees */}
          <div className="pt-4 border-t border-stone-100 space-y-2.5 text-xs text-stone-600">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>۵ سال ضمانت تعویض چرخ، زیپ، دسته تلسکوپی و قفل TSA</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>ارسال اکسپرس هوایی و تحویل درب منزل در سراسر ایران</span>
            </div>
            <div className="flex items-center gap-2.5">
              <RotateCcw className="w-4 h-4 text-sky-600 shrink-0" />
              <span>۷ روز ضمانت بازگشت و تعویض سایز یا رنگ</span>
            </div>
          </div>
        </div>
      </div>

      {/* Airline Cabin Baggage Compatibility Widget */}
      <div className="bg-stone-900 text-stone-100 rounded-3xl p-6 sm:p-8 border border-stone-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                تطبیق ابعاد این کالا با استانداردهای پروازی
              </h3>
              <p className="text-xs text-stone-400">
                بررسی مقررات بار دستی کابین و بار مسافر در معتبرترین ایرلاین‌های ایران و جهان
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-stone-800 text-xs text-amber-300">
            <span>سایز رسمی: {product.capacity}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {product.airlineCompatibility.map((airline, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700/80 flex items-center gap-2.5 text-xs"
            >
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-medium text-stone-200">{airline}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Specifications & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            توضیحات و ویژگی‌های ساختاری
          </h3>
          <p className="text-sm text-stone-600 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-stone-900">مشخصات برجسته فنی:</h4>
            <div className="space-y-2">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1.5 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-stone-50 p-6 rounded-3xl border border-stone-200 space-y-4">
          <h3 className="text-sm font-bold text-stone-900">جدول شناسنامه فنی کالا</h3>
          <div className="divide-y divide-stone-200 text-xs">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-stone-500">جنس بدنه اصلی:</span>
              <span className="font-medium text-stone-900">{product.material}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-stone-500">وزن خالص:</span>
              <span className="font-medium text-stone-900">{product.weight}</span>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-stone-500">ابعاد خارجی (H×W×D):</span>
              <span className="font-medium text-stone-900 tabular-nums">
                {toPersianDigits(`${product.dimensions.height} × ${product.dimensions.width} × ${product.dimensions.depth}`)} سانتی‌متر
              </span>
            </div>
            {Object.entries(product.specifications).map(([key, val]) => (
              <div key={key} className="py-2.5 flex items-center justify-between">
                <span className="text-stone-500">{key}:</span>
                <span className="font-medium text-stone-900">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="pt-8 border-t border-stone-200 space-y-6">
          <h3 className="text-xl font-bold font-serif text-stone-900">
            محصولات مکمل و مشابه این مجموعه
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
