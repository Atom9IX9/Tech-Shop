import { TBasketProduct } from "api/basketAPI";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import style from "style/dialogs/basketDialog.module.css";
import { TLng } from "types/types";
import { getSale } from "utils/getSale";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useCount } from "hooks/useCount";
import { useRef } from "react";

const BasketProduct: React.FC<{ bp: TBasketProduct }> = ({ bp }) => {
  const { i18n, t } = useTranslation("product");
  const { count, decrement, increment } = useCount(1)
  const countRef = useRef()

  return (
    <li className={style.basketProductLI}>
      <div className={style.productImgContainer}>
        <img
          className={style.productImg}
          src={`${process.env.REACT_APP_SERVER_API_HOST}/public/${
            bp.imgs.split("/")[0]
          }`}
          alt={t("product") as string}
        />
      </div>
      <div className={style.productInfo}>
        <NavLink to={`/product/${bp.id}`} title={bp[i18n.language as TLng]}>
          <p className={style.bPTitle}>{bp[i18n.language as TLng]}</p>
        </NavLink>
        {!!bp.sale && <p className={style.fullPriceForDiscount}>{bp.price}₴</p>}
        <p className={style.finalPrice}>
          {getSale(bp.price, bp.sale)} <span className={style.uah}>₴</span>
        </p>
      </div>
      <div className={style.count}>
        <button className={style.countBtn} onClick={increment}><MdKeyboardArrowUp size={25} /></button>
        <div className={style.countNumber}>{count}</div>
        <button className={style.countBtn} onClick={decrement}><MdKeyboardArrowDown size={25} /></button>
      </div>
      <div className={style.bPId}>#{bp.id}</div>
      <div className={style.orderButtonContainer}>
        <button className={style.orderButton}>{t("order")}</button>
      </div>
    </li>
  );
};

export default BasketProduct;
