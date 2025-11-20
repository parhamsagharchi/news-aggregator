import type { INewsConfiguration } from "@/store/store.types";
import type { ESettingsFormAction } from "./settings.enum";

export type TSettingsFormAction =
  | {
      type: ESettingsFormAction.SET_SOURCES;
      payload: INewsConfiguration["sources"];
    }
  | {
      type: ESettingsFormAction.SET_CATEGORIES;
      payload: INewsConfiguration["categories"];
    }
  | {
      type: ESettingsFormAction.SET_AUTHORS;
      payload: INewsConfiguration["authors"];
    }
  | { type: ESettingsFormAction.RESET; payload: INewsConfiguration };
