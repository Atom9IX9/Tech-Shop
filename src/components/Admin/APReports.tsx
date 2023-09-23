import style from "style/admin/adminStyle.module.css";
import classNames from "classnames";

const APReports = () => {
  return (
    <div className={style.content}>
      <div className={classNames(style.APElement, style.contentElement)}>
        reports
      </div>
    </div>
  );
};

export default APReports;
