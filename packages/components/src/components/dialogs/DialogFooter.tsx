import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface DialogFooterProps {
  children?: ReactNode;
  className?: string;
}

function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "mb-6 mt-2 flex items-center justify-end gap-2 px-6",
        className
      )}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = "DialogFooter";

export { DialogFooter };
