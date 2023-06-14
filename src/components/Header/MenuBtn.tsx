import style from "../../style/headerStyle/headerStyle.module.css"

const MenuBtn = () => {
  return (
    <div className={style.menuBtn}>
      <span className={style.menuBtnLine}></span>
      <span className={style.menuBtnLine}></span>
      <span className={style.menuBtnLine}></span>
    </div>
  );
};

export default MenuBtn;
