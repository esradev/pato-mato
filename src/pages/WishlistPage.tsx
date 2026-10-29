import React from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const WishlistPage: React.FC = () => {
  const { wishlist, navigateTo } = useShop();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-stone-200 pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950">
            لیست علاقه‌مندی‌ها و نشان‌شده‌ها
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            کالاهایی که برای خریدهای آتی خود ذخیره کرده‌اید ({toPersianDigits(wishlistedProducts.length)} کالا)
          </p>
        </div>

        <button
          onClick={() => navigateTo('category', { categorySlug: 'all' })}
          className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>مشاهده همه محصولات</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto my-12">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8 stroke-1" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">لیست علاقه‌مندی‌های شما خالی است</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            با کلیک روی آیکون قلب روی هر کالا، می‌توانید آن را به این بخش اضافه کرده و در زمان مناسب خرید کنید.
          </p>
          <button
            onClick={() => navigateTo('category', { categorySlug: 'all' })}
            className="py-2.5 px-5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            کاوش در محصولات پتو متو
          </button>
        </div>
      )}
    </div>
  );
};
