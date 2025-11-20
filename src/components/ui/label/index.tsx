import clsx from "clsx";
import type { ILabelProps } from "./label.types";

function Label(props: ILabelProps) {
  return (
    <label
      {...props}
      className={clsx([
        "inline-block mb-2",
        "[.inline-wrapper_&]:mb-2 [.inline-wrapper_&]:sm:mb-0 [.inline-wrapper_&]:sm:mr-5 [.inline-wrapper_&]:sm:text-right",
        props.className,
      ])}
    >
      {props.children}
    </label>
  );
}

export default Label;

