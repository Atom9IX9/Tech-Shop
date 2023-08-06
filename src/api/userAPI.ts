import { $user } from "./instance";

import { TLng } from "types/types";
import axios, { AxiosResponse } from "axios";

const userAPI = {
  getAddress: async (lat: number, lon: number, lng: TLng) => {
    const url = `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_API_TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`;

    const response: AxiosResponse<TAddress> = await axios.get(url);
    return response.data.address;
  },
  signUp: async (signUpData: TSignUpData) => {
    const response: AxiosResponse<TUserData> = await $user.post(
      "sign-up",
      signUpData
    );
    return response.data;
  },
};

export default userAPI;
type TAddress = {
  address: {
    city?: string;
    town?: string;
  };
};
export type TSignUpData = {
  email: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
};
export type TUserData = {
  token: string;
  user: {
    id: number;
    email: string;
    role: "ADMIN" | "USER";
    name: string;
    surname: string;
  };
};
