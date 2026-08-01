"use client";

import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";

import { cn } from "../../lib/utils";

const chipsStyles = {
  default:
    "flex h-8 w-max cursor-pointer items-center gap-2 rounded-small bg-surface-container-low px-2 text-label-large text-on-surface hover:bg-surface-container-lowest disabled:opacity-30",
} as const;

export interface ChipsProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const Chips = forwardRef<HTMLButtonElement, ChipsProps>(
  (
    {
      children,
      className,
      leftElement,
      rightElement,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(chipsStyles.default, className)}
        {...props}
      >
        {leftElement}
        {children}
        {rightElement}
      </button>
    );
  }
);

Chips.displayName = "Chips";

export { Chips };
