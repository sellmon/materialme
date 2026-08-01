"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

export interface FABProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "small" | "medium" | "large";
  variant?: "surface" | "secondary" | "tertiary";
}

const sizeClass = {
  small: "fabSmall",
  medium: "fab",
  large: "fabLarge",
} as const;

const FAB = forwardRef<HTMLButtonElement, FABProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      icon,
      onClick,
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
        className={cn(sizeClass[size], `fab-${variant}`, className)}
        onClick={onClick}
        {...props}
      >
        <Icon icon={icon} />
      </button>
    );
  }
);

FAB.displayName = "FAB";

export { FAB };
