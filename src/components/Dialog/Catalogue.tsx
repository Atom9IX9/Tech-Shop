import CatalogueCategoryElement from "components/Catalogue/CatalogueCategoryElement";
import { useSelector } from "react-redux";
import style from "style/dialogs/catalogueDialog.module.css";
import { getCategories } from "utils/selectors/productSelectors";

const Catalogue = () => {
  const categories = useSelector(getCategories);

  return (
    <div className={style.container}>
      <h3 className={style.catalogueTitle}>Catalogue</h3>
      <div className={style.categoriesContainer}>
        {categories.map((c, i) => (
          <CatalogueCategoryElement category={c} index={i} />
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
