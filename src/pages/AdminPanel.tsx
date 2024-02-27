import style from "style/admin/adminStyle.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminPanelNav from "components/Admin/AdminPanelNav";
import React, { useContext, useEffect } from "react";
import withSuspense from "utils/hoc/withSuspense";
import { User } from "components/contexts/UserContext";

const APCategories = withSuspense(
  React.lazy(() => import("components/Admin/APCategories"))
);
const APPeoples = withSuspense(
  React.lazy(() => import("components/Admin/APPeoples"))
);
const APProducts = withSuspense(
  React.lazy(() => import("components/Admin/APProducts"))
);
const APAdmins = withSuspense(
  React.lazy(() => import("components/Admin/APAdmins"))
);
const APReports = withSuspense(
  React.lazy(() => import("components/Admin/APReports"))
);
const APInformation = withSuspense(
  React.lazy(() => import("components/Admin/APInformation"))
);

const AdminPanel = () => {
  const nav = useNavigate();
  const { role } = useContext(User);
  const { pathname } = useLocation();

  useEffect(() => {
    if (role !== "ADMIN") {
      nav("/");
    } else if (pathname === "/admin-panel") {
      nav("information");
    }
  }, [nav, role, pathname]);

  return (
    <div className={style.AP}>
      <AdminPanelNav />
      <Routes>
        <Route path="categories" element={<APCategories />} />
        <Route path="products" element={<APProducts />} />
        <Route path="admins" element={<APAdmins />} />
        <Route path="people" element={<APPeoples />} />
        <Route path="information" element={<APInformation />} />
        <Route path="reports" element={<APReports />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
