"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface DialogHeaderProps {
  className?: string;
  headline?: string;
  icon?: ReactNode;
  text?: string;
}

function DialogHeader({ className, headline, icon, text }: DialogHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {icon ? (
        <div className="flex items-center justify-center px-6 text-on-surface">
          {icon}
        </div>
      ) : null}
      {headline ? (
        <RadixDialog.Title className="flex items-center justify-center px-6 text-center text-headline-small text-on-surface">
          {headline}
        </RadixDialog.Title>
      ) : (
        <RadixDialog.Title className="sr-only">Dialog</RadixDialog.Title>
      )}
      {text ? (
        <RadixDialog.Description className="flex items-center justify-center px-6 text-center text-body-medium text-on-surface-variant">
          {text}
        </RadixDialog.Description>
      ) : (
        <RadixDialog.Description className="sr-only">
          Dialog content
        </RadixDialog.Description>
      )}
    </div>
  );
}

DialogHeader.displayName = "DialogHeader";

export { DialogHeader };
