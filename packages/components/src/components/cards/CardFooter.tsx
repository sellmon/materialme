import {FC, ReactNode} from "react";

interface CardFooterProps {
    children?: ReactNode;
    className?: string;
}

const CardFooter: FC<CardFooterProps> = ({
    children,
    className,
}: CardFooterProps) => {
    return (
        <div
            className={`flex h-fit w-full flex-row gap-[12px] ${
                className || ""
            }`}>
            {children}
        </div>
    );
};

export {CardFooter};
