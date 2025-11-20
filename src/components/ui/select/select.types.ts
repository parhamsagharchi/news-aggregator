import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface ISelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "size" | "children"> {
  size?: "sm" | "lg";
  children?: ReactNode;
}

