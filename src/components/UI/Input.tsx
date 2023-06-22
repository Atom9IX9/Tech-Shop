import { FC } from "react";
import style from "../../style/UI/signUpInp.module.css";
import { UseFormRegister } from "react-hook-form/dist/types";
import { TValidationFn } from "../../utils/validation/login";
import { useTranslation } from "react-i18next";

const Input: FC<TProps> = ({
  type,
  name,
  register,
  required = false,
  validate,
  errors,
}) => {
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
          {validate && <div>{errors[name] && t(errors[name].message)}</div>}
        </span>
      </label>
    </div>
  );
};

export default Input;
type TProps = {
  type?: "text" | "password" | "number";
  name: "email" | "password" | "name" | "surname" | "number";
  register: UseFormRegister<any>;
  required?: boolean;
  validate?: { [key: string]: TValidationFn };
  errors?: any;
};
