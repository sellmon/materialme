import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import { ComponentConfig, RegistryComponent, RegistryIndex } from "../types.js";
import {
  fetchRegistryIndex,
  getComponent,
  getRegistryDependencies,
  dedupeComponents,
} from "../registry/index.js";
import { transformImports, resolveTargetPath } from "../utils/transform.js";
import { resolveFileContent } from "../utils/resolve-source.js";

const CONFIG_FILE = "components.json";

export async function addCommand(componentNames?: string[]): Promise<void> {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, CONFIG_FILE);

  if (!(await fs.pathExists(configPath))) {
    console.error("Error: components.json not found. Run 'materialme init' first.");
    return;
  }

  const config: ComponentConfig = await fs.readJSON(configPath);

  let index: RegistryIndex;
  try {
    index = await fetchRegistryIndex(config.registry, projectRoot);
  } catch (error) {
    console.error(error);
    return;
  }

  let names = componentNames?.filter(Boolean) ?? [];

  if (names.length === 0) {
    const components = Object.keys(index).sort();
    if (components.length === 0) {
      console.log("No components available in registry.");
      return;
    }

    const response = await prompts({
      type: "multiselect",
      name: "components",
      message: "Which components would you like to add?",
      choices: components.map((name) => ({
        title: `${name} (${index[name].category})`,
        value: name,
      })),
    });

    if (!response.components || response.components.length === 0) {
      return;
    }

    names = response.components;
  }

  const componentsToInstall: RegistryComponent[] = [];

  for (const name of names) {
    const component = getComponent(name, index);
    if (!component) {
      console.error(`Component "${name}" not found in registry.`);
      continue;
    }
    const deps = getRegistryDependencies(component, index);
    componentsToInstall.push(...deps, component);
  }

  const allComponents = dedupeComponents(componentsToInstall);

  if (allComponents.length === 0) {
    return;
  }

  console.log(`\nInstalling: ${allComponents.map((c) => c.name).join(", ")}`);

  await installComponents(allComponents, config, projectRoot, index);

  console.log("\n✓ Done!");
}

async function installComponents(
  allComponents: RegistryComponent[],
  config: ComponentConfig,
  projectRoot: string,
  index: RegistryIndex
): Promise<void> {
  const npmDeps = new Set<string>();
  for (const comp of allComponents) {
    comp.dependencies?.forEach((d) => npmDeps.add(d));
  }

  if (npmDeps.size > 0) {
    console.log(`Installing npm dependencies: ${[...npmDeps].join(", ")}`);
    const { execSync } = await import("child_process");
    const pm = detectPackageManager(projectRoot);

    try {
      const installCmd =
        pm === "pnpm"
          ? `pnpm add ${[...npmDeps].join(" ")}`
          : pm === "yarn"
            ? `yarn add ${[...npmDeps].join(" ")}`
            : `npm install ${[...npmDeps].join(" ")}`;

      execSync(installCmd, { stdio: "inherit", cwd: projectRoot });
    } catch {
      console.error("Failed to install dependencies. Install manually:");
      console.error(`  ${[...npmDeps].join(" ")}`);
    }
  }

  const writtenInSession = new Set<string>();
  const skippedExisting = new Set<string>();

  for (const comp of allComponents) {
    for (const file of comp.files) {
      const targetPath = resolveTargetPath(file.path, config, projectRoot);

      if (writtenInSession.has(targetPath)) {
        continue;
      }

      const targetDir = path.dirname(targetPath);
      await fs.ensureDir(targetDir);

      if (await fs.pathExists(targetPath)) {
        if (skippedExisting.has(targetPath)) {
          continue;
        }

        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${path.relative(projectRoot, targetPath)} already exists. Overwrite?`,
          initial: false,
        });

        if (!overwrite) {
          skippedExisting.add(targetPath);
          console.log(`  ⊘ skipped ${path.relative(projectRoot, targetPath)}`);
          continue;
        }
      }

      try {
        const raw = await resolveFileContent(file, config, projectRoot);
        if (!raw) {
          console.error(`  ✗ No content for ${file.path}`);
          continue;
        }

        const content =
          file.type === "style" || /\.css$/i.test(file.path)
            ? raw
            : transformImports(raw, config, file.source, index);
        await fs.writeFile(targetPath, content);
        writtenInSession.add(targetPath);
        console.log(`  ✓ ${path.relative(projectRoot, targetPath)}`);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`  ✗ ${file.path}: ${message}`);
      }
    }
  }
}

function detectPackageManager(projectRoot: string): "pnpm" | "yarn" | "npm" {
  if (fs.existsSync(path.join(projectRoot, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(projectRoot, "yarn.lock"))) return "yarn";
  return "npm";
}
