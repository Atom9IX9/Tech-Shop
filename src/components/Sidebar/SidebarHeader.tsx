import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import IconBtn from "../UI/IconBtn";
import { setActiveMenu } from "../../reducers/appReducer";
import { User } from "../contexts/UserContext";

import { AiOutlineClose } from "react-icons/ai";
import { MouseEventHandler, useContext } from "react";
import { useDispatch } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const SidebarHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "sidebar"]);
  const { name, surname, email, role } = useContext(User);

  const closeMenu: MouseEventHandler = (e) => {
    dispatch(setActiveMenu(false));
  };

  return (
    <header className={style.header}>
      <div className={style.close}>
        <NavLink to="/" onClick={closeMenu}>
          <div className={style.logo}></div>
        </NavLink>
        <IconBtn onClick={closeMenu}>
          <AiOutlineClose color="#fff" size={15} />
        </IconBtn>
      </div>
      <div className={style.auth}>
        {role === "GUEST" ? (
          <>
            <div className={style.authIconWrapper}>
              <AiOutlineUser color="#fff" size={25} />
            </div>
            <div className={style.userInfo}>
              <div className={style.login}>
                <NavLink to="sign-in" onClick={closeMenu}>
                  <span className={style.signIn}>{t("common:signIn")}</span>
                </NavLink>
                <NavLink to="sign-up" onClick={closeMenu}>
                  <span className={style.signUp}>{t("common:signUp")}</span>
                </NavLink>
              </div>
              <p className={style.authText}>{t("sidebar:authText")}</p>
            </div>
          </>
        ) : (
          <NavLink
            to="profile"
            className={style.profileLink}
            onClick={closeMenu}
          >
            <div className={style.authIconWrapper}>
              <div className={style.userLetter}>
                {name && name[0]}
              </div>
            </div>
            <div className={style.userInfo}>
              <p className={style.userInfoDName}>{name} {surname}</p>
              <p className={style.userInfoEmail}>{email}</p>
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default SidebarHeader;
