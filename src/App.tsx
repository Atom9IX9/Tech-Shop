import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";
import "./style/app.css";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Sidebar />
      <Content />
    </div>
  );
};

export default App;
