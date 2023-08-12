import { TProductCard } from "api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "style/homeStyle/productCard/productCard.style.module.css";
import { getSale } from "utils/getSale";
import { useAppDispatch } from "reducers/store";
import { useSelector } from "react-redux";
import { getLikedProducts } from "utils/selectors/productSelectors";
import React, { useState, useEffect } from "react";
import cn from "classnames";
import { likeProduct } from "reducers/productsReducer";

const ProductCard: React.FC<TProps> = React.memo(({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const likedProducts = useSelector(getLikedProducts);

  const dispatch = useAppDispatch();

  const like = () => {
    if (!isLiked) {
      dispatch(likeProduct({ id: product.id, method: "ADD" }));
    } else if (isLiked) {
      dispatch(likeProduct({ id: product.id, method: "REMOVE" }));
    }
  };

  useEffect(() => {
    setIsLiked(likedProducts.includes(product.id));
  }, [likedProducts, product.id]);

  return (
    <div className={style.productCard}>
      <div className={style.liked}>
        <div className={style.likeIcon} onClick={like}>
          {isLiked ? (
            <AiFillHeart size={25} color="gold" />
          ) : (
            <AiOutlineHeart size={25} color="gold" />
          )}
        </div>
      </div>
      <div className={style.picture}>
        <img
          src={process.env.REACT_APP_SERVER_API_HOST + "/" + product.img}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className={style.title} title={product.title}>
        {product.title}
      </div>
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
