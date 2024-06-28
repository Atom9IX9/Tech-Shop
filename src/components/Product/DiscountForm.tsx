import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { resetDiscountStatus } from "reducers/productsReducer";
import { useAppDispatch } from "reducers/store";
import { getProductStatuses } from "utils/selectors/productSelectors";
import style from "style/productStyle/discountForm.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const DiscountForm: React.FC<TDiscountFormProps> = ({ close, onSubmit }) => {
  const { register, handleSubmit } = useForm<DataFields>();
  const statuses = useSelector(getProductStatuses);
  const dispatch = useAppDispatch();

  const submitHandler: SubmitHandler<DataFields> = (data) => {
    onSubmit({ ...data, discountPercent: data.discountPercent / 100 });
  };

  useEffect(() => {
    if (statuses.discountUpdated === "success") {
      close();
    }

    return () => {
      dispatch(resetDiscountStatus());
    };
  }, [close, statuses.discountUpdated, dispatch]);

  return (
    <form className={style.discountForm} onSubmit={handleSubmit(submitHandler)}>
      <div className={style.discountFormFields}>
        <label className={style.inpWrap}>
          <span className={style.fieldIcon}>₴</span>
          <input type="number" {...register("dropTo")} />
        </label>
        <label className={style.inpWrap}>
          <span className={style.fieldIcon}>%</span>
          <input type="number" {...register("discountPercent")} />
        </label>
      </div>
      <div className={style.btnsBlock}>
        <button type="submit" className={style.formBtn}>
          <FaCheckCircle size={25} color="green" />
        </button>
        <button type="button" onClick={() => close()} className={style.formBtn}>
          <MdCancel size={30} color="var(--red-bg-color)" />
        </button>
      </div>
    </form>
  );
};

export default DiscountForm;
type TDiscountFormProps = {
  close: () => void;
  onSubmit: SubmitHandler<DataFields>;
};
type DataFields = {
  dropTo: number;
  discountPercent: number;
};
