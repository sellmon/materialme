"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  MouseEvent as ReactMouseEvent,
  MouseEventHandler,
  ReactNode,
} from "react";

import { cn } from "../../lib/utils";
import { Badge } from "../badge/Badge";

export interface OverflowMenuItemProps {
  badge?: boolean;
  badgeText?: string;
  children?: ReactNode;
  disabled?: boolean;
  id?: string;
  label?: string;
  leftElement?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onSelect?: (event: Event) => void;
  rightElement?: ReactNode;
}

function OverflowMenuItem({
  badge,
  badgeText,
  children,
  disabled,
  id,
  label,
  leftElement,
  onClick,
  onSelect,
  rightElement,
}: OverflowMenuItemProps) {
  return (
    <DropdownMenu.Item
      id={id}
      disabled={disabled}
      onSelect={(event) => {
        onSelect?.(event);
        onClick?.(event as unknown as ReactMouseEvent<HTMLDivElement>);
      }}
      className={cn(
        "flex h-12 w-full min-w-[112px] cursor-pointer items-center justify-between px-3 pr-6 text-label-large text-on-surface outline-none",
        "hover:bg-surface-container-highest focus:bg-surface-container-highest",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-40"
      )}
    >
      {leftElement ? (
        <span className="pr-3 text-on-surface-variant">{leftElement}</span>
      ) : null}
      <span className="flex w-full min-w-max text-left">
        {label || children}
      </span>
      {rightElement ? (
        <span className="flex pl-7 text-body-small text-on-surface-variant">
          {rightElement}
        </span>
      ) : null}
      {badge ? (
        <span className="pl-7 text-on-surface-variant">
          <Badge text={badgeText || "New"} />
        </span>
      ) : null}
    </DropdownMenu.Item>
  );
}

OverflowMenuItem.displayName = "OverflowMenuItem";

export { OverflowMenuItem };
