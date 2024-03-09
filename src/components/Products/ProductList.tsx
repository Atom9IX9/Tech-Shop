import ProductCard from "./ProductCard";

import { TProductCard } from "api/productsAPI";
import style from "style/productsStyle/products.module.css";

const ProductList: React.FC<{ products: TProductCard[] }> = ({ products }) => {
  return (
    <div className={style.productCards}>
      {products.length
        ? products.map((p) => <ProductCard product={p} key={p.id} />)
        : "There is no products"}
    </div>
  );
};

export default ProductList;
