import { useTranslation } from "react-i18next";
import style from "../../style/sidebarStyle/sidebarInfo.module.css";
import SbLink from "../UI/SidebarLink";

const SidebarInfo = () => {
  const { t } = useTranslation("sidebar");

  return (
    <>
      <div className={style.infoSection}>
        <span className={style.infoTitle}>{t("aboutCompany")}</span>
        <SbLink to="about">{t("about") as string}</SbLink>
      </div>
    </>
  );
};

export default SidebarInfo;
