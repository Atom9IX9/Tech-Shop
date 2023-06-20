import { TbCategory2 } from "react-icons/tb";
import style from "../../style/headerStyle/headerStyle.module.css";
import { useTranslation } from "react-i18next";

const CatalogBtn = () => {
  const { t } = useTranslation("header");

  return (
    <div className={style.catalogueBtn}>
      <div>
        <TbCategory2 color="#FF66C4" size={30} />
      </div>
      <span className={style.headerLabel}>{t("catalogue")}</span>
    </div>
  );
};

export default CatalogBtn;
