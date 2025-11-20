import type { INewsConfiguration } from "@/store/store.types";

export type TSettingsFormAction =
  | { type: "SET_SOURCES"; payload: INewsConfiguration["sources"] }
  | { type: "SET_CATEGORIES"; payload: INewsConfiguration["categories"] }
  | { type: "SET_AUTHORS"; payload: INewsConfiguration["authors"] }
  | { type: "RESET"; payload: INewsConfiguration };
