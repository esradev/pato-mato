import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  PackageCheck,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Box,
  MapPin,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';
import { toPersianDigits } from '../utils/formatters';

export const OrderTrackingPage: React.FC = () => {
  const { lastCompletedOrder } = useShop();

  const [trackingCode, setTrackingCode] = useState(
    lastCompletedOrder ? lastCompletedOrder.id : 'PM-1042'
  );
  const [searchedCode, setSearchedCode] = useState(trackingCode);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingCode.trim()) {
      setSearchedCode(trackingCode.trim().toUpperCase());
    }
  };

  const steps = [
    { title: 'ثبت و تایید قطعی سفارش', time: 'امروز - ساعت ۰۹:۱۵', done: true, current: false },
    {
      title: 'کنترل کیفی چرخ‌ها، قفل TSA و فریم آلومینیومی در انبار',
      time: 'امروز - ساعت ۱۱:۳۰',
      done: true,
      current: false,
    },
    {
      title: 'بسته‌بندی ایمن در هاردباکس ضد ضربه ۵ لایه',
      time: 'امروز - ساعت ۱۴:۲۰',
      done: true,
      current: true,
    },
    {
      title: 'تحویل به سرویس هوایی / ناوگان اکسپرس',
      time: 'فردا صبح - هماهنگی با گیرنده',
      done: false,
      current: false,
    },
    {
      title: 'تحویل نهایی درب منزل و تست اصالت کالا',
      time: 'در انتظار ارسال',
      done: false,
      current: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950">
          سامانه رهگیری و پیگیری آنلاین سفارش
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          کد پیگیری مرسوله پتو متو را وارد نمایید تا آخرین وضعیت پردازش و ارسال بار را مشاهده فرمایید.
        </p>
      </div>

      {/* Code Input Form */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200/90 shadow-sm flex flex-col sm:flex-row items-center gap-3"
      >
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="کد پیگیری (مثال: PM-1042)"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-full text-sm bg-stone-50 border border-stone-200 rounded-xl pr-10 pl-4 py-3 outline-none focus:border-stone-900 font-mono"
          />
          <PackageCheck className="w-5 h-5 text-stone-400 absolute right-3.5 top-3.5" />
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto py-3 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          استعلام وضعیت مرسوله
        </button>
      </form>

      {/* Tracking Result View */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/90 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-6">
          <div>
            <span className="text-xs font-semibold text-amber-700">وضعیت فعلی سفارش</span>
            <div className="text-xl font-bold font-serif text-stone-950 mt-1">
              در حال بسته‌بندی هاردباکس و تحویل به باربری هوایی
            </div>
            <div className="text-xs text-stone-400 mt-1">
              کد سفارش: <span className="font-mono text-stone-900 font-bold">{searchedCode}</span> · زمان ثبت: امروز
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-xl border border-emerald-200 text-xs font-semibold self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-gentle-pulse"></span>
            <span>بیمه سلامت بار فعال است</span>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative space-y-8 pr-6 sm:pr-8 border-r-2 border-stone-200 mr-2 sm:mr-4">
          {steps.map((st, idx) => (
            <div key={idx} className="relative group">
              {/* Dot */}
              <div
                className={`absolute -right-[31px] sm:-right-[39px] top-0.5 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${
                  st.done
                    ? 'border-white bg-amber-600 shadow-sm'
                    : 'border-white bg-stone-200'
                }`}
              >
                {st.done && <CheckCircle2 className="w-3 h-3 text-white" />}
              </div>

              {/* Step info */}
              <div className="space-y-1">
                <div
                  className={`text-sm font-bold ${
                    st.current
                      ? 'text-amber-900'
                      : st.done
                      ? 'text-stone-900'
                      : 'text-stone-400'
                  }`}
                >
                  {st.title}
                </div>
                <div className="text-xs text-stone-500">{st.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Support helper */}
        <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>نیاز به تغییر آدرس یا هماهنگی ساعت تحویل دارید؟</span>
          </div>
          <a
            href="tel:02188880000"
            className="flex items-center gap-1.5 text-stone-900 font-semibold hover:text-amber-800 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>تماس با امور مرسولات: ۰۲۱-۸۸۸۸۰۰۰۰</span>
          </a>
        </div>
      </div>
    </div>
  );
};
