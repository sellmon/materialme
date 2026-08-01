import type {Metadata} from "next";

import {Providers} from "./providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "MaterialMe — Button Preview",
    description: "Preview Material You button components",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
