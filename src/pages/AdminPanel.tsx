import style from "style/admin/adminStyle.module.css";
import { Route, Routes } from "react-router-dom";
import AdminPanelNav from "components/Admin/AdminPanelNav";
import APCategories from "components/Admin/APCategories";
import APPeoples from "components/Admin/APPeoples";
import APProducts from "components/Admin/APProducts";
import APAdmins from "components/Admin/APAdmins";
import APReports from "components/Admin/APReports";
import APDashboard from "components/Admin/APDashboard";

const AdminPanel = () => {
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
