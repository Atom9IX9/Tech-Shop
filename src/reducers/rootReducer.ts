import { combineReducers } from "redux";
import appReducer from "./appReducer";
import userReducer from "./userReducer";
import productsReducer from "./productsReducer";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  products: productsReducer
});

export default rootReducer;
