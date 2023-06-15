import style from "../../style/headerStyle/headerStyle.module.css";
import CatalogBtn from "./CatalogBtn";
import Languages from "./Languages";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";
import { AiOutlineUser } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
  return (
    <header className={style.header}>
      <MenuBtn />
      <div className={style.logo}></div>
      <CatalogBtn />
      <SearchBar />
      <Languages />
      <div className={style.headerBtn}>
        <AiOutlineUser size={30} color="#fff" />
      </div>
      <div className={style.headerBtn}>
        <BsCart4 size={30} color="#fff" />
      </div>
    </header>
  );
};

export default Header;
