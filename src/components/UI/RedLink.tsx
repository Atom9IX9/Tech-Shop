import style from "style/UI/redLink.module.css";
import { MouseEventHandler } from "react"

const RedLink: React.FC<TProps> = ({ icon, children, textStyle, onClick }) => {
  const onMouseOver: MouseEventHandler<HTMLDivElement> = (e) =>
    (e.currentTarget.style.textDecoration = textStyle || "none");
  const onMouseOut: MouseEventHandler<HTMLDivElement> = (e) =>
    (e.currentTarget.style.textDecoration = "none");

  return (
    <div
      className={style.link}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
    >
      {icon && <div>{icon}</div>}
      <div className={style.text}>{children}</div>
    </div>
  );
};

export default RedLink;
type TProps = {
  children: string;
  icon?: JSX.Element;
  textStyle?: "underline"
  onClick?: MouseEventHandler
};
