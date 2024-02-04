import style from "style/admin/adminStyle.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminPanelNav from "components/Admin/AdminPanelNav";
import React, { useEffect } from "react";
import withSuspense from "utils/hoc/withSuspense";

const APCategories = withSuspense(React.lazy(() => import("components/Admin/APCategories")))
const APPeoples = withSuspense(React.lazy(() => import("components/Admin/APPeoples")))
const APProducts = withSuspense(React.lazy(() => import("components/Admin/APProducts")))
const APAdmins = withSuspense(React.lazy(() => import("components/Admin/APAdmins")))
const APReports = withSuspense(React.lazy(() => import("components/Admin/APReports")))
const APDashboard = withSuspense(React.lazy(() => import("components/Admin/APDashboard")))

const AdminPanel = () => {
  const location = useLocation()
  const nav = useNavigate()
  
  useEffect(() => {
    if (location.pathname === "/admin-panel") {
      nav("dashboard")
    }
  }, [location, nav])

  return (
    <div className={style.AP}>
      <AdminPanelNav />
      <Routes>
        <Route path="categories" element={<APCategories />} />
        <Route path="products" element={<APProducts />} />
        <Route path="admins" element={<APAdmins />} />
        <Route path="people" element={<APPeoples />} />
        <Route path="dashboard" element={<APDashboard />} />
        <Route path="reports" element={<APReports />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
