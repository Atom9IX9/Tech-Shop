import { TProductCard } from "api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "style/productsStyle/productCard/productCard.style.module.css";
import { getSale } from "utils/getSale";
import { useAppDispatch } from "reducers/store";
import { useSelector } from "react-redux";
import {
  getFetchings,
  getLikedProducts,
} from "utils/selectors/productSelectors";
import React, { useState, useEffect, useContext } from "react";
import cn from "classnames";
import { likeProduct } from "reducers/productsReducer";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { NavLink, useNavigate } from "react-router-dom";
import { User } from "components/contexts/UserContext";

const ProductCard: React.FC<TProps> = React.memo(({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likedProducts = useSelector(getLikedProducts);
  const fetchings = useSelector(getFetchings);
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { role } = useContext(User);

  const dispatch = useAppDispatch();

  const like = () => {
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
    <div className={style.productCard}>
      <div className={style.liked}>
        <button className={style.likeIcon} onClick={like}>
          {isLiked ? (
            <AiFillHeart size={25} color="gold" />
          ) : (
            <AiOutlineHeart size={25} color="gold" />
          )}
        </button>
      </div>
      <NavLink to={`/product/${product.id}`}>
        <div className={style.picture}>
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
      </NavLink>
      {product.sale ? (
        <span className={style.price}>{product.price} ₴</span>
      ) : (
        ""
      )}
      <div className={cn(style.sale, { [style.withoutSale]: !product.sale })}>
        <span className={style.priceNumber}>
          {getSale(product.price, product.sale)}
        </span>
        ₴
      </div>
    </div>
  );
});

export default ProductCard;
type TProps = {
  product: TProductCard;
};
