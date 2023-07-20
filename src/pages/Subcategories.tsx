import { useEffect } from "react";
import { useAppDispatch } from "reducers/store";
import { fetchSubcategories } from "reducers/productsReducer";
import { useSelector } from "react-redux";
import { getCurrentCategory } from "utils/selectors/productSelectors";
import { useLocation } from "react-router-dom";
import { TCategoryCode } from "api/categoriesAPI";
import { useTranslation } from "react-i18next";

const Subcategories = () => {
  const dispatch = useAppDispatch();
  const currentCategory = useSelector(getCurrentCategory);
  const location = useLocation();
  const { t } = useTranslation("subcategories");

  useEffect(() => {
    dispatch(fetchSubcategories(location.pathname.slice(1) as TCategoryCode));
  }, [location.pathname, dispatch]);

  return <div>{currentCategory.subcategories?.map((sc) => t(sc.code))}</div>;
};

export default Subcategories;
