import { HTMLAttributes, ReactNode, forwardRef } from "react";

import { Icon } from "../../elements";
import { cn } from "../../lib/utils";

const badgeStyles = {
  default:
    "flex h-5 w-max cursor-pointer items-center gap-1 rounded-full bg-error px-1.5 py-1.5 text-label-small text-on-error",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  icon?: ReactNode;
  /** Prefer `leftElement` — kept for compatibility */
  iconLeft?: ReactNode;
  /** Prefer `rightElement` — kept for compatibility */
  iconRight?: ReactNode;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  text?: string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  (
    {
      children,
      className,
      icon,
      iconLeft,
      iconRight,
      leftElement,
      rightElement,
      text,
      ...props
    },
    ref
  ) => {
    const start = leftElement ?? iconLeft;
    const end = rightElement ?? iconRight;

    return (
      <div
        ref={ref}
        className={cn(badgeStyles.default, className)}
        {...props}
      >
        {start ? <Icon icon={start} /> : null}
        {text || children}
        {icon ? <Icon icon={icon} /> : null}
        {end ? <Icon icon={end} /> : null}
      </div>
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
