"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

const inputOutlinedStyles = {
  root: "relative flex w-full rounded-t-small",
  leftElement:
    "absolute flex h-14 w-14 items-center justify-center text-on-surface-variant",
  input: {
    default:
      "peer flex h-full w-full rounded-small border border-outline bg-inherit px-3 pt-6 text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-primary focus:outline-none",
    withLeft: "pl-15",
  },
  label: {
    default: [
      "pointer-events-none absolute top-1.5 cursor-text text-body-small text-on-surface-variant transition-all",
      "peer-placeholder-shown:top-4.25 peer-placeholder-shown:text-body-medium",
      "peer-focus:top-1.5 peer-focus:text-body-small",
    ],
    withLeft: "left-12 px-3",
    withoutLeft: "left-3",
  },
  rightElement:
    "absolute right-2 flex h-14 w-fit items-center justify-end text-on-surface",
} as const;

export interface InputOutlinedProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const InputOutlined = forwardRef<HTMLInputElement, InputOutlinedProps>(
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
      <div className={inputOutlinedStyles.root}>
        {leftElement ? (
          <div className={inputOutlinedStyles.leftElement}>{leftElement}</div>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(
            inputOutlinedStyles.input.default,
            leftElement && inputOutlinedStyles.input.withLeft,
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            inputOutlinedStyles.label.default,
            leftElement
              ? inputOutlinedStyles.label.withLeft
              : inputOutlinedStyles.label.withoutLeft
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className={inputOutlinedStyles.rightElement}>{rightElement}</div>
        ) : null}
      </div>
    );
  }
);

InputOutlined.displayName = "InputOutlined";

export { InputOutlined };
