"use client";

import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";

import { cn } from "../../lib/utils";

export interface LinkBoxProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "color"> {
  children?: ReactNode;
  color?: string;
  padding?: string;
  size?: string;
}

const LinkBox = forwardRef<HTMLAnchorElement, LinkBoxProps>(
  (
    {
      children,
      className,
      color,
      href,
      padding,
      size,
      target = "_blank",
      rel,
      ...props
    },
    ref
  ) => {
    return (
      <span
        className={cn(
          "mx-0 my-0 w-fit gap-2 truncate rounded-small py-2 hover:underline hover:decoration-[1px] hover:underline-offset-[2px]",
          size || "text-body-small",
          color || "text-primary",
          padding,
          className
        )}
      >
        <a
          ref={ref}
          href={href}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          {...props}
        >
          {children}
        </a>
      </span>
    );
  }
);

LinkBox.displayName = "LinkBox";

export { LinkBox };
