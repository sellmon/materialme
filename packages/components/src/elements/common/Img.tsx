"use client";

import { forwardRef, MouseEventHandler } from "react";

import Image, { StaticImageData } from "next/image";

import { cn } from "../../lib/utils";

export interface ImgProps {
  alt: string;
  aspect?: number | string;
  className?: string;
  color?: string;
  height?: number | string;
  objectFit?: "fill" | "contain" | "cover" | "none" | "scale-down";
  onClick?: MouseEventHandler<HTMLDivElement>;
  placeholder?: "blur" | "empty";
  quality?: number;
  radius?: number;
  size?: number | string;
  src: string | StaticImageData;
  unoptimized?: boolean;
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
      placeholder,
      quality,
      radius,
      size,
      src,
      unoptimized,
      width,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn("relative flex h-full w-full", color, className)}
        onClick={onClick}
        style={{
          width: width || size,
          height: height || size,
          aspectRatio: aspect,
          borderRadius: radius,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          unoptimized={unoptimized}
          sizes="100%"
          placeholder={placeholder}
          style={{
            objectFit,
            borderRadius: radius,
          }}
        />
      </div>
    );
  }
);

Img.displayName = "Img";

export { Img };
