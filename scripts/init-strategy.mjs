import { cpSync, existsSync } from "fs";
import { resolve, join } from "path";
import { execSync } from "child_process";

const [dataset, strategy] = process.argv.slice(2);

if (!dataset || !strategy) {
  console.error("Usage: npm run init -- <dataset> <strategy>");
  process.exit(1);
}

const root = resolve(import.meta.dirname, "..");
const datasetDir = join(root, "datasets", dataset);
const initDir = join(datasetDir, "init");
const targetDir = join(datasetDir, `src-${strategy}`);

if (!existsSync(initDir)) {
  console.error(`Dataset not found: ${initDir}`);
  process.exit(1);
}

if (existsSync(targetDir)) {
  console.error(`Target already exists: ${targetDir}\nRemove it first or pick a different strategy name.`);
  process.exit(1);
}

cpSync(initDir, targetDir, { recursive: true });
console.log(`Copied init → src-${strategy}`);

execSync("npm install", { cwd: targetDir, stdio: "inherit" });
console.log(`\nReady: ${targetDir}`);
