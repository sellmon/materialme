import { ReactNode } from "react";

import { cn } from "../../lib/utils";

export interface ImageRowProps {
  children?: ReactNode;
  className?: string;
}

function ImageRow({ children, className }: ImageRowProps) {
  return (
    <div className={cn("flex flex-row gap-[8px]", className)}>{children}</div>
  );
}

ImageRow.displayName = "ImageRow";

export { ImageRow };
