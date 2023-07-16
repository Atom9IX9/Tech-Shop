import { TLng } from '../types/types';
import axios, { AxiosResponse } from "axios";

const translate = axios.create({
  headers: {
    "content-type": "application/json",
    "X-RapidAPI-Key": "e8d649c9cdmshde736a181bf251bp1ce1abjsn9dfc0ae041a6",
    "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
  },
});

export const translateString = async (to: TLng, q: string) => {
  if (to === "en") return q

  const options = {
    from: "en",
    to: to === "ua" ? "uk" : to,
    q,
  };
  const response: AxiosResponse<string> = await translate.post(
    "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
    options
  );
  return response.data
}
