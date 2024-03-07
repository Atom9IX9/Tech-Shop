import productsAPI, { TDescriptionData } from "api/productsAPI";
import { APTxtArea } from "components/Admin/APInput";
import { useForm } from "react-hook-form";
import aStyle from "style/admin/adminStyle.module.css";
import fStyle from "style/admin/formStyle.module.css";
import style from "style/productStyle/productPage.module.css";

const DescriptionForm: React.FC<TProps> = ({productId, closeForm}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<TDescriptionData>();

  const onSubmit = (data: TDescriptionData) => {
    productsAPI.updateDescription(data, productId).then(() => closeForm())
  };

  return (
    <div className={aStyle.APElement} style={{ minHeight: 500 }}>
      <h3 className={fStyle.windowName}>Description</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.lngDescriptionContainer}>
          <h4 className={fStyle.formSubtitle}>en</h4>
          <APTxtArea<TDescriptionData>
            name="en"
            errors={errors}
            register={register}
            required={true}
            reset={resetField}
          />
        </div>
        <div className={style.lngDescriptionContainer}>
          <h4
            className={fStyle.formSubtitle}
          >
            ua
          </h4>
          <APTxtArea<TDescriptionData>
            name="ua"
            errors={errors}
            register={register}
            required={true}
            reset={resetField}
          />
        </div>
        <div className={style.lngDescriptionContainer}>
          <h4
            className={fStyle.formSubtitle}
          >
            ru
          </h4>
          <APTxtArea<TDescriptionData>
            name="ru"
            errors={errors}
            register={register}
            required={true}
            reset={resetField}
          />
        </div>
        <button className={fStyle.createBtn} type="submit">Create</button>
      </form>
    </div>
  );
};

export default DescriptionForm;
type TProps = {productId: number, closeForm: () => void}

