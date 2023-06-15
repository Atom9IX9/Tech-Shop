import { InferActionTypes } from "./store"

export const initialState = {
  isActiveMenu: false
} 

const appReducer = (state: TInitialState = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case "appReducer/setActiveMenu":
      return { ...state, isActiveMenu: action.active }
    default:
      return state
  }
}

export const actions = {
  setActiveMenu: (active: boolean) => ({
    type: "appReducer/setActiveMenu",
    active
  }) as const,
}

export default appReducer
type TInitialState = typeof initialState
type TActions = InferActionTypes<typeof actions>