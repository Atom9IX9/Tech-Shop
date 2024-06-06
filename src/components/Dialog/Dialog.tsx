import { createPortal } from "react-dom";
import { TChildren } from "types/types";
import { MdClose } from "react-icons/md";

const Dialog: React.FC<TProps> = ({ children, close }) => {
  return createPortal(
    <div className="dialog" onClick={() => close()}>
      <div className="dialogContentWrap">
        <button className="closeDialogBtn">
          <MdClose color="#000" size={20} />
        </button>
        <div onClick={(e) => e.stopPropagation()} className="dialogContent">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
type TProps = {
  children: TChildren;
  close: () => void; //closes window
};
