import { TChildren } from "types/types";
import style from "style/UI/SubmitBtn.module.css";

const submitBtn: React.FC<TProps> = ({ children }) => {
  return (
    <button className={style.submitBtn} type="submit">
      {children}
    </button>
  );
};

export default submitBtn;

type TProps = {
  children: TChildren;
};
