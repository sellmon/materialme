"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import { OverflowMenuItem } from "./OverflowMenuItem";

export interface OverflowMenuProps {
  bottomLeft?: boolean;
  bottomRight?: boolean;
  children?: ReactNode;
  menu?: ReactNode;
  overflow?: string;
  topLeft?: boolean;
  topRight?: boolean;
}

function OverflowMenuRoot({
  bottomLeft,
  bottomRight,
  children,
  menu,
  overflow = "overflow-y-auto",
  topLeft,
  topRight,
}: OverflowMenuProps) {
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapperRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setIsActive(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isActive]);

  return (
    <div
      ref={wrapperRef}
      onClick={() => setIsActive((open) => !open)}
      className="relative flex w-fit cursor-pointer"
    >
      {children}
      <div
        ref={menuRef}
        className={cn(
          "absolute z-20 my-[8px] flex max-h-[310px] min-w-max max-w-[280px] flex-col animate-fade-in rounded-[8px] bg-surface-container-high py-[8px] shadow-mm-1",
          overflow,
          !isActive && "hidden",
          topRight && "bottom-full right-0",
          topLeft && "bottom-full left-0",
          bottomRight && "right-0 top-full",
          bottomLeft && "left-0 top-full"
        )}
      >
        {menu}
      </div>
    </div>
  );
}

OverflowMenuRoot.displayName = "OverflowMenu";

const OverflowMenu = Object.assign(OverflowMenuRoot, {
  Item: OverflowMenuItem,
});

export { OverflowMenu };
