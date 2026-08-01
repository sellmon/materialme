"use client";

import {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export interface SliderProps {
  className?: string;
  defaultValue?: number;
  max?: number;
  min?: number;
  onChange?: (value: number) => void;
  step?: number;
  tooltipChildren?: ReactNode;
  value?: number;
}

const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      defaultValue = 0,
      max = 100,
      min = 0,
      onChange,
      step,
      tooltipChildren,
      value: valueProp,
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const value = isControlled ? valueProp : uncontrolled;

    const progress = useRef<HTMLDivElement>(null);
    const tooltip = useRef<HTMLDivElement>(null);
    const range = useRef<HTMLInputElement>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        range.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const getPercent = useCallback(
      (v: number) => Math.round(((v - min) / (max - min)) * 100),
      [max, min]
    );

    useEffect(() => {
      if (progress.current) {
        progress.current.style.width = `${getPercent(value)}%`;
      }
    }, [value, getPercent]);

    useEffect(() => {
      const thumbSize = 10;
      if (range.current && tooltip.current) {
        const ratio =
          (Number(range.current.value) - Number(range.current.min)) /
          (Number(range.current.max) - Number(range.current.min));
        const amountToMove =
          ratio * (range.current.offsetWidth - thumbSize - thumbSize) +
          thumbSize;
        tooltip.current.style.left = `${amountToMove}px`;
      }
    }, [value]);

    const handleChange = (next: number) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    };

    return (
      <div className={cn("relative flex h-[24px] w-full items-center", className)}>
        <input
          className="relative z-[9] flex h-[6px] w-full transform appearance-none rounded-full bg-surface-container-high"
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          ref={setRefs}
          onChange={(event) => handleChange(Number(event.target.value))}
        />

        <div
          ref={progress}
          className="pointer-events-none absolute top-[9px] z-[10] h-[6px] rounded-full bg-primary"
        />

        <div
          ref={tooltip}
          className={cn(
            "absolute top-[-40px] z-[19] flex h-[32px] min-w-[32px] max-w-[96px] -translate-x-1/2 flex-row items-center justify-center gap-[2px] rounded-full bg-surface-container-high px-[4px] text-body-small text-on-surface",
            value > min ? "visible" : "invisible"
          )}
        >
          <div className="absolute bottom-[-5px] flex">
            <div className="border-l-[10px] border-r-[10px] border-t-[8.5px] border-l-transparent border-r-transparent border-t-surface-container-high" />
          </div>
          <span>{value}</span> <span>{tooltipChildren}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };
