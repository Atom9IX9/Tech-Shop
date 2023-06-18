import { useSelector } from "react-redux";
import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { getActiveMenu } from "../../selectors/appGlobalSelectors";
import cn from "classnames";
import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";

const Sidebar = () => {
  const isActiveMenu = useSelector(getActiveMenu);

  return (
    <div className={cn(style.sidebarWrapper, {[style.activeMenu]: isActiveMenu})}>
      <div className={style.sidebarBlur}></div>
      <aside className={style.sidebar}>
        <div className={style.sidebarContent}>
          <SidebarHeader />
          <SidebarMain />
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
