import IconBtn from "../UI/IconBtn";

import style from "style/headerStyle/headerStyle.module.css";
import { MdLanguage } from "react-icons/md";
import { useState } from "react";
import Flag from "react-world-flags";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { TLng } from "types/types";

const Languages = () => {
  const [isActive, setIsActive] = useState(false);
  const { i18n } = useTranslation();
  const selectedLng = i18n.language as TLng; 

  const changeLng = (lng: TLng) => {
    i18n.changeLanguage(lng);
    setIsActive(false);
  };

  return (
    <div>
      {!isActive ? (
        <div className={style.lngIcon}>
          <IconBtn onClick={() => setIsActive(true)}>
            <div style={{display: "flex", alignItems: "center"}}>
              <MdLanguage size={30} color="#fff" />
              <span className={style.lngName}>
                {selectedLng}
              </span>
            </div>
          </IconBtn>
        </div>
      ) : (
        <ul className={style.lngSelect}>
          <li
            onClick={() => changeLng("en")}
            className={cn({
              [style.selected]: selectedLng === "en",
            })}
          >
            <Flag code="gb" height={20} width={18} />
            <span className={style.lngName}>en</span>
          </li>
          <li
            onClick={() => changeLng("ua")}
            className={cn({
              [style.selected]: selectedLng === "ua",
            })}
          >
            <Flag code="ua" height={20} width={18} />
            <span className={style.lngName}>ua</span>
          </li>
          <li
            onClick={() => changeLng("ru")}
            className={cn({
              [style.selected]: selectedLng === "ru",
            })}
          >
            <Flag code="ru" height={20} width={18} />
            <span className={style.lngName}>ru</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Languages;