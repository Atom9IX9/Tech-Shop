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
import { RiEyeLine } from "react-icons/ri";
import { useState } from "react";
import { RiEyeOffLine } from "react-icons/ri";

function Input<F extends FieldValues>({
  type,
  name,
  register,
  required = false,
  validate,
  errors,
  touched = false,
  isDirty = false,
  autoComplete = "new",
  maxLength = 0,
}: TProps<F>) {
  const { t } = useTranslation("auth");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
              {type === "number" && (
                <div className={style.countryPhone}>+38</div>
              )}
              <input
                type={
                  type !== "password" ? type : isPasswordHidden ? type : "text"
                }
                {...register(name, { required, validate })}
                className={style.input}
                autoComplete={autoComplete}
                autoSave={autoComplete}
                onInput={(e) => {
                  if (maxLength) {
                    const value = e.currentTarget.value;
                    if (value.length > maxLength) {
                      e.currentTarget.value = value.slice(0, maxLength);
                    }
                  }
                }}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                  className={style.showPassword}
                >
                  {isPasswordHidden ? (
                    <RiEyeLine size={20} color="#666666" />
                  ) : (
                    <RiEyeOffLine size={20} color="#666666" />
                  )}
                </button>
              )}
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
  autoComplete?: "on" | "off" | "new";
  maxLength?: number;
};
