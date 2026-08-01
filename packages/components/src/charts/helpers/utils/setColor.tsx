export const setCategoryColors = (
    categories: string[],
    colors: Color[] | undefined
): Map<string, Color> => {
    const categoryColors = new Map<string, Color>();
    categories.forEach((category, index) => {
        if (colors) {
            categoryColors.set(category, colors[index]);
        }
    });
    return categoryColors;
};

export type Color = (typeof colorValues)[number];

export const colorValues = [
    "#7C3AED",
    "#65A30D",
    "#CA8A04",
    "#8A9A5B",
    "#CFA67A",
    "#0EA5E9",
    "#F97316",
    "#8B5CF6",
    "#F43F5E",
];
