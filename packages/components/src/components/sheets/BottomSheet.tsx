"use client";

import {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import { cn } from "../../lib/utils";
import { type OpenStateProps, resolveOpenState } from "../../lib/open-state";
import { useFocusTrap } from "../../lib/use-focus-trap";

export interface BottomSheetProps extends OpenStateProps {
  children?: ReactNode;
  className?: string;
  dragHandle?: boolean;
}

function BottomSheet({
  children,
  className,
  dragHandle,
  open,
  onOpenChange,
  isVisible,
  onClose,
}: BottomSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
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
    if (event.target === event.currentTarget) {
      close();
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
        tabIndex={-1}
        className={cn(
          "mt-[56px] flex w-full max-w-[740px] animate-transition-bottom flex-col items-center justify-center outline-none sm:mb-[12px]",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="z-10 flex w-full flex-col overflow-y-auto rounded-extra-large bg-surface-container px-[24px] pb-[28px] scrollbar-hide">
          <div className="flex items-center justify-center pt-[12px]">
            {dragHandle ? (
              <button
                type="button"
                aria-label="Close"
                onClick={close}
                className="mb-[4px] flex cursor-pointer px-[16px] pb-[10px] pt-[6px]"
              >
                <span className="flex h-[4px] w-[32px] rounded-full bg-surface-container-highest" />
              </button>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

BottomSheet.displayName = "BottomSheet";

export { BottomSheet };
