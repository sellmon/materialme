import {FC, MouseEventHandler} from "react";

export interface DotBadgeProps {
    className?: string;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const DotBadge: FC<DotBadgeProps> = ({className, onClick}: DotBadgeProps) => {
    return <div className={`dotBadge ${className || ""}`} onClick={onClick} />;
};

export {DotBadge};
