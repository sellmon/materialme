export interface ComponentConfig {
  style: "default" | "new-york";
  tailwind: {
    config: string;
    css: string;
    baseColor: string;
  };
  aliases: {
    utils: string;
    components: string;
    lib: string;
  };
  registry?: string;
}

export interface RegistryComponent {
  name: string;
  type: "component" | "hook" | "util" | "style";
  files: RegistryFile[];
  dependencies?: string[];
  registryDependencies?: string[];
}

export interface RegistryFile {
  path: string;
  type: "component" | "util" | "style";
  content?: string;
  url?: string;
}

export interface RegistryIndex {
  [name: string]: RegistryComponent;
}
