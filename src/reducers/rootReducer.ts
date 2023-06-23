import { combineReducers } from "redux";
import appReducer from "./appReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer
});

export default rootReducer;
