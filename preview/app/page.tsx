"use client";

import { useState } from "react";
import {
  Amount,
  AreaChart,
  Avatar,
  AvatarStack,
  Badge,
  BarChart,
  BottomAppBar,
  Button,
  Card,
  Checkbox,
  Chips,
  Circle,
  Dialog,
  ColumnDef,
  DataTable,
  Divider,
  DotBadge,
  Dropdown,
  ExtendedFAB,
  FAB,
  IconButton,
  InputFilled,
  InputOutlined,
  LinkBox,
  List,
  Loading,
  NavigationBar,
  NavigationRail,
  OnIconBadge,
  OverflowMenu,
  Progress,
  Radio,
  Search,
  SearchInput,
  SearchItem,
  SegmentedButtons,
  Slider,
  SliderDual,
  Snackbar,
  SnackbarWrapper,
  Switch,
  TabsPrimary,
  TabsSecondary,
  TextElement,
  TextFieldFilled,
  TextFieldOutlined,
  ToggleTheme,
  Tooltip,
  TopAppBar,
} from "@materialme/components";
import {
  MdAdd,
  MdCheck,
  MdEdit,
  MdFavorite,
  MdHome,
  MdMenu,
  MdMoreVert,
  MdPerson,
  MdSearch,
  MdSettings,
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
    <section className="flex flex-col gap-4 rounded-extra-large bg-dot-pattern p-6 lg:p-8">
      <h2 className="text-title-large text-on-surface">{title}</h2>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-3">{children}</div>;
}

const chartData = [
  { month: "Jan", value: 12 },
  { month: "Feb", value: 18 },
  { month: "Mar", value: 15 },
  { month: "Apr", value: 22 },
];

type Person = {
  name: string;
  role: string;
  status: string;
};

const tableData: Person[] = [
  { name: "Ada Lovelace", role: "Engineer", status: "Active" },
  { name: "Alan Turing", role: "Scientist", status: "Away" },
  { name: "Grace Hopper", role: "Admiral", status: "Active" },
];

