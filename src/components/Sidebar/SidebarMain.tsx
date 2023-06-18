import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import SidebarMainBtns from "./SidebarMainBtns";

const SidebarMain = () => {
  return (
    <main className={style.sidebarMain}>
      <SidebarMainBtns />
    </main>
  );
};

export default SidebarMain;
