import style from "style/admin/adminStyle.module.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AdminPanelNav from "components/Admin/AdminPanelNav";
import React, { useContext, useEffect } from "react";
import withSuspense from "utils/hoc/withSuspense";
import { User } from "components/contexts/UserContext";

const APCategories = withSuspense(
  React.lazy(() => import("components/Admin/APCategories"))
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


const AdminPanel = () => {
  const nav = useNavigate();
  const { role, isChecked } = useContext(User);
  const { pathname } = useLocation();

  useEffect(() => {
    // refactor if not ADMIN
    if (isChecked && role !== "ADMIN") {
      nav("/");
    } else if (pathname === "/admin-panel") {
      nav("information");
    }
  }, [nav, role, pathname, isChecked]);

  return (
    <div className={style.AP}>
      <AdminPanelNav />
      <Routes>
        <Route path="categories" element={<APCategories />} />
        <Route path="products" element={<APProducts />} />
        <Route path="admins" element={<APAdmins />} />
        <Route path="reports" element={<APReports />} />
      </Routes>
    </div>
  );
};

export default AdminPanel;
