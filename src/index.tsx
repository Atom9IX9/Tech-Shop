// ? react
import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// ? redux
import { Provider } from "react-redux";
import store from "./reducers/store";
// ? localization
import "./i18n";
import { BrowserRouter } from "react-router-dom";

import "./firebase";
import UserContext from "./components/contexts/UserContext";
import Loader from "./components/Loader/Loader";

// ? react init
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <React.Suspense fallback={<Loader />}>
          <UserContext>
            <App />
          </UserContext>
        </React.Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
