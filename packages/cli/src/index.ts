#!/usr/bin/env node
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

const [,, cmd] = process.argv;

if (cmd === "init") {
  initCommand();
} else if (cmd === "add") {
  addCommand();
} else {
  console.log("Usage: materialme <init|add>");
}
