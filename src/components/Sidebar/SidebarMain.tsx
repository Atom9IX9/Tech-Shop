import { MouseEventHandler, useContext } from "react";
import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import SidebarInfo from "./SidebarInfo";
import SidebarLocation from "./SidebarLocation";
import SidebarMainBtns from "./SidebarMainBtns";
import { exitProfile } from "../../firebase";
import { useDispatch } from "react-redux";
import { resetUser } from "../../reducers/userReducer";
import TextButton from "../UI/TextButton";
import { useTranslation } from "react-i18next";
import { User } from "../contexts/UserContext";
import { setActiveMenu } from "../../reducers/appReducer";

const SidebarMain = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { isAuth } = useContext(User);

  const signOut: MouseEventHandler = (e) => {
    exitProfile().then(() => {
      dispatch(resetUser());
      dispatch(setActiveMenu(false))
    });
  };

  return (
    <main className={style.sidebarMain}>
      <SidebarMainBtns />
      <SidebarLocation />
      <hr />
      <SidebarInfo />
      {isAuth && (
        <TextButton onClick={signOut}>{t("signOut") as string}</TextButton>
      )}
    </main>
  );
};

export default SidebarMain;
