import React, {FC, MouseEventHandler, ReactNode} from "react";

import {Icon} from "../../elements/index";

export interface BadgeProps {
    children?: ReactNode;
    className?: string;
    text?: string;
    icon?: ReactNode | undefined;
    iconLeft?: ReactNode | undefined;
    iconRight?: ReactNode | undefined;
    onClick?: MouseEventHandler<HTMLDivElement>;
}

const Badge: FC<BadgeProps> = ({
    children,
    className,
    text,
    icon,
    iconLeft,
    iconRight,
    onClick,
}: BadgeProps) => {
    return (
        <div className={`badge ${className || ""}`} onClick={onClick}>
            <Icon iconLeft={iconLeft} />
            {text || children} <Icon icon={icon} />
            <Icon iconRight={iconRight} />
        </div>
    );
};

export {Badge};
