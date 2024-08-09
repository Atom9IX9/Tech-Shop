import appReducer, {
  setActiveMenu,
  setDialog,
  TInitialState,
} from "./appReducer";

const initialState: TInitialState = {
  isActiveMenu: false,
  dialogs: {
    basket: false,
    catalogue: false,
  },
};

describe("appSlice", () => {
  test("setActiveMenu", () => {
    const { isActiveMenu } = appReducer(initialState, setActiveMenu(true));
    expect(isActiveMenu).toBe(true);
  });
  test("setDialog", () => {
    const { dialogs } = appReducer(
      initialState,
      setDialog({ name: "basket", value: true })
    );
    expect(dialogs.basket).toBe(true);
    expect(dialogs.catalogue).toBe(false);
  });
});
