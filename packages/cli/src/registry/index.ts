import fs from "fs-extra";
import path from "path";
import { RegistryIndex, RegistryComponent } from "../types.js";

const DEFAULT_REGISTRY_URL =
  "https://raw.githubusercontent.com/sellmon/materialme/main/registry.json";

export const DEFAULT_REGISTRY_BASE_URL =
  "https://raw.githubusercontent.com/sellmon/materialme/main/packages/components";

export async function fetchRegistryIndex(
  registryUrl?: string,
  projectRoot?: string
): Promise<RegistryIndex> {
  if (!registryUrl) {
    return fetchRemoteRegistry(DEFAULT_REGISTRY_URL);
  }

  if (registryUrl.startsWith("http://") || registryUrl.startsWith("https://")) {
    return fetchRemoteRegistry(registryUrl);
  }

  const localPath = path.isAbsolute(registryUrl)
    ? registryUrl
    : path.resolve(projectRoot ?? process.cwd(), registryUrl);

  if (await fs.pathExists(localPath)) {
    return fs.readJSON(localPath);
  }

  return fetchRemoteRegistry(registryUrl);
}

async function fetchRemoteRegistry(url: string): Promise<RegistryIndex> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry from ${url}: ${response.statusText}`);
    }

    return (await response.json()) as RegistryIndex;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not fetch registry index: ${error.message}`);
    }
    throw new Error("Could not fetch registry index");
  }
}

export function getComponent(
  name: string,
  index: RegistryIndex
): RegistryComponent | null {
  return index[name] ?? null;
}

export function getRegistryDependencies(
  component: RegistryComponent,
  index: RegistryIndex
): RegistryComponent[] {
  const deps: RegistryComponent[] = [];
  const seen = new Set<string>();

  function collect(comp: RegistryComponent) {
    if (!comp.registryDependencies) return;

    for (const depName of comp.registryDependencies) {
      if (seen.has(depName)) continue;
      seen.add(depName);

      const dep = index[depName];
      if (dep) {
        deps.push(dep);
        collect(dep);
      }
    }
  }

  collect(component);
  return deps;
}

export function dedupeComponents(
  components: RegistryComponent[]
): RegistryComponent[] {
  const seen = new Set<string>();
  const result: RegistryComponent[] = [];

  for (const comp of components) {
    if (seen.has(comp.name)) continue;
    seen.add(comp.name);
    result.push(comp);
  }

  return result;
}
