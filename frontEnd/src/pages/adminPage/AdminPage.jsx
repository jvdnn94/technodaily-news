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

  useEffect(() => {
    fetchPosts();
    if (isAdmin) {
      fetchCategories();
      fetchUsers();
    }
  }, []);

  return (
    <Container>
      <div className="grid grid-cols-4" dir="rtl">
        <DashboardNavUl />
        <div className="col-span-3 mt-1">
          <div className="mt-16">
            <div className="px-2 pb-2 pt-1 max-w-6xl mx-auto bg-neutral-200 rounded-2xl" dir="rtl">
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

