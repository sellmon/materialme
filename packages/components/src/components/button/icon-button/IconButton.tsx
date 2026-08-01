"use client";

import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEventHandler,
  ReactNode,
} from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  variant?: "filled" | "tonal" | "outlined" | "standard";
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      "aria-label": ariaLabel,
      className,
      disabled,
      icon,
      onClick,
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
        className={cn("iconBtn", `iconBtn-${variant}`, className)}
        disabled={disabled}
        onClick={onClick}
        {...props}
      >
        <Icon icon={icon} />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
