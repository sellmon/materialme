import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const typography = [
  "display-large",
  "display-medium",
  "display-small",
  "headline-large",
  "headline-medium",
  "headline-small",
  "title-large",
  "title-medium",
  "title-small",
  "label-large",
  "label-medium",
  "label-small",
  "body-large",
  "body-medium",
  "body-small",
  "caption",
  "overline",
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      // Keep Material type scale out of the text-* color conflict group
      "font-size": [{ text: [...typography] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
