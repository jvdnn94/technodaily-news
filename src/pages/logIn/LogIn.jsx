import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { NewsContext } from "../../context/NewsContext";

const PasswordToggle = ({ show, onToggle, label }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={label}
    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-blue-100/80 hover:text-white hover:bg-white/10 transition"
    tabIndex={-1}
  >
    {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
  </button>
);

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputClass =
    "w-full px-4 py-3 bg-white/10 border border-white/25 rounded-lg text-white placeholder:text-blue-100/70 text-right focus:outline-none focus:ring-2 focus:ring-blue-200/70 focus:border-transparent transition";

  // input نامرئی که فقط برای حفظ فضا رندر می‌شود
  const hiddenInput = (
    <input
      type="text"
      tabIndex={-1}
      readOnly
      aria-hidden="true"
      className={`${inputClass} invisible`}
    />
  );

  const isSuccess = typeof message === "string" && message.includes("✅");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 px-4 py-8">
      <div className="w-full max-w-md bg-gradient-to-br from-blue-500 via-blue-700 to-blue-950 rounded-2xl shadow-xl p-6 sm:p-8">
        {/* ===== تب‌سوییچر — همیشه سر جای خود ===== */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-white/10 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                isLogin
                  ? "bg-white text-blue-700 shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              ورود
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`px-5 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                !isLogin
                  ? "bg-white text-blue-700 shadow"
                  : "text-white/80 hover:text-white"
              }`}
            >
              ثبت‌نام
            </button>
          </div>
        </div>

        {/* ===== پیام ===== */}
        {message && (
          <div
            role="alert"
            className={`mb-4 rounded-lg px-3 py-2 text-center text-sm border ${
              isSuccess
                ? "bg-green-500/20 border-green-300/40 text-green-50"
                : "bg-red-500/20 border-red-300/40 text-red-50"
            }`}
          >
            {message}
          </div>
        )}

        {/* ===== ساختار ثابت ۴ اسلات + دکمه ===== */}
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="space-y-4"
        >
          {/* اسلات ۱ */}
          {isLogin ? (
            <div>
              <label htmlFor="login-username" className="sr-only">
                نام کاربری یا ایمیل
              </label>
              <input
                id="login-username"
                type="text"
                name="usernameOrEmail"
                value={formData.usernameOrEmail}
                onChange={handleChange}
                placeholder="نام کاربری یا ایمیل"
                autoComplete="username"
                className={inputClass}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="reg-username" className="sr-only">
                نام کاربری
              </label>
              <input
                id="reg-username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="نام کاربری"
                autoComplete="username"
                className={inputClass}
              />
            </div>
          )}

          {/* اسلات ۲ */}
          {isLogin ? (
            <div className="relative">
              <label htmlFor="login-password" className="sr-only">
                رمز عبور
              </label>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز عبور"
                autoComplete="current-password"
                className={`${inputClass} pl-11`}
              />
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword((s) => !s)}
                label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="reg-email" className="sr-only">
                ایمیل
              </label>
              <input
                id="reg-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="ایمیل"
                autoComplete="email"
                className={inputClass}
              />
            </div>
          )}

          {/* اسلات ۳ — در حالت ورود: خالی */}
          {isLogin ? (
            hiddenInput
          ) : (
            <div className="relative">
              <label htmlFor="reg-password" className="sr-only">
                رمز عبور
              </label>
              <input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="رمز عبور"
                autoComplete="new-password"
                className={`${inputClass} pl-11`}
              />
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword((s) => !s)}
                label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
              />
            </div>
          )}

          {/* اسلات ۴ — در حالت ورود: خالی */}
          {isLogin ? (
            hiddenInput
          ) : (
            <div className="relative">
              <label htmlFor="reg-confirm" className="sr-only">
                تکرار رمز عبور
              </label>
              <input
                id="reg-confirm"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="تکرار رمز عبور"
                autoComplete="new-password"
                className={`${inputClass} pl-11`}
              />
              <PasswordToggle
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((s) => !s)}
                label={
                  showConfirmPassword
                    ? "مخفی کردن تکرار رمز"
                    : "نمایش تکرار رمز"
                }
              />
            </div>
          )}

          {/* دکمه — همیشه در همان موقعیت پایین */}
          <button
            type="submit"
            className={`w-full font-semibold py-3 rounded-lg active:scale-[.99] transition shadow-sm ${
              isLogin
                ? "bg-white text-blue-700 hover:bg-blue-50"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isLogin ? "ورود" : "ثبت‌نام"}
          </button>
        </form>
      </div>
    </div>
  );
}