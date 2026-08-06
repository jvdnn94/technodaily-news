import React, { useContext, useEffect } from "react";
import { Container } from "../../component/container/Container";
import { NewsContext } from "../../context/NewsContext";
import { DashboardNavUl } from "../../component/adminComponents/dashboardNavUl/DashboardNavUl";
import { AdminCatComponent } from "../../component/adminComponents/adminCatComponents/AdminCatComponents";
import { AdminUserComponents } from "../../component/adminComponents/adminUserComponent/AdminUserComponent";
import { AdminPostComponent } from "../../component/adminComponents/adminPostComponent/AdminPostComponent";

export const AdminPanel = () => {
  const { activeSection, fetchUsers, fetchPosts, fetchCategories } = useContext(NewsContext);

  const roles = JSON.parse(localStorage.getItem("roles")) || [];
  const isAuthor = roles.includes("author") || roles.includes("نویسنده");
  const isAdmin = roles.includes("administrator") || roles.includes("مدیرکل");

  // ✅ اسکرول خودکار به بالای صفحه هنگام تغییر بخش
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  useEffect(() => {
    fetchPosts();
    if (isAdmin) {
      fetchCategories();
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
            <div className="px-2 pb-2 pt-1 mx-auto bg-neutral-200 rounded-2xl max-w-full md:max-w-6xl" dir="rtl">
              {activeSection === "categories" && isAdmin && <AdminCatComponent />}
              {activeSection === "users" && isAdmin && <AdminUserComponents />}
              {activeSection === "posts" && (isAdmin || isAuthor) && <AdminPostComponent />}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};