import { FC, useEffect } from "react";
import style from "../../style/UI/signUpInp.module.css"
import { UseFormRegister } from "react-hook-form/dist/types";
import { TValidationFn } from "../../utils/validation/login";

const Input: FC<TProps> = ({ type, name, register, required, validate, errors }) => {
  return (
    <div>
      <input type={type} {...register(name, { required, validate })} className={style.signUpInp} />
      {validate && <div>{errors[name] && errors[name].message}</div>}
    </div>
  );
};

export default Input;
type TProps = {
  type: "text" | "password";
  name: "email" | "password";
  register: UseFormRegister<any>;
  required: boolean;
  validate?: {[key: string]: TValidationFn}
  errors?: any
};
