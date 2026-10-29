import React from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, Truck, RefreshCw, Headphones, Phone, MapPin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      {/* 4 Trust Pillars */}
      <div className="border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-right">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">۵ سال گارانتی معتبر</h4>
                <p className="text-xs text-stone-400 mt-0.5">ضمانت تعویض چرخ، دسته و قفل TSA</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">ارسال اکسپرس هوایی</h4>
                <p className="text-xs text-stone-400 mt-0.5">تحویل ۲۴ ساعته تهران و ۴۸ ساعته شهرستان</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">۷ روز ضمانت بازگشت</h4>
                <p className="text-xs text-stone-400 mt-0.5">امکان تعویض سایز یا مدل بدون قید و شرط</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-stone-800 text-amber-400 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-stone-100">مشاوره تخصصی سفر</h4>
                <p className="text-xs text-stone-400 mt-0.5">راهنمای انتخاب چمدان متناسب با ایرلاین</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-serif text-white">پتو متو</span>
              <span className="text-xs text-amber-500 font-medium">PETO METO</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-md">
              پتو متو مرجع تخصصی طراحی و عرضه چمدان‌های مسافرتی مقاوم، کوله‌پشتی‌های اداری و کیف‌های چرم دست‌ساز است. ما کیفیت بدون مصالحه و استانداردهای هوانوردی بین‌المللی را به سفرهای شما هدیه می‌دهیم.
            </p>
            <div className="space-y-1.5 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
                <span>تهران، خیابان ولیعصر، بالاتر از زعفرانیه، مجتمع تجاری پالادیوم</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>تلفن تماس: ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>ایمیل: support@petometo.ir</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">دسته‌بندی‌ها</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('category', { categorySlug: 'suitcases' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  چمدان‌های مسافرتی و کابین
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', { categorySlug: 'backpacks' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  کوله‌پشتی شهری و لپ‌تاپ
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', { categorySlug: 'totes' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  کیف دستی و دوشی چرم
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', { categorySlug: 'business' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  کیف‌های اداری و اسناد
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('category', { categorySlug: 'accessories' })}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  اکسسوری سفر و ارگانایزر
                </button>
              </li>
            </ul>
          </div>

          {/* Guidance & Tools */}
          <div>
            <h4 className="text-sm font-bold text-white mb-4">راهنماها و خدمات</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => navigateTo('size-guide')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  راهنمای ابعاد کابین پرواز
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('tracking')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  پیگیری وضعیت مرسوله
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('wishlist')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  کالاهای نشان‌شده
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  درباره متریال و استاندارد TSA
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  شعب حضوری و خدمات پس از فروش
                </button>
              </li>
            </ul>
          </div>

          {/* Slogan & Working Hours */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white">ساعت کاری شعب</h4>
            <div className="bg-stone-800/60 p-3 rounded-xl border border-stone-800 text-xs text-stone-400 space-y-1">
              <p>شنبه تا چهارشنبه: ۱۰:۰۰ الی ۲۲:۰۰</p>
              <p>پنج‌شنبه و جمعه: ۱۱:۰۰ الی ۲۳:۰۰</p>
              <p className="text-amber-400 font-semibold mt-2">سفارشات آنلاین: ۲۴ ساعته</p>
            </div>
            <p className="text-[11px] text-stone-500">
              کلیه حقوق این سامانه متعلق به فروشگاه کیف و چمدان پتو متو می‌باشد.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-stone-800/80 py-4 text-center text-xs text-stone-500">
        © ۱۴۰۵ پتو متو (Peto Meto). طراحی و توسعه با استانداردهای نوین تجربه کاربری.
      </div>
    </footer>
  );
};
