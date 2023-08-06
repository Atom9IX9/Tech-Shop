import CatalogBtn from "./CatalogBtn";
import Languages from "./Languages";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";

import IconBtn from "../UI/IconBtn";

import style from "style/headerStyle/headerStyle.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.layout}>
        <MenuBtn />
        <NavLink to="/">
          <div className={style.logo}></div>
        </NavLink>
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
