import cn from "classnames";
import style from "../../style/headerStyle/headerStyle.module.css";
import CatalogBtn from "./CatalogBtn";
import Languages from "./Languages";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import IconBtn from "../UI/IconBtn";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.layout}>
        <MenuBtn />
        <div className={style.logo}></div>
        <CatalogBtn />
        <SearchBar />
        <Languages />
        <div className={style.loginBtn}>
          <IconBtn>
            <AiOutlineUser size={30} color="#fff" />
          </IconBtn>
        </div>
        <IconBtn>
          <BsCart4 size={30} color="#fff" />
        </IconBtn>
      </div>
    </header>
  );
};

export default Header;
