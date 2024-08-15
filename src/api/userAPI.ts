import { $host, $authHost } from "./instance";

import { TLng } from "types/types";
import axios, { AxiosResponse } from "axios";

const userAPI = {
  getAddress: async (lat: number, lon: number, lng: TLng) => {
    const url = `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_API_TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`;

    const response: AxiosResponse<TAddress> = await axios.get(url);
    return response.data.address;
  },
  signUp: async (signUpData: TSignUpData) => {
    try {
      const response: AxiosResponse<TUserData> = await $host.post(
        "api/user/sign-up",
        { ...signUpData, password: signUpData.passwordReg }
      );
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  signIn: async (signInData: TSignInData) => {
    try {
      const response: AxiosResponse<TUserData> = await $host.post(
        "api/user/sign-in",
        signInData
      );
      localStorage.setItem("userToken", response.data.token);
      return response.data;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
  checkAuth: async () => {
    try {
      const response: AxiosResponse<TUserData> = await $authHost.get(
        "api/user/auth"
      );
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (err: any) {
      return Promise.reject(err.response.data);
    }
  },
};

export default userAPI;
export type TAddress = {
  address: {
    city?: string;
    town?: string;
  };
};
export type TSignUpData = {
  email: string;
  passwordReg: string;
  name: string;
  surname: string;
  phoneNumber: string;
};
export type TSignInData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type TUserData = {
  token: string;
  user: TUser;
};
export type TUser = {
  id: number;
  email: string;
  role: "ADMIN" | "USER";
  name: string;
  surname: string;
};
