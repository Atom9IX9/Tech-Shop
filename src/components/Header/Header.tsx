import style from "../../style/headerStyle/headerStyle.module.css"
import CatalogBtn from "./CatalogBtn";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";

const Header = () => {
  return (
    <header className={style.header}>
      <MenuBtn />
      <div className={style.logo}></div>
      <CatalogBtn />
      <SearchBar />
    </header>
  );
}

export default Header;