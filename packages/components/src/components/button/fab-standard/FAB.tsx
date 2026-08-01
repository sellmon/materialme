"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

const fabStyles = {
  default: [
    "flex items-center gap-3 disabled:opacity-30",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  sizes: {
    small: "h-10 w-10 rounded-medium px-2 py-2",
    medium: "h-14 w-14 rounded-large px-4 py-4",
    large:
      "h-24 w-24 items-center justify-center rounded-large px-7.5 py-7.5",
  },
  variants: {
    surface:
      "bg-primary-container text-on-primary-container hover:bg-primary-container-hover",
    secondary:
      "bg-secondary-container text-on-secondary-container hover:bg-secondary-container-hover",
    tertiary:
      "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container-hover",
  },
} as const;

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  size?: keyof typeof fabStyles.sizes;
  variant?: keyof typeof fabStyles.variants;
}

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      icon,
      size = "medium",
      type = "button",
      variant = "surface",
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
          fabStyles.default,
          fabStyles.sizes[size],
          fabStyles.variants[variant],
          className
        )}
        {...props}
      >
        <Icon icon={icon} />
      </button>
    );
  }
);

FAB.displayName = "FAB";

export { FAB };
