import style from "../../style/sidebarStyle/sidebarInfo.module.css";
import SbLink from "../UI/SidebarLink";
import instIcon from "../../assets/img/instagram.png";
import githubIcon from "../../assets/img/github.png";
import tgIcon from "../../assets/img/telegram.png";

import { useTranslation } from "react-i18next";
import { useAppDispatch } from "reducers/store";
import { setDialog } from "reducers/appReducer";

const SidebarInfo = () => {
  const { t } = useTranslation(["sidebar", "common"]);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className={style.infoSection}>
        <span className={style.infoTitle}>{t("aboutCompany")}</span>
        <SbLink to="about">{t("common:about") as string}</SbLink>
        <SbLink to="contacts">{t("contacts") as string}</SbLink>
        <SbLink
          onClick={() =>
            dispatch(setDialog({ name: "catalogue", value: true }))
          }
          to="#"
        >
          {t("allCategories") as string}
        </SbLink>
      </div>
      <hr />
      <div className={style.infoSection}>
        <span className={style.infoTitle}>{t("socialNetworks")}</span>
        <ul className={style.socialNetworks}>
          <li>
            <a href="https://www.instagram.com/">
              <img src={instIcon} alt="inst" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Atom9IX9/Tech-Shop">
              <img src={githubIcon} alt="github" />
            </a>
          </li>
          <li>
            <a href="https://web.telegram.org">
              <img src={tgIcon} alt="inst" />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SidebarInfo;
