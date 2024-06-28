import style from "style/UI/Input.module.css";
import { TValidationFn } from "types/types";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form/dist/types";
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
  autoComplete = "off",
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
                autoComplete={autoComplete}
                autoSave={autoComplete}
              />
              {(errors[name] || errors.root) && (
                <CgDanger color="red" size={20} />
              )}
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
                onChange={(e) => (e.target.value = e.target.value.trim())}
              />
            </div>
          </>
        )}
        <div className={style.message}>
          {errors && errors[name] && t(errors[name]?.message as string)}
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
  autoComplete?: "on" | "off";
};
