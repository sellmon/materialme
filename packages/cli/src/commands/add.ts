import fs from "fs-extra";
import path from "path";
import prompts from "prompts";
import { ComponentConfig, RegistryComponent, RegistryIndex } from "../types.js";
import { fetchRegistryIndex, fetchComponent, getRegistryDependencies } from "../registry/index.js";

const CONFIG_FILE = "components.json";

export async function addCommand(componentName?: string): Promise<void> {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, CONFIG_FILE);

  // Load config
  if (!await fs.pathExists(configPath)) {
    console.error("Error: components.json not found. Run 'materialme init' first.");
    return;
  }

  const config: ComponentConfig = await fs.readJSON(configPath);

  // Fetch registry index
  let index: RegistryIndex;
  try {
    index = await fetchRegistryIndex(config.registry);
  } catch (error) {
    console.error(error);
    return;
  }

  // If no component specified, show available components
  if (!componentName) {
    const components = Object.keys(index);
    if (components.length === 0) {
      console.log("No components available in registry.");
      return;
    }

    const response = await prompts({
      type: "multiselect",
      name: "components",
      message: "Which components would you like to add?",
      choices: components.map((name) => ({ title: name, value: name })),
    });

    if (!response.components || response.components.length === 0) {
      return;
    }

    for (const name of response.components) {
      await installComponent(name, index, config, projectRoot);
    }
  } else {
    await installComponent(componentName, index, config, projectRoot);
  }

  console.log("\n✓ Done!");
}

async function installComponent(
  name: string,
  index: RegistryIndex,
  config: ComponentConfig,
  projectRoot: string
): Promise<void> {
  const component = await fetchComponent(name, config.registry);
  
  if (!component) {
    console.error(`Component "${name}" not found in registry.`);
    return;
  }

  console.log(`\nInstalling ${name}...`);

  // Get all registry dependencies
  const deps = getRegistryDependencies(component, index);
  const allComponents = [component, ...deps];

  // Install npm dependencies
  if (component.dependencies && component.dependencies.length > 0) {
    console.log(`Installing npm dependencies: ${component.dependencies.join(", ")}`);
    const { execSync } = await import("child_process");
    try {
      execSync(`npm install ${component.dependencies.join(" ")}`, {
        stdio: "inherit",
        cwd: projectRoot,
      });
    } catch (error) {
      console.error("Failed to install dependencies");
    }
  }

  // Create directories and write files
  for (const comp of allComponents) {
    for (const file of comp.files) {
      const targetPath = path.join(projectRoot, file.path);
      const targetDir = path.dirname(targetPath);

      await fs.ensureDir(targetDir);

      if (file.url) {
        // Fetch from URL
        try {
          const response = await fetch(file.url);
          const content = await response.text();
          await fs.writeFile(targetPath, content);
          console.log(`  ✓ ${file.path}`);
        } catch (error) {
          console.error(`  ✗ Failed to fetch ${file.url}`);
        }
      } else if (file.content) {
        await fs.writeFile(targetPath, file.content);
        console.log(`  ✓ ${file.path}`);
      } else {
        console.log(`  ⚠ ${file.path} (no content)`);
      }
    }
  }
}
