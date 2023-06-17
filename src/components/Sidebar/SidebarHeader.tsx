import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconBtn from "../UI/IconBtn";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/appReducer";
import { AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "react-i18next";

const SidebarHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation()

  const closeMenu: MouseEventHandler = (e) => {
    dispatch(actions.setActiveMenu(false));
  };

  return (
    <header className={style.header}>
      <div className={style.close}>
        <div className={style.logo}></div>
        <IconBtn onClick={closeMenu}>
          <AiOutlineClose color="#fff" size={15} />
        </IconBtn>
      </div>
      <div className={style.auth}>
        <div className={style.authIconWrapper}>
          <AiOutlineUser color="#fff" size={25} />
        </div>
        <div className={style.authContent}>
          <div className={style.login}>
            <span className={style.signIn}>{ t("sidebar.Sign in") }</span>
            <span className={style.signUp}>{ t("sidebar.Sign up") }</span>
          </div>
          <p className={style.authText}>{ t("sidebar.auth text") }</p>
        </div>
      </div>
    </header>
  );
};

export default SidebarHeader;
