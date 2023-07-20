import style from "style/contentStyle/contentStyle.module.css";
import { getActiveMenu } from "utils/selectors/appGlobalSelectors";
import { TChildren } from "types/types";
import cn from "classnames";
import { FC } from "react";
import { useSelector } from "react-redux";

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
