import { TCategory } from "../../reducers/productsReducer";

const Category: React.FC<TProps> = ({category}) => {
  return ( <div>{category.categoryName}</div> );
}

export default Category;
type TProps = {
  category: TCategory;
}