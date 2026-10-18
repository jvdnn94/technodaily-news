import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Users,
  Award,
  Newspaper,
  Heart,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export function AboutUs() {
  const values = [
    {
      icon: Newspaper,
      title: "خبر دقیق و به‌روز",
      desc: "تیم تحریریه ما ۲۴ ساعته در تلاش است تا تازه‌ترین و دقیق‌ترین اخبار فناوری را به دست شما برساند.",
    },
    {
      icon: Heart,
      title: "مستقل و بی‌طرف",
      desc: "بدون وابستگی به هیچ گروه یا برندی، تنها معیار ما صحت خبر و منافع خوانندگان است.",
    },
    {
      icon: Users,
      title: "جامعهٔ متخصصان",
      desc: "محیطی برای گفتگو، یادگیری و رشد فعالان حوزهٔ فناوری و علاقه‌مندان به دنیای دیجیتال.",
    },
  ];

  const stats = [
    { number: "+۵۰۰۰", label: "مقاله منتشرشده" },
    { number: "+۲۰۰ هزار", label: "بازدید ماهانه" },
    { number: "+۵۰", label: "نویسنده و همکار" },
    { number: "۷ سال", label: "تجربه در حوزه فناوری" },
  ];

  const achievements = [
    "پوشش زندهٔ رویدادهای بزرگ فناوری ایران و جهان",
    "همکاری با بیش از ۱۰۰ برند فعال در حوزهٔ دیجیتال",
    "انتشار بیش از ۲۰۰ گزارش تحلیلی و اختصاصی",
    "راه‌اندازی بخش آموزش و دوره‌های تخصصی",
  ];

  return (
    <div className="bg-gray-50 text-gray-800" dir="rtl">
      {/* ============ HERO ============ */}
      <section className="relative bg-gradient-to-br from-blue-500 via-blue-700 to-blue-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/15 backdrop-blur text-sm px-4 py-1 rounded-full mb-6 border border-white/25">
              درباره ما
            </span>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
              روایتِ فناوری، از زبانِ <span className="text-rose-300">متخصصان</span>
            </h1>
            <p className="text-base md:text-lg text-blue-100 leading-8">
              ما یک تیم از علاقه‌مندان به دنیای فناوری هستیم که باور داریم خبر
              درست، حق هر فارسی‌زبان است. از سال ۱۳۹۷ در کنار شما هستیم تا
              پیچیده‌ترین تحولات فناوری را ساده و دقیق روایت کنیم.
            </p>
          </div>
        </div>

        {/* موج تزئینی */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* ============ STATS ============ */}
      <section className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-blue-700 mb-1">
                {s.number}
              </div>
              <div className="text-xs md:text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ داستان ما ============ */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              داستان ما
            </h2>
            <div className="space-y-4 text-gray-600 leading-8 text-justify">
              <p>
                همه‌چیز از یک وبلاگ ساده شروع شد؛ جایی که چند دوست دانشجو
                تصمیم گرفتند اخبار فناوری را به زبان ساده برای فارسی‌زبانان
                بنویسند. امروز این وبلاگ به یکی از معتبرترین منابع خبری حوزهٔ
                فناوری در ایران تبدیل شده است.
              </p>
              <p>
                ما باور داریم که فناوری فقط کد و سخت‌افزار نیست؛ فناوری
                داستان آدم‌هاست. آدم‌هایی که با ایده‌هایشان دنیا را کمی بهتر
                می‌کنند. رسالت ما روایت این داستان‌هاست؛ بدون اغراق، بدون
                سوگیری و با تکیه بر منابع معتبر.
              </p>
            </div>

            <ul className="mt-8 space-y-3">
              {achievements.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* کارت‌های تصویری */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white aspect-square flex flex-col justify-end">
                <Newspaper className="w-10 h-10 mb-3 opacity-90" />
                <div className="font-bold text-lg">خبر</div>
                <div className="text-sm text-blue-100">دقیق و بی‌طرف</div>
              </div>
              <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-2xl p-6 text-white aspect-square flex flex-col justify-end mt-8">
                <Heart className="w-10 h-10 mb-3 opacity-90" />
                <div className="font-bold text-lg">علاقه</div>
                <div className="text-sm text-rose-100">به جامعهٔ فناوری</div>
              </div>
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-6 text-white aspect-square flex flex-col justify-end">
                <Target className="w-10 h-10 mb-3 opacity-90" />
                <div className="font-bold text-lg">هدف</div>
                <div className="text-sm text-indigo-100">آگاهی بخشی</div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl p-6 text-white aspect-square flex flex-col justify-end mt-8">
                <Award className="w-10 h-10 mb-3 opacity-90" />
                <div className="font-bold text-lg">کیفیت</div>
                <div className="text-sm text-emerald-100">در هر خبر</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ ارزش‌های ما ============ */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              ارزش‌های ما
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              سه اصل ساده که مسیر ما را در هر خبر مشخص می‌کند.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map(({  title, desc }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition"
              >
                
                <h3 className="font-bold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600 leading-7">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-gradient-to-br from-blue-700 to-blue-950 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            بیایید با هم دنیای فناوری را روایت کنیم
          </h2>
          <p className="text-blue-100 max-w-xl mx-auto mb-8 leading-8">
            چه خواننده‌ای هستید که دنبال خبر دقیق می‌گردید، چه نویسنده‌ای که
            می‌خواهد صدایش شنیده شود — اینجا جای شماست.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact-us"
              className="inline-flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              ارتباط با ما
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              مشاهدهٔ اخبار
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

