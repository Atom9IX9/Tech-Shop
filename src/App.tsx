import "./style/app.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom"
// ? pages
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(i18n.language.slice(0, 2)) // del full locales ("en-US" => "en")
  }, [i18n]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
