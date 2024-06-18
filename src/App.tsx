import Layout from "components/Layout";
import { useTranslation } from "react-i18next";
import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import withSuspense from "utils/hoc/withSuspense";
import Home from "pages/Home";
import { useAppDispatch } from "reducers/store";
import { checkUserAuth } from "reducers/userReducer";
import { User } from "components/contexts/UserContext";
import { setBasket } from "reducers/basketReducer";
import AppDialogs from "components/Dialog/Dialogs";

// ? lazy page imports
const SignIn = withSuspense(React.lazy(() => import("pages/SignIn")));
const SignUp = withSuspense(React.lazy(() => import("pages/SignUp")));
const About = withSuspense(React.lazy(() => import("pages/About")));
const Catalog = withSuspense(React.lazy(() => import("pages/Catalog")));
const Contacts = withSuspense(React.lazy(() => import("pages/Contacts")));
const PageWithCategory = withSuspense(
  React.lazy(() => import("pages/Category"))
);
const LikedProducts = withSuspense(
  React.lazy(() => import("pages/LikedProducts"))
);
const AdminPanel = withSuspense(React.lazy(() => import("pages/AdminPanel")));
const Product = withSuspense(React.lazy(() => import("pages/Product")));

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useContext(User);

  useEffect(() => {
    // auto sign-in
    dispatch(checkUserAuth());
  }, [dispatch]);

  useEffect(() => {
    // removes full locales ("en-US" => "en")
    i18n.changeLanguage(i18n.language.slice(0, 2));
  }, [i18n]);

  useEffect(() => {
    dispatch(setBasket());
  }, [user, dispatch]);

  return (
    <div className="app">
      <AppDialogs />
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} /> 
          <Route path="sign-up" element={<SignUp />} /> 
          <Route path="sign-in" element={<SignIn />} /> 
          <Route path="about" element={<About />} /> {/* todo */}
          <Route path="contacts" element={<Contacts />} /> {/* todo */}
          <Route path="all-categories" element={<Catalog />} /> {/* todo */}
          <Route path="liked-products" element={<LikedProducts />} /> 
          <Route path="admin-panel/*" element={<AdminPanel />} /> 
          <Route
            path=":category/:subcategory?"
            element={<PageWithCategory />}
          /> 
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
