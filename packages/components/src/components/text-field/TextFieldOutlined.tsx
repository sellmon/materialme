"use client";

import {
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from "react";

import { cn } from "../../lib/utils";

const textFieldOutlinedStyles = {
  root: "relative flex w-full rounded-t-small",
  leftElement:
    "absolute flex h-14 w-14 items-center justify-center text-on-surface-variant",
  field: {
    default:
      "peer flex w-full rounded-small border border-outline bg-inherit px-3 pr-12 pt-6.5 text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-outline-variant focus:outline-none sm:pt-7",
    withLeft: "pl-15",
  },
  label: {
    default: [
      "absolute top-1 cursor-text rounded-br-small rounded-tl-small px-3 pb-1.5 pt-1.5 text-body-small text-on-surface-variant transition-all",
      "peer-placeholder-shown:top-2 peer-placeholder-shown:text-body-medium",
      "peer-focus:top-px peer-focus:text-body-small",
    ],
    withLeft: "left-12 rounded-b-small rounded-tl-none",
    withoutLeft: "left-px",
  },
  rightElement:
    "absolute right-2 flex h-14 w-14 items-center justify-end text-on-surface",
} as const;

export interface TextFieldOutlinedProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const TextFieldOutlined = forwardRef<
  HTMLTextAreaElement,
  TextFieldOutlinedProps
>(
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
      <div className={textFieldOutlinedStyles.root}>
        {leftElement ? (
          <div className={textFieldOutlinedStyles.leftElement}>
            {leftElement}
          </div>
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
            textFieldOutlinedStyles.field.default,
            leftElement && textFieldOutlinedStyles.field.withLeft,
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            textFieldOutlinedStyles.label.default,
            leftElement
              ? textFieldOutlinedStyles.label.withLeft
              : textFieldOutlinedStyles.label.withoutLeft
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className={textFieldOutlinedStyles.rightElement}>
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);

TextFieldOutlined.displayName = "TextFieldOutlined";

export { TextFieldOutlined };
