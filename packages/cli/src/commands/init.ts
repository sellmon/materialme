import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import { ComponentConfig } from "../types.js";

const DEFAULT_CONFIG: ComponentConfig = {
  style: "default",
  tailwind: {
    config: "tailwind.config.js",
    css: "src/app/globals.css",
    baseColor: "slate",
  },
  aliases: {
    utils: "@/lib/utils",
    components: "@/components",
    lib: "@/lib",
  },
};

export async function initCommand(): Promise<void> {
  console.log("Initializing materialme components...\n");

  const projectRoot = process.cwd();

  // Check if package.json exists
  const packageJsonPath = path.join(projectRoot, "package.json");
  if (!await fs.pathExists(packageJsonPath)) {
    console.error("Error: package.json not found. Run 'npm init' first.");
    return;
  }

  // Ask for configuration options
  const response = await prompts([
    {
      type: "select",
      name: "style",
      message: "Which style would you like to use?",
      choices: [
        { title: "Default", value: "default" },
        { title: "New York", value: "new-york" },
      ],
      initial: 0,
    },
    {
      type: "text",
      name: "componentsDir",
      message: "Components directory:",
      initial: "components",
    },
    {
      type: "text",
      name: "utilsDir",
      message: "Utils directory:",
      initial: "lib",
    },
    {
      type: "text",
      name: "registryUrl",
      message: "Registry URL (optional):",
      initial: "",
    },
  ]);

  const config: ComponentConfig = {
    style: response.style || "default",
    tailwind: DEFAULT_CONFIG.tailwind,
    aliases: {
      utils: `@/${response.utilsDir || "lib"}/utils`,
      components: `@/${response.componentsDir || "components"}`,
      lib: `@/${response.utilsDir || "lib"}`,
    },
    registry: response.registryUrl || undefined,
  };

  // Create components.json
  const configPath = path.join(projectRoot, "components.json");
  await fs.writeJSON(configPath, config, { spaces: 2 });
  console.log(`✓ Created components.json`);

  // Create component directories
  const componentsPath = path.join(projectRoot, response.componentsDir || "components");
  const utilsPath = path.join(projectRoot, response.utilsDir || "lib");

  await fs.ensureDir(componentsPath);
  console.log(`✓ Created components directory: ${componentsPath}`);

  await fs.ensureDir(utilsPath);
  console.log(`✓ Created utils directory: ${utilsPath}`);

  // Create utils.ts if it doesn't exist
  const utilsFilePath = path.join(utilsPath, "utils.ts");
  if (!await fs.pathExists(utilsFilePath)) {
    const utilsContent = `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}
`;
    await fs.writeFile(utilsFilePath, utilsContent);
    console.log(`✓ Created utils.ts`);
  }

  // Install dependencies
  console.log("\nInstalling dependencies...");
  const { execSync } = await import("child_process");
  
  try {
    execSync("npm install -D tailwind-merge clsx class-variance-authority", {
      stdio: "inherit",
      cwd: projectRoot,
    });
    console.log("✓ Dependencies installed");
  } catch (error) {
    console.error("Failed to install dependencies. Please install manually:");
    console.error("  npm install -D tailwind-merge clsx class-variance-authority");
  }

  console.log("\n✓ Initialization complete!");
  console.log("\nYou can now add components with:");
  console.log("  npx materialme add <component-name>");
}
