export interface ComponentConfig {
  $schema?: string;
  style: "default";
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
  };
  aliases: {
    utils: string;
    components: string;
    elements: string;
    anmt: string;
    charts: string;
    lib: string;
  };
  /** URL or local path to registry.json */
  registry?: string;
  /** Base URL for raw source files (GitHub raw) */
  registryBaseUrl?: string;
  /** Local path to packages/components for offline installs */
  sourcePath?: string;
}

export interface RegistryComponent {
  name: string;
  category: "components" | "elements" | "anmt" | "charts" | "utils";
  type: "component" | "hook" | "util" | "style";
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}

export interface RegistryFile {
  path: string;
  source?: string;
  type: "component" | "util" | "style";
  content?: string;
  url?: string;
}

export interface RegistryIndex {
  [name: string]: RegistryComponent;
}
