"use client";

import { ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "../../badge/Badge";
import { cn } from "../../../lib/utils";

export interface NavDrawerItemProps {
  badge?: boolean;
  badgeColor?: string;
  badgeText?: string;
  children?: ReactNode;
  href?: string;
  id?: string;
  label?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  /** @deprecated Use `href` instead */
  url?: string;
}

function NavDrawerItem({
  badge,
  badgeColor,
  badgeText,
  children,
  href,
  id,
  label,
  leftElement,
  rightElement,
  url,
}: NavDrawerItemProps) {
  const pathname = usePathname();
  const target = href ?? (typeof url === "string" ? url : "") ?? "";
  const active = Boolean(target) && pathname === target;

  return (
    <Link href={target || "#"} id={id} className="flex cursor-pointer items-start">
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
    </Link>
  );
}

NavDrawerItem.displayName = "NavDrawerItem";

export { NavDrawerItem };
