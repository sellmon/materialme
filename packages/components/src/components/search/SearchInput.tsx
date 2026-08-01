"use client";

import {
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";

import { cn } from "../../lib/utils";

export interface SearchInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      id,
      leftElement,
      name,
      placeholder = "Search",
      rightElement,
      type = "search",
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const inputId = id ?? reactId;

    return (
      <div className="relative flex w-full">
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
            "peer flex h-[56px] w-full border-0 bg-surface-container-low px-[12px] pt-[24px] text-body-medium text-on-surface shadow-none placeholder-transparent focus:outline-none",
            leftElement ? "rounded-full pl-[56px]" : "rounded-t-[8px]",
            className
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute -top-[-6px] cursor-text text-body-small text-on-surface-variant transition-all",
            "peer-placeholder-shown:top-[17px] peer-placeholder-shown:text-body-medium",
            "peer-focus:-top-[-6px] peer-focus:text-body-small",
            leftElement ? "left-[44px] px-[12px]" : "left-[12px]"
          )}
        >
          {placeholder}
        </label>
        {rightElement ? (
          <div className="absolute right-0 flex h-[56px] w-[56px] items-center justify-end px-[16px] text-on-surface-variant">
            {rightElement}
          </div>
        ) : null}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
