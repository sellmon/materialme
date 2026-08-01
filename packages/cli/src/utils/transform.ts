import path from "path";
import { ComponentConfig, RegistryIndex } from "../types.js";

const CORE_UI_PREFIX = "@/core/ui/";

type BarrelCategory = "elements" | "components" | "anmt" | "charts";

export function transformImports(
  content: string,
  config: ComponentConfig,
  sourcePath?: string,
  registry?: RegistryIndex
): string {
  return content.replace(
    /import\s+(type\s+)?(?:\{([^}]+)\}|\*\s+as\s+(\w+)|(\w+))\s+from\s+["']([^"']+)["']/g,
    (
      full,
      typePrefix: string | undefined,
      named: string | undefined,
      namespaceName: string | undefined,
      defaultName: string | undefined,
      importPath: string
    ) => {
      const barrel = getBarrelCategory(importPath, sourcePath);

      if (barrel && named) {
        return expandBarrelImport({
          typePrefix: typePrefix ?? "",
          named,
          barrel,
          config,
          registry,
        });
      }

      const transformed = transformImportPath(importPath, config, sourcePath);
      if (transformed === importPath) {
        return full;
      }

      const clause = named
        ? `{${named}}`
        : namespaceName
          ? `* as ${namespaceName}`
          : defaultName;

      return `import ${typePrefix ?? ""}${clause} from "${transformed}"`;
    }
  );
}

function getBarrelCategory(
  importPath: string,
  sourcePath?: string
): BarrelCategory | null {
  const sub = resolveUiSubpath(importPath, sourcePath);
  if (!sub) return null;

  if (sub === "elements" || sub === "elements/index") return "elements";
  if (sub === "components" || sub === "components/index") return "components";
  if (sub === "anmt" || sub === "anmt/index") return "anmt";
  if (sub === "charts" || sub === "charts/index") return "charts";
  return null;
}

function resolveUiSubpath(importPath: string, sourcePath?: string): string | null {
  if (importPath.startsWith(CORE_UI_PREFIX)) {
    return importPath.slice(CORE_UI_PREFIX.length).replace(/\.(tsx?|jsx?)$/, "");
  }

  if (!importPath.startsWith(".") || !sourcePath) {
    return null;
  }

  const sourceDir = path.posix.dirname(sourcePath.replace(/\\/g, "/"));
  // Root with a leading slash so posix.normalize keeps a stable absolute-like path
  const resolved = path.posix
    .normalize(`/${sourceDir}/${importPath}`)
    .replace(/^\//, "");

  if (resolved.startsWith("src/")) {
    return resolved.slice("src/".length).replace(/\.(tsx?|jsx?)$/, "");
  }

  // Relative imports that walked above `src/` (normalize collapsed the prefix).
  // Treat the remainder as a path under the UI root.
  if (resolved && !resolved.includes("..")) {
    return resolved.replace(/\.(tsx?|jsx?)$/, "");
  }

  return null;
}

function expandBarrelImport(opts: {
  typePrefix: string;
  named: string;
  barrel: BarrelCategory;
  config: ComponentConfig;
  registry?: RegistryIndex;
}): string {
  const names = parseNamedImports(opts.named);

  return names
    .map(({ name, alias, isType }) => {
      const registryName = toKebabCase(name);
      const entry = opts.registry?.[registryName];
      const target = entry
        ? registryFileToAlias(entry.files, opts.config, name)
        : heuristicPath(opts.barrel, registryName, opts.config);

      const typeKw = opts.typePrefix || isType ? "type " : "";
      const importName = alias ? `${name} as ${alias}` : name;
      return `import ${typeKw}{ ${importName} } from "${target}"`;
    })
    .join("\n");
}

function registryFileToAlias(
  files: { path: string }[],
  config: ComponentConfig,
  exportName: string
): string {
  if (files.length === 0) {
    return heuristicPath("components", toKebabCase(exportName), config);
  }

  const baseName = exportName.replace(/Props$/, "");
  const match =
    files.find((f) => {
      const file = path.posix.basename(f.path, path.posix.extname(f.path));
      return (
        file === exportName ||
        file === baseName ||
        toKebabCase(file) === toKebabCase(baseName)
      );
    }) ?? files[0];

  return registryPathToAlias(match.path, config);
}

function registryPathToAlias(registryPath: string, config: ComponentConfig): string {
  const withoutExt = registryPath.replace(/\.(tsx?|jsx?)$/, "");
  const [category, ...rest] = withoutExt.split("/");
  const aliasMap: Record<string, string> = {
    components: config.aliases.components,
    elements: config.aliases.elements,
    anmt: config.aliases.anmt,
    charts: config.aliases.charts,
    lib: config.aliases.lib,
  };

  const base = aliasMap[category];
  if (base && rest.length > 0) {
    return `${base}/${rest.join("/")}`;
  }
  if (base) return base;
  return `@/${withoutExt}`;
}

function heuristicPath(
  barrel: BarrelCategory,
  registryName: string,
  config: ComponentConfig
): string {
  if (barrel === "elements") {
    return `${config.aliases.elements}/${registryName}`;
  }
  if (barrel === "anmt") {
    if (registryName === "types" || registryName.endsWith("-props")) {
      return `${config.aliases.anmt}/types`;
    }
    if (registryName === "use-visible") {
      return `${config.aliases.anmt}/utils/useVisible`;
    }
    if (registryName === "debounce") {
      return `${config.aliases.anmt}/utils/debounce`;
    }
    return `${config.aliases.anmt}/${registryName}`;
  }
  if (barrel === "charts") {
    return `${config.aliases.charts}/${registryName}`;
  }
  return `${config.aliases.components}/${registryName}`;
}

function parseNamedImports(
  named: string
): Array<{ name: string; alias?: string; isType: boolean }> {
  return named
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const typeMatch = part.match(/^type\s+(.+)$/);
      const body = typeMatch ? typeMatch[1].trim() : part;
      const [name, alias] = body.split(/\s+as\s+/).map((s) => s.trim());
      return { name, alias, isType: Boolean(typeMatch) };
    });
}

