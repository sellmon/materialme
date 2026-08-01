"use client";

import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  useId,
  useState,
} from "react";

import { cn } from "../../lib/utils";

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      "aria-label": ariaLabel,
      checked,
      className,
      defaultChecked = false,
      disabled,
      id,
      label,
      name,
      onChange,
      readOnly,
      value,
      ...props
    },
    ref
  ) => {
    const reactId = useId();
    const switchId = id ?? reactId;
    const isControlled = checked !== undefined;
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const enabled = isControlled ? Boolean(checked) : uncontrolled;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setUncontrolled(event.target.checked);
      }
      onChange?.(event);
    };

    return (
      <label
        className={cn(
          "relative flex w-fit items-center gap-[8px]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          className="peer sr-only"
          id={switchId}
          name={name}
          value={value}
          aria-label={ariaLabel ?? label}
          checked={enabled}
          disabled={disabled}
          onChange={handleChange}
          readOnly={readOnly}
          {...props}
        />
        <span
          aria-hidden
          className={cn(
            "relative h-[32px] w-[52px] cursor-pointer rounded-full bg-surface-container-highest transition-colors",
            "after:absolute after:left-[8px] after:top-[8px] after:h-[16px] after:w-[16px] after:rounded-full after:bg-white after:transition-all",
            "peer-checked:bg-inverse-primary peer-checked:after:translate-x-[20px]",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40",
            disabled && "pointer-events-none"
          )}
        />
        {label ? (
          <span className="text-body-small text-on-surface">{label}</span>
        ) : null}
      </label>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
