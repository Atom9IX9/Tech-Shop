import AvCategory from "./AvCategory";
import { APInput } from "./APInput";

import style_g from "style/admin/adminStyle.module.css";
import style from "style/admin/categoriesPanel.module.css";
import classNames from "classnames";
import {
  useForm,
} from "react-hook-form";
import { DragEventHandler, useState } from "react";
import { useAppDispatch } from "reducers/store";
import { createCategory, fetchCategories } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import {
  getCategories,
  getProductStatuses,
} from "utils/selectors/productSelectors";
import { CategoryCreateData } from "api/categoriesAPI";
import { useEffect } from "react";

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

  return (
    <div className={style_g.content}>
      <div
        className={classNames(style_g.APElement, style_g.contentElement, {
          [style.success]: statuses.categoryCreate === "success",
        })}
      >
        <h3 className={style.windowName}>Creating category</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className={style.formSubtitle}>Title</h4>
          <ol className={style.inputs}>
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
          <h4 className={style.formSubtitle}>Icon</h4>
          <div
            className={classNames(style.fileUpload, { [style.drag]: isDrag })}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragStartHandler}
            onDrop={dropHandler}
          >
            <label>
              <input
                className={classNames(style.fileUploadInp, "unselectable")}
                type="file"
                {...register("icon", {
                  onChange: (e) => setIcon(e.target.files[0]),
                })}
                disabled={!!icon}
              />
              <div
                className={classNames(style.fileUploadBtn, {
                  [style.disabled]: !!icon,
                })}
              >
                upload
              </div>
            </label>
            <div className={classNames(style.iconName, "unselectable")}>
              {icon?.name}
            </div>
          </div>
          <button type="submit" className={style.createBtn}>
            Create
          </button>
        </form>
        <div className={style.statusCode}>
          {statuses.categoryCreate === undefined
            ? ""
            : statuses.categoryCreate === "success"
            ? "success"
            : statuses.categoryCreate}
        </div>
      </div>
      <div className={classNames(style_g.APElement, style_g.contentElement)}>
        <h3 className={style.windowName}>Available categories</h3>
        <div>
          {categories.map((category) => (
            <AvCategory category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default APCategories;

