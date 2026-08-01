"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

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
  return (
    <RadixDialog.Root
      open={isVisible}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-20 bg-black/50 animate-fade-in" />
        <RadixDialog.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-30 flex w-11/12 min-w-[280px] max-w-[580px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-[28px] bg-surface-container pt-6 outline-none animate-fade-in",
            className
          )}
        >
          {children}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}

DialogRoot.displayName = "Dialog";

const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

export { Dialog };
