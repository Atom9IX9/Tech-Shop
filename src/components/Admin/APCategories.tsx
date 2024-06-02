import AvCategory from "./AvCategory";
import CategoryForm from "./forms/CategoryForm";
import SubcategoryForm from "./forms/SubcategoryForm";

import style_g from "style/admin/adminStyle.module.css";
import style from "style/admin/categoriesPanel.module.css";
import style_f from "style/admin/formStyle.module.css";
import classNames from "classnames";
import { useAppDispatch } from "reducers/store";
import { fetchCategories, resetCreateStatuses } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import {
  getCategories,
  getProductStatuses,
} from "utils/selectors/productSelectors";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const APCategories = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation("admin");
  const statuses = useSelector(getProductStatuses);
  const categories = useSelector(getCategories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);
  useEffect(() => {
    dispatch(resetCreateStatuses());
  }, [dispatch]);

  return (
    <div className={style_g.content}>
      <div
        className={classNames(style_g.APElement, style_g.contentElement, {
          [style_f.success]: statuses.categoryCreate === "success",
          [style_f.error]:
            statuses.categoryCreate && statuses.categoryCreate !== "success",
        })}
      >
        <h3 className={style_f.windowName}>{t("creatingCategory")}</h3>
        <CategoryForm />
        <div className={style.statusCodeContainer}>
          <div className={style_f.statusCode}>
            {statuses.categoryCreate === undefined
              ? ""
              : statuses.categoryCreate === "success"
              ? t("success")
              : t("err/" + statuses.categoryCreate)}
          </div>
        </div>
      </div>
      <div className={classNames(style_g.APElement, style_g.contentElement)}>
        <h3 className={style_f.windowName}>{t("availableCategory")}</h3>
        <div>
          {categories.length
            ? categories.map((category) => <AvCategory category={category} />)
            : t("noCategoriesHere")}
        </div>
      </div>
      <SubcategoryForm categories={categories} />
    </div>
  );
};

export default APCategories;
