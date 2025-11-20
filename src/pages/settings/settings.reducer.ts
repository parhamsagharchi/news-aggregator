import type { INewsConfiguration } from "@/store/store.types";
import type { TSettingsFormAction } from "./settings.types";

export const settingsFormReducer = (
  state: INewsConfiguration,
  action: TSettingsFormAction
): INewsConfiguration => {
  switch (action.type) {
    case "SET_SOURCES":
      return { ...state, sources: action.payload };
    case "SET_CATEGORIES":
      return { ...state, categories: action.payload };
    case "SET_AUTHORS":
      return { ...state, authors: action.payload };
    case "RESET":
      return action.payload;
    default:
      return state;
  }
};
