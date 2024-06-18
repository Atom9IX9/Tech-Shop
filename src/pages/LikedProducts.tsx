import productsAPI, { TProductCard } from "api/productsAPI";
import ProductList from "components/Products/ProductList";
import { useEffect, useState } from "react";

const LikedProducts = () => {
  const [products, setProducts] = useState<TProductCard[]>([]);
  useEffect(() => {
    productsAPI.getLikedProducts().then((p) => setProducts(p || []));
  }, []);

  return (
    <section>
      <ProductList products={products} />
    </section>
  );
};

export default LikedProducts;
