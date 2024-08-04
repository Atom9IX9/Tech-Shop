import { Link } from "react-router-dom";
import { TChildren } from "types/types";
import style from "style/UI/sidebarLink.module.css"
import { useDispatch } from "react-redux";
import { setActiveMenu } from "reducers/appReducer";
import { MouseEventHandler } from "react";

const SbLink: React.FC<TProps> = ({ children, to, onClick }) => {
  const dispatch = useDispatch()

  const closeMenu: MouseEventHandler = (e) => {
    dispatch(setActiveMenu(false))
    if (onClick) {
      onClick(e)
    }
  }

  return <Link onClick={closeMenu} to={to} className={style.sbLink}>{children}</Link>;
};

export default SbLink;
type TProps = {
  children: TChildren;
  to: string;
  onClick?: MouseEventHandler
};
