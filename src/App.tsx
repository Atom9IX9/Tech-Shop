import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import { relative } from "path";

const App = () => {
  return (
    <div style={{ position: "relative" }}>
      <Header />
      <Sidebar />
    </div>
  );
};

export default App;
