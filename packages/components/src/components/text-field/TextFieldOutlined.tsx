"use client";

import {
  forwardRef,
  ReactNode,
  TextareaHTMLAttributes,
  useId,
} from "react";

import { cn } from "../../lib/utils";

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
            "peer flex w-full rounded-[8px] border border-outline bg-inherit px-[12px] pr-[48px] pt-[26px] text-body-medium text-on-surface shadow-none placeholder-transparent focus:border-outline-variant focus:outline-none sm:pt-[28px]",
            leftElement && "pl-[60px]",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute top-[4px] cursor-text rounded-br-[8px] rounded-tl-[8px] px-[12px] pb-[6px] pt-[6px] text-body-small text-on-surface-variant transition-all",
            "peer-placeholder-shown:top-[8px] peer-placeholder-shown:text-body-medium",
            "peer-focus:top-[1px] peer-focus:text-body-small",
            leftElement
              ? "left-[48px] rounded-b-[8px] rounded-tl-none"
              : "left-[1px]"
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

TextFieldOutlined.displayName = "TextFieldOutlined";

export { TextFieldOutlined };
