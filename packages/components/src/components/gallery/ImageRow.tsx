import {FC, ReactNode} from "react";

interface ImageRowProps {
    children?: ReactNode;
    className?: string;
}

const ImageRow: FC<ImageRowProps> = ({children, className}: ImageRowProps) => {
    return (
        <div className={`flex flex-row gap-[8px] ${className || ""}`}>
            {children}
        </div>
    );
};

export {ImageRow};
