import { APInput, APSelect } from "./APInput";

import pStyle from "style/admin/productsPanel.module.css";
import fStyle from "style/admin/formStyle.module.css";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { TProductCreateData } from "api/productsAPI";
import { useSelector } from "react-redux";
import {
  getCategories,
  getProductStatuses,
} from "utils/selectors/productSelectors";
import { useAppDispatch } from "reducers/store";
import {
  createProduct,
  fetchCategories,
  resetCreateStatuses,
} from "reducers/productsReducer";
import { ChangeEvent, DragEventHandler, useEffect, useState } from "react";
import style_g from "style/admin/adminStyle.module.css";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const APProducts = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    resetField,
  } = useForm<TProductCreateData>({
    defaultValues: {
      category: "",
      en: "",
      ua: "",
      ru: "",
      price: "",
    },
  });
  const statuses = useSelector(getProductStatuses);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: TProductCreateData) => {
    dispatch(
      createProduct({
        data: { ...data, imgs: images },
        afterCreate: (product) => {
          navigate(`/product/${product.id}`);
        },
      })
    );
  };

  const [isDrag, setIsDrag] = useState(false);
  const dragStartHandler: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };
  const dragLeaveHandler: DragEventHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
  };
  const dropHandler: DragEventHandler = (e) => {
    e.preventDefault();
    setImages([...(images || []), ...Array.from(e.dataTransfer.files || [])]);
    setIsDrag(false);
  };

  const categories = useSelector(getCategories);

  const { t, i18n } = useTranslation("admin");

  const [images, setImages] = useState<File[] | undefined>(undefined);

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
        className={classNames(style_g.APElement, style_g.doubleContentElement, {
          [fStyle.success]: statuses.productCreate === "success",
          [fStyle.error]:
            statuses.productCreate !== undefined &&
            statuses.productCreate !== "success",
        })}
      >
        <h3 className={fStyle.windowName}>{t("creatingProduct")}</h3>
        <form className={pStyle.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={pStyle.formWrapper}>
            <div>
              <h4 className={fStyle.formSubtitle}>{t("title")}</h4>
              <ol className={fStyle.inputs}>
                <li>
                  <APInput<TProductCreateData>
                    errors={errors}
                    name="en"
                    register={register}
                    required={true}
                    placeholder="en"
                    reset={resetField}
                  />
                </li>
                <li>
                  <APInput<TProductCreateData>
                    errors={errors}
                    name="ua"
                    register={register}
                    required={true}
                    placeholder="ua"
                    reset={resetField}
                  />
                </li>
                <li>
                  <APInput<TProductCreateData>
                    errors={errors}
                    name="ru"
                    register={register}
                    required={true}
                    placeholder="ru"
                    reset={resetField}
                  />
                </li>
                <h4 className={fStyle.formSubtitle}>{t("price")}</h4>
                <li>
                  <APInput<TProductCreateData>
                    errors={errors}
                    name="price"
                    register={register}
                    required={true}
                    placeholder="₴"
                    reset={resetField}
                    type="number"
                  />
                </li>
              </ol>
              <h4 className={fStyle.formSubtitle}>{t("category")}</h4>
              <APSelect<TProductCreateData>
                options={categories.map((c) => ({
                  value: c.code,
                  label: c[i18n.language as TLng],
                }))}
                name="category"
                setValue={setValue}
                placeholder={t("select") as string}
              />
            </div>
            <div>
              <h4 className={fStyle.formSubtitle}>{t("image")}</h4>
              <div
                className={classNames(fStyle.fileUpload, pStyle.fileUpload, {
                  [fStyle.drag]: isDrag,
                })}
                onDragLeave={dragLeaveHandler}
                onDragOver={dragStartHandler}
                onDrop={dropHandler}
              >
                <label>
                  <input
                    className={classNames(fStyle.fileUploadInp, "unselectable")}
                    type="file"
                    {...register("imgs", {
                      onChange: (e: ChangeEvent<HTMLInputElement>) =>
                        setImages([
                          ...(images || []),
                          ...Array.from(e.target.files || []),
                        ]),
                    })}
                  />
                  <div className={fStyle.fileUploadBtn}>{t("upload")}</div>
                </label>
                <div className={classNames(fStyle.iconNames, "unselectable")}>
                  {Array.from(images || [])?.map((i, index) => {
                    if (index > 3) return <></>;
                    return (
                      <div className={fStyle.imageName}>
                        {i.name}{" "}
                        <AiOutlineCloseCircle
                          size={18}
                          color="var(--red-bg-color)"
                          className={fStyle.deleteImg}
                          onClick={() => {
                            setImages(
                              images?.filter((image) => image.name !== i.name)
                            );
                          }}
                        />
                      </div>
                    );
                  })}
                  {images && images?.length > 4 && (
                    <div>and {images?.length - 4} else</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={classNames(fStyle.createBtn, pStyle.createBtn)}
          >
            {t("create")}
          </button>
        </form>
        <div className={pStyle.statusCodeContainer}>
          <div className={fStyle.statusCode}>
            {statuses.productCreate === undefined
              ? ""
              : statuses.productCreate === "success"
              ? t("success")
              : t("err/" + statuses.productCreate)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default APProducts;
