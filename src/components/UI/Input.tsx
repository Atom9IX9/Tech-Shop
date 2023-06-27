import style from "../../style/UI/Input.module.css";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form/dist/types";
import { TValidationFn } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";
import cn from "classnames";
import { CgDanger } from "react-icons/cg";

function Input<F extends FieldValues>({
  type,
  name,
  register,
  required = false,
  validate,
  errors,
  touched = false,
  isDirty = false,
}: TProps<F>) {
  const { t } = useTranslation("auth");

  return (
    <div
      className={cn(style.inputWrapper, {
        [style.inputErr]: errors[name] || errors.root,
      })}
    >
      <label className={style.fieldLabel}>
        {type !== "checkbox" && (
          <>
            <div className={style.label}>{t(`fields/${name}`)}</div>
            <div className={style.inputBody}>
              <input
                type={type}
                {...register(name, { required, validate })}
                className={style.input}
              />
              {(errors[name] || errors.root) && <CgDanger color="red" size={20} />}
            </div>
          </>
        )}
        {type === "checkbox" && (
          <>
            <div className={style.checkboxWrap}>
              <div className={style.label}>{t(`fields/${name}`)}</div>
              <input
                className={style.checkbox}
                type={type}
                {...register(name, { required, validate })}
              />
            </div>
          </>
        )}
        <div className={style.message}>
          {validate &&
            errors &&
            errors[name] &&
            t(errors[name]?.message as string)}
          {((touched && required && !errors[name]?.message) ||
            errors[name]?.type === "required") &&
            !isDirty &&
            t(`touched/${name}`)}
        </div>
      </label>
    </div>
  );
}

export default Input;
type TProps<T extends FieldValues> = {
  type?: "text" | "password" | "number" | "checkbox";
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  validate?: { [key: string]: TValidationFn };
  errors: FieldErrors<T>;
  touched?: boolean;
  isDirty?: boolean;
};