function toKebabCase(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function transformImportPath(
  importPath: string,
  config: ComponentConfig,
  sourcePath?: string
): string {
  if (importPath.startsWith(CORE_UI_PREFIX)) {
    return mapUiImport(importPath.slice(CORE_UI_PREFIX.length), config);
  }

  if (importPath.startsWith(".") && sourcePath) {
    const sub = resolveUiSubpath(importPath, sourcePath);
    if (sub) {
      return mapUiImport(sub, config);
    }
  }

  return importPath;
}

function mapUiImport(sub: string, config: ComponentConfig): string {
  const aliases = config.aliases;
  const withoutExt = sub.replace(/\.(tsx?|jsx?)$/, "");

  if (
    withoutExt === "lib/utils" ||
    withoutExt === "utils/utils" ||
    withoutExt === "utils"
  ) {
    return aliases.utils;
  }

  if (withoutExt.startsWith("lib/")) {
    return joinAlias(aliases.lib, withoutExt.slice("lib/".length));
  }

  if (withoutExt.startsWith("utils/")) {
    return withoutExt === "utils/utils"
      ? aliases.utils
      : joinAlias(aliases.utils, withoutExt.slice("utils/".length));
  }

  if (withoutExt === "elements" || withoutExt.startsWith("elements/")) {
    const rest =
      withoutExt === "elements" ? "" : withoutExt.slice("elements/".length);
    return rest ? joinAlias(aliases.elements, rest) : aliases.elements;
  }

  if (withoutExt === "components" || withoutExt.startsWith("components/")) {
    const rest =
      withoutExt === "components" ? "" : withoutExt.slice("components/".length);
    return rest ? joinAlias(aliases.components, rest) : aliases.components;
  }

  if (withoutExt === "anmt" || withoutExt.startsWith("anmt/")) {
    const rest = withoutExt === "anmt" ? "" : withoutExt.slice("anmt/".length);
    return rest ? joinAlias(aliases.anmt, rest) : aliases.anmt;
  }

  if (withoutExt === "charts" || withoutExt.startsWith("charts/")) {
    const rest = withoutExt === "charts" ? "" : withoutExt.slice("charts/".length);
    return rest ? joinAlias(aliases.charts, rest) : aliases.charts;
  }

  return `${CORE_UI_PREFIX}${withoutExt}`;
}

function joinAlias(alias: string, rest: string): string {
  if (!rest || rest === "index") {
    return alias;
  }
  return `${alias}/${rest}`;
}

export function resolveTargetPath(
  registryPath: string,
  config: ComponentConfig,
  projectRoot: string
): string {
  const aliasToDir: Record<string, string> = {
    components: stripAlias(config.aliases.components),
    elements: stripAlias(config.aliases.elements),
    anmt: stripAlias(config.aliases.anmt),
    charts: stripAlias(config.aliases.charts),
    lib: stripAlias(config.aliases.lib),
  };

  const [category, ...rest] = registryPath.split("/");
  const base = aliasToDir[category];

  if (base && rest.length > 0) {
    return path.join(projectRoot, base, ...rest);
  }

  if (category === "lib" || category === "styles") {
    return path.join(projectRoot, registryPath);
  }

  return path.join(projectRoot, registryPath);
}

function stripAlias(alias: string): string {
  return alias.replace(/^@\//, "");
}
