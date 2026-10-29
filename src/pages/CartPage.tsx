import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../utils/formatters';

const FREE_SHIPPING_THRESHOLD = 2000000; // 2,000,000 Tomans

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    couponCode,
    couponDiscount,
    applyCoupon,
    finalCartTotal,
    navigateTo,
  } = useShop();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponError, setCouponError] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(false);
    setCouponSuccess(false);

    if (applyCoupon(inputCoupon)) {
      setCouponSuccess(true);
      setInputCoupon('');
    } else {
      setCouponError(true);
    }
  };

  const isFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const shippingFee = isFreeShipping || cartSubtotal === 0 ? 0 : 75000;
  const payableAmount = finalCartTotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-stone-100 border border-stone-200 text-stone-400 flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10 stroke-1" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-stone-900">
            سبد خرید شما در حال حاضر خالی است
          </h2>
          <p className="text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
            محصولات منحصر‌به‌فرد پتو متو را مرور کنید و چمدان یا کیف دلخواه خود را به سبد بیفزایید.
          </p>
        </div>
        <button
          onClick={() => navigateTo('category', { categorySlug: 'all' })}
          className="py-3 px-6 rounded-xl bg-stone-950 text-white font-semibold text-sm hover:bg-stone-800 transition-colors cursor-pointer"
        >
          مشاهده کاتالوگ محصولات
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950">
            سبد خرید شما
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            شامل {toPersianDigits(cart.length)} ردیف کالای برگزیده
          </p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 transition-colors flex items-center gap-1 self-start cursor-pointer font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>خالی کردن سبد خرید</span>
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-amber-700" />
            <span className="font-semibold text-stone-900">
              {isFreeShipping
                ? 'تبریک! ارسال هوایی رایگان برای این سفارش فعال شد.'
                : `فقط ${formatToman(remainingForFreeShipping)} تا ارسال رایگان هوایی`}
            </span>
          </div>
          <span className="text-xs font-bold text-amber-800 tabular-nums">
            {toPersianDigits(shippingProgress)}٪
          </span>
        </div>
        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-amber-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${shippingProgress}%` }}
          />
        </div>
      </div>

      {/* Cart Layout: List on Right, Summary on Left */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Itemized List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => {
            const effectivePrice = item.product.discountPrice ?? item.product.price;
            const lineTotal = effectivePrice * item.quantity;

            return (
              <div
                key={`${item.product.id}-${item.selectedColor.id}`}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-between"
              >
                {/* Thumb & Details */}
                <div
                  onClick={() => navigateTo('product', { productId: item.product.id })}
                  className="flex items-center gap-4 cursor-pointer group w-full sm:w-auto"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-stone-100 overflow-hidden shrink-0 border border-stone-200">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.persianName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                      {item.product.persianName}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </span>
                      <span>·</span>
                      <span>{item.product.capacity}</span>
                    </div>
                    <div className="text-xs text-stone-600 font-medium tabular-nums sm:hidden">
                      واحد: {formatToman(effectivePrice)}
                    </div>
                  </div>
                </div>

                {/* Stepper, Line Price & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                  {/* Stepper */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-stone-50 p-1">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.selectedColor.id, item.quantity - 1)
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold tabular-nums">
                      {toPersianDigits(item.quantity)}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.product.id, item.selectedColor.id, item.quantity + 1)
                      }
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-left font-sans">
                    <span className="text-sm sm:text-base font-bold text-stone-900 tabular-nums">
                      {formatToman(lineTotal)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.product.id, item.selectedColor.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="حذف این آیتم"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => navigateTo('category', { categorySlug: 'all' })}
              className="text-xs font-semibold text-amber-900 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>ادامه خرید و افزودن کالاهای بیشتر</span>
            </button>
          </div>
        </div>

        {/* Order Summary Module */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-stone-950 border-b border-stone-100 pb-3">
              خلاصه صورت‌حساب
            </h2>

            {/* Discount Code Form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2">
              <label className="text-xs text-stone-600 block">کد تخفیف پتو متو:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="مثال: PATOMATO15"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="flex-1 text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 uppercase font-mono"
                />
                <button
                  type="submit"
                  className="py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
                >
                  اعمال
                </button>
              </div>

              {couponSuccess && (
                <div className="text-xs text-emerald-700 flex items-center gap-1 mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>تخفیف ویژه با موفقیت اعمال گردید!</span>
                </div>
              )}
              {couponError && (
                <div className="text-xs text-rose-600 mt-1">
                  کد وارد شده معتبر نیست. (کد تست: PATOMATO15)
                </div>
              )}
            </form>

            {/* Breakdown */}
            <div className="space-y-3 text-xs text-stone-600 border-t border-stone-100 pt-4">
              <div className="flex items-center justify-between">
                <span>مجموع قیمت اقلام:</span>
                <span className="font-semibold text-stone-900 tabular-nums">
                  {formatToman(cartSubtotal)}
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-700 font-medium">
                  <span>تخفیف کد ({couponCode}):</span>
                  <span className="tabular-nums">
                    - {formatToman(Math.round(cartSubtotal * couponDiscount))}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="font-semibold text-stone-900">
                  {shippingFee === 0 ? 'رایگان (هوایی)' : formatToman(shippingFee)}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-stone-200 pt-4 text-sm font-bold text-stone-950">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-lg text-amber-950 tabular-nums">
                  {formatToman(payableAmount)}
                </span>
              </div>
            </div>

            {/* Proceed to Dedicated Checkout Page */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101"
            >
              <span>تکمیل اطلاعات و ثبت نهایی سفارش</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 text-[11px] text-stone-500 pt-2 border-t border-stone-100">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>ضمانت بازگشت وجه در صورت عدم رضایت</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>بسته‌بندی ضربه‌گیر ویژه محموله‌های حساس</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
