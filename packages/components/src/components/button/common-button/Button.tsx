"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "../../../lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "outlined" | "elevated" | "text";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className, disabled, variant = "filled", type = "button", ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn("btn", `btn-${variant}`, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
