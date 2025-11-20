import { forwardRef } from "react";
import clsx from "clsx";
import type { IButtonProps } from "./button.types";
import { buttonStyles } from "./button.styles";

const Button = forwardRef<HTMLButtonElement, IButtonProps<"button">>(
  (props, ref) => {
    const {
      as: Component = "button",
      size,
      variant = "primary",
      elevated,
      rounded,
      children,
      className,
      ...restProps
    } = props;

    const variantStyles = buttonStyles.variant[variant] || [];
    const variantClasses = Array.isArray(variantStyles)
      ? variantStyles
      : [variantStyles];

    return (
      <Component
        {...restProps}
        ref={ref}
        className={clsx([
          buttonStyles.base,
          size && buttonStyles.size[size],
          variantClasses,
          rounded ? "!rounded-full" : "",
          elevated && "shadow-md",
          className,
        ])}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
