import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconBtn from "../UI/IconBtn";
import { MouseEventHandler, useContext } from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../reducers/appReducer";
import { AiOutlineUser } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { User } from "../contexts/UserContext";

const SidebarHeader = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["common", "sidebar"]);
  const { displayName, isAuth, email } = useContext(User);

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
        {!isAuth ? (
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
                {displayName && displayName[0]}
              </div>
            </div>
            <div className={style.userInfo}>
              <p className={style.userInfoDName}>{displayName}</p>
              <p className={style.userInfoEmail}>{email}</p>
            </div>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default SidebarHeader;
