import { forwardRef } from "react";
import clsx from "clsx";
import type { IInputProps, IInputRef } from "./input.types";

const Input = forwardRef((props: IInputProps, ref: IInputRef) => {
  const { size, rounded, ...computedProps } = props;
  return (
    <input
      {...computedProps}
      ref={ref}
      className={clsx([
        "disabled:bg-slate-100 disabled:cursor-not-allowed",
        "[&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed",
        "transition duration-200 ease-in-out w-full text-sm border border-slate-300 shadow-sm rounded-md placeholder:text-slate-400/90 hover:bg-white hover:border-slate-400 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-60 focus:bg-white bg-slate-50",
        size === "sm" ? "text-xs py-1.5 px-2 h-8" : size === "lg" ? "text-lg py-1.5 px-4 h-12" : "py-2.5 px-3 h-10",
        rounded && "rounded-full",
        "[.inline-wrapper_&]:flex-1",
        "[.group-wrapper_&]:rounded-none [.group-wrapper_&]:[&:not(:first-child)]:border-l-transparent [.group-wrapper_&]:first:rounded-l [.group-wrapper_&]:last:rounded-r [.group-wrapper_&]:z-10",
        props.className,
      ])}
    />
  );
});

Input.displayName = "Input";

export default Input;

