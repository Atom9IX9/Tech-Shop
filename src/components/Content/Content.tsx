import { useSelector } from "react-redux";
import style from "../../style/contentStyle/contentStyle.module.css";
import { getActiveMenu } from "../../selectors/appGlobalSelectors";
import cn from "classnames";
import { FC } from "react";
import { TChildren } from "../../types/types";

const Content: FC<TProps> = ({ children }) => {
  const isActiveMenu = useSelector(getActiveMenu);

  return (
    <div
      className={cn(style.contentWrapper, { [style.activeMenu]: isActiveMenu })}
    >
      {children}
    </div>
  );
};

export default Content;
type TProps = { children: TChildren };
