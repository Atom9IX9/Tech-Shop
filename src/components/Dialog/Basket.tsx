import BasketProduct from "components/Basket/BasketProduct";
import Loader from "components/Loader/Loader";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fetchBasketProducts } from "reducers/basketReducer";
import { useAppDispatch } from "reducers/store";
import style from "style/dialogs/basketDialog.module.css";
import {
  getBasketFetchings,
  getBasketProducts,
} from "utils/selectors/basketSelectors";

const BasketDialog = () => {
  const basketProducts = useSelector(getBasketProducts);
  const dispatch = useAppDispatch();
  const { basketProductsFetching } = useSelector(getBasketFetchings);

  const { t } = useTranslation("product")

  useEffect(() => {
    dispatch(fetchBasketProducts());
  }, [dispatch]);

  return (
    <div className={style.basketDialog}>
      <h3 className={style.basketTitle}>{t("basketTitle")}</h3>
      <ul className={style.basketProductList}>
        {basketProductsFetching ? (
          <Loader />
        ) : (
          basketProducts.map((bp) => <BasketProduct bp={bp} key={bp.id} />)
        )}
      </ul>
    </div>
  );
};

export default BasketDialog;
