"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

const inputFilledStyles = {
  root: "relative flex w-full rounded-t-small",
  leftElement:
    "absolute flex h-14 w-14 items-center justify-center text-on-surface-variant",
  input: {
    default:
      "peer flex h-14 w-full rounded-t-small border-x-0 border-b-2 border-t-0 border-on-surface-variant bg-surface-container px-3 pt-6 text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-primary focus:outline-none",
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
    "absolute right-2 flex h-14 w-14 items-center justify-end text-on-surface",
} as const;

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
      <div className={inputFilledStyles.root}>
        {leftElement ? (
          <div className={inputFilledStyles.leftElement}>{leftElement}</div>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(
            inputFilledStyles.input.default,
            leftElement && inputFilledStyles.input.withLeft,
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            inputFilledStyles.label.default,
            leftElement
              ? inputFilledStyles.label.withLeft
              : inputFilledStyles.label.withoutLeft
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className={inputFilledStyles.rightElement}>{rightElement}</div>
        ) : null}
      </div>
    );
  }
);

InputFilled.displayName = "InputFilled";

export { InputFilled };
