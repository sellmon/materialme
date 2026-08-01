"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { DropdownItem } from "./DropdownItem";


export interface DropdownProps {
  apart?: boolean;
  children: ReactNode;
  className?: string;
  menu?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
}

function DropdownRoot({
  apart,
  children,
  className,
  menu,
  onOpenChange,
  open,
}: DropdownProps) {
  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild className={className}>
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={apart ? 4 : 0}
          className={cn(
            "z-50 flex max-h-[310px] min-w-max flex-col overflow-hidden overflow-y-auto rounded-b-small bg-surface-container py-2 shadow-mm-1 animate-transition-top",
            apart && "rounded-small"
          )}
        >
          {menu}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

DropdownRoot.displayName = "Dropdown";

const Dropdown = Object.assign(DropdownRoot, { Item: DropdownItem });

export { Dropdown };
