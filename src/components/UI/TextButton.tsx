import style from "../../style/UI/textButton.module.css";
import { NavLink } from "react-router-dom";
import { MouseEventHandler } from "react";

const TextButton: React.FC<TProps> = ({ children, to, onClick }) => {
  return (
    <div className={style.textBtn} onClick={onClick}>
      {to ? <NavLink to={to}>{children}</NavLink> : children}
    </div>
  );
};

export default TextButton;
type TProps = {
  children: string;
  to?: string;
  onClick?: MouseEventHandler;
};
