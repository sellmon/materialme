"use client";

import {
  MouseEvent,
  ReactNode,
  useEffect,
} from "react";

import { MdClose } from "react-icons/md";

import { cn } from "../../lib/utils";
import { IconButton } from "../button/icon-button/IconButton";

export interface SideSheetProps {
  children?: ReactNode;
  className?: string;
  closeButton?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  title?: string;
}

function SideSheet({
  children,
  className,
  closeButton = true,
  isVisible,
  onClose,
  title,
}: SideSheetProps) {
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
      className="fixed inset-0 z-40 flex bg-black/20"
      onClick={handleScrimClick}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-screen min-w-[360px] max-w-[380px] animate-transition-right flex-col overflow-y-auto rounded-l-large bg-surface-container px-[12px] py-[24px] scrollbar-hide sm:min-w-[440px] sm:max-w-[540px]",
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
                    onClick={onClose}
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
