"use client";

import { FC, MouseEventHandler } from "react";

import { cn } from "../../../lib/utils";

export interface BusinessItemProps {
  height?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
  radius?: number;
  ring?: boolean;
  src?: string;
  text?: string;
  width?: number;
}

const BusinessItem: FC<BusinessItemProps> = ({
  height,
  onClick,
  radius,
  ring,
  src,
  text,
  width,
}) => {
  return (
    <div className="flex max-w-min flex-col">
      <div
        className={cn(
          "flex items-center rounded-full p-[2px]",
          ring && "ring ring-primary"
        )}
        style={{
          borderRadius: radius ? radius + 2 : 999,
        }}
      >
        <div
          className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-full text-body-small text-on-surface-variant"
          style={{
            width,
            height,
          }}
          onClick={onClick}
        >
          {src ? (
            <img
              src={src}
              alt=""
              role="presentation"
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                borderRadius: radius ? radius : 999,
              }}
            />
          ) : null}
        </div>
      </div>
      {text ? (
        <div className="flex w-full items-center justify-start px-[8px] pt-[8px] text-left text-label-large leading-tight text-on-surface">
          {text}
        </div>
      ) : null}
    </div>
  );
};

export { BusinessItem };
