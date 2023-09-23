import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APPeoples = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        peoples
      </div>
    </div>
  );
};

export default APPeoples;
