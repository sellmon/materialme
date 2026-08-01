"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { OverflowMenuItem } from "./OverflowMenuItem";

export interface OverflowMenuProps {
  bottomLeft?: boolean;
  bottomRight?: boolean;
  children?: ReactNode;
  menu?: ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  overflow?: string;
  topLeft?: boolean;
  topRight?: boolean;
}

function resolvePlacement({
  bottomLeft,
  bottomRight,
  topLeft,
  topRight,
}: Pick<
  OverflowMenuProps,
  "bottomLeft" | "bottomRight" | "topLeft" | "topRight"
>) {
  if (topRight) return { side: "top" as const, align: "end" as const };
  if (topLeft) return { side: "top" as const, align: "start" as const };
  if (bottomLeft) return { side: "bottom" as const, align: "start" as const };
  if (bottomRight) return { side: "bottom" as const, align: "end" as const };
  return { side: "bottom" as const, align: "end" as const };
}

function OverflowMenuRoot({
  bottomLeft,
  bottomRight,
  children,
  menu,
  onOpenChange,
  open,
  overflow = "overflow-y-auto",
  topLeft,
  topRight,
}: OverflowMenuProps) {
  const { side, align } = resolvePlacement({
    bottomLeft,
    bottomRight,
    topLeft,
    topRight,
  });

  return (
    <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            "z-50 flex max-h-[310px] min-w-max max-w-[280px] flex-col rounded-small bg-surface-container-high py-2 shadow-mm-1 animate-fade-in",
            overflow
          )}
        >
          {menu}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

OverflowMenuRoot.displayName = "OverflowMenu";

const OverflowMenu = Object.assign(OverflowMenuRoot, {
  Item: OverflowMenuItem,
});

export { OverflowMenu };
