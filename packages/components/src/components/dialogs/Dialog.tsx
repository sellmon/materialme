"use client";

import {
  MouseEvent,
  ReactNode,
  useEffect,
  useId,
  useRef,
} from "react";

import { cn } from "../../lib/utils";
import { DialogBody } from "./DialogBody";
import { DialogFooter } from "./DialogFooter";
import { DialogHeader } from "./DialogHeader";

export interface DialogProps {
  children?: ReactNode;
  className?: string;
  isVisible: boolean;
  onClose: () => void;
}

function DialogRoot({ children, className, isVisible, onClose }: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const handleScrimClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-black/50"
      onClick={handleScrimClick}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          "z-10 flex w-11/12 min-w-[280px] max-w-[580px] animate-fade-in flex-col gap-[16px] rounded-[28px] bg-surface-container pt-[24px] outline-none",
          className
        )}
        data-dialog-title={titleId}
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

DialogRoot.displayName = "Dialog";

const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export { Dialog };
