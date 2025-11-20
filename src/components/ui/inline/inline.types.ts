import type { ComponentPropsWithoutRef, PropsWithChildren } from "react";

export interface IInlineProps
  extends PropsWithChildren,
    ComponentPropsWithoutRef<"div"> {}

