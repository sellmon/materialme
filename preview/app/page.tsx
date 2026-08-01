"use client";

import {
    Button,
    ExtendedFAB,
    FAB,
    IconButton,
    SegmentedButtons,
    ToggleTheme,
} from "@materialme/components";
import {
    MdAdd,
    MdEdit,
    MdFavorite,
    MdShare,
    MdStar,
} from "react-icons/md";

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col gap-[16px] rounded-extra-large bg-surface-container p-[24px] lg:p-[32px]">
            <h2 className="text-title-large text-on-surface">{title}</h2>
            {children}
        </section>
    );
}

export default function Home() {
    return (
        <main className="min-h-screen bg-surface p-[24px] lg:p-[48px]">
            <div className="mx-auto flex max-w-[960px] flex-col gap-[32px]">
                <header className="flex flex-col gap-[12px] sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-headline-medium text-on-surface">
                            Button Preview
                        </h1>
                        <p className="text-body-medium text-on-surface-variant">
                            Material You tokens + component classes
                        </p>
                    </div>
                    <ToggleTheme label />
                </header>

                <Section title="Common Button — variants">
                    <div className="flex flex-wrap gap-[12px]">
                        <Button variant="filled">Filled</Button>
                        <Button variant="tonal">Tonal</Button>
                        <Button variant="outlined">Outlined</Button>
                        <Button variant="elevated">Elevated</Button>
                        <Button variant="text">Text</Button>
                    </div>
                </Section>

                <Section title="Common Button — with icons">
                    <div className="flex flex-wrap gap-[12px]">
                        <Button variant="filled">
                            <MdStar />
                            Icon left
                        </Button>
                        <Button variant="outlined">
                            Icon right
                            <MdShare />
                        </Button>
                        <Button variant="tonal">
                            <MdEdit />
                            Both icons
                            <MdFavorite />
                        </Button>
                    </div>
                </Section>

                <Section title="Common Button — states">
                    <div className="flex flex-wrap gap-[12px]">
                        <Button variant="filled" disabled>
                            Disabled
                        </Button>
                        <Button
                            variant="filled"
                            onClick={() => alert("Clicked!")}>
                            Clickable
                        </Button>
                    </div>
                </Section>

                <Section title="Icon Button">
                    <div className="flex flex-wrap items-center gap-[12px]">
                        <IconButton
                            aria-label="Add"
                            variant="filled"
                            icon={<MdAdd size={24} />}
                        />
                        <IconButton
                            aria-label="Edit"
                            variant="tonal"
                            icon={<MdEdit size={24} />}
                        />
                        <IconButton
                            aria-label="Favorite"
                            variant="outlined"
                            icon={<MdFavorite size={24} />}
                        />
                        <IconButton
                            aria-label="Share"
                            variant="standard"
                            icon={<MdShare size={24} />}
                        />
                        <IconButton
                            aria-label="Add disabled"
                            variant="filled"
                            disabled
                            icon={<MdAdd size={24} />}
                        />
                    </div>
                </Section>

                <Section title="FAB">
                    <div className="flex flex-wrap items-end gap-[16px]">
                        <FAB
                            aria-label="Create small"
                            size="small"
                            variant="surface"
                            icon={<MdAdd size={20} />}
                        />
                        <FAB
                            aria-label="Create"
                            size="medium"
                            variant="secondary"
                            icon={<MdAdd size={24} />}
                        />
                        <FAB
                            aria-label="Create large"
                            size="large"
                            variant="tertiary"
                            icon={<MdAdd size={36} />}
                        />
                    </div>
                </Section>

                <Section title="Extended FAB">
                    <div className="flex flex-wrap gap-[12px]">
                        <ExtendedFAB
                            variant="surface"
                            icon={<MdAdd size={24} />}
                        >
                            Create
                        </ExtendedFAB>
                        <ExtendedFAB
                            variant="secondary"
                            icon={<MdEdit size={24} />}
                        >
                            Edit
                        </ExtendedFAB>
                        <ExtendedFAB
                            variant="tertiary"
                            icon={<MdShare size={24} />}
                        >
                            Share
                        </ExtendedFAB>
                    </div>
                </Section>

                <Section title="Segmented Buttons">
                    <SegmentedButtons
                        buttons={[
                            {
                                id: "1",
                                header: "Day",
                                content: <p>Day view content</p>,
                            },
                            {
                                id: "2",
                                header: "Week",
                                content: <p>Week view content</p>,
                            },
                            {
                                id: "3",
                                header: "Month",
                                content: <p>Month view content</p>,
                            },
                        ]}
                    />
                </Section>
            </div>
        </main>
    );
}
