import { useTranslation } from "react-i18next";
import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { TLng } from "../../types/types";
import cn from "classnames";
import Flag from "react-world-flags";
import { useEffect } from "react";
import { getUserCoords } from "../../utils/getUserCoords";
import { fetchUserCity } from "../../reducers/userReducer";
import { useAppDispatch } from "../../reducers/store";

const SidebarLocation = () => {
  const { t, i18n } = useTranslation("sidebar");
  const dispatch = useAppDispatch()
  const selectedLng = i18n.language;

  useEffect(() => {
    getUserCoords((coords) => {
      dispatch(fetchUserCity(coords))
    })
  }, [dispatch])

  const changeLng = (lng: TLng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className={style.location}>
      <div className={style.languages}>
        <span className={style.lngSectionTitle}>{ t("language") }:</span>
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
    </div>
  );
};

export default SidebarLocation;
