import style_g from "style/admin/adminStyle.module.css";
import style from "style/admin/categoriesPanel.module.css";
import classNames from "classnames";
import { FieldValues, Path, UseFormRegister, useForm } from "react-hook-form";
import { IoTrashBinOutline } from "react-icons/io5";

const APCategories = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <div className={style_g.content}>
      <div className={classNames(style_g.APElement, style_g.contentElement)}>
        <h3 className={style.windowName}>Creating category</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className={style.formSubtitle}>Title</h4>
          <ol className={style.inputs}>
            <li>
              <APInput<FormValues>
                name="en"
                register={register}
                required={true}
                placeholder="en"
              />
            </li>
            <li>
              <APInput<FormValues>
                name="ua"
                register={register}
                required={true}
                placeholder="ua"
              />
            </li>
            <li>
              <APInput<FormValues>
                name="ru"
                register={register}
                required={true}
                placeholder="ru"
              />
            </li>
          </ol>
          <h4 className={style.formSubtitle}>Icon</h4>
          <div className={style.fileUpload}>
            <button className={style.fileUploadBtn} onClick={(e) => {e.preventDefault()}}>upload</button>
          </div>
          <button type="submit" className={style.createBtn}>Create</button>
        </form>
      </div>
    </div>
  );
};

function APInput<F extends FieldValues>({
  name,
  register,
  required,
  placeholder,
}: TAPInput<F>) {
  return (
    <div className={style_g.inputContainer}>
      <input
        className={style_g.input}
        {...register(name, { required })}
        placeholder={placeholder}
        autoComplete="off"
      />
      <button
        className={style_g.inputClear}
        onClick={(e) => e.preventDefault()}
      >
        <IoTrashBinOutline size={16} color="#606266" />
      </button>
    </div>
  );
}

export default APCategories;
type TAPInput<FormData extends FieldValues> = {
  name: Path<FormData>;
  register: UseFormRegister<FormData>;
  required: boolean;
  placeholder?: string;
};
type FormValues = {
  en: string;
  ua: string;
  ru: string;
};
