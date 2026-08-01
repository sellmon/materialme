import {FC, MouseEventHandler, ReactNode} from "react";

interface ChipsProps {
    children?: ReactNode;
    className?: string;
    text?: string;
    leftElement?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    rightElement?: ReactNode;
}

const Chips: FC<ChipsProps> = ({
    children,
    className,
    text = "Chips",
    leftElement,
    onClick,
    rightElement,
}: ChipsProps) => {
    return (
        <button className={`chips ${className || ""}`} onClick={onClick}>
            {leftElement && <div>{leftElement}</div>}
            {children || text}
            {rightElement && <div>{rightElement}</div>}
        </button>
    );
};

export {Chips};
