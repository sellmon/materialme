"use client";

import {
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from "react";

import { cn } from "../../lib/utils";

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
      <div className="relative flex w-full rounded-t-[8px]">
        {leftElement ? (
          <div className="absolute flex h-[56px] w-[56px] items-center justify-center text-on-surface-variant">
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
            "peer flex w-full rounded-t-[8px] border-x-0 border-b-2 border-t-0 border-outline bg-surface-container-low px-[12px] pr-[48px] pt-[26px] text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-primary focus:outline-none sm:pt-[28px]",
            leftElement && "pl-[60px]",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute top-0 cursor-text rounded-br-[8px] rounded-tl-[8px] bg-surface-container-low px-[12px] pb-[6px] pt-[6px] text-body-small text-on-surface-variant transition-all",
            "peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-body-medium",
            "peer-focus:top-0 peer-focus:text-body-small",
            leftElement && "left-[48px]"
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className="absolute right-2 flex h-[56px] w-[56px] items-center justify-end text-on-surface">
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);

TextFieldFilled.displayName = "TextFieldFilled";

export { TextFieldFilled };
