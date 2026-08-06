import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-0">
      <div className="container mx-auto px-4">
        {/* بخش اصلی */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center sm:text-right">
          
          {/* دسترسی سریع */}
          <div>
            <h3 className="text-lg font-semibold mb-4">دسترسی سریع</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-rose-400 transition">درباره ما</a></li>
              <li><a href="#" className="hover:text-rose-400 transition">تماس با ما</a></li>
              <li><a href="#" className="hover:text-rose-400 transition">قوانین</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-end">
            <h3 className="text-lg font-semibold mb-4">ما را دنبال کنید</h3>
            <div className="flex gap-5">
              <a href="#" aria-label="Instagram" className="hover:text-pink-400">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="#" aria-label="Telegram" className="hover:text-blue-400">
                <i className="fab fa-telegram-plane text-2xl"></i>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-sky-400">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">ارتباط با ما</h3>
            <p className="text-sm"> javad.nn1994@gmail.com:ایمیل</p>
            <p className="text-sm mt-1">تلفن: ۰۱۲۳۴۵۶۷۸۹</p>
          </div>
        </div>

        {/* خط جداکننده و کپی‌رایت */}
        <div className="border-t border-gray-700 mt-10 pt-4 text-sm text-center">
          © {new Date().getFullYear()} تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
}
