import { createContext } from "react";
import { TChildren } from "../../types/types";
import { TUserAuth, initialState } from "../../reducers/userReducer";
import { useSelector } from "react-redux";
import {
  getDisplayName,
  getIsAuth,
  getUserCity,
  getUserEmail,
  getUserId,
  getUserPhoneNumber,
} from "../../utils/selectors/userSelectors";

export const User = createContext(initialState);

const UserContext: React.FC<TProps> = ({ children }) => {
  const user: TUserAuth = {
    displayName: useSelector(getDisplayName),
    email: useSelector(getUserEmail),
    isAuth: useSelector(getIsAuth),
    phoneNumber: useSelector(getUserPhoneNumber),
    uid: useSelector(getUserId),
    city: useSelector(getUserCity),
  };

  return <User.Provider value={user}>{children}</User.Provider>;
};

export default UserContext;
type TProps = {
  children: TChildren;
};
