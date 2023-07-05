import "./style/app.css";
import Layout from "./components/Layout";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";
import React from "react";
import withSuspense from "./utils/hoc/withSuspense";

import Home from "./pages/Home";
import { getProducts_API } from "./api/productsAPI";

// ? lazy
const SignIn = withSuspense(React.lazy(() => import("./pages/SignIn")));
const SignUp = withSuspense(React.lazy(() => import("./pages/SignUp")));
const About = withSuspense(React.lazy(() => import("./pages/About")));
const AllCategories = withSuspense(
  React.lazy(() => import("./pages/AllCategories"))
);
const Contacts = withSuspense(React.lazy(() => import("./pages/Contacts")));

const App = () => {
  const { i18n } = useTranslation();
  const auth = getAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            displayName: user.displayName,
            email: user.email,
            isAuth: true,
            phoneNumber: user.phoneNumber,
            uid: user.uid,
          })
        );
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    i18n.changeLanguage(i18n.language.slice(0, 2));
    // removes full locales ("en-US" => "en")
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
          <Route path="all-categories" element={<AllCategories />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
