const Category: React.FC<TProps> = ({category}) => {
  return ( <div>{category.name}</div> );
}

export default Category;
type TProps = {
  category: any;
}