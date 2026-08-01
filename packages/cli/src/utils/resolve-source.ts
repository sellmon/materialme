import fs from "fs-extra";
import path from "path";
import { ComponentConfig, RegistryFile } from "../types.js";

export async function resolveFileContent(
  file: RegistryFile,
  config: ComponentConfig,
  projectRoot: string
): Promise<string | null> {
  if (file.content) {
    return file.content;
  }

  if (config.sourcePath && file.source) {
    const localPath = path.join(config.sourcePath, file.source);
    if (await fs.pathExists(localPath)) {
      return fs.readFile(localPath, "utf8");
    }
  }

  if (file.url) {
    const response = await fetch(file.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${file.url}: ${response.statusText}`);
    }
    return response.text();
  }

  if (file.source && config.registryBaseUrl) {
    const url = `${config.registryBaseUrl.replace(/\/$/, "")}/${file.source}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    return response.text();
  }

  const localRegistryPath = config.registry?.startsWith("/") || config.registry?.startsWith(".")
    ? path.resolve(projectRoot, config.registry)
    : null;

  if (localRegistryPath && file.source) {
    const registryDir = path.dirname(localRegistryPath);
    const componentsRoot =
      config.sourcePath ?? path.resolve(registryDir, "packages/components");
    const localPath = path.join(componentsRoot, file.source);
    if (await fs.pathExists(localPath)) {
      return fs.readFile(localPath, "utf8");
    }
  }

  return null;
}
