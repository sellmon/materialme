"use client";

import * as RadixTooltip from "@radix-ui/react-tooltip";
import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface TooltipProps {
  bottomLeft?: boolean;
  bottomRight?: boolean;
  children?: ReactNode;
  delayDuration?: number;
  text?: string;
  topLeft?: boolean;
  topRight?: boolean;
}

function resolvePlacement({
  bottomLeft,
  bottomRight,
  topLeft,
  topRight,
}: Pick<
  TooltipProps,
  "bottomLeft" | "bottomRight" | "topLeft" | "topRight"
>) {
  if (topRight) return { side: "top" as const, align: "end" as const };
  if (topLeft) return { side: "top" as const, align: "start" as const };
  if (bottomRight) return { side: "bottom" as const, align: "end" as const };
  if (bottomLeft) return { side: "bottom" as const, align: "start" as const };
  return { side: "top" as const, align: "center" as const };
}

function Tooltip({
  bottomLeft,
  bottomRight,
  children,
  delayDuration = 200,
  text,
  topLeft,
  topRight,
}: TooltipProps) {
  const { side, align } = resolvePlacement({
    bottomLeft,
    bottomRight,
    topLeft,
    topRight,
  });

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={4}
            className={cn(
              "z-40 max-w-[200px] rounded-[12px] bg-surface-container-highest p-3",
              "text-body-small text-on-surface animate-fade-in"
            )}
          >
            {text}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

Tooltip.displayName = "Tooltip";

export { Tooltip };
