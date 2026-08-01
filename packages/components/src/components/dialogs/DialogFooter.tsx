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
        "mb-[24px] mt-[8px] flex items-center justify-end gap-[8px] px-[24px]",
        className
      )}
    >
      {children}
    </div>
  );
}

DialogFooter.displayName = "DialogFooter";

export { DialogFooter };
