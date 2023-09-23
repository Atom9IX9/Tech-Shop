import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APProducts = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        products
      </div>
    </div>
  );
};

export default APProducts;
