import { TProductCard } from "../../api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../style/homeStyle/productCard/productCard.style.module.css";
import { useContext } from "react";
import { User } from "../contexts/UserContext";
import { getSale } from "../../utils/getSale";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../reducers/store";
import { addLike, removeLike } from "../../reducers/productsReducer";
import { useSelector } from "react-redux";
import { getFetchings } from "../../utils/selectors/productSelectors";
import React from "react";
import cn from "classnames";

const ProductCard: React.FC<TProps> = React.memo(({ product }) => {
  const fetchings = useSelector(getFetchings);
  const { uid } = useContext(User);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const like = (product: TProductCard) => {
    if (!uid) {
      navigate("sign-in");
    } else if (product.likes.some((id) => id === uid) && !fetchings.like) {
      dispatch(removeLike({ product, uid }));
    } else if (!fetchings.like) {
      dispatch(addLike({ product, uid }));
    }
  };

  return (
    <div className={style.productCard}>
      <div className={style.liked}>
        <div className={style.likeIcon} onClick={() => like(product)}>
          {product.likes.some((id) => id === uid) ? (
            <AiFillHeart size={25} color="gold" />
          ) : (
            <AiOutlineHeart size={25} color="gold" />
          )}
        </div>
      </div>
      <div className={style.picture}>
        <img src={product.picture} alt={product.title} loading="lazy" />
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
