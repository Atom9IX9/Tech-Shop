import CatalogBtn from "./CatalogBtn";
import Languages from "./Languages";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";

import IconBtn from "../UI/IconBtn";

import style from "style/headerStyle/headerStyle.module.css";
import { AiOutlineUser, AiFillHeart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { User } from "components/contexts/UserContext";
import { LuCrown } from "react-icons/lu";

const Header = () => {
  const { role } = useContext(User);

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
          {role === "GUEST" ? (
            <NavLink to="sign-up">
              <IconBtn>
                <AiOutlineUser size={30} color="#fff" />
              </IconBtn>
            </NavLink>
          ) : role === "ADMIN" ? (
            <NavLink to="admin-panel">
              <IconBtn>
                <LuCrown size={30} color="gold" />
              </IconBtn>
            </NavLink>
          ) : (
            role === "USER" &&
            ((
              <NavLink to="liked-products">
                <IconBtn>
                  <AiFillHeart size={30} color="#fff" />
                </IconBtn>
              </NavLink>
            ) as JSX.Element)
          )}
        </div>
        <IconBtn>
          <BsCart4 size={30} color="#fff" />
        </IconBtn>
      </div>
    </header>
  );
};

export default Header;
