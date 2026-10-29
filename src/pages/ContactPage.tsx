import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('مشاوره خرید چمدان');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 2500);
  };

  const faqs = [
    {
      q: 'آیا چمدان سایز ۲۰ پتو متو برای کابین همه پروازها مناسب است؟',
      a: 'بله، سایز ۲۰ اینچ مدل‌های پتو متو با ابعاد ۵۵×۳۸×۲۳ سانتی‌متر بر اساس استاندارد جهانی یاتا (IATA) طراحی شده و در محفظه بالای سر تمامی ایرلاین‌های داخلی و خارجی جا می‌گیرد.',
    },
    {
      q: 'چگونه از ۵ سال گارانتی پتو متو استفاده کنم؟',
      a: 'کافیست فاکتور خرید یا شماره موبایلی که با آن سفارش ثبت کرده‌اید را به همراه قطعه آسیب‌دیده به یکی از شعب یا دفتر خدمات پس از فروش ارسال کنید. قطعات آسیب‌دیده بدون دریافت وجه تعویض می‌شوند.',
    },
    {
      q: 'قفل TSA چیست و چرا چمدان‌ها کلید ندارند؟',
      a: 'قفل TSA یک استاندارد بین‌المللی است که رمز ۳ رقمی آن در اختیار شماست. سوراخ کلید روی قفل فقط مخصوص بازرسان امنیت فرودگاه است تا در صورت نیاز به بررسی چمدان با کلید مستر آن را بدون آسیب باز کنند؛ بنابراین درون جعبه چمدان کلیدی قرار داده نمی‌شود.',
    },
    {
      q: 'مدت زمان ارسال سفارشات چقدر است؟',
      a: 'سفارشات تهران از طریق پیک اختصاصی ظرف حداکثر ۲۴ ساعت و سفارشات شهرستان‌ها از طریق پست پیشتاز هوایی و تیپاکس ظرف ۲ الی ۳ روز کاری تحویل می‌گردند.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Page Title */}
      <div className="border-b border-stone-200 pb-4 text-center sm:text-right">
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-stone-950">
          شعب حضوری و ارتباط با پتو متو
        </h1>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          مشاوران تخصصی سفر و کارشناسان خدمات پس از فروش آماده پاسخگویی به شما هستند.
        </p>
      </div>

      {/* 3 Showroom Boutique Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-serif text-stone-900">
          بوتیک‌های اختصاصی پتو متو
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tehran */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">شعبه مرکزی تهران</span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                فعال
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900">مجتمع تجاری پالادیوم</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              تهران، خیابان ولیعصر، بالاتر از زعفرانیه، طبقه دوم تجاری، واحد ۲۱۴
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
              <div>تلفن: ۰۲۱-۸۸۸۸۰۰۰۰</div>
              <div>ساعت کار: ۱۰:۰۰ الی ۲۲:۰۰</div>
            </div>
          </div>

          {/* Shiraz */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">شعبه شیراز</span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                فعال
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900">خیابان عفیف‌آباد</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              شیراز، خیابان عفیف‌آباد، نبش کوچه ۱۸، برج تجاری سپهر، واحد ۱۰۴
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
              <div>تلفن: ۰۷۱-۳۶۲۸۰۰۰۰</div>
              <div>ساعت کار: ۱۰:۳۰ الی ۲۱:۳۰</div>
            </div>
          </div>

          {/* Isfahan */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800">شعبه اصفهان</span>
              <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-medium">
                فعال
              </span>
            </div>
            <h3 className="text-base font-bold text-stone-900">اصفهان سیتی‌سنتر</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              اصفهان، بزرگراه شهید دستجردی، سیتی‌سنتر، همکف اول، راهروی اصلی
            </p>
            <div className="pt-2 border-t border-stone-100 text-xs text-stone-600 space-y-1">
              <div>تلفن: ۰۳۱-۳۶۵۵۰۰۰۰</div>
              <div>ساعت کار: ۱۰:۰۰ الی ۲۲:۳۰</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form & Support Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <div>
            <h3 className="text-lg font-bold font-serif text-stone-900">
              ارسال پیام یا درخواست خدمات پس از فروش
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              پیام شما ظرف حداکثر ۲ ساعت کاری توسط کارشناسان پتو متو بررسی و پاسخ داده می‌شود.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <div className="text-sm font-bold text-emerald-900">
                پیام شما با موفقیت ثبت شد
              </div>
              <p className="text-xs text-emerald-700">
                کارشناسان خدمات مشتریان پتو متو به‌زودی با شما تماس خواهند گرفت.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">نام شما:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">شماره تماس موبایل:</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">موضوع پیام:</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl px-3 py-2.5 outline-none focus:border-stone-900 cursor-pointer"
                >
                  <option value="مشاوره خرید چمدان">مشاوره تخصصی انتخاب چمدان متناسب با ایرلاین</option>
                  <option value="خدمات گارانتی">درخواست گارانتی و تعویض قطعات (چرخ، دسته، قفل)</option>
                  <option value="پیگیری سفارش">پیگیری وضعیت ارسال مرسوله</option>
                  <option value="همکاری شرکتی">سفارش عمده شرکتی و سازمانی</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-700">متن پیام یا توضیحات:</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="لطفاً پیام یا کد محصول مورد نظر خود را بنویسید..."
                  className="w-full text-xs bg-stone-50 border border-stone-200 rounded-xl p-3 outline-none focus:border-stone-900 resize-none"
                />
              </div>

              <button
                type="submit"
                className="py-3 px-6 bg-stone-950 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>ارسال پیام به پتو متو</span>
              </button>
            </form>
          )}
        </div>

        {/* Direct Channels */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-stone-900 text-white p-6 rounded-3xl border border-stone-800 space-y-4">
            <h3 className="text-base font-bold font-serif text-white">پشتیبانی تلفنی و واتساپ</h3>
            <p className="text-xs text-stone-300 leading-relaxed">
              اگر در انتخاب سایز چمدان یا نحوه تنظیم رمز قفل TSA نیاز به راهنمایی فوری دارید، همکاران ما آماده پاسخگویی هستند.
            </p>

            <div className="space-y-2.5 text-xs text-stone-300 pt-2 border-t border-stone-800">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>خط ویژه تهران: ۰۲۱-۸۸۸۸۰۰۰۰</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ایمیل پشتیبانی: support@petometo.ir</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ساعات پاسخگویی: همه روزه از ۹:۰۰ تا ۲۱:۰۰</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 pt-6 border-t border-stone-200">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-700 tracking-wider">
            پرسش‌های متداول مسافران
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
            پاسخ به سوالات پرتکرار خریداران چمدان
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-right p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 hover:text-amber-900 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-stone-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
