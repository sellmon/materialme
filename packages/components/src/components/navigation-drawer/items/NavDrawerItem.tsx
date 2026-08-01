"use client";

import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";

import { Badge } from "../../badge/Badge";
import { cn } from "../../../lib/utils";

export interface NavDrawerItemProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> {
  active?: boolean;
  badge?: boolean;
  badgeColor?: string;
  badgeText?: string;
  children?: ReactNode;
  href?: string;
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  /** @deprecated Use `href` instead */
  url?: string;
}

const NavDrawerItem = forwardRef<HTMLAnchorElement, NavDrawerItemProps>(
  (
    {
      active = false,
      badge,
      badgeColor,
      badgeText,
      children,
      className,
      href,
      id,
      label,
      leftElement,
      rightElement,
      url,
      ...props
    },
    ref
  ) => {
    const target = href ?? (typeof url === "string" ? url : "") ?? "#";

    return (
      <a
        ref={ref}
        href={target || "#"}
        id={id}
        className={cn("flex cursor-pointer items-start", className)}
        aria-current={active ? "page" : undefined}
        {...props}
      >
        <div
          className={cn(
            "flex h-full w-full cursor-pointer items-center justify-center rounded-full py-[14px] pl-[16px] pr-[24px] text-label-large text-on-surface hover:bg-surface-container",
            active && "bg-surface-container"
          )}
        >
          {leftElement ? (
            <div className="pr-[12px] text-on-surface-variant">{leftElement}</div>
          ) : null}
          <p className="flex w-full">{label || children}</p>
          {rightElement ? (
            <div className="min-w-max pl-[12px] text-body-small text-on-surface-variant">
              {rightElement}
            </div>
          ) : null}
          {badge ? (
            <div className="pl-[12px] text-on-surface-variant">
              <Badge className={badgeColor} text={badgeText || "New"} />
            </div>
          ) : null}
        </div>
      </a>
    );
  }
);

NavDrawerItem.displayName = "NavDrawerItem";

export { NavDrawerItem };
