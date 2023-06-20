import Content from "./Content/Content";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

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
