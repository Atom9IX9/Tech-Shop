import { APInput, APSelect } from "../APInput";

import style_g from "style/admin/adminStyle.module.css";
import { TMainCategory, TSubcategoryCreateData } from "api/categoriesAPI";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  createSubcategory,
  resetCreateStatuses,
} from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import style from "style/admin/formStyle.module.css";
import { TChildren, TLng } from "types/types";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { getProductStatuses } from "utils/selectors/productSelectors";
import { useEffect } from "react";

const SubcategoryForm: React.FC<TSubcategoryFormProps> = ({
  categories,
  disableSelect,
  defaultSelectValue,
  defaultSelectInpValue,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    getValues,
  } = useForm<TSubcategoryCreateData>();
  const dispatch = useAppDispatch();
  const submitHandler = (data: TSubcategoryCreateData) => {
    dispatch(createSubcategory(data));
  };

  const statuses = useSelector(getProductStatuses);

  useEffect(() => {
    if (onSuccess && statuses.subcategoryCreate === "success") {
      onSuccess({ ...getValues() });
      return () => {
        dispatch(resetCreateStatuses());
      };
    }
  }, [onSuccess, statuses.subcategoryCreate, dispatch, getValues]);

  const { t, i18n } = useTranslation("admin");

  return (
    <div
      className={classNames(style_g.APElement, style_g.contentElement, {
        [style.success]: statuses.subcategoryCreate === "success",
        [style.error]:
          statuses.subcategoryCreate &&
          statuses.subcategoryCreate !== "success",
      })}
    >
      <h3 className={style.windowName}>{t("creatingSubcategory")}</h3>

      <form onSubmit={handleSubmit(submitHandler)}>
        <h4 className={style.formSubtitle}>{t("category")}</h4>
        <div style={{ width: 400 }}>
          <APSelect<TSubcategoryCreateData>
            name="categoryCode"
            setValue={setValue}
            options={categories.map((c) => {
              return { label: c[i18n.language as TLng], value: c.code };
            })}
            defaultValue={defaultSelectValue}
            placeholder={t("select") as string}
            disabled={disableSelect}
            defaultSelectInpValue={defaultSelectInpValue}
          />
        </div>
        <h4 className={style.formSubtitle}>{t("title")}</h4>
        <ol className={style.inputs}>
          <li>
            <APInput<TSubcategoryCreateData>
              errors={errors}
              name="en"
              register={register}
              required={true}
              placeholder="en"
              reset={resetField}
            />
          </li>
          <li>
            <APInput<TSubcategoryCreateData>
              errors={errors}
              name="ua"
              register={register}
              required={true}
              placeholder="ua"
              reset={resetField}
            />
          </li>
          <li>
            <APInput<TSubcategoryCreateData>
              errors={errors}
              name="ru"
              register={register}
              required={true}
              placeholder="ru"
              reset={resetField}
            />
          </li>
        </ol>

        <div className={style.createBtnContainer}>
          <SubmitBtn>{t("create") as string}</SubmitBtn>
        </div>
      </form>
      <div className={style.statusCodeContainer}>
        <div className={style.statusCode}>
          {statuses.subcategoryCreate === undefined
            ? ""
            : statuses.subcategoryCreate === "success"
            ? t("success")
            : t("err/" + statuses.subcategoryCreate)}
        </div>
      </div>
    </div>
  );
};

export const SubmitBtn: React.FC<{children: TChildren}> = ({children}) => {
  return (
    <button type="submit" className={style.createBtn}>
      {children}
    </button>
  );
};

export default SubcategoryForm;
type TSubcategoryFormProps = {
  categories: TMainCategory[];
  disableSelect?: boolean;
  defaultSelectValue?: string;
  defaultSelectInpValue?: string;
  onSuccess?: (values: TSubcategoryCreateData) => void;
};
