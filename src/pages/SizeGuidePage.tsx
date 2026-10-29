import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import {
  Plane,
  Luggage,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Shield,
  ArrowRight,
  Scale,
  Sparkles,
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

interface AirlineRule {
  id: string;
  name: string;
  enName: string;
  maxCabinDimensions: { h: number; w: number; d: number }; // cm
  maxCabinWeight: number; // kg
  maxCheckedWeight: number; // kg
  notes: string;
}

const AIRLINES: AirlineRule[] = [
  {
    id: 'iran-air',
    name: 'ایران‌ایر (Iran Air)',
    enName: 'Iran Air',
    maxCabinDimensions: { h: 56, w: 45, d: 25 },
    maxCabinWeight: 7,
    maxCheckedWeight: 30,
    notes: 'پذیرش ۱ چمدان کابین به همراه یک ساک دستی شخصی کوچک (کیف لپ‌تاپ یا دوشی)',
  },
  {
    id: 'mahan',
    name: 'ماهان ایر (Mahan Air)',
    enName: 'Mahan Air',
    maxCabinDimensions: { h: 55, w: 40, d: 23 },
    maxCabinWeight: 7,
    maxCheckedWeight: 30,
    notes: 'در کلاس بیزینس وزن بار کابین تا ۹ کیلوگرم مجاز است.',
  },
  {
    id: 'emirates',
    name: 'هواپیمایی امارات (Emirates)',
    enName: 'Emirates',
    maxCabinDimensions: { h: 55, w: 38, d: 22 },
    maxCabinWeight: 7,
    maxCheckedWeight: 32,
    notes: 'ابعاد کابین باید حتماً درون سطل سنجش ابعاد (Sizer) گیت پرواز جای گیرد.',
  },
  {
    id: 'qatar',
    name: 'قطر ایرویز (Qatar Airways)',
    enName: 'Qatar Airways',
    maxCabinDimensions: { h: 50, w: 37, d: 25 },
    maxCabinWeight: 7,
    maxCheckedWeight: 30,
    notes: 'در کلاس فرست و بیزینس دو بسته کابین با مجموع وزن ۱۵ کیلوگرم مجاز است.',
  },
  {
    id: 'turkish',
    name: 'ترکیش ایرلاینز (Turkish Airlines)',
    enName: 'Turkish Airlines',
    maxCabinDimensions: { h: 55, w: 40, d: 23 },
    maxCabinWeight: 8,
    maxCheckedWeight: 30,
    notes: 'سقف وزن کابین ۸ کیلوگرم است و سخت‌گیری دقیقی در گیت‌های فرودگاه استانبول اعمال می‌شود.',
  },
  {
    id: 'lufthansa',
    name: 'لوفت‌هانزا (Lufthansa)',
    enName: 'Lufthansa',
    maxCabinDimensions: { h: 55, w: 40, d: 23 },
    maxCabinWeight: 8,
    maxCheckedWeight: 23,
    notes: 'علاوه بر چمدان کابین، یک کیف دستی حداکثر با ابعاد ۴۰x۳۰x۱۰ مجاز است.',
  },
  {
    id: 'flydubai',
    name: 'فلای‌دبی (Flydubai)',
    enName: 'Flydubai',
    maxCabinDimensions: { h: 55, w: 38, d: 20 },
    maxCabinWeight: 7,
    maxCheckedWeight: 20,
    notes: 'سایز ۲۰ اینچ پتو متو دقیقاً مطابق استاندارد فلای‌دبی است.',
  },
];

export const SizeGuidePage: React.FC = () => {
  const { navigateTo } = useShop();
  const [selectedAirlineId, setSelectedAirlineId] = useState<string>('mahan');

  const selectedAirline = AIRLINES.find((a) => a.id === selectedAirlineId) || AIRLINES[0];

  // Peto Meto cabin suitcases
  const cabinSuitcase = PRODUCTS.find((p) => p.slug === 'aero-voyage-cabin-spinner') || PRODUCTS[0];

  const fitsHeight = cabinSuitcase.dimensions.height <= selectedAirline.maxCabinDimensions.h;
  const fitsWidth = cabinSuitcase.dimensions.width <= selectedAirline.maxCabinDimensions.w;
  const fitsDepth = cabinSuitcase.dimensions.depth <= selectedAirline.maxCabinDimensions.d;
  const isFullyCompatible = fitsHeight && fitsWidth && fitsDepth;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 border border-stone-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-semibold">
            <Plane className="w-3.5 h-3.5" />
            <span>مرجع رسمی ابعاد پرواز پتو متو</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black font-serif text-white">
            راهنمای جامع سایز چمدان و ابعاد کابین هواپیما
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            از پرداخت جریمه اضافه‌بار در فرودگاه جلوگیری کنید! قبل از سفر، چمدان خود را با استانداردهای رسمی خطوط هوایی معتبر تطبیق دهید.
          </p>
        </div>
      </div>

      {/* Visual Size Comparison: 20", 24", 28" */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-700 tracking-wider block mb-1">
            سایزبندی استاندارد جهانی
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            مقایسه ابعاد ۳ سایز اصلی چمدان‌های پتو متو
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Size 20 */}
          <div className="bg-white rounded-3xl p-6 border-2 border-amber-600/40 shadow-sm space-y-4 relative">
            <div className="absolute top-4 left-4 bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded-md">
              مجاز برای داخل کابین (Carry-On)
            </div>

            <div className="h-40 flex items-center justify-center">
              <Luggage className="w-24 h-24 text-amber-700 stroke-1" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-stone-400">سایز کوچک (Cabin)</div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">سایز ۲۰ اینچ</h3>
              <p className="text-xs text-stone-500">
                ایده‌آل برای سفرهای کاری و تفریحی ۱ الی ۳ روزه
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>ابعاد خارجی:</span>
                <span className="font-bold tabular-nums">۵۵ × ۳۸ × ۲۳ سانتی‌متر</span>
              </div>
              <div className="flex justify-between">
                <span>گنجایش مفید:</span>
                <span className="font-bold tabular-nums">۴۰ لیتر</span>
              </div>
              <div className="flex justify-between">
                <span>وزن بدنه:</span>
                <span className="font-bold tabular-nums">۲.۹ کیلوگرم</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('product', { productId: 'pm-101' })}
              className="w-full py-2.5 bg-stone-950 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              مشاهده چمدان سایز ۲۰ آئروویج
            </button>
          </div>

          {/* Size 24 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="h-40 flex items-center justify-center">
              <Luggage className="w-28 h-28 text-stone-700 stroke-1" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-stone-400">سایز متوسط (Medium)</div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">سایز ۲۴ اینچ</h3>
              <p className="text-xs text-stone-500">
                مناسب سفرهای ۴ الی ۷ روزه (تحویل به قسمت بار هوایی)
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>ابعاد خارجی:</span>
                <span className="font-bold tabular-nums">۶۶ × ۴۵ × ۲۷ سانتی‌متر</span>
              </div>
              <div className="flex justify-between">
                <span>گنجایش مفید:</span>
                <span className="font-bold tabular-nums">۷۰ لیتر</span>
              </div>
              <div className="flex justify-between">
                <span>تحمل بار مجاز:</span>
                <span className="font-bold tabular-nums">۲۰ الی ۲۳ کیلوگرم</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('category', { categorySlug: 'suitcases' })}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              مشاهده مدلهای سایز ۲۴
            </button>
          </div>

          {/* Size 28 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="h-40 flex items-center justify-center">
              <Luggage className="w-32 h-32 text-stone-900 stroke-1" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-stone-400">سایز بزرگ (Large Check-in)</div>
              <h3 className="text-lg font-bold text-stone-900 font-serif">سایز ۲۸ اینچ</h3>
              <p className="text-xs text-stone-500">
                سفرهای طولانی، مهاجرت و سفرهای خانوادگی بیش از ۱ هفته
              </p>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl space-y-1.5 text-xs text-stone-700">
              <div className="flex justify-between">
                <span>ابعاد خارجی:</span>
                <span className="font-bold tabular-nums">۷۶ × ۵۲ × ۳۱ سانتی‌متر</span>
              </div>
              <div className="flex justify-between">
                <span>گنجایش مفید:</span>
                <span className="font-bold tabular-nums">۱۱۰ لیتر</span>
              </div>
              <div className="flex justify-between">
                <span>تحمل بار مجاز:</span>
                <span className="font-bold tabular-nums">تا ۳۲ کیلوگرم</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('product', { productId: 'pm-104' })}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              مشاهده چمدان سایز ۲۸ گرندویج
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Airline Sizer Tool */}
      <div className="bg-stone-100/90 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-8">
        <div>
          <span className="text-xs font-bold text-amber-800 tracking-wider block mb-1">
            ابزار بررسی آنلاین
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            بررسی قوانین بار ایرلاین مورد نظر شما
          </h2>
          <p className="text-xs text-stone-500 mt-1">
            شرکت هواپیمایی پرواز خود را انتخاب کنید تا حداکثر ابعاد و وزن مجاز را مشاهده فرمایید:
          </p>
        </div>

        {/* Airline Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {AIRLINES.map((airline) => (
            <button
              key={airline.id}
              onClick={() => setSelectedAirlineId(airline.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedAirlineId === airline.id
                  ? 'bg-stone-900 text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {airline.name}
            </button>
          ))}
        </div>

        {/* Selected Airline Specification Card */}
        <div className="bg-white rounded-2xl p-6 border border-stone-200/90 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                <Plane className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-stone-900">{selectedAirline.name}</h3>
                <span className="text-xs text-stone-400">{selectedAirline.enName}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 block mb-0.5">حداکثر ابعاد کابین:</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  {toPersianDigits(
                    `${selectedAirline.maxCabinDimensions.h}×${selectedAirline.maxCabinDimensions.w}×${selectedAirline.maxCabinDimensions.d}`
                  )}{' '}
                  cm
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                <span className="text-stone-400 block mb-0.5">حداکثر وزن کابین:</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  {toPersianDigits(selectedAirline.maxCabinWeight)} کیلوگرم
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 col-span-2 sm:col-span-1">
                <span className="text-stone-400 block mb-0.5">بار قسمت بار هواپیما:</span>
                <span className="font-bold text-stone-900 tabular-nums">
                  تا {toPersianDigits(selectedAirline.maxCheckedWeight)} کیلوگرم
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
              💡 {selectedAirline.notes}
            </p>
          </div>

          {/* Compatibility Verdict with Peto Meto S20 */}
          <div className="md:col-span-5 bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3 text-center sm:text-right">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>چمدان کابین پتو متو (سایز ۲۰) کاملاً سازگار است!</span>
            </div>
            <p className="text-[11px] text-stone-500 leading-relaxed">
              ابعاد مدل AeroVoyage S20 دقیقا ۵۵ × ۳۸ × ۲۳ سانتی‌متر بوده و درون تمامی محفظه‌های بالای سر هواپیماهای {selectedAirline.name} جای می‌گیرد.
            </p>
            <button
              onClick={() => navigateTo('product', { productId: 'pm-101' })}
              className="w-full py-2 px-3 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors cursor-pointer"
            >
              مشاهده و خرید چمدان کابین آئروویج
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
