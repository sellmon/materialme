import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { ImageRow } from "./ImageRow";

export interface GalleryProps {
  children?: ReactNode;
  className?: string;
}

function GalleryRoot({ children, className }: GalleryProps) {
  return (
    <div className={cn("flex h-full w-full flex-col gap-[8px]", className)}>
      {children}
    </div>
  );
}

GalleryRoot.displayName = "Gallery";

const Gallery = Object.assign(GalleryRoot, {
  Row: ImageRow,
});

export { Gallery };
