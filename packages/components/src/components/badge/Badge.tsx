import { HTMLAttributes, ReactNode } from "react";

import { Icon } from "../../elements";
import { cn } from "../../lib/utils";

const badgeStyles = {
  default:
    "flex h-5 w-max cursor-pointer items-center gap-1 rounded-full bg-error px-1.5 py-1.5 text-label-small text-on-error",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  text?: string;
}

function Badge({
  children,
  className,
  icon,
  iconLeft,
  iconRight,
  text,
  ...props
}: BadgeProps) {
  return (
    <div className={cn(badgeStyles.default, className)} {...props}>
      {iconLeft ? <Icon icon={iconLeft} /> : null}
      {text || children}
      {icon ? <Icon icon={icon} /> : null}
      {iconRight ? <Icon icon={iconRight} /> : null}
    </div>
  );
}

Badge.displayName = "Badge";

export { Badge };
