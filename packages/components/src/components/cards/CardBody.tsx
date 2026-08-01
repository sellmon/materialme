import {FC, ReactNode} from "react";

interface CardBodyProps {
    children?: ReactNode;
    className?: string;
    height?: string;
}

const CardBody: FC<CardBodyProps> = ({
    children,
    className,
    height,
}: CardBodyProps) => {
    return (
        <div
            className={`flex w-full flex-col gap-[12px]  
      ${height || "h-fit"}
      ${className || ""}
      `}>
            {children}
        </div>
    );
};

export {CardBody};
