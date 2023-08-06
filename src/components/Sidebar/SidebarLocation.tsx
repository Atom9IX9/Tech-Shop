import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { TLng } from "../../types/types";
import { getUserCoords } from "../../utils/getUserCoords";
import { fetchUserLocationByCoords } from "../../reducers/userReducer";
import { useAppDispatch } from "../../reducers/store";
import { User } from "../contexts/UserContext";

import { useTranslation } from "react-i18next";
import cn from "classnames";
import Flag from "react-world-flags";
import { useEffect, useContext } from "react";

const SidebarLocation = () => {
  const { t, i18n } = useTranslation("sidebar");
  const dispatch = useAppDispatch();
  const selectedLng = i18n.language;
  const { city } = useContext(User)
  
  useEffect(() => {
    getUserCoords((coords) => {
      dispatch(fetchUserLocationByCoords({coords, lng: i18n.language as TLng}));
    });
  }, [dispatch, i18n.language]);

  const changeLng = (lng: TLng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={style.location}>
      <div className={style.locationBlock}>
        <span className={style.locationTitle}>{t("language")}:</span>
        <ul className={style.lngSelect}>
          <li
            onClick={() => changeLng("en")}
            className={cn(
              {
                [style.selected]: selectedLng === "en",
              },
              style.lngBtn
            )}
          >
            <Flag code="gb" height={30} width={30} />
            <span className={style.lngName}>EN</span>
          </li>
          <li
            onClick={() => changeLng("ua")}
            className={cn(
              {
                [style.selected]: selectedLng === "ua",
              },
              style.lngBtn
            )}
          >
            <Flag code="ua" height={30} width={30} />
            <span className={style.lngName}>UA</span>
          </li>
          <li
            onClick={() => changeLng("ru")}
            className={cn(
              {
                [style.selected]: selectedLng === "ru",
              },
              style.lngBtn
            )}
          >
            <Flag code="ru" height={30} width={30} />
            <span className={style.lngName}>RU</span>
          </li>
        </ul>
      </div>
      <div className={style.locationBlock}>
        <span className={style.locationTitle}>{t("city")}:</span>
        <span>{ city }</span>
      </div>
    </div>
  );
};

export default SidebarLocation;
