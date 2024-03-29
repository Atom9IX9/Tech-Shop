import AvCategory from "./AvCategory";
import { APInput } from "./APInput";

import style_g from "style/admin/adminStyle.module.css";
import style from "style/admin/categoriesPanel.module.css";
import style_f from "style/admin/formStyle.module.css";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { DragEventHandler, useState } from "react";
import { useAppDispatch } from "reducers/store";
import { createCategory, fetchCategories, resetCreateStatuses } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import {
  getCategories,
  getProductStatuses,
} from "utils/selectors/productSelectors";
import { CategoryCreateData } from "api/categoriesAPI";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const APCategories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<CategoryCreateData>();
  const statuses = useSelector(getProductStatuses);
  const dispatch = useAppDispatch();
  const onSubmit = (data: CategoryCreateData) => {
    dispatch(createCategory({ ...data, icon: icon }));
  };
  const { t } = useTranslation("admin");

  const [isDrag, setIsDrag] = useState(false);
  const dragStartHandler: DragEventHandler = (e) => {
    e.preventDefault();
    if (!icon) setIsDrag(true);
  };
  const dragLeaveHandler: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
  };
  const dropHandler: DragEventHandler = (e) => {
    e.preventDefault();
    setIcon(e.dataTransfer.files[0]);
    setIsDrag(false);
  };

  const [icon, setIcon] = useState<File | undefined>(undefined);

  const categories = useSelector(getCategories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);
  useEffect(() => {
    dispatch(resetCreateStatuses())
  }, [dispatch])

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className={style_f.formSubtitle}>{t("title")}</h4>
          <ol className={style_f.inputs}>
            <li>
              <APInput<CategoryCreateData>
                errors={errors}
                name="en"
                register={register}
                required={true}
                placeholder="en"
                reset={resetField}
              />
            </li>
            <li>
              <APInput<CategoryCreateData>
                errors={errors}
                name="ua"
                register={register}
                required={true}
                placeholder="ua"
                reset={resetField}
              />
            </li>
            <li>
              <APInput<CategoryCreateData>
                errors={errors}
                name="ru"
                register={register}
                required={true}
                placeholder="ru"
                reset={resetField}
              />
            </li>
          </ol>
          <h4 className={style_f.formSubtitle}>{t("icon")}</h4>
          <div
            className={classNames(style_f.fileUpload, { [style.drag]: isDrag })}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            onDrop={dropHandler}
          >
            <label>
              <input
                className={classNames(style_f.fileUploadInp, "unselectable")}
                type="file"
                {...register("icon", {
                  onChange: (e) => setIcon(e.target.files[0]),
                })}
                disabled={!!icon}
              />
              <div
                className={classNames(style_f.fileUploadBtn, {
                  [style.disabled]: !!icon,
                })}
              >
                {t("upload")}
              </div>
            </label>
            <div className={classNames(style_f.iconNames, "unselectable")}>
              {icon?.name}
            </div>
          </div>
          <div className={style.createBtnContainer}>
            <button type="submit" className={style_f.createBtn}>
              {t("create")}
            </button>
          </div>
        </form>
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
          {categories.length ? categories.map((category) => (
            <AvCategory category={category} />
          )) : t("noCategoriesHere")}
        </div>
      </div>
    </div>
  );
};

export default APCategories;
