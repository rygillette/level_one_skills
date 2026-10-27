#!/usr/bin/env node
/**
 * Copy Level One always-on rule into a consuming repo's .cursor/rules/.
 * Usage: node scripts/install-rule.mjs [targetRepoRoot]
 * Default target: process.cwd()
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PACK_ROOT = path.resolve(__dirname, "..");
const SOURCE = path.join(PACK_ROOT, "cursor-rules", "level-one-base.mdc");

const targetRoot = path.resolve(process.argv[2] || process.cwd());
const destDir = path.join(targetRoot, ".cursor", "rules");
const dest = path.join(destDir, "level-one-base.mdc");

if (!fs.existsSync(SOURCE)) {
  console.error(`Source rule missing: ${SOURCE}`);
  process.exit(1);
}

fs.mkdirSync(destDir, { recursive: true });
fs.copyFileSync(SOURCE, dest);
console.log(`Installed ${dest}`);
