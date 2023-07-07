import { TProductCard } from "../../api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../style/homeStyle/productCard/productCard.style.module.css";
import { MouseEventHandler, useContext } from "react";
import { User } from "../contexts/UserContext";
import { getSale } from "../../utils/getSale";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<TProps> = ({ product }) => {
  const { uid, isAuth } = useContext(User);
  const navigate = useNavigate()

  const like: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!isAuth) navigate("sign-in")
  } 

  return (
    <div className={style.productCard}>
      <div className={style.liked}>
        <div className={style.likeIcon} onClick={like}>
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
      { product.sale ? <span className={style.price}>{product.price} ₴</span> : "" }
      <div className={style.sale}>
        <span className={style.priceNumber}>
          {getSale(product.price, product.sale)}
        </span>
        ₴
      </div>
    </div>
  );
};

export default ProductCard;
type TProps = {
  product: TProductCard;
};
