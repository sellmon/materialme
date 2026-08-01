import { ReactNode } from "react";

import { cn } from "../../lib/utils";
import { BusinessItem } from "./items/BusinessItem";
import { UserItem } from "./items/UserItem";

export interface StoriesProps {
  children: ReactNode;
  className?: string;
}

function StoriesRoot({ children, className }: StoriesProps) {
  return (
    <div
      className={cn(
        "flex h-fit w-full flex-row gap-[16px] overflow-x-auto px-[16px] pb-[16px] pt-[12px] scrollbar-hide",
        className
      )}
    >
      {children}
    </div>
  );
}

StoriesRoot.displayName = "Stories";

const Stories = Object.assign(StoriesRoot, {
  Business: BusinessItem,
  User: UserItem,
});

export { Stories };
