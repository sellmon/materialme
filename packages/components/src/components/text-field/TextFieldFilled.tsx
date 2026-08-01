"use client";

import {
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from "react";

import { cn } from "../../lib/utils";

const textFieldFilledStyles = {
  root: "relative flex w-full rounded-t-small",
  leftElement:
    "absolute flex h-14 w-14 items-center justify-center text-on-surface-variant",
  field: {
    default:
      "peer flex w-full rounded-t-small border-x-0 border-b-2 border-t-0 border-outline bg-surface-container-low px-3 pb-2 pr-12 pt-6.5 text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-primary focus:outline-none sm:pt-7",
    withLeft: "pl-15",
  },
  label: {
    default: [
      "absolute top-0 cursor-text rounded-br-small rounded-tl-small bg-surface-container-low px-3 pb-1.5 pt-1.5 text-body-small text-on-surface-variant transition-all",
      "peer-placeholder-shown:top-1.5 peer-placeholder-shown:text-body-medium",
      "peer-focus:top-0 peer-focus:text-body-small",
    ],
    withLeft: "left-12",
  },
  rightElement:
    "absolute right-2 flex h-14 w-14 items-center justify-end text-on-surface",
} as const;

export interface TextFieldFilledProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const TextFieldFilled = forwardRef<HTMLTextAreaElement, TextFieldFilledProps>(
  (
    {
      className,
      cols,
      id,
      leftElement,
      name,
      placeholder = "Placeholder",
      rightElement,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className={textFieldFilledStyles.root}>
        {leftElement ? (
          <div className={textFieldFilledStyles.leftElement}>{leftElement}</div>
        ) : null}
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          cols={cols}
          rows={rows}
          autoComplete="off"
          placeholder={placeholder}
          className={cn(
            textFieldFilledStyles.field.default,
            leftElement && textFieldFilledStyles.field.withLeft,
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            textFieldFilledStyles.label.default,
            leftElement && textFieldFilledStyles.label.withLeft
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className={textFieldFilledStyles.rightElement}>
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);

TextFieldFilled.displayName = "TextFieldFilled";

export { TextFieldFilled };
