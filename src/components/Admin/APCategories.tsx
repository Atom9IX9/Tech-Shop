import style_g from "style/admin/adminStyle.module.css";
import style from "style/admin/categoriesPanel.module.css";
import classNames from "classnames";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormResetField,
  useForm,
} from "react-hook-form";
import { IoTrashBinOutline } from "react-icons/io5";
import { DragEventHandler, MouseEventHandler, useState } from "react";
import { useAppDispatch } from "reducers/store";
import { createCategory } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import { getProductStatuses } from "utils/selectors/productSelectors";
import { CategoryCreateData } from "api/categoriesAPI";

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

  return (
    <div className={style_g.content}>
      <div className={classNames(style_g.APElement, style_g.contentElement)}>
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
        <div>
          {statuses.categoryCreate === undefined
            ? ""
            : statuses.categoryCreate === "success"
            ? "success"
            : statuses.categoryCreate}
        </div>
      </div>
    </div>
  );
};

function APInput<F extends FieldValues>({
  name,
  register,
  required,
  placeholder,
  reset,
}: TAPInput<F>) {
  const onReset: MouseEventHandler = (e) => {
    e.preventDefault();
    reset(name);
  };

  return (
    <div className={style_g.inputContainer}>
      <input
        className={style_g.input}
        {...register(name, { required })}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button className={style_g.inputClear} onClick={onReset}>
        <IoTrashBinOutline size={16} color="#606266" />
      </button>
    </div>
  );
}

export default APCategories;
type TAPInput<FormData extends FieldValues> = {
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  required: boolean;
  placeholder?: string;
  reset: UseFormResetField<FormData>;
  errors: FieldErrors<FormData>;
};
