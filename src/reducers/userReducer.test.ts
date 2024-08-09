import reducer, {
  checkUserAuth,
  fetchUserLocationByCoords,
  signInUser,
  signOutUser,
  signUpUser,
  TUserAuth,
} from "./userReducer";

import userAPI, {
  TSignInData,
  TSignUpData,
  TUser,
  TUserData,
} from "api/userAPI";
jest.mock("api/userAPI");

export const initialState: TUserAuth = {
  id: 1,
  role: "USER",
  name: "UserName",
  surname: "UserSurname",
  email: "email@gmail.com",
  city: "City 1",
  error: undefined,
  isChecked: false,
};

describe("userSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("signOutUser", () => {
    const newState = reducer(initialState, signOutUser());
    expect(newState.role).toBe("GUEST");
    expect(newState.name).toBe(null);
    expect(newState.surname).toBe(null);
    expect(newState.email).toBe(null);
    expect(newState.id).toBe(null);
  });
  test("fetchUserLocationByCoords", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const mockCoords = { latitude: 51.5074, longitude: -0.1278 };
    const mockLng = "en";
    const mockResponse = { city: "London", town: null };
    (userAPI.getAddress as jest.Mock).mockResolvedValue({
      city: "London",
      town: undefined,
    });

    const thunk = fetchUserLocationByCoords({
      coords: mockCoords,
      lng: mockLng,
    });
    await thunk(dispatch, getState, undefined);
    expect(userAPI.getAddress).toHaveBeenCalledWith(
      mockCoords.latitude,
      mockCoords.longitude,
      mockLng
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );

    expect(startAction.type).toBe("user/fetchAddress/pending");
    expect(successAction.type).toBe("user/fetchAddress/fulfilled");
    expect(successAction.payload).toBe(mockResponse.city);
  });
  test("signUpUser", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockSignUpData: TSignUpData = {
      email: "userEmail@gmail.com",
      name: "UserName1",
      password: "123456",
      phoneNumber: "00000000000",
      surname: "UserSurname1",
    };
    const mockResponse: TUserData = {
      token: "stringwithtoken",
      user: {
        email: mockSignUpData.email,
        id: 2,
        name: mockSignUpData.name,
        role: "ADMIN",
        surname: mockSignUpData.surname,
      },
    };

    (userAPI.signUp as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = signUpUser(mockSignUpData);
    await thunk(dispatch, getState, undefined);
    expect(userAPI.signUp).toHaveBeenCalledWith(mockSignUpData);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("user/sign-up/pending");
    expect(successAction.type).toBe("user/sign-up/fulfilled");
    expect(successAction.payload).toEqual(mockResponse.user);
  });
  test("signInUser", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockSignInData: TSignInData = {
      email: "userEmail@gmail.com",
      password: "123456",
      rememberMe: true,
    };
    const mockResponse: TUserData = {
      token: "stringwithtoken",
      user: {
        email: mockSignInData.email,
        id: 3,
        name: "MyName",
        role: "ADMIN",
        surname: "MySurname",
      },
    };

    (userAPI.signIn as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = signInUser(mockSignInData);
    await thunk(dispatch, getState, undefined);
    expect(userAPI.signIn).toHaveBeenCalledWith(mockSignInData);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("user/sign-in/pending");
    expect(successAction.type).toBe("user/sign-in/fulfilled");
    expect(successAction.payload).toEqual(mockResponse.user);
  });
  test("checkUserAuth", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TUser = {
      email: "userEmail4@gmail.com",
      id: 4,
      name: "MyName4",
      role: "ADMIN",
      surname: "MySurname4",
    };

    (userAPI.checkAuth as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = checkUserAuth();
    await thunk(dispatch, getState, undefined);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("user/checkAuth/pending");
    expect(successAction.type).toBe("user/checkAuth/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
});
