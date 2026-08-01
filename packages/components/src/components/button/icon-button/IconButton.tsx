"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

const iconButtonStyles = {
  default: [
    "m-0 flex max-h-10 max-w-10 items-center justify-center gap-3 rounded-full p-2",
    "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-30",
  ],
  variants: {
    filled: "bg-primary text-on-primary hover:bg-primary-hover",
    tonal: "bg-secondary text-on-secondary hover:bg-secondary-hover",
    outlined:
      "border border-on-secondary text-on-secondary hover:bg-secondary-container",
    standard:
      "cursor-pointer text-on-surface hover:bg-surface-container-highest hover:text-on-surface",
  },
} as const;

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  variant?: keyof typeof iconButtonStyles.variants;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      disabled,
      icon,
      type = "button",
      variant = "filled",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={cn(
          iconButtonStyles.default,
          iconButtonStyles.variants[variant],
          className
        )}
        disabled={disabled}
        {...props}
      >
        <Icon icon={icon} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
