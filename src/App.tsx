import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import "./style/app.css";
import { useSelector } from "react-redux";
import { getActiveMenu } from "./selectors/appGlobalSelectors";
import cn from "classnames";

const App = () => {
  const isActiveMenu = useSelector(getActiveMenu);

  return (
    <div className={cn("app", { activeMenu: isActiveMenu })}>
      <Header />
      <Sidebar />
    </div>
  );
};

export default App;
