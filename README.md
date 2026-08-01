# Material Me

CLI to install components into your project — similar to [shadcn/ui](https://ui.shadcn.com).

Components are copied into your repo (not installed as an npm UI package), with dependency install and import rewriting.

## Quick start

In a Next.js / React project with Tailwind CSS v4:

```bash
# Initialize (components.json, lib/utils, theme)
npx materialme-cli@latest init

# List components
npx materialme-cli@latest list

# Install
npx materialme-cli@latest add button
npx materialme-cli@latest add button badge icon
npx materialme-cli@latest add fade-in-top bar-chart
```

After `init`, your project will have:

- `components.json` — config (registry + aliases)
- `lib/utils.ts` — `cn()` helper
- `styles/materialme.css` — Material Me theme (imported into your CSS)

## Categories

| Category   | Description                   | Example            |
|-----------|-------------------------------|--------------------|
| components | Material Design UI            | `button`, `dialog` |
| elements   | Primitive elements            | `icon`, `checkbox` |
| anmt       | Animations                    | `fade-in-top`      |
| charts     | Charts                        | `bar-chart`        |
| utils      | Utilities / theme             | `utils`, `theme`   |

## How it works

1. The CLI reads `registry.json` from the CDN:  
   `https://cdn.jsdelivr.net/gh/sellmon/materialme@main/registry.json`
2. For each component, it downloads sources from  
   `packages/components/src/...`
3. It rewrites imports to match your aliases (`@/components`, `@/lib/utils`, …)
4. It installs the component’s npm dependencies

Offline: set a local `sourcePath` in `components.json` pointing at `packages/components`.

## Configuration (`components.json`)

```json
{
  "aliases": {
    "utils": "@/lib/utils",
    "components": "@/components",
    "elements": "@/components/elements",
    "anmt": "@/components/anmt",
    "charts": "@/components/charts",
    "lib": "@/lib"
  },
  "registry": "https://cdn.jsdelivr.net/gh/sellmon/materialme@main/registry.json",
  "registryBaseUrl": "https://cdn.jsdelivr.net/gh/sellmon/materialme@main/packages/components"
}
```

Make sure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## Monorepo development

```bash
# Rebuild registry.json from packages/components
pnpm build:registry

# Build the CLI
pnpm build:cli

# Preview
cd preview && pnpm dev
```

```
materialme/
├── packages/cli/          # npm: materialme-cli (bin: materialme)
├── packages/components/   # component sources
├── registry.json          # CLI index
├── scripts/               # sync + build-registry
└── preview/               # Next.js preview
```

## License

MIT
