import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface SnackbarWrapperProps {
  children?: ReactNode;
  className?: string;
}

function SnackbarWrapper({ children, className }: SnackbarWrapperProps) {
  return (
    <div
      id="wrapper"
      className={cn(
        "pointer-events-none fixed inset-x-4 bottom-4 z-30 flex justify-center",
        className
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-[800px] flex-col justify-center gap-3 sm:min-w-[600px]">
        {children}
      </div>
    </div>
  );
}

SnackbarWrapper.displayName = "SnackbarWrapper";

export { SnackbarWrapper };
