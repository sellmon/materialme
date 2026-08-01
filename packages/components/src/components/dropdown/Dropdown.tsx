"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";
import { DropdownItem } from "./DropdownItem";

export interface DropdownProps {
  children: ReactNode;
  className?: string;
  menu?: ReactNode;
  apart?: boolean;
}

function DropdownRoot({ children, className, menu, apart }: DropdownProps) {
  const [isActive, setIsActive] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapper.current?.contains(target) ||
        dropdown.current?.contains(target)
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
      ref={wrapper}
      onClick={() => setIsActive((open) => !open)}
      className={cn(
        "relative flex w-fit cursor-pointer appearance-none",
        className
      )}
    >
      {children}
      <div
        ref={dropdown}
        className={cn(
          "absolute top-full z-30 mb-[4px] flex w-full flex-col",
          !isActive && "hidden"
        )}
      >
        <div
          className={cn(
            "z-50 flex max-h-[310px] min-w-max animate-transition-top flex-col overflow-hidden overflow-y-auto rounded-b-[8px] bg-surface-container py-[8px] shadow-mm-1",
            apart && "mt-[4px] rounded-[8px]"
          )}
        >
          {menu}
        </div>
      </div>
    </div>
  );
}

DropdownRoot.displayName = "Dropdown";

const Dropdown = Object.assign(DropdownRoot, { Item: DropdownItem });

export { Dropdown };
