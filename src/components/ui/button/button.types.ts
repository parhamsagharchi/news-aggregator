import type { ComponentPropsWithoutRef, ElementType } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline-primary"
  | "outline-secondary"
  | "soft-primary"
  | "soft-secondary";

export type ButtonSize = "sm" | "lg";

export type IButtonProps<E extends ElementType = "button"> = Omit<
  ComponentPropsWithoutRef<E>,
  "size"
> & {
  as?: E;
  variant?: ButtonVariant;
  elevated?: boolean;
  size?: ButtonSize;
  rounded?: boolean;
};
