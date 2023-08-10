import Layout from "components/Layout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import withSuspense from "utils/hoc/withSuspense";
import Home from "pages/Home";
import { useAppDispatch } from "reducers/store";
import { checkUserAuth } from "reducers/userReducer";

// ? lazy page imports
const SignIn = withSuspense(React.lazy(() => import("pages/SignIn")));
const SignUp = withSuspense(React.lazy(() => import("pages/SignUp")));
const About = withSuspense(React.lazy(() => import("pages/About")));
const Catalog = withSuspense(React.lazy(() => import("pages/Catalog")));
const Contacts = withSuspense(React.lazy(() => import("pages/Contacts")));
const PageWithCategory = withSuspense(React.lazy(() => import("pages/Category")))

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    // auto sign-in
    dispatch(checkUserAuth())
  }, [dispatch]);

  useEffect(() => {
    // removes full locales ("en-US" => "en")
    i18n.changeLanguage(i18n.language.slice(0, 2));
  }, [i18n]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="all-categories" element={<Catalog />} />
          <Route path=":category" element={<PageWithCategory />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
