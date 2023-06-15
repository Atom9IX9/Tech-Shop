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
import initLocalization from "./translate/localization";

// ? react init
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

// ? localization init
initLocalization();
