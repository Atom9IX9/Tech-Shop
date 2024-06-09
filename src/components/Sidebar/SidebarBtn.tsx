import style from "../../style/sidebarStyle/sidebarMainBtn.module.css"

import { useAppDispatch } from "reducers/store";
import { FC, MouseEventHandler, ReactElement } from "react";
import { setActiveMenu } from "reducers/appReducer";

const SbBtn: FC<TProps> = ({ icon, title, onClick }) => {
  const dispatch = useAppDispatch()
  const handleClick: MouseEventHandler = (e) => {
    dispatch(setActiveMenu(false))
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button className={style.btn} onClick={handleClick}>
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
