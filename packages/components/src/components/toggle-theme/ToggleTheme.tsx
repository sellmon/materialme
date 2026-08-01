import {FC, useEffect, useState} from "react";

import {IconButton} from "../index";
import {useTheme} from "next-themes";
import {MdDarkMode, MdLightMode} from "react-icons/md";

interface ToggleThemeProps {
    className?: string;
    label?: boolean;
}

const ToggleTheme: FC<ToggleThemeProps> = ({
    label,
    className,
}: ToggleThemeProps) => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    const renderThemeChanger = () => {
        if (!mounted) return null;

        return (
            <div
                className={`flex w-full flex-row items-center justify-between ${
                    className || ""
                }`}>
                {label && (
                    <p className="flex text-body-medium capitalize">
                        {theme} theme
                    </p>
                )}
                <IconButton
                    icon={
                        theme === "dark" ? (
                            <MdLightMode size={24} />
                        ) : (
                            <MdDarkMode size={24} />
                        )
                    }
                    variant={"tonal"}
                    onClick={() => {
                        setTheme(theme === "light" ? "dark" : "light");
                    }}
                />
            </div>
        );
    };

    return <>{renderThemeChanger()}</>;
};

export {ToggleTheme};
