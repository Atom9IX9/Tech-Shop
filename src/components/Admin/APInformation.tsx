import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APInformation = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        information
      </div>
    </div>
  );
};

export default APInformation;
