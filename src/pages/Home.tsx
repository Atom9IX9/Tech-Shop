import { useContext, useEffect } from "react";
import { User } from "../components/contexts/UserContext";
import { fetchProducts } from "../reducers/productsReducer";
import { useAppDispatch } from "../reducers/store";

const Home = () => {
  const dispatch = useAppDispatch()
  const user = useContext(User)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return <div>Home {user.isAuth && "t"}</div>;
};

export default Home;
