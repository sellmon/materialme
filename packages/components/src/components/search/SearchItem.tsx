import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface SearchItemProps {
  children?: ReactNode;
  className?: string;
  id?: string;
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
}

function SearchItem({
  children,
  className,
  id,
  label,
  leftElement,
  rightElement,
}: SearchItemProps) {
  return (
    <div id={id} className={cn("flex items-start", className)}>
      <div className="flex h-[48px] w-full cursor-pointer items-center justify-start bg-surface-container-low px-[16px] text-label-large text-on-surface hover:bg-surface-container-lowest hover:text-on-surface">
        {leftElement ? (
          <div className="pr-[16px] text-on-surface-variant">{leftElement}</div>
        ) : null}
        <p className="flex w-full items-center gap-[16px] truncate">
          {label || children}
        </p>
        {rightElement ? (
          <div className="min-w-max pl-[28px] text-body-small text-on-surface-variant">
            {rightElement}
          </div>
        ) : null}
      </div>
    </div>
  );
}

SearchItem.displayName = "SearchItem";

export { SearchItem };
