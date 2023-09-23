import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APCategories = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        categories
      </div>
    </div>
  );
};

export default APCategories;