const tableColumns: ColumnDef<Person>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "status", header: "Status" },
];

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <>
      <main className="min-h-screen bg-surface p-6 lg:p-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-8">
          <header className="sticky top-0 z-10 flex flex-col gap-3 rounded-extra-large bg-surface/90 px-1 py-3 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-headline-medium text-on-surface">
                Component Gallery
              </h1>
              <p className="text-body-medium text-on-surface-variant">
                Light / dark via theme toggle — Material You tokens
              </p>
            </div>
            <ToggleTheme label />
          </header>

          {/* Buttons */}
          <Section title="Buttons">
            <Row>
              <Button variant="filled">Filled</Button>
              <Button variant="tonal">Tonal</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="elevated">Elevated</Button>
              <Button variant="text">Text</Button>
              <Button variant="filled" disabled>
                Disabled
              </Button>
            </Row>
            <Row>
              <Button variant="filled">
                <MdStar />
                With icon
              </Button>
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
            </Row>
            <Row>
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
              <ExtendedFAB variant="surface" icon={<MdAdd size={24} />}>
                Create
              </ExtendedFAB>
              <ExtendedFAB variant="secondary" icon={<MdEdit size={24} />}>
                Edit
              </ExtendedFAB>
            </Row>
            <SegmentedButtons
              buttons={[
                { id: "1", header: "Day", content: <p>Day view</p> },
                { id: "2", header: "Week", content: <p>Week view</p> },
                { id: "3", header: "Month", content: <p>Month view</p> },
              ]}
            />
          </Section>

          {/* Badges & chips */}
          <Section title="Badges & Chips">
            <Row>
              <Badge text="99+" />
              <Badge text="New" iconLeft={<MdStar size={12} />} />
              <DotBadge />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high">
                <MdPerson size={24} />
                <OnIconBadge count={3} className="-right-1 -top-1" />
              </div>
              <Chips>Chip</Chips>
              <Chips leftElement={<MdCheck size={18} />}>Filter</Chips>
              <Chips disabled>Disabled</Chips>
            </Row>
          </Section>

          {/* Avatars */}
          <Section title="Avatars">
            <Row>
              <Avatar name="AB" size={40} />
              <Avatar name="CD" size={48} ring />
              <AvatarStack
                size={36}
                avatars={[
                  { id: "1", initials: "A" },
                  { id: "2", initials: "B" },
                  { id: "3", initials: "C" },
                ]}
              />
            </Row>
          </Section>

          {/* Form controls */}
          <Section title="Form controls">
            <Row>
              <Checkbox label="Checkbox" defaultChecked />
              <Radio name="preview-radio" value="a" label="Radio A" defaultChecked />
              <Radio name="preview-radio" value="b" label="Radio B" />
              <Switch label="Switch" defaultChecked />
              <Amount defaultValue={2} min={0} max={9} />
            </Row>
            <div className="grid gap-4 md:grid-cols-2">
              <InputFilled placeholder="Filled input" />
              <InputOutlined placeholder="Outlined input" />
              <TextFieldFilled placeholder="Filled textarea" rows={3} />
              <TextFieldOutlined placeholder="Outlined textarea" rows={3} />
            </div>
            <div className="flex flex-col gap-4">
              <Slider min={0} max={100} />
              <SliderDual min={0} max={100} />
            </div>
          </Section>

          {/* Progress & loading */}
          <Section title="Progress & Loading">
            <Row>
              <div className="w-full max-w-sm">
                <Progress percentageValue={60} />
              </div>
              <Circle value={75} size={48} />
              <Loading size={40} />
            </Row>
          </Section>

          {/* Cards & lists */}
          <Section title="Cards & Lists">
            <Card>
              <Card.Header>
                <TextElement title="Card title" body="Supporting text" />
              </Card.Header>
              <Card.Body>
                Card body content with surface tokens.
              </Card.Body>
              <Card.Footer>
                <Button variant="text">Action</Button>
              </Card.Footer>
            </Card>
            <Divider />
            <List
              headline="List item"
              body="Supporting line"
              leftElement={<MdPerson size={24} />}
              rightElement={<Badge text="2" />}
            />
            <List
              headline="Another item"
              body="More detail"
              leftElement={<MdSettings size={24} />}
            />
          </Section>

          {/* Menus & search */}
          <Section title="Menus, Search & Tooltip">
            <Row>
              <Dropdown
                menu={
                  <>
                    <Dropdown.Item label="Profile" />
                    <Dropdown.Item label="Settings" />
                  </>
                }
              >
                <Button variant="outlined">Dropdown</Button>
              </Dropdown>
              <OverflowMenu
                bottomRight
                menu={
                  <>
                    <OverflowMenu.Item label="Edit" leftElement={<MdEdit />} />
                    <OverflowMenu.Item label="Share" leftElement={<MdShare />} />
                  </>
                }
              >
                <IconButton
                  aria-label="More"
                  variant="standard"
                  icon={<MdMoreVert size={24} />}
                />
              </OverflowMenu>
              <Tooltip text="Tooltip hint" topRight>
                <Button variant="tonal">Hover me</Button>
              </Tooltip>
              <LinkBox href="#">Link box</LinkBox>
            </Row>
            <Search
              result={
                <>
                  <SearchItem label="First result" />
                  <SearchItem label="Second result" />
                </>
              }
            >
              <SearchInput
                placeholder="Search…"
                leftElement={<MdSearch size={24} />}
              />
            </Search>
          </Section>

          {/* Tabs */}
          <Section title="Tabs">
            <TabsPrimary
              tabs={[
                { id: 1, header: "Primary A", content: <p>Tab A content</p> },
                { id: 2, header: "Primary B", content: <p>Tab B content</p> },
              ]}
            />
            <TabsSecondary
              tabs={[
                { id: 1, header: "Secondary A", content: <p>Panel A</p> },
                { id: 2, header: "Secondary B", content: <p>Panel B</p> },
              ]}
            />
          </Section>

          {/* Navigation */}
          <Section title="Navigation">
            <TopAppBar>
              <TopAppBar.Small
                title="Top app bar"
                leftElement={<MdMenu size={24} />}
                rightElement={<MdMoreVert size={24} />}
              />
            </TopAppBar>
            <NavigationBar>
              <NavigationBar.Item icon={<MdHome size={24} />} label="Home" />
              <NavigationBar.Item
                icon={<MdFavorite size={24} />}
                label="Fav"
                badge
                badgeText="3"
              />
              <NavigationBar.Item
                icon={<MdSettings size={24} />}
                label="Settings"
              />
            </NavigationBar>
            <div className="h-56 overflow-hidden rounded-large border border-outline">
              <NavigationRail
                height="100%"
                center={
                  <>
                    <NavigationRail.Item
                      icon={<MdHome size={24} />}
                      label="Home"
                    />
                    <NavigationRail.Item
                      icon={<MdSearch size={24} />}
                      label="Search"
                    />
                    <NavigationRail.Item
                      icon={<MdSettings size={24} />}
                      label="Settings"
                    />
                  </>
                }
              />
            </div>
            <BottomAppBar
              fab={
                <FAB
                  aria-label="Create"
                  size="medium"
                  variant="secondary"
                  icon={<MdAdd size={24} />}
                />
              }
            >
              <IconButton
                aria-label="Home"
                variant="standard"
                icon={<MdHome size={24} />}
              />
              <IconButton
                aria-label="Search"
                variant="standard"
                icon={<MdSearch size={24} />}
              />
              <IconButton
                aria-label="Settings"
                variant="standard"
                icon={<MdSettings size={24} />}
              />
            </BottomAppBar>
          </Section>

          {/* Table */}
          <Section title="Data table">
            <p className="text-body-small text-on-surface-variant">
              TanStack Table — click headers to sort
            </p>
            <DataTable columns={tableColumns} data={tableData} />
          </Section>

          {/* Charts */}
          <Section title="Charts">
            <div className="grid gap-6 md:grid-cols-2">
              <AreaChart
                data={chartData}
                dataKey="month"
                categories={["value"]}
                height="220"
              />
              <BarChart
                data={chartData}
                dataKey="month"
                categories={["value"]}
                height="220"
              />
            </div>
          </Section>

          {/* Overlays */}
          <Section title="Overlays">
            <Row>
              <Button variant="filled" onClick={() => setDialogOpen(true)}>
                Open dialog
              </Button>
              <Button variant="tonal" onClick={() => setSnackbarOpen(true)}>
                Show snackbar
              </Button>
            </Row>
          </Section>
        </div>

      </main>

      <Dialog isVisible={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Dialog.Header
          headline="Dialog title"
          text="Supports light and dark surface tokens."
        />
        <Dialog.Body>
          <p className="text-body-medium text-on-surface-variant">
            Use the theme toggle in the header to switch appearance.
          </p>
        </Dialog.Body>
        <Dialog.Footer>
          <Button variant="text" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="filled" onClick={() => setDialogOpen(false)}>
            Confirm
          </Button>
        </Dialog.Footer>
      </Dialog>

      <SnackbarWrapper>
        <Snackbar
          isVisible={snackbarOpen}
          text="Saved successfully"
          button={
            <Button variant="text" onClick={() => setSnackbarOpen(false)}>
              Dismiss
            </Button>
          }
        />
      </SnackbarWrapper>
    </>
  );
}
