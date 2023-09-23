import { User } from "components/contexts/UserContext";
import style from "style/homeStyle/sidebar.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RedLink from "components/UI/RedLink";
import { useTranslation } from "react-i18next";

const HomeCategoriesAsideProfile = () => {
  const { name, surname, email } = useContext(User);
  const navigate = useNavigate()
  const { t } = useTranslation(["sidebar", "common"])

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
        <RedLink textStyle="underline">{t("sidebar:basket")}</RedLink>
        <RedLink textStyle="underline">{t("sidebar:viewed")}</RedLink>
        <RedLink textStyle="underline">{t("sidebar:myReviews")}</RedLink>
        <RedLink textStyle="underline">{t("common:signOut")}</RedLink>
      </div>
    </div>
  );
};

export default HomeCategoriesAsideProfile;
