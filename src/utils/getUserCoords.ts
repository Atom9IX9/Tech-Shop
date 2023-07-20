export const getUserCoords = (coordsHandler: TCoordsHandler) => {
  const success = async ({ coords }: TPosition) => {
    coordsHandler(coords);
  };
  const err = (err: any) => {};
  navigator.geolocation.getCurrentPosition(success, err);
}

type TPosition = {
  coords: TCoords
}
export type TCoords = {
  latitude: number;
  longitude: number
}
type TCoordsHandler = (coords: TCoords) => any