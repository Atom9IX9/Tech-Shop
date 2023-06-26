import axios, { AxiosResponse} from "axios";
const userAPI = {
  getAddress: async (lat: number, lon: number) => {
    const url = `https://eu1.locationiq.com/v1/reverse?key=${process.env.REACT_APP_ADDRESS_TOKEN}&lat=${lat}&lon=${lon}&format=json`;

    const response: AxiosResponse<TAddress> = await axios.get(url);
    return response.data.address;
  },
};

export default userAPI;
type TAddress = {
  address: {
    city: string
  }
}
