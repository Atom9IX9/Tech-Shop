import CatalogBtn from "./CatalogBtn";
import Languages from "./Languages";
import MenuBtn from "./MenuBtn";
import SearchBar from "./SearchBar";

import IconBtn from "../UI/IconBtn";

import style from "style/headerStyle/headerStyle.module.css";
import { AiOutlineUser, AiFillHeart } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { User } from "components/contexts/UserContext";
import { LuCrown } from "react-icons/lu";
import { useSelector } from "react-redux";
import { getBasketId } from "utils/selectors/basketSelectors";
import { useAppDispatch } from "reducers/store";
import { setDialog } from "reducers/appReducer";
import LogoLarge from "assets/img/logoLarge.svg"

// todo: basket dialog window (without buying)

const Header = () => {
  const { role } = useContext(User);
  const basketId = useSelector(getBasketId);
  const navigate = useNavigate();
  const dispatch = useAppDispatch()

  const openCart = () => {
    if (!basketId) {
      return navigate("/sign-in");
    }
    dispatch(setDialog({name: "basket", value: true}))
  };

  return (
    <header className={style.header}>
      <div className={style.layout}>
        <MenuBtn />
        <NavLink to="/">
          <div className={style.logo}>
            <img src={LogoLarge} alt="Logo" className={style.logoImg} />
          </div>
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
        <IconBtn onClick={() => openCart()}>
          <BsCart4 size={30} color="#fff" />
        </IconBtn>
      </div>
    </header>
  );
};

export default Header;
