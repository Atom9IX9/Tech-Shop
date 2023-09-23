import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APDashboard = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        dashboard
      </div>
    </div>
  );
};

export default APDashboard;
