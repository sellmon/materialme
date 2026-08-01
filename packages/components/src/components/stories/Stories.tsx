import {FC, ReactNode} from "react";

import {BusinessItem} from "./items/BusinessItem";
import {UserItem} from "./items/UserItem";

interface StoriesProps {
    children: ReactNode;
    className?: string;
}

interface StoriesComponent extends FC<StoriesProps> {
    Business: typeof BusinessItem;
    User: typeof UserItem;
}

const Stories: StoriesComponent = ({children, className}: StoriesProps) => {
    return (
        <div
            className={`flex h-fit w-full flex-row gap-[16px] overflow-x-auto px-[16px] pb-[16px] pt-[12px] scrollbar-hide ${className}`}>
            {children}
        </div>
    );
};

Stories.Business = BusinessItem;
Stories.User = UserItem;

export {Stories};
