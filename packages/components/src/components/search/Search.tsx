"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

export interface SearchProps {
  children: ReactNode;
  className?: string;
  result?: ReactNode;
}

function Search({ children, className, result }: SearchProps) {
  const [isActive, setIsActive] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);
  const results = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        wrapper.current?.contains(target) ||
        results.current?.contains(target)
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
      onClick={() => setIsActive(true)}
      className={cn(
        "relative z-[30] flex h-fit w-full min-w-[280px] max-w-[720px] cursor-pointer bg-surface-container-low",
        isActive ? "rounded-t-[32px]" : "rounded-full",
        className
      )}
    >
      {children}
      <div
        ref={results}
        className={cn(
          "absolute -left-0 top-full mb-[4px] flex w-full flex-col",
          !isActive && "hidden"
        )}
      >
        <div className="flex max-h-[310px] animate-transition-top flex-col overflow-hidden overflow-y-auto rounded-b-[32px] bg-surface-container-low py-[8px]">
          {result}
        </div>
      </div>
    </div>
  );
}

Search.displayName = "Search";

export { Search };
