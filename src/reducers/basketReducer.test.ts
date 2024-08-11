import reducer, {
  deleteBasketProduct,
  fetchBasketProducts,
  resetBasketProducts,
  resetCreatedStatus,
  setBasket,
  setBasketProductCount,
  TInitialState,
  TSetCountData,
} from "./basketReducer";

import basketAPI, { TBasket, TBasketProduct } from "api/basketAPI";
jest.mock("api/basketAPI");

const initialState: TInitialState = {
  basketId: 1,
  basketProducts: [
    {
      count: 1,
      en: "en",
      id: 1,
      imgs: "imgs.jpg",
      price: 1000,
      priceWithDiscount: 900,
      ru: "ru",
      sale: 0.1,
      ua: "ua",
    },
  ],
  basketProductsCount: 1,
  statuses: {
    basketProductCreated: "success",
    basketProductsFetched: "success",
  },
  fetchings: {
    basketProductCreating: true,
    basketProductsFetching: false,
  },
};

describe("basketSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  //actions
  test("resetBasketProducts", () => {
    const newState = reducer(initialState, resetBasketProducts());
    expect(newState.basketProducts.length).toBe(0);
    expect(newState.basketProductsCount).toBe(0);
  });
  test("resetCreatedStatus", () => {
    const newState = reducer(initialState, resetCreatedStatus());
    expect(newState.statuses.basketProductCreated).toBe(undefined);
  });
  //thunks
  test("setBasket", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TBasket = {
      id: 2,
      productsInBasket: 10,
      userId: 1,
    };

    (basketAPI.createBasket as jest.Mock).mockResolvedValue(mockResponse);
    (basketAPI.getBasket as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = setBasket();
    await thunk(dispatch, getState, undefined);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("basket/setBasket/pending");
    expect(successAction.type).toBe("basket/setBasket/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchBasketProducts", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TBasketProduct[] = [
      {
        count: 1,
        en: "en",
        id: 1,
        imgs: "imgs.jpg",
        price: 1000,
        priceWithDiscount: 900,
        ru: "ru",
        sale: 0.1,
        ua: "ua",
      },
      {
        count: 2,
        en: "en",
        id: 2,
        imgs: "imgs.jpg",
        price: 1020,
        priceWithDiscount: 900,
        ru: "ru",
        sale: 0.1,
        ua: "ua",
      },
    ];

    (basketAPI.getBasketProducts as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = fetchBasketProducts(1);
    await thunk(dispatch, getState, undefined);
    expect(basketAPI.getBasketProducts).toHaveBeenCalledWith(1);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("basket/getProducts/pending");
    expect(successAction.type).toBe("basket/getProducts/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("setBasketProductCount", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    const mockPayload: TSetCountData = {
      count: 20,
      productId: 1,
    };
    const mockResponse: TBasketProduct = {
      count: 20,
      en: "en",
      id: 12,
      imgs: "imgs.jpg",
      price: 200,
      priceWithDiscount: 200,
      ru: "ru",
      sale: 0,
      ua: "ua",
    };

    (basketAPI.setBasketProductCount as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = setBasketProductCount(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(basketAPI.setBasketProductCount).toHaveBeenCalledWith(
      mockPayload.count,
      mockPayload.productId
    );

    const [startAction, successAction] = dispatch.mock.calls.map(call => call[0])
    expect(startAction.type).toBe("basket/setCount/pending")
    expect(successAction.type).toBe("basket/setCount/fulfilled")
    expect(successAction.payload).toEqual(mockPayload)
  });
  test("deleteBasketProduct", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponseOrPayload = 12;

    (basketAPI.deleteBasketProduct as jest.Mock).mockResolvedValue(mockResponseOrPayload)

    const thunk = deleteBasketProduct(mockResponseOrPayload);
    await thunk(dispatch, getState, undefined)
    expect(basketAPI.deleteBasketProduct).toHaveBeenCalledWith(mockResponseOrPayload)

    const [startAction, successAction] = dispatch.mock.calls.map(call => call[0])
    expect(startAction.type).toBe("basket/deleteProduct/pending")
    expect(successAction.type).toBe("basket/deleteProduct/fulfilled")
    expect(successAction.payload).toBe(mockResponseOrPayload)
  })
});
