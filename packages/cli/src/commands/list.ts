import { ComponentConfig } from "../types.js";
import { fetchRegistryIndex } from "../registry/index.js";
import fs from "fs-extra";
import path from "path";

const CONFIG_FILE = "components.json";

export async function listCommand(category?: string): Promise<void> {
  const projectRoot = process.cwd();
  const configPath = path.join(projectRoot, CONFIG_FILE);

  let config: ComponentConfig | undefined;
  if (await fs.pathExists(configPath)) {
    config = await fs.readJSON(configPath);
  }

  let index;
  try {
    index = await fetchRegistryIndex(config?.registry, projectRoot);
  } catch (error) {
    console.error(error);
    return;
  }

  const entries = Object.values(index).sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  const filtered = category
    ? entries.filter((e) => e.category === category)
    : entries;

  if (filtered.length === 0) {
    console.log(category ? `No components in category "${category}".` : "No components in registry.");
    return;
  }

  let currentCategory = "";
  for (const entry of filtered) {
    if (entry.category !== currentCategory) {
      currentCategory = entry.category;
      console.log(`\n${currentCategory}:`);
    }
    const deps = entry.registryDependencies?.length
      ? ` (deps: ${entry.registryDependencies.join(", ")})`
      : "";
    console.log(`  ${entry.name}${deps}`);
  }

  console.log(`\n${filtered.length} total`);
}
