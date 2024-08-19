import { APInput } from "../APInput";

import { CategoryCreateData } from "api/categoriesAPI";
import classNames from "classnames";
import { DragEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { createCategory } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import style from "style/admin/formStyle.module.css";

const CategoryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<CategoryCreateData>();
  const [icon, setIcon] = useState<File | undefined>(undefined);

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

  const { t } = useTranslation("admin");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className={style.formSubtitle}>{t("title")}</h4>
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
      <h4 className={style.formSubtitle}>{t("icon")}</h4>
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
            {t("upload")}
          </div>
        </label>
        <div className={classNames(style.iconNames, "unselectable")}>
          {!!icon && (
            <div className={style.imageName}>
              {icon?.name}
              <AiOutlineCloseCircle
                size={18}
                color="var(--red-bg-color)"
                className={style.deleteImg}
                onClick={() => {
                  setIcon(undefined);
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className={style.createBtnContainer}>
        <button type="submit" className={style.createBtn}>
          {t("create")}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
