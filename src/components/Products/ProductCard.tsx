import { TProductCard } from "api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "style/productsStyle/productCard/productCard.style.module.css";
import { useAppDispatch } from "reducers/store";
import { useSelector } from "react-redux";
import {
  getFetchings,
  getLikedProducts,
} from "utils/selectors/productSelectors";
import React, {
  useState,
  useEffect,
  useContext,
  MouseEventHandler,
} from "react";
import cn from "classnames";
import { likeProduct } from "reducers/productsReducer";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "components/contexts/UserContext";
import StarRating from "components/Product/StarRating";
import classNames from "classnames";

const ProductCard: React.FC<TProps> = React.memo(({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likedProducts = useSelector(getLikedProducts);
  const fetchings = useSelector(getFetchings);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { role } = useContext(User);

  const dispatch = useAppDispatch();

  const like: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!fetchings.like) {
      if (role !== "GUEST") {
        if (!isLiked) {
          dispatch(likeProduct({ id: product.id, method: "ADD" }));
        } else if (isLiked) {
          dispatch(likeProduct({ id: product.id, method: "REMOVE" }));
        }
      } else {
        navigate("/sign-in");
      }
    }
  };

  useEffect(() => {
    setIsLiked(likedProducts.includes(product.id));
  }, [likedProducts, product.id]);

  return (
    <NavLink
      className={classNames(style.productCard, {
        [style.rated]: product.userRate,
      })}
      to={`/product/${product.id}`}
    >
      <div className={style.liked}>
        <button className={style.likeIcon} onClick={like}>
          {isLiked ? (
            <AiFillHeart size={25} color="gold" />
          ) : (
            <AiOutlineHeart size={25} color="gold" />
          )}
        </button>
      </div>
      <div className={style.picture}>
        {!!product.sale && (
          <div className={style.discountPercent}>
            -{Math.round(product.sale * 100)}%
          </div>
        )}
        <img
          src={
            process.env.REACT_APP_SERVER_API_HOST +
            "/public/" +
            product.imgs.split("/")[0]
          }
          alt={product[i18n.language as TLng]}
          loading="lazy"
        />
      </div>
      <p className={style.title} title={product[i18n.language as TLng]}>
        {product[i18n.language as TLng]}
      </p>
      {product.priceWithDiscount ? (
        <span className={style.price}>{product.price} ₴</span>
      ) : (
        ""
      )}
      <div
        className={cn(style.sale, {
          [style.withoutSale]: !product.priceWithDiscount,
        })}
      >
        <span className={style.priceNumber}>
          {product.priceWithDiscount || product.price}
        </span>
        ₴
      </div>
      {!!product.userRate && (
        <div className={style.rate}>
          <StarRating
            averageRating={0}
            userRating={product.userRate}
            rateHandler={() => {}}
          />
        </div>
      )}
    </NavLink>
  );
});

export default ProductCard;
type TProps = {
  product: TProductCard;
};
