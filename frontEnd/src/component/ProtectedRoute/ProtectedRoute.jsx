import React from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, allowedRoles }) {
  // گرفتن توکن و نقش‌ها از localStorage
  const token = localStorage.getItem("token");
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");

  // چک کردن اینکه آیا توکن موجود است و حداقل یک نقش کاربر در allowedRoles هست
  const hasAccess = token && roles.some(role => allowedRoles.includes(role));

  if (!hasAccess) {
    // هدایت به صفحه لاگین اگر دسترسی نداشت
    return <Navigate to="/login" replace />;
  }

  // نمایش کامپوننت فرزند اگر دسترسی داشت
  return children;
}
