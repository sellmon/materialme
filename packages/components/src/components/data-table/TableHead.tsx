import {FC, ReactNode} from "react";

interface TableHeadProps {
    children?: ReactNode;
    className?: string;
}

const TableHead: FC<TableHeadProps> = ({
    children,
    className,
}: TableHeadProps) => {
    return (
        <>
            <thead
                className={`bg-surface-container text-body-medium ${
                    className || ""
                }`}>
                {children}
            </thead>
        </>
    );
};

export {TableHead};
