import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES, Product } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, Check, Search, X, Luggage } from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const CategoryPage: React.FC = () => {
  const { selectedCategorySlug, navigateTo, searchQuery, setSearchQuery } = useShop();

  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc'>('featured');
  const [onlyCabin, setOnlyCabin] = useState(false);
  const [onlyTsa, setOnlyTsa] = useState(false);

  // Active category details
  const activeCategory = CATEGORIES.find((c) => c.slug === selectedCategorySlug);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategorySlug !== 'all' && product.category !== selectedCategorySlug) {
        return false;
      }
      // Cabin filter
      if (onlyCabin && !product.cabinApproved) {
        return false;
      }
      // TSA lock filter
      if (onlyTsa && !product.tsaLock) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.trim().toLowerCase();
        const matchTitle = product.persianName.toLowerCase().includes(query);
        const matchName = product.name.toLowerCase().includes(query);
        const matchSub = product.subtitle.toLowerCase().includes(query);
        const matchMat = product.material.toLowerCase().includes(query);
        if (!matchTitle && !matchName && !matchSub && !matchMat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-asc') {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceA - priceB;
      }
      if (sortBy === 'price-desc') {
        const priceA = a.discountPrice ?? a.price;
        const priceB = b.discountPrice ?? b.price;
        return priceB - priceA;
      }
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategorySlug, onlyCabin, onlyTsa, searchQuery, sortBy]);

  const handleCategorySelect = (slug: string) => {
    navigateTo('category', { categorySlug: slug });
  };

  const handleResetFilters = () => {
    setOnlyCabin(false);
    setOnlyTsa(false);
    setSearchQuery('');
    setSortBy('featured');
    navigateTo('category', { categorySlug: 'all' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Category Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 border border-stone-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-amber-400">
            {selectedCategorySlug === 'all'
              ? 'فروشگاه جامع پتو متو'
              : activeCategory?.englishName || 'Collection'}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-serif text-white">
            {selectedCategorySlug === 'all'
              ? 'تمامی کیف‌ها و چمدان‌های پتو متو'
              : activeCategory?.name || 'محصولات'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {selectedCategorySlug === 'all'
              ? 'مجموعه‌ای برگزیده از چمدان‌های مسافرتی فوق‌سبک، کوله‌پشتی‌های اداری مقاوم و کیف‌های چرم لوکس دست‌دوز با گارانتی رسمی.'
              : activeCategory?.description}
          </p>
        </div>
      </div>

      {/* Interactive Category Navigation Tabs (Functional Button Controls) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
            selectedCategorySlug === 'all'
              ? 'bg-stone-900 text-white shadow-sm font-semibold'
              : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          همه محصولات ({toPersianDigits(PRODUCTS.length)})
        </button>

        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.slug)}
            className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-all cursor-pointer ${
              selectedCategorySlug === cat.slug
                ? 'bg-stone-900 text-white shadow-sm font-semibold'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            {cat.name} ({toPersianDigits(cat.itemCount)})
          </button>
        ))}
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search input inside category page */}
        <div className="relative flex-1 min-w-[220px] max-w-sm">
          <input
            type="text"
            placeholder="جستجو در این دسته..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl pr-9 pl-8 py-2 text-stone-900 outline-none focus:border-stone-900 focus:bg-white transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute right-3 top-2.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-2.5 top-2.5 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Checkbox filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyCabin}
              onChange={(e) => setOnlyCabin(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 rounded-sm"
            />
            <span>مجاز برای کابین هواپیما</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-stone-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyTsa}
              onChange={(e) => setOnlyTsa(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 rounded-sm"
            />
            <span>دارای قفل هوشمند TSA</span>
          </label>
        </div>

        {/* Sorting Dropdown / Buttons */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-stone-400 hidden sm:inline" />
          <span className="text-xs text-stone-500 hidden sm:inline">مرتب‌سازی:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs font-medium bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-stone-800 outline-none focus:border-stone-900 cursor-pointer"
          >
            <option value="featured">پیشنهادی پتو متو</option>
            <option value="newest">جدیدترین محصولات</option>
            <option value="price-asc">ارزان‌ترین</option>
            <option value="price-desc">گران‌ترین</option>
          </select>
        </div>
      </div>

      {/* Active filters summary */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div>
          <span>نمایش </span>
          <span className="font-bold text-stone-900 tabular-nums">
            {toPersianDigits(filteredProducts.length)}
          </span>
          <span> کالا</span>
        </div>

        {(onlyCabin || onlyTsa || searchQuery || selectedCategorySlug !== 'all') && (
          <button
            onClick={handleResetFilters}
            className="text-amber-800 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            <span>پاکسازی فیلترها</span>
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
            <Luggage className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">محصولی با این مشخصات یافت نشد</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            لطفاً عبارت جستجو یا فیلترهای انتخابی (مجاز کابین / قفل TSA) را تغییر دهید تا نتایج نمایش داده شوند.
          </p>
          <button
            onClick={handleResetFilters}
            className="py-2.5 px-5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors cursor-pointer"
          >
            مشاهده همه محصولات
          </button>
        </div>
      )}
    </div>
  );
};
