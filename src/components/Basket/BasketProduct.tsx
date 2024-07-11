import { TBasketProduct } from "api/basketAPI";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import style from "style/dialogs/basketDialog.module.css";
import { TLng } from "types/types";
import { MdKeyboardArrowUp, MdOutlineDelete } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useCount } from "hooks/useCount";
import { useEffect, useRef } from "react";
import { useAppDispatch } from "reducers/store";
import {
  deleteBasketProduct,
  setBasketProductCount,
} from "reducers/basketReducer";
import { setIsInBasket } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import { getCurrentProductId } from "utils/selectors/productSelectors";

const BasketProduct: React.FC<{ bp: TBasketProduct }> = ({ bp }) => {
  const { i18n, t } = useTranslation("product");
  const { count, decrement, increment } = useCount(bp.count);

  const currentProductId = useSelector(getCurrentProductId);
  let countTimeoutId = useRef<number>(1);
  const dispatch = useAppDispatch();

  const removeFromBasket = () => {
    dispatch(deleteBasketProduct(bp.id));
    if (bp.id === currentProductId) {
      dispatch(setIsInBasket(false));
    }
  };

  useEffect(() => {
    if (bp.count !== count) {
      countTimeoutId.current = window.setTimeout(() => {
        dispatch(setBasketProductCount({ count, productId: bp.id }));
      }, 500);
    }
    return () => {
      clearTimeout(countTimeoutId.current);
    };
  }, [count, bp.id, bp.count, dispatch]);

  return (
    <li className={style.basketProductLI}>
      <div className={style.productImgContainer}>
        <img
          className={style.productImg}
          src={`${process.env.REACT_APP_SERVER_API_HOST}/public/${
            bp.imgs?.split("/")[0]
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
          {bp.priceWithDiscount || bp.price}{" "}
          <span className={style.uah}>₴</span>
        </p>
      </div>
      <div className={style.count}>
        <button className={style.countBtn} onClick={increment}>
          <MdKeyboardArrowUp size={25} />
        </button>
        <div className={style.countNumber}>{count}</div>
        <button className={style.countBtn} onClick={decrement}>
          <MdKeyboardArrowDown size={25} />
        </button>
      </div>
      <div className={style.bPId}>#{bp.id}</div>
      <div className={style.orderButtonContainer}>
        <button className={style.orderButton}>{t("order")}</button>
      </div>
      <button onClick={removeFromBasket} className={style.deleteBtn}>
        <MdOutlineDelete size={20} color="#00000050" />
      </button>
    </li>
  );
};

export default BasketProduct;
