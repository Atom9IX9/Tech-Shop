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
import "./i18n"
import Preloader from "./components/UI/Preloader";

// ? react init
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={<Preloader />}>
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();