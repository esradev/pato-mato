import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  PackageCheck,
  Printer,
  ChevronLeft,
} from 'lucide-react';
import { formatToman, toPersianDigits } from '../utils/formatters';

const IRAN_PROVINCES = [
  'تهران',
  'اصفهان',
  'فارس (شیراز)',
  'خراسان رضوی (مشهد)',
  'آذربایجان شرقی (تبریز)',
  'البرز (کرج)',
  'مازندران',
  'گیلان (رشت)',
  'خوزستان (اهواز)',
  'یزد',
  'هرمزگان (بندرعباس)',
  'کرمان',
  'قم',
  'کرمانشاه',
  'همدان',
];

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    clearCart,
    finalCartTotal,
    navigateTo,
    lastCompletedOrder,
    setLastCompletedOrder,
  } = useShop();

  const [fullName, setFullName] = useState('سهراب کاظمی');
  const [phone, setPhone] = useState('09123456789');
  const [province, setProvince] = useState('تهران');
  const [city, setCity] = useState('تهران');
  const [postalCode, setPostalCode] = useState('1985923145');
  const [address, setAddress] = useState('نیاوران، خیابان یاسر، کوچه مریم، پلاک ۱۴، واحد ۳');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'airpost' | 'tipax'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'shaparak' | 'zarinpal' | 'cod'>('shaparak');
  const [orderNotes, setOrderNotes] = useState('لطفاً قبل از ارسال با تلفن هماهنگ شود.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already placed order, show dedicated Order Receipt view
  if (lastCompletedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200/90 shadow-xl space-y-8 text-center sm:text-right">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-stone-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-semibold text-emerald-700">پرداخت با موفقیت انجام شد</span>
                <h1 className="text-2xl font-black font-serif text-stone-950">سفارش شما تایید گردید</h1>
              </div>
            </div>

            <div className="text-left bg-stone-50 p-3 rounded-xl border border-stone-200">
              <div className="text-[11px] text-stone-500">شماره پیگیری سفارش:</div>
              <div className="text-base font-bold font-mono text-stone-900 tracking-wider">
                {lastCompletedOrder.id}
              </div>
            </div>
          </div>

          {/* Delivery & Customer Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600 bg-stone-50 p-5 rounded-2xl border border-stone-200/80">
            <div>
              <span className="text-stone-400 block mb-1">گیرنده سفارش:</span>
              <span className="font-semibold text-stone-900">{lastCompletedOrder.fullName}</span>
            </div>
            <div>
              <span className="text-stone-400 block mb-1">تلفن هماهنگی:</span>
              <span className="font-semibold text-stone-900 font-mono">{lastCompletedOrder.phone}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-stone-400 block mb-1">نشانی تحویل مرسوله:</span>
              <span className="font-semibold text-stone-900">
                استان {lastCompletedOrder.province}، {lastCompletedOrder.city}، {lastCompletedOrder.address}
              </span>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900">اقلام سفارش داده شده:</h3>
            <div className="divide-y divide-stone-100 text-xs">
              {lastCompletedOrder.items.map((item: any, idx: number) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.persianName}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                    />
                    <div>
                      <div className="font-semibold text-stone-900">{item.product.persianName}</div>
                      <div className="text-stone-400 text-[11px]">
                        رنگ {item.selectedColor.name} · {toPersianDigits(item.quantity)} عدد
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-stone-900 tabular-nums">
                    {formatToman((item.product.discountPrice ?? item.product.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={() => navigateTo('tracking')}
              className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PackageCheck className="w-4 h-4" />
              <span>مشاهده وضعیت پردازش و پیگیری مرسوله</span>
            </button>

            <button
              onClick={() => {
                setLastCompletedOrder(null);
                navigateTo('home');
              }}
              className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">سبد خرید شما خالی است</h2>
        <p className="text-xs text-stone-500">
          برای ثبت سفارش، ابتدا کالای مورد نظر خود را به سبد خرید بیفزایید.
        </p>
        <button
          onClick={() => navigateTo('category', { categorySlug: 'all' })}
          className="py-2.5 px-5 bg-stone-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
        >
          مشاهده کاتالوگ محصولات
        </button>
      </div>
    );
  }

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder = {
        id: `PM-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toLocaleDateString('fa-IR'),
        fullName,
        phone,
        province,
        city,
        postalCode,
        address,
        shippingMethod,
        paymentMethod,
        items: [...cart],
        totalAmount: finalCartTotal,
      };

      setLastCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-stone-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950">
          تسویه حساب و ثبت سفارش
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          اطلاعات تحویل‌گیرنده و آدرس ارسال مرسوله را با دقت تکمیل فرمایید.
        </p>
      </div>

      <form onSubmit={handleCompleteOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Fields Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Customer Details */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-bold">
                ۱
              </span>
              <span>مشخصات تحویل‌گیرنده</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">نام و نام‌خانوادگی:</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">شماره موبایل جهت هماهنگی:</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Address */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-bold">
                ۲
              </span>
              <span>آدرس و مقصد تحویل</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">استان مقصد:</label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 cursor-pointer"
                >
                  {IRAN_PROVINCES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">شهر / منطقه:</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">کد پستی ۱۰ رقمی:</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 font-mono"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-medium text-stone-700">نشانی دقیق پستی (خیابان، کوچه، پلاک، واحد):</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 outline-none focus:border-stone-900 resize-none"
                />
              </div>

              <div className="sm:col-span-3 space-y-1">
                <label className="text-xs font-medium text-stone-700">توضیحات و هماهنگی ارسال (اختیاری):</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 outline-none focus:border-stone-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Method */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-bold">
                ۳
              </span>
              <span>روش ارسال</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  shippingMethod === 'express'
                    ? 'border-amber-700 bg-amber-50/50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="text-amber-600"
                  />
                  <span className="text-[11px] font-bold text-amber-800">ارسال رایگان</span>
                </div>
                <div className="text-xs font-bold text-stone-900">پیک اختصاصی تهران</div>
                <div className="text-[11px] text-stone-500 mt-0.5">تحویل تا ۲۴ ساعت کاری</div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  shippingMethod === 'airpost'
                    ? 'border-amber-700 bg-amber-50/50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'airpost'}
                    onChange={() => setShippingMethod('airpost')}
                    className="text-amber-600"
                  />
                  <span className="text-[11px] font-bold text-emerald-700">پست پیشتاز هوایی</span>
                </div>
                <div className="text-xs font-bold text-stone-900">سراسر کشور</div>
                <div className="text-[11px] text-stone-500 mt-0.5">۲ الی ۳ روز کاری</div>
              </label>

              <label
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  shippingMethod === 'tipax'
                    ? 'border-amber-700 bg-amber-50/50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <input
                    type="radio"
                    name="shipping"
                    checked={shippingMethod === 'tipax'}
                    onChange={() => setShippingMethod('tipax')}
                    className="text-amber-600"
                  />
                  <span className="text-[11px] font-bold text-stone-700">تیپاکس اکسپرس</span>
                </div>
                <div className="text-xs font-bold text-stone-900">تحویل درب منزل</div>
                <div className="text-[11px] text-stone-500 mt-0.5">سریع و رهگیری لحظه‌ای</div>
              </label>
            </div>
          </div>

          {/* Section 4: Payment Portal */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-3">
              <span className="w-5 h-5 rounded-full bg-stone-900 text-white text-[11px] flex items-center justify-center font-bold">
                ۴
              </span>
              <span>درگاه پرداخت الکترونیک</span>
            </h2>

            <div className="space-y-2">
              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'shaparak'
                    ? 'border-stone-950 bg-stone-50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'shaparak'}
                    onChange={() => setPaymentMethod('shaparak')}
                    className="text-stone-900"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      درگاه پرداخت مستقیم شاپرک / بانک سامان
                    </span>
                    <span className="text-[11px] text-stone-500">
                      پشتیبانی از کلیه کارت‌های عضو شتاب با امنیت رمز پویا
                    </span>
                  </div>
                </div>
                <CreditCard className="w-5 h-5 text-stone-600" />
              </label>

              <label
                className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'zarinpal'
                    ? 'border-stone-950 bg-stone-50'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'zarinpal'}
                    onChange={() => setPaymentMethod('zarinpal')}
                    className="text-stone-900"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-900 block">
                      درگاه پرداخت زرین‌پال
                    </span>
                    <span className="text-[11px] text-stone-500">
                      پرداخت سریع و تضمین‌شده
                    </span>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-amber-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Checkout Sticky Summary Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-stone-950 border-b border-stone-100 pb-3">
              بررسی نهایی فاکتور
            </h3>

            {/* Quick item list */}
            <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.id}`}
                  className="flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.persianName}
                      className="w-8 h-8 rounded-md object-cover border border-stone-200"
                    />
                    <div className="truncate max-w-[140px]">
                      <span className="font-semibold text-stone-900 block truncate">
                        {item.product.persianName}
                      </span>
                      <span className="text-[10px] text-stone-400">
                        {toPersianDigits(item.quantity)} عدد · {item.selectedColor.name}
                      </span>
                    </div>
                  </div>
                  <span className="font-medium text-stone-900 tabular-nums">
                    {formatToman(
                      (item.product.discountPrice ?? item.product.price) * item.quantity
                    )}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-stone-100 pt-3 space-y-2 text-xs text-stone-600">
              <div className="flex items-center justify-between">
                <span>هزینه بسته‌بندی و ارسال:</span>
                <span className="font-semibold text-emerald-700">رایگان (هوایی)</span>
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-stone-950 border-t border-stone-200 pt-3">
                <span>مبلغ نهایی قابل پرداخت:</span>
                <span className="text-base text-amber-950 tabular-nums">
                  {formatToman(finalCartTotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>در حال انتقال به درگاه امن...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-stone-950" />
                  <span>پرداخت و ثبت نهایی سفارش</span>
                </>
              )}
            </button>

            <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>پرداخت امن متصل به شبکه شاپرک مرکزی</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
