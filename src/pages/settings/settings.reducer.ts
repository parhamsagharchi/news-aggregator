import type { INewsConfiguration } from "@/store/store.types";
import type { TSettingsFormAction } from "./settings.types";
import { ESettingsFormAction } from "./settings.enum";

export const settingsFormReducer = (
  state: INewsConfiguration,
  action: TSettingsFormAction
): INewsConfiguration => {
  switch (action.type) {
    case ESettingsFormAction.SET_SOURCES:
      return { ...state, sources: action.payload };
    case ESettingsFormAction.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ESettingsFormAction.SET_AUTHORS:
      return { ...state, authors: action.payload };
    case ESettingsFormAction.RESET:
      return action.payload;
    default:
      return state;
  }
};
