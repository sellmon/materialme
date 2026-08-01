"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

export interface ExtendedFABProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  text?: string;
  variant?: "surface" | "secondary" | "tertiary";
}

const ExtendedFAB = forwardRef<HTMLButtonElement, ExtendedFABProps>(
  (
    {
      children,
      className,
      icon,
      onClick,
      text,
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
        className={cn("fabExtended", `fab-${variant}`, className)}
        onClick={onClick}
        {...props}
      >
        {icon ? <Icon icon={icon} /> : null}
        {children ?? text}
      </button>
    );
  }
);

ExtendedFAB.displayName = "ExtendedFAB";

export { ExtendedFAB };
