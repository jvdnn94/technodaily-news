import React, { useContext, useEffect } from "react";
import { Container } from "../../component/container/Container";
import { NewsContext } from "../../context/NewsContext";
import { DashboardNavUl } from "../../component/adminComponents/dashboardNavUl/DashboardNavUl";
import { AdminCatComponent } from "../../component/adminComponents/adminCatComponents/AdminCatComponents";
import { AdminUserComponents } from "../../component/adminComponents/adminUserComponent/AdminUserComponent";
import { AdminPostComponent } from "../../component/adminComponents/adminPostComponent/AdminPostComponent";

export const AdminPanel = () => {
  const { activeSection, fetchUsers, fetchPosts, fetchCategories } =
    useContext(NewsContext);

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const isAuthor = roles.includes("author") || roles.includes("نویسنده");
  const isEditor = roles.includes("editor") || roles.includes("ویرایشگر");
  const isAdmin = roles.includes("administrator") || roles.includes("مدیرکل");

  // ✅ اسکرول خودکار به بالای صفحه هنگام تغییر بخش
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    fetchPosts();
    fetchCategories();
    if (isAdmin) {
      fetchUsers();
    }
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4" dir="rtl">
        <div className="md:col-span-1">
          <DashboardNavUl />
        </div>

        <div className="md:col-span-3 mt-2 md:mt-1">
          <div className="mt-8 md:mt-16">
            <div
              className="px-2 pb-2 pt-1 mx-auto bg-neutral-200 rounded-2xl max-w-full md:max-w-6xl"
              dir="rtl"
            >
              {activeSection === "categories" &&
                (isAdmin || isEditor || isAuthor) && <AdminCatComponent />}
              
              {activeSection === "users" &&
                (isAdmin ? (
                  <AdminUserComponents />
                ) : (
                  <div className="flex flex-col items-center justify-center  pb-16 pt-24 text-center">
                    <div className="bg-red-100 text-red-600 p-4  rounded-full mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      دسترسی محدود
                    </h3>
                    <p className="text-gray-600">
                      این بخش فقط در دسترس ادمین است
                    </p>
                  </div>
                ))}

              {activeSection === "posts" &&
                (isAdmin || isAuthor || isEditor) && <AdminPostComponent />}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};