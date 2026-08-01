import {FC, ReactNode} from "react";

interface SectionProps {
    children: ReactNode;
    className?: string;
}

const Section: FC<SectionProps> = ({children, className}: SectionProps) => {
    return (
        <>
            <main
                className={`flex flex-col gap-[12px] md:p-[12px] md:pt-[12px] ${
                    className || ""
                }`}>
                {children}
            </main>
        </>
    );
};

export {Section};
