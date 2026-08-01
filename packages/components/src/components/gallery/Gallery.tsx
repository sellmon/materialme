import {FC, ReactNode} from "react";

interface GalleryProps {
    children?: ReactNode;
    className?: string;
}

const Gallery: FC<GalleryProps> = ({children, className}: GalleryProps) => {
    return (
        <div
            className={`flex h-full w-full flex-col gap-[8px] ${
                className || ""
            }`}>
            {children}
        </div>
    );
};

export {Gallery};
