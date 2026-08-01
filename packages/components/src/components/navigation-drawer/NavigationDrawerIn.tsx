"use client";

import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { type OpenStateProps, resolveOpenState } from "../../lib/open-state";
import { NavDrawerItem } from "./items/NavDrawerItem";

export interface NavigationDrawerInProps extends OpenStateProps {
  children?: ReactNode;
  className?: string;
}

function NavigationDrawerInRoot({
  children,
  className,
  open,
  onOpenChange,
  isVisible,
  onClose,
}: NavigationDrawerInProps) {
  const { open: resolvedOpen } = resolveOpenState({
    open,
    onOpenChange,
    isVisible,
    onClose,
  });

  if (!resolvedOpen) return null;

  return (
    <nav
      className={cn(
        "sticky left-0 top-0 flex h-screen min-w-[280px] max-w-[360px] flex-col overflow-y-auto bg-surface px-[12px] py-[28px]",
        className
      )}
    >
      {children}
    </nav>
  );
}

NavigationDrawerInRoot.displayName = "NavigationDrawerIn";

const NavigationDrawerIn = Object.assign(NavigationDrawerInRoot, {
  Item: NavDrawerItem,
});

export { NavigationDrawerIn };
