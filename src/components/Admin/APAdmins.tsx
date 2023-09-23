import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APAdmins = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        admins
      </div>
    </div>
  );
};

export default APAdmins;
