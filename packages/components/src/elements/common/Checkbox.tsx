"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> {
  children?: ReactNode;
  color?: string;
  label?: string;
  padding?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      "aria-label": ariaLabel,
      checked,
      children,
      className,
      color = "text-inverse-primary",
      defaultChecked,
      disabled,
      id,
      label,
      name,
      onChange,
      padding,
      value,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className={cn("flex flex-row items-center gap-[4px]", padding)}>
        <div className="flex h-[40px] w-[40px] flex-row items-center justify-center rounded-full transition-all duration-500 hover:bg-surface-container-highest/30">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            name={name}
            onChange={onChange}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
            className={cn(
              "h-[20px] w-[20px] cursor-pointer rounded-[6px] border-0 bg-surface-container-highest shadow-none transition-all duration-150",
              color,
              className
            )}
            {...props}
          />
        </div>
        {label || children ? (
          <label htmlFor={inputId} className="cursor-pointer text-body-small text-on-surface">
            {label || children}
          </label>
        ) : null}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
