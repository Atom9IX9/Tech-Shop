import { User } from "components/contexts/UserContext";
import style from "style/homeStyle/sidebar.module.css";
import { MouseEventHandler, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RedLink from "components/UI/RedLink";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "reducers/store";
import { signOutUser } from "reducers/userReducer";
import { resetLikedProducts } from "reducers/productsReducer";
import { setActiveMenu, setDialog } from "reducers/appReducer";

const HomeCategoriesAsideProfile = () => {
  const { name, surname, email } = useContext(User);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["sidebar", "common"]);

  const signOut: MouseEventHandler = (e) => {
    dispatch(signOutUser());
    dispatch(resetLikedProducts());
    dispatch(setActiveMenu(false));
  };

  return (
    <div className={style.profile}>
      <div className={style.userInf} onClick={() => navigate("/profile")}>
        <div className={style.icon}>
          <div className={style.letter}>{name ? name[0] : ""}</div>
        </div>
        <div>
          <div className={style.userDisplayName}>{name + " " + surname}</div>
          <div className={style.userEmail}>{email}</div>
        </div>
      </div>
      <div className={style.userLinks}>
        <RedLink textStyle="underline">{t("sidebar:myWallet")}</RedLink>
        <RedLink
          textStyle="underline"
          onClick={() => dispatch(setDialog({ name: "basket", value: true }))}
        >
          {t("sidebar:basket")}
        </RedLink>
        <RedLink textStyle="underline">{t("sidebar:viewed")}</RedLink>
        <RedLink textStyle="underline">{t("sidebar:myReviews")}</RedLink>
        <RedLink onClick={signOut} textStyle="underline">
          {t("common:signOut")}
        </RedLink>
      </div>
    </div>
  );
};

export default HomeCategoriesAsideProfile;
