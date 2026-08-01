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

export interface SliderDualValue {
  min: number;
  max: number;
}

export interface SliderDualProps {
  className?: string;
  defaultValue?: SliderDualValue;
  max?: number;
  min?: number;
  onChange?: (value: SliderDualValue) => void;
  step?: number;
  tooltipChildren?: ReactNode;
  value?: SliderDualValue;
}

const SliderDual = forwardRef<HTMLDivElement, SliderDualProps>(
  (
    {
      className,
      defaultValue,
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
    const [uncontrolled, setUncontrolled] = useState<SliderDualValue>(
      defaultValue ?? { min, max }
    );
    const range = isControlled ? valueProp : uncontrolled;
    const minVal = range.min;
    const maxVal = range.max;

    const minValRef = useRef(minVal);
    const maxValRef = useRef(maxVal);
    const rangeLeft = useRef<HTMLInputElement | null>(null);
    const rangeRight = useRef<HTMLInputElement | null>(null);
    const progress = useRef<HTMLDivElement | null>(null);
    const tooltipLeft = useRef<HTMLDivElement | null>(null);
    const tooltipRight = useRef<HTMLDivElement | null>(null);

    minValRef.current = minVal;
    maxValRef.current = maxVal;

    const getPercent = useCallback(
      (v: number) => Math.round(((v - min) / (max - min)) * 100),
      [min, max]
    );

    const commit = (next: SliderDualValue) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    };

    useEffect(() => {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(maxValRef.current);

      if (progress.current) {
        progress.current.style.left = `${minPercent}%`;
        progress.current.style.width = `${maxPercent - minPercent}%`;
      }
    }, [minVal, getPercent]);

    useEffect(() => {
      const maxPercent = getPercent(maxVal);
      const minPercent = getPercent(minValRef.current);

      if (progress.current) {
        progress.current.style.width = `${maxPercent - minPercent}%`;
      }
    }, [maxVal, getPercent]);

    useEffect(() => {
      const thumbSize = 10;
      if (rangeLeft.current && rangeRight.current) {
        const ratioLeft =
          (Number(rangeLeft.current.value) - Number(rangeLeft.current.min)) /
          (Number(rangeLeft.current.max) - Number(rangeLeft.current.min));
        const ratioRight =
          (Number(rangeRight.current.value) - Number(rangeRight.current.min)) /
          (Number(rangeRight.current.max) - Number(rangeRight.current.min));
        const amountToMoveLeft =
          ratioLeft *
            (rangeLeft.current.offsetWidth - thumbSize - thumbSize) +
          thumbSize;
        const amountToMoveRight =
          ratioRight *
            (rangeRight.current.offsetWidth - thumbSize - thumbSize) +
          thumbSize;

        if (tooltipLeft.current) {
          tooltipLeft.current.style.left = `${amountToMoveLeft}px`;
        }
        if (tooltipRight.current) {
          tooltipRight.current.style.left = `${amountToMoveRight}px`;
        }
      }
    }, [minVal, maxVal]);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-[24px] w-full items-center justify-center",
          className
        )}
      >
        <input
          type="range"
          ref={rangeLeft}
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(event) => {
            const nextMin = Math.min(Number(event.target.value), maxVal - 1);
            commit({ min: nextMin, max: maxVal });
          }}
          className="pointer-events-none absolute z-40 h-[6px] w-full appearance-none bg-black/0 outline-none"
        />
        <input
          type="range"
          ref={rangeRight}
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(event) => {
            const nextMax = Math.max(Number(event.target.value), minVal + 1);
            commit({ min: minVal, max: nextMax });
          }}
          className="absolute z-30 h-[6px] w-full appearance-none bg-white/0 outline-none"
        />

        <div className="relative h-[24px] w-full">
          <div className="absolute top-[9px] z-10 h-[6px] w-full rounded-full bg-surface-container-high" />
          <div
            ref={progress}
            className="absolute top-[9px] z-10 h-[6px] rounded-full bg-primary"
          />
          <div
            ref={tooltipLeft}
            className={cn(
              "absolute top-[-40px] z-[19] flex h-[32px] min-w-[32px] max-w-[96px] -translate-x-1/2 items-center justify-center rounded-full bg-surface-container-high px-[4px] align-middle text-body-small text-on-surface",
              minVal < min + 1 && "invisible"
            )}
          >
            <div className="absolute bottom-[-5px] flex">
              <div className="border-l-[10px] border-r-[10px] border-t-[8.5px] border-l-transparent border-r-transparent border-t-surface-container-high" />
            </div>
            <div className={cn(tooltipChildren && "flex pr-[2px]")}>{minVal}</div>
            {tooltipChildren}
          </div>
          <div
            ref={tooltipRight}
            className={cn(
              "absolute top-[-40px] z-[19] flex h-[32px] min-w-[32px] max-w-full -translate-x-1/2 flex-row items-center justify-center rounded-full bg-surface-container-high px-[4px] align-middle text-body-small text-on-surface",
              maxVal > max - 1 && "invisible"
            )}
          >
            <div className="absolute bottom-[-5px] flex">
              <div className="border-l-[10px] border-r-[10px] border-t-[8.5px] border-l-transparent border-r-transparent border-t-surface-container-high" />
            </div>
            <div className={cn(tooltipChildren && "flex pr-[2px]")}>{maxVal}</div>
            {tooltipChildren}
          </div>
        </div>
      </div>
    );
  }
);

SliderDual.displayName = "SliderDual";

export { SliderDual };
