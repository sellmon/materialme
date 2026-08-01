"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface DropdownItemProps {
  children?: ReactNode;
  disabled?: boolean;
  id?: string;
  label?: string;
  leftElement?: ReactNode;
  onSelect?: (event: Event) => void;
  rightElement?: ReactNode;
}

function DropdownItem({
  children,
  disabled,
  id,
  label,
  leftElement,
  onSelect,
  rightElement,
}: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      id={id}
      disabled={disabled}
      onSelect={onSelect}
      className={cn(
        "flex h-12 w-full cursor-pointer items-center justify-start px-3 pr-6 text-label-large text-on-surface outline-none",
        "hover:bg-surface-container-high hover:text-on-surface",
        "focus:bg-surface-container-high data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
      )}
    >
      {leftElement ? (
        <span className="pr-3 text-on-surface-variant">{leftElement}</span>
      ) : null}
      <span className="flex w-full">{label || children}</span>
      {rightElement ? (
        <span className="min-w-max pl-7 text-body-small text-on-surface-variant">
          {rightElement}
        </span>
      ) : null}
    </DropdownMenu.Item>
  );
}

DropdownItem.displayName = "DropdownItem";

export { DropdownItem };
