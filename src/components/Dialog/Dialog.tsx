import { createPortal } from "react-dom";
import { TChildren } from "types/types";

const Dialog: React.FC<TProps> = ({children, close}) => {
  return createPortal((
    <div className="dialog" onClick={() => close()}>
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>
  ), document.body)
}

export default Dialog;
type TProps = {
  children: TChildren;
  close: () => void; //closes window
}