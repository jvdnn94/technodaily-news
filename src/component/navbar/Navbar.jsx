import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Container } from "../container/Container";
import logo from "../../assets/images/technodaily_darkened3.png";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMenuOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePopState = () => setIsMenuOpen(false);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/searchpage?query=${encodeURIComponent(search)}`);
      setSearch("");
      setIsMenuOpen(false);
    }
  };

  // ---------- محتوای Portal ----------
  const drawer = (
    <>
      {/* اورلی — z-index 40 (زیر ناوبار) */}
      <div
        onClick={() => setIsMenuOpen(false)}
        className="lg:hidden bg-black/60"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 40,
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? "auto" : "none",
          transition: "opacity 300ms",
        }}
        aria-hidden={!isMenuOpen}
      />

      {/* پنل — z-index 60 (بالای ناوبار) + top:0 صریح */}
      <aside
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        className="lg:hidden w-72 max-w-[85vw] bg-gray-900 flex flex-col shadow-2xl"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          height: "100dvh",
          zIndex: 60,
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms ease-out",
          margin: 0,
        }}
        aria-hidden={!isMenuOpen}
      >
        {/* هدر — ارتفاع هم‌اندازه با ناوبار موبایل */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700 shrink-0">
          <img src={logo} alt="لوگو" className="h-12" />
          <button
            onClick={() => setIsMenuOpen(false)}
            aria-label="بستن منو"
            className="p-2 rounded-lg text-gray-200 hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* ورود/ثبت‌نام — بالای منو */}
        <div className="px-4 py-3 border-b border-gray-700 shrink-0" dir="rtl">
          <Link to="/login" onClick={() => setIsMenuOpen(false)}>
            <button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-md transition">
              ورود/ثبت نام
            </button>
          </Link>
        </div>

        {/* لینک‌ها — وسط */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" dir="rtl">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-lg px-3 py-3 text-blue-300 font-bold text-lg hover:bg-gray-800 hover:text-white transition"
          >
            صفحه اصلی
          </Link>
          <Link
            to="/contactUs"
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-lg px-3 py-3 text-blue-300 font-bold text-lg hover:bg-gray-800 hover:text-white transition"
          >
            ارتباط با ما
          </Link>
          <Link
            to="/aboutUs"
            onClick={() => setIsMenuOpen(false)}
            className="block rounded-lg px-3 py-3 text-blue-300 font-bold text-lg hover:bg-gray-800 hover:text-white transition"
          >
            درباره ما
          </Link>
        </nav>

        {/* جستجو — پایین */}
        <div className="border-t border-gray-700 p-4 shrink-0">
          <form
            onSubmit={handleSubmit}
            className="flex items-center w-full bg-white rounded-md overflow-hidden"
          >
            <input
              type="search"
              name="searchbar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="...جستجو"
              aria-label="جستجو"
              className="flex-grow px-3 py-2 text-right text-black bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 text-gray-700 hover:bg-blue-600 hover:text-white transition"
            >
              <i className="fas fa-search" />
            </button>
          </form>
        </div>
      </aside>
    </>
  );

  return (
    <>
      {/* ناوبار — z-index 50 (بالای اورلی، زیر پنل) */}
      <div className="nav-custom border-2 border-b-black sticky top-0 bg-white z-">
        <Container>
          {/* دسکتاپ — بدون تغییر */}
          <div className="hidden lg:flex justify-between flex-row-reverse items-center">
            <ul
              className="flex gap-2 text-blue-700 font-bold text-xl items-center mt-0.5"
              dir="rtl"
            >
              <li>
                <Link to="/"> <img src={logo} alt="لوگو" className="h-12" /> </Link>
              </li>
              <li className="mt-2 ml-4 hover:text-blue-950 hover:text-2xl duration-100">
                <Link to="/">صفحه اصلی</Link>
              </li>
              <li className="mt-2 ml-4 hover:text-blue-950 hover:text-2xl duration-100">
                <Link to="/contactUs">ارتباط با ما</Link>
              </li>
              <li className="mt-2 ml-4 text-shadow hover:text-blue-950 hover:text-2xl duration-100">
                <Link to="/aboutUs">درباره ما</Link>
              </li>
            </ul>

            <form
              onSubmit={handleSubmit}
              className="flex gap-3 mt-2 items-center"
            >
              <Link to="/login">
                <button className="bg-rose-500 border-rose-950 border-2 py-2 w-24 rounded-md">
                  ورود/ثبت نام
                </button>
              </Link>
              <div className="flex items-center w-full max-w-sm border-black border-2 rounded-md">
                <input
                  type="search"
                  name="searchbar"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="...جستجو"
                  aria-label="جستجو"
                  className="SearchBox flex-grow px-3 py-2 text-right text-black border-gray-300 rounded-r-none rounded-l-md focus:outline-none"
                />
                <button
                  type="submit"
                  className="Searchbtn px-4 py-2 text-blue-300 hover:bg-blue-700 focus:outline-none rounded-r-md"
                >
                  <i className="fas fa-search text-gray-950" />
                </button>
              </div>
            </form>
          </div>

          {/* موبایل/تبلت */}
          <div className="lg:hidden flex justify-between items-center py-2">
            <img src={logo} alt="لوگو" className="h-12" />
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label="باز کردن منو"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="p-2 rounded-lg text-blue-700 hover:bg-gray-100 transition"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </Container>
      </div>

      {/* Portal به body */}
      {typeof document !== "undefined" && createPortal(drawer, document.body)}
    </>
  );
};
