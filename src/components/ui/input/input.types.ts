import type {
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
} from "react";

export interface IInputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  size?: "sm" | "lg";
  rounded?: boolean;
}

export type IInputRef = ComponentPropsWithRef<"input">["ref"];

