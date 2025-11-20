import LitepickerJs from "litepicker";
import type { ILPConfiguration } from "litepicker/dist/types/interfaces";

export interface LitepickerElement extends HTMLInputElement {
  litePickerInstance: LitepickerJs;
}

export type LitepickerConfig = Partial<ILPConfiguration>;

export interface LitepickerProps
  extends React.PropsWithChildren,
    Omit<React.ComponentPropsWithoutRef<"input">, "onChange"> {
  options: {
    format?: string | undefined;
  } & LitepickerConfig;
  onChange: (e: {
    target: {
      value: string;
    };
  }) => void;
  value?: string;
  getRef?: (el: LitepickerElement) => void;
}

