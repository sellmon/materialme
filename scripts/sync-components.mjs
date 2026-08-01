#!/usr/bin/env node
/**
 * Copies all UI sources from material-ts into packages/components/src
 * and rewrites @/core/ui/* imports to relative paths.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DEFAULT_SOURCE = path.resolve(ROOT, "../material-ts/material-ts/core/ui");
const SOURCE = path.resolve(process.argv[2] || DEFAULT_SOURCE);
const DEST = path.join(ROOT, "packages/components/src");

const CORE_PREFIX = "@/core/ui/";

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function transformFile(filePath) {
  if (!/\.(tsx?|jsx?)$/.test(filePath)) return;

  let content = fs.readFileSync(filePath, "utf8");
  const fileDir = path.dirname(filePath);

  content = content.replace(
    /(from\s+["'])@\/core\/ui\/([^"']+)(["'])/g,
    (_match, start, sub, end) => {
      const subPath = sub.replace(/\.(tsx?|jsx?)$/, "");
      let target;

      if (subPath === "utils/utils" || subPath.startsWith("utils/")) {
        target = path.join(DEST, "lib", path.basename(subPath));
      } else {
        target = path.join(DEST, subPath);
      }

      const candidates = [
        target + ".tsx",
        target + ".ts",
        path.join(target, "index.tsx"),
        path.join(target, "index.ts"),
      ];

      const resolved = candidates.find((c) => fs.existsSync(c));
      if (!resolved) {
        const libTarget = path.join(DEST, "lib", path.basename(sub));
        if (fs.existsSync(libTarget)) {
          const rel = path.relative(fileDir, libTarget).replace(/\\/g, "/");
          return `${start}${rel.startsWith(".") ? rel : `./${rel}`}${end}`;
        }
        return `${start}@/core/ui/${sub}${end}`;
      }

      const rel = path.relative(fileDir, resolved).replace(/\\/g, "/");
      const withoutExt = rel.replace(/\.(tsx?|jsx?)$/, "");
      return `${start}${withoutExt.startsWith(".") ? withoutExt : `./${withoutExt}`}${end}`;
    }
  );

  fs.writeFileSync(filePath, content);
}

function walkTransform(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkTransform(full);
    } else {
      transformFile(full);
    }
  }
}

function main() {
  if (!fs.existsSync(SOURCE)) {
    console.error(`Source not found: ${SOURCE}`);
    process.exit(1);
  }

  const dirs = ["components", "elements", "anmt", "charts", "layers"];

  for (const dir of dirs) {
    const src = path.join(SOURCE, dir);
    const dst = path.join(DEST, dir);
    if (fs.existsSync(dst)) {
      fs.rmSync(dst, { recursive: true });
    }
    copyDir(src, dst);
    console.log(`✓ ${dir}/`);
  }

  const utilsSrc = path.join(SOURCE, "utils", "utils.ts");
  if (fs.existsSync(utilsSrc)) {
    fs.mkdirSync(path.join(DEST, "lib"), { recursive: true });
    fs.copyFileSync(utilsSrc, path.join(DEST, "lib", "utils.ts"));
    console.log("✓ lib/utils.ts");
  }

  const legacyButton = path.join(DEST, "components", "button.tsx");
  if (fs.existsSync(legacyButton)) {
    fs.unlinkSync(legacyButton);
  }

  walkTransform(DEST);

  const indexContent = `export * from "./components";
export * from "./elements";
export * from "./anmt";
export * from "./charts/AreaChart";
export * from "./charts/BarChart";
export * from "./layers/Section";
`;

  fs.writeFileSync(path.join(DEST, "index.ts"), indexContent);
  console.log("✓ index.ts");
  console.log(`\nDone. Components live in ${DEST}`);
}

main();
