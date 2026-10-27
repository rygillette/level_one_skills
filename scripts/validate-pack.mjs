#!/usr/bin/env node
/**
 * Structural validator for the Level One skills pack.
 * Exit 0 on pass, 1 on fail. Prints each failure.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

export const BASE_SKILLS = [
  "dispatcher",
  "agent-talk",
  "agent-plan",
  "asd-ste100",
  "verification-floor",
  "hard-safety",
];

export const JOB_SKILLS = [
  "engineering",
  "product",
  "qa",
  "design",
  "security",
  "devops",
  "performance",
  "database",
  "investigation",
  "ship",
  "triage",
];

export const RULE_PATH = "cursor-rules/level-one-base.mdc";

/** Relative dir under .agents/skills/ that contains SKILL.md */
export const SKILL_DIR = Object.fromEntries([
  ...BASE_SKILLS.map((n) => [n, path.join("base", n)]),
  ...JOB_SKILLS.map((n) => [n, n]),
]);

const failures = [];

function fail(msg) {
  failures.push(msg);
}

function read(rel) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return null;
  return fs.readFileSync(abs, "utf8");
}

function parseFrontmatter(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---")) return { fm: {}, body: normalized };
  const end = normalized.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: normalized };
  const raw = normalized.slice(3, end).trim();
  const body = normalized.slice(end + 4).replace(/^\n/, "");
  const fm = {};
  const lines = raw.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    const key = m[1];
    let v = m[2].trim();
    if (v === ">" || v === ">-" || v === "|" || v === "|-") {
      const parts = [];
      i += 1;
      while (i < lines.length && /^[ \t]+/.test(lines[i])) {
        parts.push(lines[i].replace(/^[ \t]+/, "").trim());
        i += 1;
      }
      i -= 1;
      fm[key] = parts.filter(Boolean).join(" ");
      continue;
    }
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    fm[key] = v;
  }
  return { fm, body };
}

function skillPath(name) {
  const dir = SKILL_DIR[name];
  if (!dir) throw new Error(`unknown skill: ${name}`);
  return path.join(".agents", "skills", dir, "SKILL.md");
}

function checkSkill(name) {
  const rel = skillPath(name);
  const text = read(rel);
  if (!text) {
    fail(`missing skill file: ${rel}`);
    return;
  }
  const { fm, body } = parseFrontmatter(text);
  if (fm.name !== name) {
    fail(`${rel}: frontmatter name "${fm.name || ""}" !== directory "${name}"`);
  }
  if (!fm.description || !String(fm.description).trim()) {
    fail(`${rel}: missing description`);
  } else if (String(fm.description).length < 80) {
    fail(
      `${rel}: description too short (${String(fm.description).length} < 80) — need WHAT+WHEN`
    );
  }

  if (JOB_SKILLS.includes(name)) {
    const lower = body.toLowerCase();
    if (
      lower.includes("only when dispatcher") ||
      lower.includes("only if dispatcher")
    ) {
      fail(`${rel}: forbidden phrase requiring dispatcher staffing`);
    }
  }
}

for (const name of [...BASE_SKILLS, ...JOB_SKILLS]) {
  checkSkill(name);
}

const skillsRoot = path.join(ROOT, ".agents", "skills");
if (!fs.existsSync(path.join(skillsRoot, "base"))) {
  fail("missing org folder: .agents/skills/base/");
}

const allowedTopLevel = new Set(["base", ...JOB_SKILLS]);
if (fs.existsSync(skillsRoot)) {
  for (const ent of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
    if (!ent.isDirectory()) continue;
    if (ent.name.startsWith(".")) continue;
    if (!allowedTopLevel.has(ent.name)) {
      fail(
        `unexpected top-level skills folder: .agents/skills/${ent.name} (allowed: base + job orgs only)`
      );
    }
  }
}

// Always-on rule
const ruleText = read(RULE_PATH);
if (!ruleText) {
  fail(`missing always-on rule: ${RULE_PATH}`);
} else {
  const { fm, body } = parseFrontmatter(ruleText);
  if (String(fm.alwaysApply).toLowerCase() !== "true") {
    fail(`${RULE_PATH}: alwaysApply must be true`);
  }
  const bodyLines = body.split(/\r?\n/).length;
  if (bodyLines > 40) {
    fail(`${RULE_PATH}: body has ${bodyLines} lines (max 40)`);
  }
  const lower = body.toLowerCase();
  if (!lower.includes("dispatcher")) {
    fail(`${RULE_PATH}: body must mention dispatcher`);
  }
  for (const name of BASE_SKILLS) {
    if (!body.includes(name)) {
      fail(`${RULE_PATH}: body must name base skill "${name}"`);
    }
  }
  if (!/when its triggers/i.test(body)) {
    fail(`${RULE_PATH}: must describe asd-ste100 as apply when its triggers hit`);
  }
  const mirror = read(".cursor/rules/level-one-base.mdc");
  if (!mirror) {
    fail("missing mirror: .cursor/rules/level-one-base.mdc");
  } else if (mirror.replace(/\r\n/g, "\n") !== ruleText.replace(/\r\n/g, "\n")) {
    fail("cursor-rules/level-one-base.mdc !== .cursor/rules/level-one-base.mdc");
  }
}

if (fs.existsSync(path.join(ROOT, "archive"))) {
  fail("archive/ must not ship");
}

const readme = read("README.md") || "";
if (!/Required/i.test(readme) || !/raw\.githubusercontent\.com/i.test(readme)) {
  fail("README.md must mark rule install Required and offer raw.githubusercontent.com copy");
}
if (!/```mermaid/i.test(readme) || !/\.agents\/skills\/base\//.test(readme)) {
  fail("README.md must include mermaid org chart(s) and document .agents/skills/base/");
}
if (!/Job orgs/i.test(readme) || !/always on/i.test(readme)) {
  fail("README.md org chart must describe base (always on) and Job orgs");
}

// Dispatcher phrases
const disp = read(skillPath("dispatcher"));
if (disp) {
  const { body: dispBody } = parseFrontmatter(disp);
  const lower = dispBody.toLowerCase();
  if (!lower.includes("every request")) {
    fail("dispatcher/SKILL.md body: must include phrase \"every request\"");
  }
  if (!lower.includes("lean inclusive") && !lower.includes("when unsure")) {
    fail(
      'dispatcher/SKILL.md body: must include "lean inclusive" or "when unsure"'
    );
  }
  if (
    !lower.includes("auto-match") &&
    !lower.includes("auto match") &&
    !lower.includes("already matched")
  ) {
    fail(
      "dispatcher/SKILL.md body: must include auto-match / auto match / already matched"
    );
  }
  if (
    !/open (its|that org['’]s|each staffed)[^.\n]*`?skill\.md`?/i.test(dispBody)
  ) {
    fail(
      "dispatcher/SKILL.md body: must tell agent to open staffed org SKILL.md when staffing"
    );
  }
  if (!/when its triggers/i.test(dispBody)) {
    fail("dispatcher/SKILL.md body: must apply asd-ste100 when its triggers hit");
  }
}

if (failures.length) {
  console.error(`FAIL (${failures.length}):`);
  for (const f of failures) console.error(` - ${f}`);
  process.exit(1);
}

console.log(
  `OK: ${BASE_SKILLS.length} base + ${JOB_SKILLS.length} job skills, rule`
);
process.exit(0);
