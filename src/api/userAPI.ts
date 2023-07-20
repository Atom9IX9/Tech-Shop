import { TLng } from "../types/types";
import axios, { AxiosResponse } from "axios";

const userAPI = {
  getAddress: async (lat: number, lon: number, lng: TLng) => {
    const url = `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_LOCATION_API_TOKEN}&lat=${lat}&lon=${lon}&format=json&accept-language=${lng}`;

    const response: AxiosResponse<TAddress> = await axios.get(url);
    return response.data.address;
  },
};

export default userAPI;
type TAddress = {
  address: {
    city?: string;
    town?: string;
  };
};
