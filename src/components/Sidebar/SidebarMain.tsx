import SidebarMainBtns from "./SidebarMainBtns";
import SidebarLocation from "./SidebarLocation";
import SidebarInfo from "./SidebarInfo";

import { MouseEventHandler, useContext } from "react";
import style from "style/sidebarStyle/sidebarStyle.module.css";
import { useDispatch } from "react-redux";
import { signOutUser } from "reducers/userReducer";
import TextButton from "components/UI/TextButton";
import { useTranslation } from "react-i18next";
import { User } from "components/contexts/UserContext";
import { setActiveMenu } from "reducers/appReducer";
import { resetLikedProducts } from "reducers/productsReducer";

const SidebarMain = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const { role } = useContext(User);

  const signOut: MouseEventHandler = (e) => {
    dispatch(signOutUser());
    dispatch(resetLikedProducts())
    dispatch(setActiveMenu(false));
  };

  return (
    <main className={style.sidebarMain}>
      <SidebarMainBtns />
      <SidebarLocation />
      <hr />
      <SidebarInfo />
      {role !== "GUEST" && (
        <TextButton onClick={signOut}>{t("signOut") as string}</TextButton>
      )}
    </main>
  );
};

export default SidebarMain;
