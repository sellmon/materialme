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
    <div className={cn("flex flex-col gap-[16px]", className)}>
      {icon ? (
        <div className="flex items-center justify-center px-[24px] text-on-surface">
          {icon}
        </div>
      ) : null}
      {headline ? (
        <h2 className="flex items-center justify-center px-[24px] text-center text-headline-small text-on-surface">
          {headline}
        </h2>
      ) : null}
      {text ? (
        <p className="flex items-center justify-center px-[24px] text-center text-body-medium text-on-surface-variant">
          {text}
        </p>
      ) : null}
    </div>
  );
}

DialogHeader.displayName = "DialogHeader";

export { DialogHeader };
