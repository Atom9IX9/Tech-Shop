import style_f from "style/admin/formStyle.module.css";
import { IoTrashBinOutline } from "react-icons/io5";
import { FormEventHandler, MouseEventHandler } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
} from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";

export function APInput<F extends FieldValues>({
  name,
  register,
  required,
  placeholder,
  reset,
  type,
}: TAPInput<F>) {
  const onReset: MouseEventHandler = (e) => {
    e.preventDefault();
    reset(name);
  };

  return (
    <div className={style_f.inputContainer}>
      <input
        className={style_f.input}
        {...register(name, { required })}
        placeholder={placeholder}
        autoComplete="off"
        type={type || "text"}
      />
      <button className={style_f.inputClear} type="button" onClick={onReset}>
        <IoTrashBinOutline size={16} color="#606266" />
      </button>
    </div>
  );
}

const animatedComponents = makeAnimated();

export function APSelect<F extends FieldValues>({
  options,
  name,
  setValue,
  placeholder,
}: TAPSelect<F>) {
  return (
    //@ts-ignore
    <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
      options={options}
      //@ts-ignore
      onChange={(newValue) => setValue(name, newValue.value)}
      placeholder={placeholder}
      styles={{
        control: (base) => ({
          ...base,
          borderRadius: 0,
        }),
      }}
    />
  );
}

export function APTxtArea<F extends FieldValues>({
  errors,
  name,
  register,
  required,
  reset,
}: TAPTxtArea<F>) {
  const autoGrow: FormEventHandler<HTMLTextAreaElement> = (e) => {
    e.currentTarget.style.height = "5px";
    e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
  };

  return (
    <div className={style_f.textareaContainer}>
      <textarea
        {...register(name, { required })}
        className={style_f.textarea}
        onChange={autoGrow}
      ></textarea>
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
  type?: "number";
};
export type TAPTxtArea<FormData extends FieldValues> = {
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  required: boolean;
  reset: UseFormResetField<FormData>;
  errors: FieldErrors<FormData>;
};
export type TAPSelect<FormData extends FieldValues> = {
  options: TOption[];
  name: Path<FormData>;
  setValue: UseFormSetValue<FormData>;
  placeholder?: string;
};
type TOption = {
  value: string;
  label: string;
};
