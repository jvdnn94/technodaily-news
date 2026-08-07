import { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import logo from "../../../assets/images/TechnoLogo2-removebg-preview.png";

// آیکون‌های Heroicons (برای استفاده در منو)
import {
  HomeIcon,
  TagIcon,
  DocumentTextIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

export const DashboardNavUl = () => {
  const { activeSection, setActiveSection } = useContext(NewsContext);

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const username = localStorage.getItem("userName") || "کاربر";

  // استخراج حرف اول نام برای آواتار
  const firstLetter = username.charAt(0).toUpperCase();

  return (
    <div className="col-span-1 h-full">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-right mt-8 md:mt-12 lg:mt-17 mr-4 md:mr-8 text-gray-900">
        خوش آمدید
      </h1>

      <div className="bg-blue-950 rounded-2xl shadow-lg  min-h-[480px] md:min-h-[600px] lg:min-h-[640px] mt-2 overflow-hidden flex flex-col">
        {/* لوگو */}
        <div className="w-full flex justify-center bg-blue-900/30 p-2">
          <img src={logo} alt="تکنو دیلی" className="object-contain h-20 md:h-24 lg:h-28" />
        </div>

        {/* اطلاعات کاربر */}
        <div className="flex flex-col lg:flex-row items-center justify-between text-white px-4 md:px-6 py-3 md:py-4 gap-2 bg-blue-900/20 border-b border-blue-800/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg">
              {firstLetter}
            </div>
            <p className="text-sm md:text-base font-semibold">{username}</p>
          </div>
          <div className="flex flex-col items-center gap-1 text-xs md:text-sm">
            <span className="text-blue-300 font-light">نقش:</span>
            {roles.map((role, index) => (
              <span
                key={index}
                className="bg-blue-800/50 px-2 py-0.5 rounded-full text-white text-xs md:text-sm"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* منوی اصلی */}
        <ul dir="rtl" className="flex-1 px-3 md:px-4 py-4 md:py-6 space-y-1">
          <li
            className={`group flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeSection === "categories"
                ? "bg-blue-800/40 text-blue-300 border-r-4 border-blue-400"
                : "text-gray-300 hover:bg-blue-900/40 hover:text-white hover:pr-4"
            }`}
            onClick={() => setActiveSection("categories")}
          >
            <TagIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg font-medium">مدیریت دسته‌بندی‌ها</span>
          </li>

          <li
            className={`group flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeSection === "posts"
                ? "bg-blue-800/40 text-blue-300 border-r-4 border-blue-400"
                : "text-gray-300 hover:bg-blue-900/40 hover:text-white hover:pr-4"
            }`}
            onClick={() => setActiveSection("posts")}
          >
            <DocumentTextIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg font-medium">مدیریت پست‌ها</span>
          </li>

          <li
            className={`group flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeSection === "users"
                ? "bg-blue-800/40 text-blue-300 border-r-4 border-blue-400"
                : "text-gray-300 hover:bg-blue-900/40 hover:text-white hover:pr-4"
            }`}
            onClick={() => setActiveSection("users")}
          >
            <UsersIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg font-medium">مدیریت کاربران</span>
          </li>

          <li
            className={`group flex items-center gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl cursor-not-allowed opacity-60 text-gray-500`}
          >
            <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
            <span className="text-sm md:text-base lg:text-lg font-medium">مدیریت تبلیغات</span>
            <span className="text-[10px] bg-gray-700/50 px-2 py-0.5 rounded-full text-gray-400 mr-auto">
              به زودی
            </span>
          </li>
        </ul>

      </div>
    </div>
  );
};