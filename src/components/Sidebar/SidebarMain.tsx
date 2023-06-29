import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import SidebarInfo from "./SidebarInfo";
import SidebarLocation from "./SidebarLocation";
import SidebarMainBtns from "./SidebarMainBtns";

const SidebarMain = () => {
  return (
    <main className={style.sidebarMain}>
      <SidebarMainBtns />
      <SidebarLocation />
      <hr />
      <SidebarInfo />
    </main>
  );
};

export default SidebarMain;
