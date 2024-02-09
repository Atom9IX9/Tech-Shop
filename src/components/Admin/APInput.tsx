import style_g from "style/admin/adminStyle.module.css";
import { IoTrashBinOutline } from "react-icons/io5";
import { MouseEventHandler } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormResetField,
} from "react-hook-form";

export function APInput<F extends FieldValues>({
  name,
  register,
  required,
  placeholder,
  reset,
  type
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
        type={type || "text"}
      />
      <button className={style_g.inputClear} onClick={onReset}>
        <IoTrashBinOutline size={16} color="#606266" />
      </button>
    </div>
  );
}

export type TAPInput<FormData extends FieldValues> = {
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  required: boolean;
  placeholder?: string;
  reset: UseFormResetField<FormData>;
  errors: FieldErrors<FormData>;
  type?: "number"
};
