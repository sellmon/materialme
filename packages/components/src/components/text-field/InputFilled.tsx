"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

export interface InputFilledProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const InputFilled = forwardRef<HTMLInputElement, InputFilledProps>(
  (
    {
      className,
      id,
      leftElement,
      name,
      placeholder = "Placeholder",
      rightElement,
      type = "text",
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className="relative flex w-full rounded-t-[8px]">
        {leftElement ? (
          <div className="absolute flex h-[56px] w-[56px] items-center justify-center text-on-surface-variant">
            {leftElement}
          </div>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(
            "peer flex h-[56px] w-full rounded-t-[8px] border-x-0 border-b-2 border-t-0 border-on-surface-variant bg-surface-container px-[12px] pt-[24px] text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-primary focus:outline-none",
            leftElement && "pl-[60px]",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "pointer-events-none absolute -top-[-6px] cursor-text text-body-small text-on-surface-variant transition-all",
            "peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-body-medium",
            "peer-focus:-top-[-6px] peer-focus:text-body-small",
            leftElement ? "left-[48px] px-[12px]" : "left-[12px]"
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className="absolute right-[8px] flex h-[56px] w-[56px] items-center justify-end text-on-surface">
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);

InputFilled.displayName = "InputFilled";

export { InputFilled };
