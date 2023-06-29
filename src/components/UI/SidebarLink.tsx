import { Link } from "react-router-dom";
import { TChildren } from "../../types/types";
import style from "../../style/UI/sidebarLink.module.css"
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../reducers/appReducer";

const SbLink: React.FC<TProps> = ({ children, to }) => {
  const dispatch = useDispatch()

  const closeMenu = () => {
    dispatch(setActiveMenu(false))
  }

  return <Link onClick={closeMenu} to={to} className={style.sbLink}>{children}</Link>;
};

export default SbLink;
type TProps = {
  children: TChildren;
  to: string;
};
