import { FC } from "react";
import style from "../../style/UI/signUpInp.module.css"
import { UseFormRegister } from "react-hook-form/dist/types";

const Input: FC<TProps> = ({ type, name, register, required }) => {
  return (
    <div>
      <input type={type} {...register(name, { required })} className={style.signUpInp} />
    </div>
  );
};

export default Input;
type TProps = {
  type: "text" | "password";
  name: "email" | "password";
  register: UseFormRegister<any>;
  required: boolean;
};
