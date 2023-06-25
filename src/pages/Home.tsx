import { useContext } from "react";
import { User } from "../components/contexts/UserContext";

const Home = () => {
  const user = useContext(User)

  return <div>Home {user.isAuth && "t"}</div>;
};

export default Home;
