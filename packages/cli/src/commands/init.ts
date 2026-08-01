import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import { ComponentConfig } from "../types.js";
import {
  DEFAULT_REGISTRY_BASE_URL,
} from "../registry/index.js";

const DEFAULT_REGISTRY_URL =
  "https://cdn.jsdelivr.net/gh/sellmon/materialme@main/registry.json";

const THEME_CSS_URL =
  "https://cdn.jsdelivr.net/gh/sellmon/materialme@main/packages/components/src/styles/globals.css";

const DEFAULT_CONFIG: Omit<ComponentConfig, "aliases"> = {
  style: "default",
  tailwind: {
    config: "postcss.config.mjs",
    css: "app/globals.css",
    baseColor: "slate",
  },
};

export async function initCommand(): Promise<void> {
  console.log("Initializing materialme components...\n");

  const projectRoot = process.cwd();
  const packageJsonPath = path.join(projectRoot, "package.json");

  if (!(await fs.pathExists(packageJsonPath))) {
    console.error("Error: package.json not found. Run 'npm init' first.");
    return;
  }

  const response = await prompts([
    {
      type: "text",
      name: "componentsDir",
      message: "Components directory:",
      initial: "components",
    },
    {
      type: "text",
      name: "cssPath",
      message: "Global CSS file:",
      initial: "app/globals.css",
    },
    {
      type: "confirm",
      name: "installTheme",
      message: "Install Material Me theme CSS?",
      initial: true,
    },
    {
      type: "text",
      name: "registryUrl",
      message: "Registry URL or local path:",
      initial: DEFAULT_REGISTRY_URL,
    },
    {
      type: "text",
      name: "sourcePath",
      message: "Local packages/components path (optional, for offline):",
      initial: "",
    },
  ]);

  const componentsDir = response.componentsDir || "components";
  const cssPath = response.cssPath || DEFAULT_CONFIG.tailwind.css;

  const config: ComponentConfig = {
    style: "default",
    tailwind: {
      ...DEFAULT_CONFIG.tailwind,
      css: cssPath,
    },
    aliases: {
      utils: "@/lib/utils",
      components: `@/${componentsDir}`,
      elements: `@/${componentsDir}/elements`,
      anmt: `@/${componentsDir}/anmt`,
      charts: `@/${componentsDir}/charts`,
      lib: "@/lib",
    },
    registry: response.registryUrl || DEFAULT_REGISTRY_URL,
    registryBaseUrl: DEFAULT_REGISTRY_BASE_URL,
    sourcePath: response.sourcePath || undefined,
  };

  const configPath = path.join(projectRoot, "components.json");
  await fs.writeJSON(configPath, config, { spaces: 2 });
  console.log("✓ Created components.json");

  const dirs = [
    path.join(projectRoot, componentsDir),
    path.join(projectRoot, componentsDir, "elements"),
    path.join(projectRoot, componentsDir, "anmt"),
    path.join(projectRoot, componentsDir, "charts"),
    path.join(projectRoot, "lib"),
  ];

  for (const dir of dirs) {
    await fs.ensureDir(dir);
    console.log(`✓ Created ${path.relative(projectRoot, dir)}/`);
  }

  const utilsFilePath = path.join(projectRoot, "lib", "utils.ts");
  if (!(await fs.pathExists(utilsFilePath))) {
    const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    await fs.writeFile(utilsFilePath, utilsContent);
    console.log("✓ Created lib/utils.ts");
  }

  if (response.installTheme !== false) {
    await installThemeCss(projectRoot, cssPath);
  }

  console.log("\nInstalling dependencies...");
  const { execSync } = await import("child_process");
  const pm = detectPackageManager(projectRoot);

  const deps = ["clsx", "tailwind-merge", "tailwindcss", "tw-animate-css"];

  try {
    const joined = deps.join(" ");
    const cmd =
      pm === "pnpm"
        ? `pnpm add ${joined}`
        : pm === "yarn"
          ? `yarn add ${joined}`
          : `npm install ${joined}`;

    execSync(cmd, { stdio: "inherit", cwd: projectRoot });
    console.log("✓ Dependencies installed");
  } catch {
    console.error("Failed to install dependencies. Install manually:");
    console.error(`  ${deps.join(" ")}`);
  }

  console.log("\n✓ Initialization complete!");
  console.log("\nNext steps:");
  console.log("  npx materialme-cli list");
  console.log("  npx materialme-cli add button");
}

async function installThemeCss(projectRoot: string, cssPath: string): Promise<void> {
  const themeDir = path.join(projectRoot, "styles");
  const themePath = path.join(themeDir, "materialme.css");
  await fs.ensureDir(themeDir);

  try {
    const response = await fetch(THEME_CSS_URL);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const themeCss = await response.text();
    await fs.writeFile(themePath, themeCss);
    console.log("✓ Created styles/materialme.css");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`✗ Could not download theme CSS: ${message}`);
    console.error(`  Fetch manually: ${THEME_CSS_URL}`);
    return;
  }

  const absCssPath = path.resolve(projectRoot, cssPath);
  const relativeImport = path
    .relative(path.dirname(absCssPath), themePath)
    .replace(/\\/g, "/");
  const importForPath = `@import "${relativeImport.startsWith(".") ? relativeImport : `./${relativeImport}`}";`;

  if (await fs.pathExists(absCssPath)) {
    const existing = await fs.readFile(absCssPath, "utf8");
    if (!existing.includes("materialme.css")) {
      await fs.writeFile(absCssPath, `${importForPath}\n${existing}`);
      console.log(`✓ Added theme import to ${cssPath}`);
    }
  } else {
    await fs.ensureDir(path.dirname(absCssPath));
    await fs.writeFile(
      absCssPath,
      `${importForPath}\n`
    );
    console.log(`✓ Created ${cssPath} with theme import`);
  }
}

function detectPackageManager(projectRoot: string): "pnpm" | "yarn" | "npm" {
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) return "yarn";
  return "npm";
}
