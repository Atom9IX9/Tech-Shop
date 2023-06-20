import style from "../../style/headerStyle/headerStyle.module.css";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../reducers/appReducer";
import { MouseEventHandler } from "react";
import IconBtn from "../UI/IconBtn";

const MenuBtn = () => {
  const dispatch = useDispatch();

  const openMenu: MouseEventHandler = (e) => {
    dispatch(setActiveMenu(true));
  };

  return (
    <IconBtn onClick={openMenu}>
      <>
        <span className={style.menuBtnLine}></span>
        <span className={style.menuBtnLine}></span>
        <span className={style.menuBtnLine}></span>
      </>
    </IconBtn>
  );
};

export default MenuBtn;
