import ProductPageNav from "components/Product/ProductNav";
import { MouseEventHandler, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "style/productStyle/productPage.module.css";
import { useSelector } from "react-redux";
import {
  getCategories,
  getCurrentProduct,
  getFetchings,
  getLikedProducts,
  getProductStatuses,
} from "utils/selectors/productSelectors";
import { useAppDispatch } from "reducers/store";
import {
  addRating,
  fetchCategories,
  fetchCurrentProduct,
  fetchLikedProductIds,
  likeProduct,
} from "reducers/productsReducer";
import { useTranslation } from "react-i18next";
import { TLng } from "types/types";
import { getSale } from "utils/getSale";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { checkLiked } from "utils/selectors/checkIsLiked";
import Loader from "components/Loader/Loader";
import { User } from "components/contexts/UserContext";
import Dialog from "components/Dialog/Dialog";
import DescriptionForm from "components/Product/DescriptionForm";
import CustomSlider from "components/UI/Slider";
import StarRating from "components/Product/StarRating";
import { createBasketProduct } from "reducers/basketReducer";
import { getBasketFetchings } from "utils/selectors/basketSelectors";
import classNames from "classnames";
import { setDialog } from "reducers/appReducer";

const ProductPage: React.FC = () => {
  const paramsId = Number(useParams().id);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const categories = useSelector(getCategories);
  const productLikedIds = useSelector(getLikedProducts);
  const fetchings = useSelector(getFetchings);
  const basketFetchings = useSelector(getBasketFetchings);
  const statuses = useSelector(getProductStatuses);
  const user = useContext(User);
  const [dialog, setDescriptionDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCurrentProduct({ id: paramsId, userId: user.id || 0 }));
  }, [paramsId, dispatch, user.id]);
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
    if (user.role === "GUEST") {
      navigate("/sign-in");
      return;
    }
    if (!fetchings.like) {
      dispatch(likeProduct({ id: product?.id || 0, method }));
    }
  };
  const closeDialog = () => {
    setDescriptionDialog(false);
  };

  const handleRate = (rate: number) => {
    if (!user.id) {
      navigate("/sign-in");
      return;
    }
    if (!fetchings.rating) {
      dispatch(addRating({ rate, productId: product?.id || 0 }));
    }
  };

  const addToBasket: MouseEventHandler = (e) => {
    if (product) {
      if (!product.isInBasket) {
        dispatch(createBasketProduct(product.id));
      } else {
        dispatch(setDialog({ name: "basket", value: true }))
      }
    }
  };

  if (fetchings.productOpening) {
    return <Loader />;
  } else if (statuses.productFetchingById || !product) {
    return <div>{statuses.productFetchingById}</div>;
  } else {
    return (
      <div className={style.productPageContainer}>
        {dialog && (
          <Dialog close={closeDialog}>
            <DescriptionForm productId={paramsId} closeForm={closeDialog} />
          </Dialog>
        )}
        <ProductPageNav
          category={product.categoryCode}
          categories={categories}
          subcategories={product.subcategories}
          subcategoriesForAdding={product.addSubcategoryOptions}
          productId={product.id}
        />
        <div className={style.productInfContainer}>
          <div className={style.productImages}>
            <CustomSlider
              images={product.imgs
                .split("/")
                .map(
                  (i) => `${process.env.REACT_APP_SERVER_API_HOST}/public/${i}`
                )}
            />
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
              <button
                className={classNames(style.buyBtn, {
                  [style.inBasketBtn]: product.isInBasket,
                })}
                onClick={addToBasket}
                disabled={basketFetchings.basketProductCreating}
              >
                {product.isInBasket ? (
                  <MdOutlineShoppingCartCheckout
                    size={30}
                    color="var(--pink-bg-color)"
                  />
                ) : (
                  <MdOutlineAddShoppingCart size={30} color="#fff" />
                )}
                <div className={style.buyBtnText}>
                  {product.isInBasket ? "Order" : "Add to basket"}
                </div>
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
              <div>
                {(!product.descriptionEn &&
                  !product.descriptionRu &&
                  !product.descriptionUa &&
                  user.role === "ADMIN" && (
                    <>
                      There is no product description.{" "}
                      <span
                        className={style.addDescription}
                        onClick={() => setDescriptionDialog(true)}
                      >
                        ADD DESCRIPTION
                      </span>
                    </>
                  )) || (
                  <>
                    {(i18n.language as TLng) === "en"
                      ? product.descriptionEn
                      : (i18n.language as TLng) === "ua"
                      ? product.descriptionUa
                      : product.descriptionRu}
                  </>
                )}
              </div>
              <footer className={style.pDescriptionFooter}>
                <span className={style.shopName}>Tech-Shop</span>
                <StarRating
                  averageRating={product.rating.average}
                  userRating={product.rating.user}
                  rateHandler={handleRate}
                />
              </footer>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductPage;
