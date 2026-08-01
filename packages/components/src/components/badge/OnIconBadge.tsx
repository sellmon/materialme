import { HTMLAttributes, ReactNode } from "react";

import { cn } from "../../lib/utils";

const onIconBadgeStyles = {
  default:
    "absolute flex min-h-2 min-w-2 cursor-pointer rounded-full bg-error px-1 text-label-small text-on-error",
} as const;

export interface OnIconBadgeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  count?: string | number;
}

function OnIconBadge({
  children,
  className,
  count,
  ...props
}: OnIconBadgeProps) {
  return (
    <div className={cn(onIconBadgeStyles.default, className)} {...props}>
      {count ?? children}
    </div>
  );
}

OnIconBadge.displayName = "OnIconBadge";

export { OnIconBadge };
