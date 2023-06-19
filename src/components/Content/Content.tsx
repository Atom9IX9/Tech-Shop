import { useSelector } from "react-redux";
import style from "../../style/contentStyle/contentStyle.module.css";
import { getActiveMenu } from "../../selectors/appGlobalSelectors";
import cn from "classnames";

const Content = () => {
  const isActiveMenu = useSelector(getActiveMenu);

  return (
    <div
      className={cn(style.contentWrapper, { [style.activeMenu]: isActiveMenu })}
    ></div>
  );
};

export default Content;
