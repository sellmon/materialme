import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface DialogBodyProps {
  children?: ReactNode;
  className?: string;
}

function DialogBody({ children, className }: DialogBodyProps) {
  return (
    <div className={cn("flex w-full px-[24px]", className)}>{children}</div>
  );
}

DialogBody.displayName = "DialogBody";

export { DialogBody };
