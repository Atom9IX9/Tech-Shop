import { TProductCard } from "../../api/productsAPI";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import style from "../../style/homeStyle/productCard/productCard.style.module.css"
import { useContext } from "react"
import { User } from "../contexts/UserContext";

const ProductCard: React.FC<TProps> = ({ product }) => {
  const { uid } = useContext(User)

  return (
    <div>
      <div className={style.liked}>
        {product.likes.some(id => id === uid) ? (
          <AiFillHeart size={20} color="gold" />
        ) : (
          <AiOutlineHeart size={20} color="gold" />
        )}
      </div>
      <div className={style.picture}>
        <img src={product.picture} alt={product.title} loading="lazy" />
      </div>
      <div className={style.title}>
        { product.title }
      </div>
      <div className={style.price}>
        <span className={style.priceNumber}>{ product.price }</span>₴
      </div>
    </div>
  );
};

export default ProductCard;
type TProps = {
  product: TProductCard;
};
