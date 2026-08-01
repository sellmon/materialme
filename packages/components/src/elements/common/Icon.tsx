import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface IconProps {
  children?: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

function Icon({ children, className, icon, iconLeft, iconRight }: IconProps) {
  const content = children ?? icon ?? iconLeft ?? iconRight;
  if (!content) return null;

  return (
    <span className={cn("inline-flex shrink-0 items-center", className)} aria-hidden>
      {content}
    </span>
  );
}

Icon.displayName = "Icon";

export { Icon };
