import reducer, {
  addRating,
  createCategory,
  createProduct,
  createProductSubcategory,
  createSubcategory,
  deleteCategory,
  fetchCategories,
  fetchCurrentProduct,
  fetchLikedProductIds,
  fetchMoreProducts,
  FetchProductData,
  fetchProducts,
  fetchProductsWithSubcategory,
  fetchRatedProducts,
  fetchSubcategories,
  fetchViewedProducts,
  likeProduct,
  resetCreateStatuses,
  resetDiscountStatus,
  resetLikedProducts,
  setDiscount,
  setIsInBasket,
  TAddRatingData,
  TCreateProductPayload,
  TCreateProductSubcategoryPayload,
  TFetchPostsPayload,
  TFetchSubcategoriesThunkData,
  TInitialState,
  TLikeProductPayload,
  TSetDiscountData,
  TUpdateProductDescriptionThunkData,
  updateProductDescription,
} from "./productsReducer";
import store from "./store";

import categoriesAPI, {
  CategoryCreateData,
  TMainCategory,
  TSubcategory,
  TSubcategoryCreateData,
} from "api/categoriesAPI";
import productsAPI, {
  TDescriptionData,
  TFullProduct,
  TLikedProductsData,
  TProductCard,
  TProductCreateData,
  TProductLikeData,
  TRateData,
} from "api/productsAPI";
jest.mock("api/productsAPI");
jest.mock("api/categoriesAPI");

const initialState: TInitialState = {
  productCards: [
    {
      categoryCode: "cat1",
      en: "en",
      ua: "ua",
      id: 1,
      imgs: "imgs.jpg",
      price: 2200,
      priceWithDiscount: 2200,
      ru: "ru",
      sale: 0,
    },
    {
      categoryCode: "cat2",
      en: "en1",
      ua: "ua1",
      id: 2,
      imgs: "imgs.jpg1",
      price: 2200,
      priceWithDiscount: 2200,
      ru: "ru1",
      sale: 0,
    },
  ],
  fetchings: {
    like: false,
    categoryCreating: false,
    subcategoryCreating: false,
    subcategoryFetching: false,
    productCreating: false,
    productOpening: false,
    productDescriptionUpdating: false,
    rating: false,
    productsFetching: false,
    productsFetchingMore: false,
    updatingDiscount: false,
  },
  statuses: {
    categoryCreate: "success",
    subcategoryCreate: "success",
    subcategoryFetched: "error",
    productCreate: "success",
    categoryFetched: "success",
    productFetchingById: undefined,
    productDescriptionUpdating: undefined,
    productsFetched: undefined,
    discountUpdated: "success",
  },
  categories: [],
  page: 1,
  pageSize: 21,
  likedProducts: [1, 2, 3, 4],
  currentProduct: {
    addSubcategoryOptions: [
      {
        categoryCode: "cat1",
        code: "sc1",
        en: "en",
        order: 1,
        ru: "ru",
        ua: "ua",
      },
    ],
    categoryCode: "cat1",
    descriptionEn: "den",
    descriptionRu: "dru",
    descriptionUa: "dua",
    en: "en",
    id: 1,
    imgs: "imgs.jpg",
    isInBasket: false,
    likesCount: 1,
    price: 202,
    priceWithDiscount: 200,
    rating: {
      average: 3.5,
      user: 5,
    },
    ru: "ru",
    sale: 0.01,
    subcategories: [
      {
        categoryCode: "cat1",
        code: "sc01",
        en: "en",
        order: 1,
        ru: "ru",
        ua: "ua",
      },
    ],
    ua: "ua",
  },
  isAllLoaded: false,
  viewedProducts: [],
  ratedProducts: [],
};

