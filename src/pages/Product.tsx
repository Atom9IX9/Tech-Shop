import ProductPageNav from "components/Product/ProductNav";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import style from "style/productStyle/productPage.module.css";
import { useSelector } from "react-redux";
import {
  getCategories,
  getCurrentProduct,
  getFetchings,
  getLikedProducts,
} from "utils/selectors/productSelectors";
import { useAppDispatch } from "reducers/store";
import {
  fetchCategories,
  fetchCurrentProduct,
  fetchLikedProductIds,
  likeProduct,
} from "reducers/productsReducer";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { getSale } from "utils/getSale";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { checkLiked } from "utils/selectors/checkIsLiked";
import Loader from "components/Loader/Loader";
import { User } from "components/contexts/UserContext";
import Dialog from "components/Dialog/Dialog";

const ProductPage: React.FC = () => {
  const paramsId = Number(useParams().id);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const categories = useSelector(getCategories);
  const productLikedIds = useSelector(getLikedProducts);
  const fetchings = useSelector(getFetchings);
  const user = useContext(User);
  const [dialog, setDialog] = useState(false)

  // todo: redux api thunk for ~getProduct()~
  useEffect(() => {
    dispatch(fetchCurrentProduct(paramsId));
  }, [paramsId, dispatch]);
  useEffect(() => {
    if (!productLikedIds.length) dispatch(fetchLikedProductIds());
  }, [productLikedIds.length, dispatch]);
  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch]);

  const product = useSelector(getCurrentProduct);

  const like = (method: "ADD" | "REMOVE") => {
    dispatch(likeProduct({ id: product?.id || 0, method }));
  };

  if (fetchings.productOpening) {
    return <Loader />;
  } else if (!product) {
    return <div>error 404</div>;
  } else {
    return ( 
      <div className={style.productPageContainer}>
        {dialog && <Dialog close={() => setDialog(false)}>
            <div className={style.createDescriptionWindow}></div>
          </Dialog>}
        <ProductPageNav
          category={product.categoryCode}
          categories={categories}
          subcategories={[{ code: "subcat1" }, { code: "subcat2" }]}
        />
        <div className={style.productInfContainer}>
          <div className={style.productImages}>
            <div className={style.productImgsContainer}>
              <img
                className={style.productLargeImage}
                src={
                  process.env.REACT_APP_SERVER_API_HOST +
                  "/public/" +
                  product.img
                }
                alt="product"
              />
            </div>
          </div>
          <div className={style.productInfo}>
            <h2 className={style.productTitle}>
              {product[i18n.language as TLng]}
            </h2>
            <div className={style.toBucketBlock}>
              <div className={style.price}>
                {product?.sale ? (
                  <div className={style.discountedPrice}>{product.price} ₴</div>
                ) : (
                  ""
                )}
                <div className={style.fullPrice}>
                  {getSale(product.price, product.sale)}
                  <span className={style.currency}> ₴</span>
                </div>
              </div>
              <button className={style.buyBtn}>
                <MdOutlineAddShoppingCart size={30} color="#fff" />
                <div className={style.buyBtnText}>Buy</div>
              </button>
            </div>
            <div className={style.likesBlock}>
              <div className={style.likeIcon}>
                {checkLiked(product.id, productLikedIds) ? (
                  <AiFillHeart
                    size={35}
                    color="gold"
                    onClick={() => like("REMOVE")}
                  />
                ) : (
                  <AiOutlineHeart
                    size={35}
                    color="gold"
                    onClick={() => like("ADD")}
                  />
                )}
              </div>
              <div className={style.likesCount}>{product.likesCount}</div>
            </div>
            <div className={style.productDescription}>
              {(!product.descriptionEn &&
                !product.descriptionRu &&
                !product.descriptionUa &&
                user.role === "ADMIN" && (
                  <div>
                    There is no product description.{" "}
                    <span className={style.addDescription} onClick={() => setDialog(true)}>
                      ADD DESCRIPTION
                    </span>
                  </div>
                )) || (
                <div>
                  {(i18n.language as TLng) === "en"
                    ? product.descriptionEn
                    : (i18n.language as TLng) === "ua"
                    ? product.descriptionUa
                    : product.descriptionRu}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
