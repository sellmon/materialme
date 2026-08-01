"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "children"> {
  children?: ReactNode;
  color?: string;
  label?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      "aria-label": ariaLabel,
      checked,
      children,
      className,
      color = "text-on-surface-variant",
      defaultChecked,
      disabled,
      id,
      label,
      name,
      onChange,
      value,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className="flex flex-row items-center gap-[4px]">
        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-500 hover:bg-surface-container-highest/30">
          <input
            ref={ref}
            type="radio"
            id={inputId}
            name={name}
            onChange={onChange}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-label={ariaLabel ?? (typeof label === "string" ? label : undefined)}
            className={cn(
              "form-radio h-5 w-5 cursor-pointer appearance-none rounded-full border-none bg-surface-container-low text-secondary-container shadow-none checked:bg-current checked:text-inverse-primary",
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

Radio.displayName = "Radio";

export { Radio };
