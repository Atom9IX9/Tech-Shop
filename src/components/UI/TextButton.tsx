import { TChildren } from "../../types/types";
import style from "../../style/UI/textButton.module.css";
import { NavLink } from "react-router-dom";

const TextButton: React.FC<TProps> = ({ children, to }) => {
  return (
    <div className={style.textBtn}>
      {to ? <NavLink to={to}>{children}</NavLink> : children}
    </div>
  );
};

export default TextButton;
type TProps = {
  children: TChildren;
  to?: string;
};
