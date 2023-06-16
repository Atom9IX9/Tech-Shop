import style from "../../style/sidebarStyle/sidebarStyle.module.css";
import { AiOutlineClose } from "react-icons/ai";
import IconBtn from "../UI/IconBtn";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/appReducer";

const SidebarHeader = () => {
  const dispatch = useDispatch()

  const closeMenu: MouseEventHandler = (e) => {
    dispatch(actions.setActiveMenu(false))
  };

  return (
    <header className={style.header}>
      <IconBtn onClick={closeMenu}>
        <AiOutlineClose color="#fff" size={15} />
      </IconBtn>
    </header>
  );
};

export default SidebarHeader;
