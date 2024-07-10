import style from "style/headerStyle/headerStyle.module.css";
import { TbCategory2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "reducers/store";
import { setDialog } from "reducers/appReducer";

const CatalogBtn = () => {
  const { t } = useTranslation("header");
  const dispatch = useAppDispatch();

  return (
    <div
      className={style.catalogueBtn}
      onClick={() => dispatch(setDialog({ name: "catalogue", value: true }))}
    >
      <div>
        <TbCategory2 color="#FF66C4" size={30} />
      </div>
      <span className={style.headerLabel}>{t("catalogue")}</span>
    </div>
  );
};

export default CatalogBtn;
