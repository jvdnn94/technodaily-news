import { useContext } from "react";
import { NewsContext } from "../../../context/NewsContext";
import logo from "../../../assets/images/TechnoLogo2-removebg-preview.png";

export const DashboardNavUl = () => {
  const { activeSection, setActiveSection } = useContext(NewsContext);

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const username = localStorage.getItem("userName");

  return (
    <div className="col-span-1 ml-1">
      <h1 className="text-4xl font-extrabold text-right mt-17 mr-8 text-gray-900">خوش آمدید</h1>
      <div className="bg-blue-950 h-fit rounded-2xl min-h-[730px] mt-2 overflow-hidden">
        <img src={logo} alt="تکنو دیلی" className="object-cover" />
        

        <div className="text-white text-right mx-2  flex justify-between">
          <p className="text-lg font-semibold">کاربر:{username} </p>
          <p className="text-2xl mr-4">{roles.map((role, index) => (
              <span key={index} className="mr-1">
                {role}
              </span>
            ))}</p>
        </div>

        <ul dir="rtl" className="mt-6 pt-2 mr-6 text-2xl">
          <li
            className={`my-3 cursor-pointer ${activeSection === "categories" ? "text-blue-400 font-bold" : ""}`}
            onClick={() => setActiveSection("categories")}
          >
            مدیریت دسته بندی ها
          </li>
          <li
            className={`my-3 cursor-pointer ${activeSection === "posts" ? "text-blue-400 font-bold" : ""}`}
            onClick={() => setActiveSection("posts")}
          >
            مدیریت پست ها
          </li>
          <li
            className={`my-3 cursor-pointer ${activeSection === "users" ? "text-blue-400 font-bold" : ""}`}
            onClick={() => setActiveSection("users")}
          >
            مدیریت کاربران
          </li>
          <li className="my-3">مدیریت تبلیغات</li>
        </ul>
      </div>
    </div>
  );
};
