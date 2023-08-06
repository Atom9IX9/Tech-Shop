import style from "../../style/sidebarStyle/sidebarMainBtn.module.css"

import { FC, MouseEventHandler, ReactElement } from "react";

const SbBtn: FC<TProps> = ({ icon, title, onClick }) => {
  return (
    <button className={style.btn} onClick={onClick}>
      <div>{icon || ""}</div>
      <span className={style.title}>{title}</span>
    </button>
  );
};

export default SbBtn;
type TProps = {
  icon?: ReactElement;
  title: string;
  onClick?: MouseEventHandler;
};
