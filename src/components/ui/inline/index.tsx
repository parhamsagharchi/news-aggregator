import clsx from "clsx";
import type { IInlineProps } from "./inline.types";

function Inline(props: IInlineProps) {
  return (
    <div
      {...props}
      className={clsx([
        "inline-wrapper block sm:flex items-center",
        props.className,
      ])}
    >
      {props.children}
    </div>
  );
}

export default Inline;

