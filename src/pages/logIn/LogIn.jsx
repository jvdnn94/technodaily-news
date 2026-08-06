import { useContext, useEffect } from "react";
import { API_BASE } from "../../services/api";
import { NewsContext } from "../../context/NewsContext";

export function LogIn() {
  const {
    isLogin,
    setIsLogin,
    formData,
    message,
    handleChange,
    handleLogin,
    handleRegister,
  } = useContext(NewsContext);

  // 📢 ارسال رویداد سفارشی بعد از موفقیت لاگین/ثبت‌نام
  useEffect(() => {
    if (message && message.includes("✅")) {
      window.dispatchEvent(new Event("authChange"));
    }
  }, [message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 md:mt-20 mt-24">
      <div className="w-full max-w-md bg-gradient-to-br from-blue-400 via-blue-700 to-blue-950 rounded-2xl shadow-md p-6 min-h-[500px]">
        {/* دکمه‌های تغییر حالت ورود/ثبت‌نام */}
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-l-md transition-colors ${
              isLogin ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            ورود
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-r-md transition-colors ${
              !isLogin ? "bg-blue-600 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            ثبت‌نام
          </button>
        </div>

        {/* نمایش پیام موفقیت یا خطا */}
        {message && (
          <p
            className={`text-center text-sm mb-4 ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* فرم ورود */}
        {isLogin ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              placeholder="نام کاربری یا ایمیل"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="رمز عبور"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-400 text-white py-2 rounded-md hover:bg-blue-500 transition-colors mt-6"
            >
              ورود
            </button>
          </form>
        ) : (
          /* فرم ثبت‌نام */
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="نام کاربری"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ایمیل"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="رمز عبور"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="تکرار رمز عبور"
              className="w-full px-4 py-2 border bg-gray-100 border-gray-300 rounded-md text-right placeholder:text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              ثبت‌نام
            </button>
          </form>
        )}
      </div>
    </div>
  );
}