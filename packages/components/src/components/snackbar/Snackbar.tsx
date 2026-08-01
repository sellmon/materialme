import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { type OpenStateProps, resolveOpenState } from "../../lib/open-state";

export interface SnackbarProps extends OpenStateProps {
  button?: ReactNode;
  className?: string;
  text: string;
}

function Snackbar({
  button,
  className,
  open,
  onOpenChange,
  isVisible,
  onClose,
  text,
}: SnackbarProps) {
  const { open: resolvedOpen } = resolveOpenState({
    open,
    onOpenChange,
    isVisible,
    onClose,
  });

  if (!resolvedOpen) return null;

  return (
    <div
      className={cn(
        "flex max-h-[68px] min-h-12 w-full max-w-[900px] animate-transition-bottom items-center justify-between rounded-small bg-inverse-surface pl-4 pr-3 text-body-medium text-inverse-on-surface sm:min-w-[600px] sm:gap-12 sm:py-0",
        className
      )}
      role="status"
    >
      <div className="flex py-2">{text}</div>
      {button ? (
        <div className="flex flex-row items-center text-inverse-primary [&_button]:text-inverse-primary">
          {button}
        </div>
      ) : null}
    </div>
  );
}

Snackbar.displayName = "Snackbar";

export { Snackbar };
