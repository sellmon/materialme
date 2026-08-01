"use client";

import {
  forwardRef,
  HTMLAttributes,
  MouseEventHandler,
  ReactNode,
} from "react";

import { MdPhoto } from "react-icons/md";

import { cn } from "../../lib/utils";
import { Badge } from "../badge/Badge";
import { DotBadge } from "../badge/DotBadge";
import { OnIconBadge } from "../badge/OnIconBadge";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  alt?: string;
  badge?: boolean;
  badgeColor?: string;
  badgeIcon?: ReactNode;
  badgeText?: string;
  dotBadge?: boolean;
  height?: number;
  name?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  radius?: number;
  ring?: boolean;
  size?: number;
  smallBadge?: boolean;
  src?: string;
  width?: number;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      alt,
      badge,
      badgeColor,
      badgeIcon,
      badgeText,
      className,
      dotBadge,
      height,
      name,
      onClick,
      radius = 999,
      ring,
      size = 40,
      smallBadge,
      src,
      width,
      ...props
    },
    ref
  ) => {
    const w = width || size;
    const h = height || size;

    return (
      <div ref={ref} className={cn("relative flex", className)} {...props}>
        <div
          className="relative z-10 flex cursor-pointer items-center justify-center overflow-hidden bg-surface-container text-body-small text-on-surface-variant transition-all duration-300 ease-in-out"
          style={{
            width: w,
            height: h,
            borderRadius: radius,
          }}
          onClick={onClick}
        >
          {badge ? (
            <div className="absolute right-[-2px] top-[-2px] z-10 flex h-[16px] w-[16px] justify-end">
              <Badge
                className={badgeColor}
                text={badgeText}
                icon={badgeIcon}
              />
            </div>
          ) : null}

          {dotBadge ? (
            <div className="absolute right-0 top-0 z-10 flex h-[16px] w-[16px] justify-end">
              <DotBadge className={badgeColor} />
            </div>
          ) : null}

          {smallBadge ? (
            <div className="absolute right-[4px] top-[4px] z-10 flex items-center justify-center">
              <OnIconBadge className={badgeColor} count={badgeText} />
            </div>
          ) : null}

          {src ? (
            <img
              src={src}
              alt={alt || ""}
              role="presentation"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{ borderRadius: radius }}
            />
          ) : null}
          <div className="flex overflow-hidden text-ellipsis px-[4px] text-center leading-tight">
            {name || <MdPhoto size={18} />}
          </div>
        </div>

        {ring ? (
          <div
            className="absolute left-[-4px] top-[-4px] z-0 flex animate-spin-lazy bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400 p-[2px] dark:from-green-300 dark:via-blue-500 dark:to-purple-600"
            style={{
              width: w + 8,
              height: h + 8,
              borderRadius: radius + 4,
            }}
          >
            <div
              className="flex h-full w-full bg-surface"
              style={{ borderRadius: radius + 4 }}
            />
          </div>
        ) : null}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export { Avatar };
