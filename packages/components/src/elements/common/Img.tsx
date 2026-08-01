"use client";

import { forwardRef, ImgHTMLAttributes, MouseEventHandler } from "react";

import { cn } from "../../lib/utils";

export interface ImgProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  aspect?: number | string;
  color?: string;
  height?: number | string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  onClick?: MouseEventHandler<HTMLDivElement>;
  radius?: number;
  size?: number | string;
  width?: number | string;
}

const Img = forwardRef<HTMLDivElement, ImgProps>(
  (
    {
      alt,
      aspect,
      color = "bg-surface-container-lowest",
      className,
      height,
      objectFit = "cover",
      onClick,
      radius,
      size,
      src,
      width,
      ...imgProps
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex h-full w-full overflow-hidden", color, className)}
        onClick={onClick}
        style={{
          width: width || size,
          height: height || size,
          aspectRatio: aspect,
          borderRadius: radius,
        }}
      >
        <img
          src={typeof src === "string" ? src : undefined}
          alt={alt ?? ""}
          className="absolute inset-0 h-full w-full"
          style={{
            objectFit,
            borderRadius: radius,
          }}
          {...imgProps}
        />
      </div>
    );
  }
);

Img.displayName = "Img";

export { Img };
