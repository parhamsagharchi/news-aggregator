import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface IMultiSelectProps
  extends Omit<ComponentPropsWithoutRef<"select">, "size" | "children" | "value" | "onChange"> {
  size?: "sm" | "lg";
  children?: ReactNode;
  value?: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement> & { target: { value: string[] } }) => void;
}

