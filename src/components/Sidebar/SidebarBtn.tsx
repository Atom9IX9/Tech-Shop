import { FC, ReactElement } from "react";
import style from "../../style/sidebarStyle/sidebarMainBtn.module.css"

const SbBtn: FC<TProps> = ({ icon, title }) => {
  return (
    <button className={style.btn}>
      <div>{icon}</div>
      <span className={style.title}>{title}</span>
    </button>
  );
};

export default SbBtn;
type TProps = {
  icon: ReactElement;
  title: string;
};
