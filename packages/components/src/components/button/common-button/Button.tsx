"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "../../../lib/utils";

const buttonStyles = {
  default: [
    "relative inline-flex h-10 w-max cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-4 py-2.5 text-label-large whitespace-nowrap",
    "[&_svg]:pointer-events-none [&_svg]:size-4.5 [&_svg]:shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-30",
  ],
  variants: {
    filled: "bg-primary text-on-primary hover:bg-primary-hover",
    tonal: "bg-secondary text-on-secondary hover:bg-secondary-hover",
    outlined:
      "border border-on-secondary text-on-secondary hover:bg-secondary-container",
    elevated:
      "bg-surface-container-low text-on-secondary shadow-mm-1 hover:bg-secondary-hover hover:backdrop-blur-sm",
    text: "text-on-secondary hover:bg-secondary-hover hover:backdrop-blur-sm",
  },
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled,
      variant = "filled",
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          buttonStyles.default,
          buttonStyles.variants[variant],
          className
        )}
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
