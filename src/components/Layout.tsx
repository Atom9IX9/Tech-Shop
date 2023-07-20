import Content from "components/Content/Content";
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </div>
  );
};

export default Layout;
