"use client";

import { ReactNode, useId, useState } from "react";

import { Icon } from "../../../elements";
import { cn } from "../../../lib/utils";

const segmentedButtonStyles = {
  root: "flex w-full flex-col",
  list: "mx-3 flex h-15 w-fit flex-row overflow-x-auto rounded-full border border-outline scrollbar-hide sm:mx-5",
  item: {
    default:
      "flex h-full min-w-max max-w-40 flex-auto items-center justify-center gap-2 px-7 text-center text-label-large",
    selected: "border-outline bg-surface-container text-on-surface",
    unselected: "bg-surface text-on-surface hover:bg-surface-container",
  },
  panel:
    "flex w-full flex-col gap-4 pt-4 text-body-medium text-on-surface",
} as const;

export interface SegmentedButtonItem {
  id: string;
  header: string;
  content?: ReactNode;
}

export interface SegmentedButtonsProps {
  buttons: SegmentedButtonItem[];
  className?: string;
  defaultValue?: string;
  icon?: ReactNode;
  onValueChange?: (id: string) => void;
  value?: string;
}

function SegmentedButtons({
  buttons,
  className,
  defaultValue,
  icon,
  onValueChange,
  value,
}: SegmentedButtonsProps) {
  const reactId = useId();
  const [uncontrolled, setUncontrolled] = useState(
    defaultValue ?? buttons[0]?.id
  );
  const selectedId = value ?? uncontrolled;
  const selectedButton = buttons.find((button) => button.id === selectedId);

  const select = (id: string) => {
    if (value === undefined) {
      setUncontrolled(id);
    }
    onValueChange?.(id);
  };

  return (
    <section className={cn(segmentedButtonStyles.root, className)}>
      <div role="tablist" className={segmentedButtonStyles.list}>
        {buttons.map((button) => {
          const selected = button.id === selectedId;
          const tabId = `${reactId}-${button.id}`;

          return (
            <button
              key={button.id}
              id={tabId}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => select(button.id)}
              className={cn(
                segmentedButtonStyles.item.default,
                selected
                  ? segmentedButtonStyles.item.selected
                  : segmentedButtonStyles.item.unselected
              )}
            >
              {selected ? <Icon iconLeft={icon} /> : null}
              <span className="flex w-fit flex-row">{button.header}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        aria-labelledby={selectedId ? `${reactId}-${selectedId}` : undefined}
        className={segmentedButtonStyles.panel}
      >
        {selectedButton?.content}
      </div>
    </section>
  );
}

SegmentedButtons.displayName = "SegmentedButtons";

export { SegmentedButtons };
