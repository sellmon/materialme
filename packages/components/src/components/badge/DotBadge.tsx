import { HTMLAttributes } from "react";

import { cn } from "../../lib/utils";

const dotBadgeStyles = {
  default:
    "flex h-3 w-3 cursor-pointer rounded-full bg-error px-1 py-1 text-on-error",
} as const;

export interface DotBadgeProps extends HTMLAttributes<HTMLDivElement> {}

function DotBadge({ className, ...props }: DotBadgeProps) {
  return <div className={cn(dotBadgeStyles.default, className)} {...props} />;
}

DotBadge.displayName = "DotBadge";

export { DotBadge };
