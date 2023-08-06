import { TChildren } from "types/types";
import { TUserAuth, initialState } from "reducers/userReducer";
import {
  getUserCity,
  getUserId,
  getUserEmail,
  getUserName,
  getUserSurname,
  getUserRole,
} from "utils/selectors/userSelectors";
import { createContext } from "react";
import { useSelector } from "react-redux";

export const User = createContext(initialState);

const UserContext: React.FC<TProps> = ({ children }) => {
  const user: TUserAuth = {
    name: useSelector(getUserName),
    surname: useSelector(getUserSurname),
    email: useSelector(getUserEmail),
    id: useSelector(getUserId),
    role: useSelector(getUserRole),
    city: useSelector(getUserCity),
  };

  return <User.Provider value={user}>{children}</User.Provider>;
};

export default UserContext;
type TProps = {
  children: TChildren;
};
