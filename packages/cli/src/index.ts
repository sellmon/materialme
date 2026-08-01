#!/usr/bin/env node
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { listCommand } from "./commands/list.js";

const [, , cmd, ...args] = process.argv;

async function main() {
  switch (cmd) {
    case "init":
      await initCommand();
      break;
    case "add":
      await addCommand(args.length > 0 ? args : undefined);
      break;
    case "list":
      await listCommand(args[0]);
      break;
    default:
      console.log(`Material Me CLI — install components like shadcn/ui

Usage:
  materialme init              Initialize project
  materialme add [names...]    Add component(s) to your project
  materialme list [category]   List available components

Categories: components, elements, anmt, charts, utils

Examples:
  materialme add button badge icon
  materialme add fade-in-top
  materialme list components
`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
