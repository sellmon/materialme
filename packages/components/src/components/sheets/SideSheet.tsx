"use client";

import {
  MouseEvent,
  ReactNode,
  useCallback,
  useRef,
} from "react";

import { MdClose } from "react-icons/md";

import { cn } from "../../lib/utils";
import { type OpenStateProps, resolveOpenState } from "../../lib/open-state";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { IconButton } from "../button/icon-button/IconButton";

export interface SideSheetProps extends OpenStateProps {
  children?: ReactNode;
  className?: string;
  closeButton?: boolean;
  title?: string;
}

function SideSheet({
  children,
  className,
  closeButton = true,
  open,
  onOpenChange,
  isVisible,
  onClose,
  title,
}: SideSheetProps) {
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
    if (event.target === event.currentTarget) {
      close();
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex bg-black/20"
      onClick={handleScrimClick}
    >
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-screen min-w-[360px] max-w-[380px] animate-transition-right flex-col overflow-y-auto rounded-l-large bg-surface-container px-[12px] py-[24px] outline-none scrollbar-hide sm:min-w-[440px] sm:max-w-[540px]",
          className
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="z-10 flex w-full flex-col px-[12px] pb-[28px]">
          {(title || closeButton) && (
            <div className="flex items-center justify-center">
              {title ? (
                <h2 className="flex w-full justify-start text-title-medium text-on-surface">
                  {title}
                </h2>
              ) : null}
              {closeButton ? (
                <div className="flex w-full justify-end">
                  <IconButton
                    aria-label="Close"
                    icon={<MdClose size={24} />}
                    className="rounded-extra-large"
                    variant="tonal"
                    onClick={close}
                  />
                </div>
              ) : null}
            </div>
          )}
          {children}
        </div>
      </aside>
    </div>
  );
}

SideSheet.displayName = "SideSheet";

export { SideSheet };
