"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

const extendedFabStyles = {
  default: [
    "flex h-14 w-max items-center justify-center gap-3 rounded-large px-4 py-4 text-label-large disabled:opacity-30",
    "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
  ],
  variants: {
    surface:
      "bg-primary-container text-on-primary-container hover:bg-primary-container-hover",
    secondary:
      "bg-secondary-container text-on-secondary-container hover:bg-secondary-container-hover",
    tertiary:
      "bg-tertiary-container text-on-tertiary-container hover:bg-tertiary-container-hover",
  },
} as const;

export interface ExtendedFABProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  variant?: keyof typeof extendedFabStyles.variants;
}

const ExtendedFAB = forwardRef<HTMLButtonElement, ExtendedFABProps>(
  (
    {
      children,
      className,
      icon,
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
        className={cn(
          extendedFabStyles.default,
          extendedFabStyles.variants[variant],
          className
        )}
        {...props}
      >
        {icon ? <Icon icon={icon} /> : null}
        {children}
      </button>
    );
  }
);

ExtendedFAB.displayName = "ExtendedFAB";

export { ExtendedFAB };
