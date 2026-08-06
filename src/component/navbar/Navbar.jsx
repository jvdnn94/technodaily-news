import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container } from "../container/Container";
import logo from "../../assets/images/technodaily_darkened3.png";

export const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false); // ✅ state جدید برای تشخیص ادمین
  const navigate = useNavigate();
  const location = useLocation();

  // تابع بررسی وضعیت لاگین و نقش کاربر از localStorage
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    const roles = JSON.parse(localStorage.getItem("roles") || "[]");

    if (token && name) {
      setIsLoggedIn(true);
      setUserName(name);
      // بررسی نقش ادمین
      setIsAdmin(
        roles.some(
          (role) => role === "administrator" || role === "مدیرکل"
        )
      );
    } else {
      setIsLoggedIn(false);
      setUserName("");
      setIsAdmin(false);
    }
  };

  // بررسی اولیه در اولین رندر
  useEffect(() => {
    checkAuth();
  }, []);

  // هر بار که مسیر تغییر کرد، دوباره بررسی کن
  useEffect(() => {
    checkAuth();
  }, [location.pathname]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/searchpage?query=${encodeURIComponent(search)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    setUserName("");
    setIsAdmin(false);
    closeMenu();
    navigate("/");
  };

  return (
    <>
      {/* نوار نویگیشن ثابت */}
      <div className="fixed top-0 left-0 w-full h-[72px] z-[100] bg-purple-200/30 backdrop-blur-md shadow-md border-b border-black/20">
        <Container>
          <div className="flex justify-between items-center" dir="rtl">
            {/* منوی دسکتاپ */}
            <ul className="hidden lg:flex gap-8 right-0 text-blue-700 font-bold lg:text-2xl" dir="rtl">
              <li>
                <img src={logo} alt="لوگو" className="h-16 w-52" />
              </li>
              <li className="hover:text-blue-950 hover:scale-105 duration-150 mt-4">
                <Link to="/">صفحه اصلی</Link>
              </li>
              {/* ✅ نمایش پنل مدیریت فقط برای ادمین */}
              {isAdmin && (
                <li className="hover:text-blue-950 hover:scale-105 duration-150 mt-4">
                  <Link to="/admin">پنل مدیریت</Link>
                </li>
              )}
              <li className="hover:text-blue-950 hover:scale-105 duration-150 mt-4">
                <Link to="/contact us">ارتباط با ما</Link>
              </li>
              <li className="hover:text-blue-950 hover:scale-105 duration-150 mt-4">
                <Link to="/about us">درباره ما</Link>
              </li>
            </ul>

            {/* فرم جستجو + دکمه ورود/خروج */}
            <form onSubmit={handleSubmit} className="hidden lg:flex gap-3 items-center mt-1" dir="ltr">
              {isLoggedIn ? (
                <div className="flex items-center gap-2">
                  <span className="text-blue-800 font-semibold text-sm bg-blue-100 px-3 py-1 rounded-full">
                    {userName}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    خروج
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-rose-500 hover:bg-rose-600 border-2 border-rose-950 py-2 px-4 rounded-md transition-colors">
                    ورود/ثبت نام
                  </button>
                </Link>
              )}
              <div className="flex items-center border-black border-2 rounded-md overflow-hidden">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="...جستجو"
                  className="px-3 py-2 text-right text-black focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 text-blue-300 hover:bg-blue-700">
                  <i className="fas fa-search text-gray-950" />
                </button>
              </div>
            </form>

            {/* لوگو و همبرگر موبایل */}
            <img src={logo} alt="لوگو" className="h-12 lg:hidden" />
            <button className="lg:hidden text-4xl text-blue-700 ml-4 mt-4" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </Container>
      </div>

      {/* منوی موبایل */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-[200] transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeMenu} className="text-2xl text-red-500">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <ul className="flex flex-col gap-4 text-blue-700 font-bold text-lg px-4" dir="rtl">
          <li>
            <Link to="/" onClick={closeMenu}>
              صفحه اصلی
            </Link>
          </li>
          {/* ✅ نمایش پنل مدیریت فقط برای ادمین در منوی موبایل */}
          {isAdmin && (
            <li>
              <Link to="/admin" onClick={closeMenu}>
                پنل مدیریت
              </Link>
            </li>
          )}
          <li>
            <Link to="/contact us" onClick={closeMenu}>
              ارتباط با ما
            </Link>
          </li>
          <li>
            <Link to="/about us" onClick={closeMenu}>
              درباره ما
            </Link>
          </li>
        </ul>

        {/* بخش کاربری در منوی موبایل */}
        <div className="px-6 mt-4">
          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <div className="bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded-md text-center">
                {userName}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 w-full rounded-md transition-colors"
              >
                خروج
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={closeMenu}>
              <button className="bg-rose-500 border-2 border-rose-950 py-2 w-full rounded-md">
                ورود/ثبت نام
              </button>
            </Link>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-6 mt-2">
          <div className="flex items-center border-black border-2 rounded-md overflow-hidden">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="...جستجو"
              className="px-3 py-2 flex-grow text-right text-black focus:outline-none"
            />
            <button type="submit" className="px-4 py-2 text-blue-300 hover:bg-blue-700">
              <i className="fas fa-search text-gray-950" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};