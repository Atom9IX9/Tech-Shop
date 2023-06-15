import style from "../../style/headerStyle/headerStyle.module.css";
import { MdLanguage } from "react-icons/md";
import { useState } from "react";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";
import cn from "classnames";

const Languages = () => {
  const [isActive, setIsActive] = useState(false);
  const { i18n } = useTranslation();
  const [selectedLng, setSelectedLng] = useState<lng>(i18n.language as lng);

  const changeLng = (lng: lng) => {
    i18n.changeLanguage(lng);
    setIsActive(false);
    setSelectedLng(lng);
  };

  return (
    <div>
      {!isActive ? (
        <div className={style.lngIcon} onClick={() => setIsActive(true)}>
          <MdLanguage
            size={30}
            color="#fff"
          />
          <span className={style.lngName}>{selectedLng}</span>
        </div>
      ) : (
        <ul className={style.lngSelect}>
          <li
            onClick={() => changeLng("en")}
            className={cn({
              [style.selected]: selectedLng === "en",
            })}
          >
            <Flag code="gb" size={18} />
            <span className={style.lngName}>en</span>
          </li>
          <li
            onClick={() => changeLng("ua")}
            className={cn({
              [style.selected]: selectedLng === "ua",
            })}
          >
            <Flag code="ua" size={18} />
            <span className={style.lngName}>ua</span>
          </li>
          <li
            onClick={() => changeLng("ru")}
            className={cn({
              [style.selected]: selectedLng === "ru",
            })}
          >
            <Flag code="ru" size={18} />
            <span className={style.lngName}>ru</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Languages;
export type lng = "ua" | "ru" | "en";
