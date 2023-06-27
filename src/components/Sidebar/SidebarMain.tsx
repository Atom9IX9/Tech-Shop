import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import SidebarLocation from "./SidebarLocation";
import SidebarMainBtns from "./SidebarMainBtns";

const SidebarMain = () => {
  return (
    <main className={style.sidebarMain}>
      <SidebarMainBtns />
      <SidebarLocation />
      <hr />
    </main>
  );
};

export default SidebarMain;
