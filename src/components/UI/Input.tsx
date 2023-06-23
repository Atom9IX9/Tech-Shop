import style from "../../style/UI/signUpInp.module.css";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form/dist/types";
import { TValidationFn } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";

function Input<F extends FieldValues>({
  type,
  name,
  register,
  required = false,
  validate,
  errors,
}: TProps<F>) {
  const { t } = useTranslation("auth");

  return (
    <div>
      <label>
        <span>{t(`fields/${name}`)}</span>
        <input
          type={type}
          {...register(name, { required, validate })}
          className={style.signUpInp}
        />
        <span>
          {validate && errors && errors[name] && (
            <div>{t(errors[name]?.message as string)}</div>
          )}
        </span>
      </label>
    </div>
  );
}

export default Input;
type TProps<T extends FieldValues> = {
  type?: "text" | "password" | "number";
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
  validate?: { [key: string]: TValidationFn };
  errors?: FieldErrors<T>;
};
