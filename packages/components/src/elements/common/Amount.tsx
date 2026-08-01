"use client";

import { useState } from "react";

import { MdAdd, MdRemove } from "react-icons/md";

import { IconButton } from "../../components/button/icon-button/IconButton";
import { cn } from "../../lib/utils";

export interface AmountProps {
  className?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  value?: number;
}

function Amount({
  className,
  defaultValue = 1,
  max,
  min = 0,
  onChange,
  value,
}: AmountProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const amount = isControlled ? value : uncontrolled;

  const setAmount = (next: number) => {
    const clamped = Math.max(min, max === undefined ? next : Math.min(max, next));
    if (!isControlled) {
      setUncontrolled(clamped);
    }
    onChange?.(clamped);
  };

  return (
    <div
      className={cn(
        "flex w-fit flex-row gap-[4px] rounded-[8px] bg-surface-container-high",
        className
      )}
    >
      <IconButton
        aria-label="Decrease"
        icon={<MdRemove size={18} />}
        variant="standard"
        className="m-[2px] rounded-[6px] p-[6px]"
        onClick={() => setAmount(amount - 1)}
        disabled={amount <= min}
      />
      <div
        className="flex min-w-[24px] items-center justify-center px-[2px] text-body-medium text-on-surface"
        aria-live="polite"
      >
        {amount}
      </div>
      <IconButton
        aria-label="Increase"
        icon={<MdAdd size={18} />}
        variant="standard"
        className="m-[2px] rounded-[6px] p-[6px]"
        onClick={() => setAmount(amount + 1)}
        disabled={max !== undefined && amount >= max}
      />
    </div>
  );
}

Amount.displayName = "Amount";

export { Amount };
