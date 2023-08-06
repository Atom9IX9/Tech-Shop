import appReducer from "./appReducer";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  products: productsReducer
});

export default rootReducer;
