import { TSubCategory } from "api/categoriesAPI";
import productsAPI, { TProductCard } from "api/productsAPI";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import style from "style/productStyle/productPage.module.css";
import { IoIosArrowForward } from "react-icons/io";

const ProductPage: React.FC = () => {
  const paramsId = Number(useParams().id);
  const [product, setProduct] = useState<TProductCard>();
  useEffect(() => {
    productsAPI.getProduct(paramsId).then((product) => setProduct(product));
  }, [paramsId]);

  if (!product) return <div>error 404</div>;

  return (
    <div className={style.productPageContainer}>
      <ProductPageNav
        category={product.categoryCode}
        subcategories={[{ code: "subcat1" }, { code: "subcat2" }]}
      />
    </div>
  );
};

const ProductPageNav: React.FC<TProductPageNav> = ({
  category,
  subcategories,
}) => {
  return (
    <nav className={style.productPageNav}>
      <NavLink to={`/${category}`} className={style.navLink}>
        {category.toUpperCase()}
      </NavLink>
      {subcategories.map((sc) => {
        return (
          <div className={style.subcategoriesNavLinkContainer}>
            <IoIosArrowForward size={13} />
            <NavLink
              className={style.subcategoriesNavLink}
              to={`/${category}/${sc.code}`}
            >
              {sc.code.toLocaleUpperCase()}
            </NavLink>
          </div>
        );
      })}
    </nav>
  );
};

export default ProductPage;
type TProductPageNav = { category: string; subcategories: TSubCategory[] };
