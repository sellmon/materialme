#!/usr/bin/env node
/**
 * Scans packages/components/src and generates registry.json for the materialme CLI.
 *
 * Usage:
 *   node scripts/build-registry.mjs [path-to-packages/components]
 *
 * Default: packages/components (relative to materialme root)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SOURCE = path.resolve(ROOT, "packages/components");
const UI_ROOT = "src";

const COMPONENTS_ROOT = path.resolve(process.argv[2] || DEFAULT_SOURCE);
const UI_PATH = path.join(COMPONENTS_ROOT, UI_ROOT);
const OUTPUT = path.join(ROOT, "registry.json");

const NPM_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "next-themes",
  "recharts",
  "d3",
  "d3-geo",
  "@visx/visx",
  "@visx/axis",
  "@visx/curve",
  "@visx/event",
  "@visx/geo",
  "@visx/gradient",
  "@visx/grid",
  "@visx/group",
  "@visx/responsive",
  "@visx/scale",
  "@visx/shape",
  "clsx",
  "tailwind-merge",
  "tailwindcss",
  "react-icons",
  "react-fast-marquee",
  "@react-spring/web",
  "topojson-client",
]);

const REGISTRY_NAME_ALIASES = {
  "fade-in-props": "types",
  "slide-in-props": "types",
  "move-props": "types",
  "scale-up-props": "types",
  "tilt-props": "types",
  "tilt-mouse-props": "types",
  "set-category-colors": "set-color",
  "color-values": "set-color",
  color: "set-color",
};

function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();
}

function readFileSafe(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return null;
  }
}

function parseExportsFromIndex(indexPath) {
  const content = readFileSafe(indexPath);
  if (!content) return [];

  const exports = [];
  const regex = /export\s+\*\s+from\s+["'](.+?)["']/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const rel = match[1];
    const baseDir = path.dirname(indexPath);
    const candidates = [
      path.join(baseDir, `${rel}.tsx`),
      path.join(baseDir, `${rel}.ts`),
      path.join(baseDir, rel, "index.tsx"),
      path.join(baseDir, rel, "index.ts"),
    ];

    const resolved = candidates.find((c) => fs.existsSync(c));
    if (!resolved) continue;

    const exportName = parseNamedExport(resolved) ?? path.basename(resolved, path.extname(resolved));
    exports.push({
      sourceFile: resolved,
      exportName,
      category: getCategory(resolved),
    });
  }

  return exports;
}

function parseNamedExport(filePath) {
  const content = readFileSafe(filePath);
  if (!content) return null;

  const named = content.match(/export\s*\{\s*(\w+)/);
  if (named) return named[1];

  const constExport = content.match(/export\s+const\s+(\w+)/);
  if (constExport) return constExport[1];

  return null;
}

function getCategory(absPath) {
  const rel = path.relative(UI_PATH, absPath).replace(/\\/g, "/");
  if (rel.startsWith("components/")) return "components";
  if (rel.startsWith("elements/")) return "elements";
  if (rel.startsWith("anmt/")) return "anmt";
  if (rel.startsWith("charts/")) return "charts";
  if (rel.startsWith("utils/") || rel.startsWith("lib/")) return "utils";
  return "components";
}

function sourceToTargetPath(sourceAbsPath, exportName) {
  const rel = path.relative(UI_PATH, sourceAbsPath).replace(/\\/g, "/");
  const category = getCategory(sourceAbsPath);
  const fileName = path.basename(sourceAbsPath);

  if (category === "elements") {
    return `elements/${toKebabCase(exportName)}.tsx`;
  }

  if (category === "anmt") {
    const parts = rel.split("/");
    if (parts.length === 2) {
      return `anmt/${fileName}`;
    }
    const subfolder = parts[1] ?? "misc";
    return `anmt/${subfolder}/${fileName}`;
  }

  if (category === "charts") {
    const parts = rel.split("/");
    const chartFolder = parts[1] ?? toKebabCase(exportName);
    return `charts/${toKebabCase(chartFolder)}/${fileName}`;
  }

  if (category === "utils") {
    return `lib/utils.ts`;
  }

  const parts = rel.split("/");
  const folder = parts.slice(1, -1).map(toKebabCase).join("/") || toKebabCase(exportName);
  return `components/${folder}/${fileName}`;
}

function parseImportStatements(content, fromFile) {
  const imports = [];
  const regex = /import\s+(?:type\s+)?(?:\{([^}]+)\}|(\w+))\s+from\s+["']([^"']+)["']/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const names = match[1]
      ? match[1].split(",").map((s) => s.trim().split(/\s+as\s+/)[0].trim()).filter(Boolean)
      : [match[2]].filter(Boolean);

    const resolved = resolveImport(match[3], fromFile);
    imports.push({ names, path: match[3], resolved });
  }

  return imports;
}

function normalizeRegistryName(name) {
  const kebab = toKebabCase(name);
  if (name.endsWith("Props")) return "types";
  return REGISTRY_NAME_ALIASES[kebab] ?? kebab;
}

function barrelImportToRegistryNames(resolvedPath, importedNames) {
  const rel = path.relative(UI_PATH, resolvedPath).replace(/\\/g, "/");

  if (rel === "elements/index.ts" || rel === "elements") {
    return importedNames.map((n) => normalizeRegistryName(n));
  }

  if (rel === "components/index.ts") {
    return importedNames.map((n) => normalizeRegistryName(n));
  }

  if (rel === "anmt/types.ts") {
    return ["types"];
  }

  if (rel === "anmt/index.ts" || rel.startsWith("anmt/")) {
    return importedNames.map((n) => normalizeRegistryName(n));
  }

  return [];
}

function resolveImport(importPath, fromFile) {
  if (importPath.startsWith("@/core/ui/")) {
    const sub = importPath.replace("@/core/ui/", "");
    const candidates = [
      path.join(UI_PATH, `${sub}.tsx`),
      path.join(UI_PATH, `${sub}.ts`),
      path.join(UI_PATH, sub, "index.tsx"),
      path.join(UI_PATH, sub, "index.ts"),
    ];
    const resolved = candidates.find((c) => fs.existsSync(c));
    return resolved ? { kind: "internal", path: resolved } : null;
  }

  if (importPath.startsWith(".")) {
    const base = path.dirname(fromFile);
    const candidates = [
      path.join(base, `${importPath}.tsx`),
      path.join(base, `${importPath}.ts`),
      path.join(base, importPath, "index.tsx"),
      path.join(base, importPath, "index.ts"),
    ];
    const resolved = candidates.find((c) => fs.existsSync(c));
    return resolved ? { kind: "internal", path: resolved } : null;
  }

  const pkg = importPath.startsWith("@")
    ? importPath.split("/").slice(0, 2).join("/")
    : importPath.split("/")[0];

  if (NPM_PACKAGES.has(pkg) || importPath.startsWith("tailwindcss/")) {
    return { kind: "npm", name: importPath.split("/")[0].startsWith("@") ? pkg : importPath.split("/")[0] };
  }

  return null;
}

function getComponentDir(sourceFile) {
  const rel = path.relative(UI_PATH, sourceFile).replace(/\\/g, "/");
  const parts = rel.split("/");

  if (parts[0] === "components" && parts.length >= 3) {
    return path.dirname(sourceFile);
  }
  if (parts[0] === "elements") {
    return path.join(UI_PATH, parts[0], parts[1] ?? parts[0]);
  }
  if (parts[0] === "anmt") {
    if (parts[1] === "types.ts" || parts[1] === "types") {
      return path.dirname(sourceFile);
    }
    if (parts.length >= 3) {
      return path.join(UI_PATH, parts[0], parts[1]);
    }
  }
  if (parts[0] === "charts") {
    if (parts[1] === "helpers") {
      return path.dirname(sourceFile);
    }
    if (parts[1] === "Visx") {
      return path.join(UI_PATH, parts[0], parts[1]);
    }
    return path.join(UI_PATH, parts[0], parts[1]);
  }
  if (parts[0] === "utils" || parts[0] === "lib") {
    return path.dirname(sourceFile);
  }

  return path.dirname(sourceFile);
}

function collectFilesInComponentDir(sourceFile) {
  const rel = path.relative(UI_PATH, sourceFile).replace(/\\/g, "/");

  if (rel.startsWith("elements/") || rel === "anmt/types.ts" || rel === "lib/utils.ts") {
    return [sourceFile];
  }

  const dir = getComponentDir(sourceFile);
  const files = [];

  function walk(currentDir) {
    if (!fs.existsSync(currentDir)) return;

    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      if (entry.name === "data-samples" || entry.name.startsWith(".")) continue;

      const full = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }

      if (!/\.(tsx?)$/.test(entry.name) || entry.name.endsWith(".d.ts")) continue;
      if (entry.name === "index.ts" || entry.name === "index.tsx") continue;

      files.push(full);
    }
  }

  walk(dir);

  if (!files.includes(sourceFile)) {
    files.unshift(sourceFile);
  }

  return files;
}

function isIndexFile(filePath) {
  return path.basename(filePath).startsWith("index.");
}

function fileToRegistryName(absPath) {
  const exportName = parseNamedExport(absPath) ?? path.basename(absPath, path.extname(absPath));
  return toKebabCase(exportName);
}

function buildRegistryEntry(exportInfo) {
  const { sourceFile, exportName, category } = exportInfo;
  const relatedFiles = collectFilesInComponentDir(sourceFile);
  const allDeps = new Set();
  const registryDeps = new Set();

  for (const file of relatedFiles) {
    const content = readFileSafe(file);
    if (!content) continue;

    for (const imp of parseImportStatements(content, file)) {
      if (!imp.resolved) continue;

      if (imp.resolved.kind === "npm") {
        allDeps.add(imp.resolved.name);
        continue;
      }

      if (imp.resolved.kind !== "internal") continue;

      const internalPath = imp.resolved.path;

      if (isIndexFile(internalPath)) {
        for (const name of barrelImportToRegistryNames(internalPath, imp.names)) {
          registryDeps.add(name);
        }
        continue;
      }

      if (!relatedFiles.includes(internalPath)) {
        registryDeps.add(normalizeRegistryName(fileToRegistryName(internalPath)));
      }
    }
  }

  // Ensure cn() helper is pulled in when used
  for (const file of relatedFiles) {
    const content = readFileSafe(file) ?? "";
    if (content.includes("lib/utils") || content.includes("/utils")) {
      if (/from\s+["'][^"']*lib\/utils["']/.test(content) || /from\s+["'][^"']*\/utils["']/.test(content)) {
        registryDeps.add("utils");
      }
    }
  }

  const name = toKebabCase(exportName);
  const files = relatedFiles.map((file) => {
    const relSource = path.relative(COMPONENTS_ROOT, file).replace(/\\/g, "/");
    const fileCategory = getCategory(file);
    return {
      path: sourceToTargetPath(file, parseNamedExport(file) ?? path.basename(file, path.extname(file))),
      source: relSource,
      type: fileCategory === "utils" ? "util" : "component",
    };
  });

  registryDeps.delete(name);

  // Visx charts need their runtime stack declared even when imports are deep
  if (sourceFile.includes(`${path.sep}charts${path.sep}Visx${path.sep}`)) {
    allDeps.add("@visx/visx");
    allDeps.add("d3");
    allDeps.add("topojson-client");
  }

  return {
    name,
    category,
    type: category === "utils" ? "util" : "component",
    files,
    dependencies: [...allDeps].filter((d) => d !== "react" && d !== "react-dom"),
    registryDependencies: [...registryDeps].sort(),
  };
}

function discoverEntries() {
  const entries = [];
  const seen = new Set();

  const indexFiles = [
    path.join(UI_PATH, "components", "index.ts"),
    path.join(UI_PATH, "elements", "index.ts"),
    path.join(UI_PATH, "anmt", "index.ts"),
  ];

  for (const indexFile of indexFiles) {
    for (const exp of parseExportsFromIndex(indexFile)) {
      if (!seen.has(exp.sourceFile)) {
        seen.add(exp.sourceFile);
        entries.push(exp);
      }
    }
  }

  const utilsCandidates = [
    path.join(UI_PATH, "lib", "utils.ts"),
    path.join(UI_PATH, "utils", "utils.ts"),
  ];
  const utilsFile = utilsCandidates.find((candidate) => fs.existsSync(candidate));
  if (utilsFile) {
    entries.push({
      sourceFile: utilsFile,
      exportName: "utils",
      category: "utils",
    });
  }

  const chartDirs = ["BarChart", "AreaChart"];
  for (const dir of chartDirs) {
    const chartIndex = path.join(UI_PATH, "charts", dir, "index.ts");
    for (const exp of parseExportsFromIndex(chartIndex)) {
      if (!seen.has(exp.sourceFile)) {
        seen.add(exp.sourceFile);
        entries.push(exp);
      }
    }
  }

  const visxDir = path.join(UI_PATH, "charts", "Visx");
  if (fs.existsSync(visxDir)) {
    for (const file of fs.readdirSync(visxDir)) {
      if (!file.endsWith(".tsx")) continue;
      const abs = path.join(visxDir, file);
      if (!seen.has(abs)) {
        seen.add(abs);
        entries.push({
          sourceFile: abs,
          exportName: path.basename(file, ".tsx"),
          category: "charts",
        });
      }
    }
  }

  const anmtUtils = [
    path.join(UI_PATH, "anmt", "types.ts"),
    path.join(UI_PATH, "anmt", "utils", "useVisible.tsx"),
    path.join(UI_PATH, "anmt", "utils", "debounce.ts"),
  ];
  for (const file of anmtUtils) {
    if (fs.existsSync(file) && !seen.has(file)) {
      seen.add(file);
      entries.push({
        sourceFile: file,
        exportName: path.basename(file, path.extname(file)),
        category: "anmt",
      });
    }
  }

  const chartHelpers = path.join(UI_PATH, "charts", "helpers", "utils", "setColor.tsx");
  if (fs.existsSync(chartHelpers) && !seen.has(chartHelpers)) {
    seen.add(chartHelpers);
    entries.push({
      sourceFile: chartHelpers,
      exportName: "setColor",
      category: "charts",
    });
  }

  return entries;
}

function main() {
  if (!fs.existsSync(UI_PATH)) {
    console.error(`Components source path not found: ${UI_PATH}`);
    console.error("Run sync first:");
    console.error("  node scripts/sync-components.mjs");
    console.error("Or pass path to packages/components:");
    console.error("  node scripts/build-registry.mjs /path/to/packages/components");
    process.exit(1);
  }

  const entries = discoverEntries();
  const registry = {};

  for (const entry of entries) {
    const built = buildRegistryEntry(entry);
    if (registry[built.name]) {
      const suffix = path.basename(entry.sourceFile, path.extname(entry.sourceFile));
      built.name = `${built.name}-${toKebabCase(suffix)}`;
    }
    registry[built.name] = built;
  }

  if (!registry.utils) {
    const fallbackUtils = [
      path.join(UI_PATH, "lib", "utils.ts"),
      path.join(UI_PATH, "utils", "utils.ts"),
    ].find((candidate) => fs.existsSync(candidate));

    if (fallbackUtils) {
      registry.utils = buildRegistryEntry({
        sourceFile: fallbackUtils,
        exportName: "utils",
        category: "utils",
      });
    }
  }

  // Add theme CSS as an installable registry item
  const themeCss = path.join(UI_PATH, "styles", "globals.css");
  if (fs.existsSync(themeCss)) {
    registry.theme = {
      name: "theme",
      category: "utils",
      type: "style",
      files: [
        {
          path: "styles/materialme.css",
          source: path.relative(COMPONENTS_ROOT, themeCss).replace(/\\/g, "/"),
          type: "style",
        },
      ],
      dependencies: ["tailwindcss", "tw-animate-css"],
      registryDependencies: [],
    };
  }

  fs.writeFileSync(OUTPUT, JSON.stringify(registry, null, 2) + "\n");

  const byCategory = Object.values(registry).reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  console.log(`✓ Generated ${OUTPUT}`);
  console.log(`  ${Object.keys(registry).length} components`);
  console.log(`  categories:`, byCategory);
}

main();
