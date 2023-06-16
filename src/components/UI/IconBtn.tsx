import style from "../../style/UI/IconBtn.module.css";
import { FC } from "react";
import { TChildren } from "../../types/types";
import { MouseEventHandler } from "react";

const IconBtn: FC<TProps> = ({ children, onClick }) => {
  return (
    <div className={style.iconBtn} onClick={onClick}>
      {children}
    </div>
  );
};

export default IconBtn;
type TProps = {
  children: TChildren;
  onClick?: MouseEventHandler;
};
