"use client";

import {
  MouseEvent,
  ReactNode,
  useCallback,
  useId,
  useRef,
} from "react";

import { cn } from "../../lib/utils";
import { type OpenStateProps, resolveOpenState } from "../../lib/open-state";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { NavDrawerItem } from "./items/NavDrawerItem";

export interface NavigationDrawerOutProps extends OpenStateProps {
  children?: ReactNode;
  className?: string;
}

function NavigationDrawerOutRoot({
  children,
  className,
  open,
  onOpenChange,
  isVisible,
  onClose,
}: NavigationDrawerOutProps) {
  const scrimId = useId();
  const panelRef = useRef<HTMLElement>(null);
  const { open: resolvedOpen, setOpen } = resolveOpenState({
    open,
    onOpenChange,
    isVisible,
    onClose,
  });

  const close = useCallback(() => setOpen(false), [setOpen]);
  useFocusTrap(resolvedOpen, panelRef, close);

  if (!resolvedOpen) return null;

  const handleScrimClick = (event: MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).id === scrimId) {
      close();
    }
  };

  return (
    <>
      <div
        id={scrimId}
        onClick={handleScrimClick}
        className="fixed inset-0 z-40 flex bg-scrim"
      />
      <nav
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen min-w-[300px] max-w-[360px] transform animate-transition-left flex-col overflow-y-auto rounded-r-[16px] bg-surface px-[12px] py-[28px] outline-none scrollbar-hide",
          className
        )}
      >
        {children}
      </nav>
    </>
  );
}

NavigationDrawerOutRoot.displayName = "NavigationDrawerOut";

const NavigationDrawerOut = Object.assign(NavigationDrawerOutRoot, {
  Item: NavDrawerItem,
});

export { NavigationDrawerOut };
