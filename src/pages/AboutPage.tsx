import React from 'react';
import { useShop } from '../context/ShopContext';
import { ASSETS } from '../data/products';
import {
  ShieldCheck,
  Award,
  Sparkles,
  Plane,
  Compass,
  CheckCircle2,
  ArrowLeft,
  Factory,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Brand Hero Story */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white min-h-[460px] flex items-center p-8 sm:p-14 border border-stone-800 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-800 text-amber-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>اصالت، استقامت و زیبایی مینیمال</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white leading-tight">
            داستان تولد برند پتو متو
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            پتو متو (Peto Meto) با یک ماموریت روشن آغاز شد: پایان دادن به دغدغه شکستن چمدان‌ها، قفل‌کردن چرخ‌ها و سنگینی نامتعارف بار در سفرهای هوایی و زمینی. ما با تلفیق برترین متریال‌های جهان، همسفر همیشگی خاطرات شما هستیم.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('category', { categorySlug: 'suitcases' })}
              className="py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>مشاهده محصولات پتو متو</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4 Materials Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-700 tracking-wider">
            استانداردهای مهندسی سفر
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-serif text-stone-900">
            متریال‌هایی که پتو متو را متمایز می‌سازند
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
            در تمام جزئیات چمدان‌ها و کیف‌های ما، قطعاتی از معتبرترین سازندگان جهانی به کار گرفته شده است.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
              ۱
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              پلی‌کربنات Makrolon آلمان
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              پلی‌کربنات ۳ لایه خالص با قابلیت جذب ضربه‌های سهمگین در بخش بار فرودگاه و بازگشت آنی به فرم اولیه بدون ایجاد ترک یا شکستگی.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              ۲
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              چرخ‌های ژاپنی Hinomoto
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              چرخش ۳۶۰ درجه فوق‌العاده نرم و بی‌صدا به کمک بلبرینگ‌های گرافیتی و روکش پلی‌اورتان ضد سایش که حتی بر روی سطوح ناصاف نیز سکوت کامل را به ارمغان می‌آورند.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
              ۳
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              قفل‌های بین‌المللی TSA008
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              مورد تایید سازمان امنیت حمل‌ونقل آمریکا و فرودگاه‌های بین‌المللی جهان که امکان بازرسی امن چمدان را بدون آسیب به قفل فراهم می‌سازد.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
              ۴
            </div>
            <h3 className="text-base font-bold text-stone-900 font-serif">
              چرم طبیعی Full-Grain
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              کیف‌های دوشی و دستی پتو متو از مرغوب‌ترین چرم طبیعی دباغی گیاهی دست‌دوز تولید شده که با گذر سال‌ها پتینه‌ای زیبا پیدا می‌کنند.
            </p>
          </div>
        </div>
      </div>

      {/* 5-Year Guarantee Pledge */}
      <div className="bg-stone-50 rounded-3xl p-8 sm:p-12 border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
            <ShieldCheck className="w-4 h-4" />
            <span>پیمان کیفیت پتو متو</span>
          </div>
          <h3 className="text-2xl font-bold font-serif text-stone-900">
            ۵ سال ضمانت تعویض بی‌قیدوشرط قطعات
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            ما به استقامت محصولاتمان ایمان راسخ داریم. اگر در طی ۵ سال استفاده چرخ، دسته تلسکوپی یا قفل چمدان شما دچار نقص فنی گردد، بدون هیچ هزینه‌ای در مراکز خدمات پس از فروش پتو متو تعویض خواهد شد.
          </p>
        </div>

        <button
          onClick={() => navigateTo('contact')}
          className="py-3 px-5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0"
        >
          شعب خدمات پس از فروش
        </button>
      </div>
    </div>
  );
};
