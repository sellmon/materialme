"use client";

import {
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
} from "react";

import { cn } from "../../lib/utils";

export interface BottomSheetProps {
  children?: ReactNode;
  className?: string;
  dragHandle?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
}

function BottomSheet({
  children,
  className,
  dragHandle,
  isVisible,
  onClose,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleScrimClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex h-full w-full items-end justify-center overflow-y-hidden bg-scrim"
      onClick={handleScrimClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          "mt-[56px] flex w-full max-w-[740px] animate-transition-bottom flex-col items-center justify-center sm:mb-[12px]",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="z-10 flex w-full flex-col overflow-y-auto rounded-extra-large bg-surface-container px-[24px] pb-[28px] scrollbar-hide">
          {dragHandle ? (
            <div className="flex items-center justify-center pt-[12px]">
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="mb-[4px] flex cursor-pointer px-[16px] pb-[10px] pt-[6px]"
              >
                <span className="flex h-[4px] w-[32px] rounded-full bg-surface-container-highest" />
              </button>
            </div>
          ) : null}
          {children}
        </div>
      </div>
    </div>
  );
}

BottomSheet.displayName = "BottomSheet";

export { BottomSheet };
