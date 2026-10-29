import React, { useState } from 'react';
import { Product } from '../data/products';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Check, Shield, Plane } from 'lucide-react';
import { formatToman, toPersianDigits } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isAdded, setIsAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isFavorite = isWishlisted(product.id);

  const handleCardClick = () => {
    navigateTo('product', { productId: product.id });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  return (
    <article
      onClick={handleCardClick}
      className="group flex flex-col bg-white border border-stone-200/90 rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:shadow-xl hover:border-stone-300 transition-all duration-300 cursor-pointer relative"
    >
      {/* Visual Asset Container (65-70% height emphasis) */}
      <div className="relative aspect-4/3 sm:aspect-square bg-stone-100 overflow-hidden flex items-center justify-center">
        {!imgError && product.images[0] ? (
          <img
            src={product.images[0]}
            alt={product.persianName}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 flex flex-col items-center justify-center p-6 text-stone-400">
            <ShoppingBag className="w-12 h-12 mb-2 stroke-1" />
            <span className="text-xs font-medium text-stone-500">{product.name}</span>
          </div>
        )}

        {/* Floating subtle micro-badges (Gentle floating animation on key features) */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end pointer-events-none">
          {product.cabinApproved && (
            <div className="animate-gentle-float bg-stone-900/80 backdrop-blur-xs text-amber-200 text-[11px] px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
              <Plane className="w-3 h-3 text-amber-300" />
              <span>کابین پرواز</span>
            </div>
          )}
          {product.tsaLock && (
            <div className="bg-stone-900/75 backdrop-blur-xs text-stone-200 text-[11px] px-2 py-0.5 rounded-md flex items-center gap-1">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>قفل TSA</span>
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isFavorite ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
          className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Subtle quick-add button appearing on hover */}
        <div className="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900/90 hover:bg-stone-900 text-white backdrop-blur-xs'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>به سبد اضافه شد</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن سریع به سبد</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Zero-Pill Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5">
            <span>{product.capacity}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{product.weight}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>امتیاز {toPersianDigits(product.rating)}</span>
          </div>

          {/* Product Persian Title */}
          <h3 className="text-base font-semibold text-stone-900 line-clamp-1 group-hover:text-amber-900 transition-colors">
            {product.persianName}
          </h3>

          {/* Subtitle / Key spec */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-1">
            {product.subtitle}
          </p>
        </div>

        {/* Color swatches & Price Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          {/* Color preview dots */}
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.id}
                title={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-4 h-4 rounded-full transition-transform cursor-pointer border ${
                  selectedColor.id === c.id
                    ? 'ring-2 ring-stone-900 ring-offset-1 scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Price display with Tabular numerals */}
          <div className="text-left font-sans">
            {hasDiscount ? (
              <div className="flex flex-col items-end">
                <span className="text-[11px] text-stone-400 line-through tabular-nums">
                  {formatToman(product.price)}
                </span>
                <span className="text-sm sm:text-base font-bold text-amber-950 tabular-nums">
                  {formatToman(product.discountPrice!)}
                </span>
              </div>
            ) : (
              <span className="text-sm sm:text-base font-bold text-stone-900 tabular-nums">
                {formatToman(product.price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