describe("productsSlice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  //actions
  test("resetLikedProducts", () => {
    const newState = reducer(initialState, resetLikedProducts());
    expect(newState.likedProducts.length).toBe(0);
  });
  test("resetCreateStatuses", () => {
    const newState = reducer(initialState, resetCreateStatuses());
    expect(newState.statuses.productCreate).toBe(undefined);
    expect(newState.statuses.categoryCreate).toBe(undefined);
    expect(newState.statuses.subcategoryCreate).toBe(undefined);
    expect(newState.statuses.subcategoryFetched).toBe(undefined);
    expect(newState.statuses.categoryFetched).toBe(undefined);
  });
  test("setIsInBasket", () => {
    let newState = reducer(initialState, setIsInBasket(true));
    expect(newState.currentProduct?.isInBasket).toBe(true);
    newState = reducer(newState, setIsInBasket(false));
    expect(newState.currentProduct?.isInBasket).toBe(false);
  });
  test("resetDiscountStatus", () => {
    const newState = reducer(initialState, resetDiscountStatus());
    expect(newState.statuses.discountUpdated).toBe(undefined);
  });
  //thunks
  test("fetchProducts", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TFetchPostsPayload = {
      category: "cat1",
      page: 1,
      like: "en",
      likeLng: "en",
    };
    const mockResponse: { count: number; rows: TProductCard[] } = {
      count: 1,
      rows: [
        {
          categoryCode: "cat1",
          en: "en",
          ua: "ua",
          id: 1,
          imgs: "imgs.jpg",
          price: 2200,
          priceWithDiscount: 2200,
          ru: "ru",
          sale: 0,
        },
      ],
    };

    (productsAPI.getAllProducts as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = fetchProducts(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.getAllProducts).toHaveBeenCalledWith(
      mockPayload.category,
      initialState.pageSize,
      mockPayload.page,
      mockPayload.like,
      mockPayload.likeLng
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchProducts/pending");
    expect(successAction.type).toBe("products/fetchProducts/fulfilled");
    expect(successAction.payload).toEqual({
      products: mockResponse,
      page: mockPayload.page,
    });
  });
  test("fetchMoreProducts", async () => {
    const dispatch = jest.fn();
    const mockPayload: Omit<TFetchPostsPayload, "page"> = {
      category: "cat1",
      like: "like",
      likeLng: "en",
    };
    const mockResponse: { count: number; rows: TProductCard[] } = {
      count: 1,
      rows: [
        {
          categoryCode: "cat1",
          en: "en",
          ua: "ua",
          id: 1,
          imgs: "imgs.jpg",
          price: 2200,
          priceWithDiscount: 2200,
          ru: "ru",
          sale: 0,
        },
      ],
    };

    (productsAPI.getAllProducts as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = fetchMoreProducts(mockPayload);
    await thunk(dispatch, store.getState, undefined);
    expect(productsAPI.getAllProducts).toHaveBeenCalledWith(
      mockPayload.category,
      initialState.pageSize,
      store.getState().products.page + 1,
      mockPayload.like,
      mockPayload.likeLng
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchMoreProducts/pending");
    expect(successAction.type).toBe("products/fetchMoreProducts/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchProductsWithSubcategory", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload = "sub1";
    const mockResponse: {
      count: number;
      rows: TProductCard[];
    } = {
      count: 2,
      rows: [
        {
          categoryCode: "cat1",
          en: "en",
          ua: "ua",
          id: 1,
          imgs: "imgs.jpg",
          price: 2200,
          priceWithDiscount: 2200,
          ru: "ru",
          sale: 0,
        },
        {
          categoryCode: "cat2",
          en: "en1",
          ua: "ua1",
          id: 2,
          imgs: "imgs.jpg1",
          price: 2200,
          priceWithDiscount: 2200,
          ru: "ru1",
          sale: 0,
        },
      ],
    };

    (productsAPI.getAllWithSubcategory as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = fetchProductsWithSubcategory(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.getAllWithSubcategory).toHaveBeenCalledWith(mockPayload);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe(
      "products/fetchProductsWithSubcategory/pending"
    );
    expect(successAction.type).toBe(
      "products/fetchProductsWithSubcategory/fulfilled"
    );
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchCurrentProduct", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: FetchProductData = { id: 2, userId: 1 };
    const mockResponse: TFullProduct & { subcategories: TSubcategory[] } = {
      subcategories: [
        {
          categoryCode: "cat1",
          code: "sc1",
          en: "en",
          ua: "ua",
          ru: "ru",
          order: 1,
        },
      ],
      addSubcategoryOptions: [
        {
          categoryCode: "cat1",
          code: "sc1",
          en: "en",
          order: 1,
          ru: "ru",
          ua: "ua",
        },
      ],
      categoryCode: "cat1",
      descriptionEn: "den",
      descriptionRu: "dru",
      descriptionUa: "dua",
      en: "en",
      id: 1,
      imgs: "imgs.jpg",
      isInBasket: false,
      likesCount: 1,
      price: 202,
      priceWithDiscount: 200,
      rating: {
        average: 3.5,
        user: 5,
      },
      ru: "ru",
      sale: 0.01,
      ua: "ua",
    };

    (productsAPI.getProduct as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = fetchCurrentProduct(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.getProduct).toHaveBeenCalledWith(
      mockPayload.id,
      mockPayload.userId
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchOneProduct/pending");
    expect(successAction.type).toBe("products/fetchOneProduct/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchSubcategories", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TFetchSubcategoriesThunkData = {
      categoryCode: "cat1",
      order: 2,
    };
    const mockResponse: TSubcategory[] = [
      {
        categoryCode: "cat1",
        code: "sc1",
        en: "en",
        order: 1,
        ru: "ru",
        ua: "ua",
      },
      {
        categoryCode: "cat2",
        code: "sc2",
        en: "en",
        order: 1,
        ru: "ru",
        ua: "ua",
      },
    ];

    (categoriesAPI.getSubcategoriesWithCategory as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = fetchSubcategories(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(categoriesAPI.getSubcategoriesWithCategory).toHaveBeenCalledWith(
      mockPayload.categoryCode,
      mockPayload.order
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchSubcategories/pending");
    expect(successAction.type).toBe("products/fetchSubcategories/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchCategories", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TMainCategory[] = [
      { code: "cat1", en: "en", icon: "ico.jpg", ru: "ru", ua: "ua" },
    ];

    (categoriesAPI.getMainCategories as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = fetchCategories();
    await thunk(dispatch, getState, undefined);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchCategories/pending");
    expect(successAction.type).toBe("products/fetchCategories/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("createCategory", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: CategoryCreateData = {
      en: "encat",
      ru: "rucat",
      ua: "uacat",
      icon: undefined,
    };
    const mockResponse: TMainCategory = {
      code: mockPayload.en,
      en: mockPayload.en,
      ua: mockPayload.ua,
      ru: mockPayload.ru,
      icon: "ico.jpg",
    };

    (categoriesAPI.createMainCategory as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = createCategory(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(categoriesAPI.createMainCategory).toHaveBeenCalledWith(mockPayload);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/createCategory/pending");
    expect(successAction.type).toBe("products/createCategory/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("createSubcategory", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TSubcategoryCreateData = {
      en: "encat",
      ru: "rucat",
      ua: "uacat",
      categoryCode: "cat1",
      order: 2,
    };
    const mockResponse: TSubcategory = {
      code: mockPayload.en,
      en: mockPayload.en,
      ua: mockPayload.ua,
      ru: mockPayload.ru,
      categoryCode: mockPayload.categoryCode,
      order: mockPayload.order,
    };

    (categoriesAPI.createSubcategory as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = createSubcategory(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(categoriesAPI.createSubcategory).toHaveBeenCalledWith(mockPayload);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/createSubcategory/pending");
    expect(successAction.type).toBe("products/createSubcategory/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("createProduct", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TCreateProductPayload = {
      data: {
        category: "cat1",
        en: "en",
        ua: "ua",
        ru: "ru",
        price: "200",
        imgs: undefined,
      },
    };
    const mockResponse: TProductCard = {
      categoryCode: mockPayload.data.category,
      en: "en",
      ua: "ua",
      ru: "ru",
      id: 1,
      imgs: "img1.jpg",
      price: 200,
      priceWithDiscount: 200,
      sale: 0,
    };

    (productsAPI.createProduct as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = createProduct(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.createProduct).toHaveBeenCalledWith(mockPayload.data);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/createProduct/pending");
    expect(successAction.type).toBe("products/createProduct/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("updateProductDescription", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TUpdateProductDescriptionThunkData = {
      data: {
        en: "en",
        ua: "ua",
        ru: "ru",
      },
      productId: 1,
    };
    const mockResponse: TDescriptionData = {
      en: mockPayload.data.en,
      ua: mockPayload.data.ua,
      ru: mockPayload.data.ru,
    };

    (productsAPI.updateDescription as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = updateProductDescription(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.updateDescription).toHaveBeenCalledWith(
      mockPayload.data,
      mockPayload.productId
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/updateDescription/pending");
    expect(successAction.type).toBe("products/updateDescription/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("likeProduct", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TLikeProductPayload = {
      id: 1,
      method: "ADD",
    };
    const mockResponse: TProductLikeData = {
      productId: 1,
    };

    (productsAPI.like as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = likeProduct(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.like).toHaveBeenCalledWith(
      mockPayload.id,
      mockPayload.method
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/likeProduct/pending");
    expect(successAction.type).toBe("products/likeProduct/fulfilled");
    expect(successAction.payload).toEqual({
      likedProduct: mockResponse,
      method: mockPayload.method,
    });
  });
  test("addRating", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload: TAddRatingData = {
      productId: 1,
      rate: 4,
    };
    const mockResponse: TRateData = {
      averageRating: 4.5,
      productId: 1,
      rate: 4,
    };

    (productsAPI.addRate as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = addRating(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.addRate).toHaveBeenCalledWith(
      mockPayload.productId,
      mockPayload.rate
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/addRating/pending");
    expect(successAction.type).toBe("products/addRating/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchLikedProductIds", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TLikedProductsData = {
      likedProductIds: [1, 2, 5],
    };

    (productsAPI.getLikedProductIds as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = fetchLikedProductIds();
    await thunk(dispatch, getState, undefined);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchLikedProductIds/pending");
    expect(successAction.type).toBe("products/fetchLikedProductIds/fulfilled");
    expect(successAction.payload).toEqual(mockResponse.likedProductIds);
  });
  test("deleteCategory", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockPayload = "cat1";
    const mockResponse = { deleted: true };

    (categoriesAPI.deleteCategory as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = deleteCategory(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(categoriesAPI.deleteCategory).toHaveBeenCalledWith(mockPayload);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/deleteCategory/pending");
    expect(successAction.type).toBe("products/deleteCategory/fulfilled");
    expect(successAction.payload).toEqual(mockPayload);
  });
  test("setDiscount", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse = {
      discount: 0.1,
      priceWithDiscount: 900,
    };
    const mockPayload: TSetDiscountData = {
      productId: 1,
      discountPercent: 0.1,
      dropTo: 900,
    };

    (productsAPI.setDiscount as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = setDiscount(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(productsAPI.setDiscount).toHaveBeenCalledWith(
      mockPayload.productId,
      mockPayload.discountPercent,
      mockPayload.dropTo
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/setDiscount/pending");
    expect(successAction.type).toBe("products/setDiscount/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("createProductSubcategory", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse = undefined;
    const mockPayload: TCreateProductSubcategoryPayload = {
      order: 1,
      productId: 1,
      subcategory: {
        categoryCode: "cat",
        code: "sc",
        en: "en",
        order: 1,
        ru: "ru",
        ua: "ua",
      },
    };

    (categoriesAPI.createProductSubcategory as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = createProductSubcategory(mockPayload);
    await thunk(dispatch, getState, undefined);
    expect(categoriesAPI.createProductSubcategory).toHaveBeenCalledWith(
      mockPayload.subcategory.code,
      mockPayload.productId
    );

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/createProductSubcategory/pending");
    expect(successAction.type).toBe(
      "products/createProductSubcategory/fulfilled"
    );
    expect(successAction.payload).toEqual({
      ...mockPayload.subcategory,
      order: mockPayload.order,
    });
  });
  test("fetchViewedProducts", async () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const mockResponse: TProductCard[] = [
      {
        categoryCode: "cat1",
        en: "en",
        ua: "ua",
        ru: "ru",
        price: 100,
        id: 1,
        imgs: "ing.jpg",
        priceWithDiscount: 100,
        sale: 0,
      },
    ];

    (productsAPI.getViewedProducts as jest.Mock).mockResolvedValue(
      mockResponse
    );

    const thunk = fetchViewedProducts();
    await thunk(dispatch, getState, undefined);

    const [startAction, successAction] = dispatch.mock.calls.map(
      (call) => call[0]
    );
    expect(startAction.type).toBe("products/fetchViewedProducts/pending");
    expect(successAction.type).toBe("products/fetchViewedProducts/fulfilled");
    expect(successAction.payload).toEqual(mockResponse);
  });
  test("fetchRatedProducts", async () => {
    const dispatch = jest.fn()
    const getState = jest.fn()
    const mockResponse: TProductCard[] = [
      {
        categoryCode: "cat2",
        en: "en1",
        ua: "ua1",
        id: 2,
        imgs: "imgs.jpg1",
        price: 2200,
        priceWithDiscount: 2200,
        ru: "ru1",
        sale: 0,
      }
    ];

    (productsAPI.getRatedProducts as jest.Mock).mockResolvedValue(mockResponse);

    const thunk = fetchRatedProducts()
    await thunk(dispatch, getState, undefined)

    const [startAction, successAction] = dispatch.mock.calls.map(call => call[0]);
    expect(startAction.type).toBe("products/fetchRatedProducts/pending");
    expect(successAction.type).toBe("products/fetchRatedProducts/fulfilled");
    expect(successAction.payload).toBe(mockResponse);
  })
});
