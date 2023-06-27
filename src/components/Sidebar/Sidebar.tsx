import { useDispatch, useSelector } from "react-redux";
import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { getActiveMenu } from "../../utils/selectors/appGlobalSelectors";
import cn from "classnames";
import SidebarHeader from "./SidebarHeader";
import SidebarMain from "./SidebarMain";
import { setActiveMenu } from "../../reducers/appReducer";

const Sidebar = () => {
  const isActiveMenu = useSelector(getActiveMenu);
  const dispatch = useDispatch();

  return (
    <div
      className={cn(style.sidebarWrapper, { [style.activeMenu]: isActiveMenu })}
    >
      <div
        className={style.sidebarBlur}
        onClick={() => dispatch(setActiveMenu(false))}
      ></div>
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
