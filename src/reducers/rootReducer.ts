import appReducer from "./appReducer";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";
import basketReducer from "./basketReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  products: productsReducer,
  basket: basketReducer
});

export default rootReducer;
