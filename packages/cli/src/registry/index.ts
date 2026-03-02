import { RegistryIndex, RegistryComponent } from "../types.js";

const DEFAULT_REGISTRY_URL = "https://raw.githubusercontent.com/vladislavkors/materialme/main/registry.json";

export async function fetchRegistryIndex(registryUrl?: string): Promise<RegistryIndex> {
  const url = registryUrl || DEFAULT_REGISTRY_URL;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch registry from ${url}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data as RegistryIndex;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Could not fetch registry index: ${error.message}`);
    }
    throw new Error(`Could not fetch registry index`);
  }
}

export async function fetchComponent(
  name: string,
  registryUrl?: string
): Promise<RegistryComponent | null> {
  const index = await fetchRegistryIndex(registryUrl);
  return index[name] || null;
}

export function getRegistryDependencies(
  component: RegistryComponent,
  index: RegistryIndex
): RegistryComponent[] {
  const deps: RegistryComponent[] = [];
  
  if (!component.registryDependencies) {
    return deps;
  }
  
  for (const depName of component.registryDependencies) {
    const dep = index[depName];
    if (dep) {
      deps.push(dep);
      deps.push(...getRegistryDependencies(dep, index));
    }
  }
  
  return deps;
}
