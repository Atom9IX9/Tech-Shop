import style from "../../style/headerStyle/headerStyle.module.css";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/appReducer";
import { MouseEventHandler } from "react";

const MenuBtn = () => {
  const dispatch = useDispatch();

  const openMenu: MouseEventHandler = (e) => {
    dispatch(actions.setActiveMenu(true))
  };

  return (
    <div className={style.headerBtn} onClick={openMenu}>
      <span className={style.menuBtnLine}></span>
      <span className={style.menuBtnLine}></span>
      <span className={style.menuBtnLine}></span>
    </div>
  );
};

export default MenuBtn;
