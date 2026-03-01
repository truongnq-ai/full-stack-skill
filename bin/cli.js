#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const cmd = args.find((a) => !a.startsWith("-"));
const flags = args.filter((a) => a.startsWith("-"));

const VERSION = fs.readFileSync(path.join(pkgRoot, "VERSION"), "utf8").trim();

// --- Flag parsing ---
const hasFlag = (name) =>
  flags.includes(`--${name}`) || flags.includes(`-${name[0]}`);
const getFlagValue = (name) => {
  const idx = args.indexOf(`--${name}`);
  if (idx === -1) return null;
  return args[idx + 1] || null;
};

const dryRun = hasFlag("dry-run");
const targetOverride = getFlagValue("target");
const onlyFilter = getFlagValue("only");

// Default: skills → .agent/skills/
const DEFAULT_SKILL_TARGET = path.join(".agent", "skills");

// Feature categories in full-stack-skill
const CATEGORIES = [
  "language",
  "framework",
  "infra",
  "architecture",
  "templates",
];

// All available skill names (from source)
const getAvailableSkills = () => {
  const availableSkills = {};
  CATEGORIES.forEach((cat) => {
    const catPath = path.join(pkgRoot, cat);
    if (fs.existsSync(catPath)) {
      availableSkills[cat] = fs
        .readdirSync(catPath, { withFileTypes: true })
        .filter((e) => e.isDirectory() && e.name !== "_templates")
        .map((e) => e.name);
    } else {
      availableSkills[cat] = [];
    }
  });
  return availableSkills;
};

const help = () => {
  const skills = getAvailableSkills();
  console.log(`
full-stack-skill CLI v${VERSION}

Usage:
  full-stack-skill init [options]       Scaffold skills trong project mới
                                        (chỉ tạo file chưa tồn tại, không overwrite)
  full-stack-skill install [options]    Copy và overwrite toàn bộ bộ skill vào project hiện tại
                                        (dùng khi cần cập nhật lên phiên bản mới)
  full-stack-skill update [options]     Alias cho install
  full-stack-skill diff                 So sánh file đã install với phiên bản mới nhất
  full-stack-skill --version            Xem phiên bản
  full-stack-skill help                 Hiển thị trợ giúp này

Options:
  --target <path>     Thư mục đích cho skills (mặc định: ${DEFAULT_SKILL_TARGET})
  --dry-run           Chỉ hiển thị danh sách file sẽ được tạo/ghi, không thực thi
  --only <skills>     Chỉ install các skill được chỉ định (cách nhau bởi dấu phẩy, hỗ trợ định dạng category/skill)
                      VD: --only framework/react,language/typescript

Output structure:
  your-project/
  ├── ${DEFAULT_SKILL_TARGET}/    ← skills cho AI agent (auto-detected bởi IDE)

Available skills:
${CATEGORIES.map((cat) => `  [${cat}]: ${skills[cat]?.join(", ") || "None"}`).join("\n")}
`);
};

/**
 * Copy thư mục src → dest.
 */
const copyDir = (src, dest, overwrite, isDryRun = false, filterDirs = null) => {
  const stats = { created: 0, skipped: 0, overwritten: 0 };
  if (!fs.existsSync(src)) return stats;

  if (!isDryRun && !fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (filterDirs && !filterDirs.includes(entry.name)) {
        continue;
      }
      const sub = copyDir(s, d, overwrite, isDryRun, null);
      stats.created += sub.created;
      stats.skipped += sub.skipped;
      stats.overwritten += sub.overwritten;
    } else {
      if (filterDirs) continue;

      const exists = fs.existsSync(d);
      if (!overwrite && exists) {
        if (isDryRun) console.log(`  [SKIP]      ${d}`);
        stats.skipped++;
        continue;
      }

      if (isDryRun) {
        const action = exists ? "[OVERWRITE]" : "[CREATE]   ";
        console.log(`  ${action} ${d}`);
      } else {
        if (!fs.existsSync(path.dirname(d)))
          fs.mkdirSync(path.dirname(d), { recursive: true });
        fs.copyFileSync(s, d);
      }

      if (exists) stats.overwritten++;
      else stats.created++;
    }
  }

  return stats;
};

const printSummary = (label, stats) => {
  const parts = [];
  if (stats.created > 0) parts.push(`${stats.created} created`);
  if (stats.overwritten > 0) parts.push(`${stats.overwritten} overwritten`);
  if (stats.skipped > 0) parts.push(`${stats.skipped} skipped`);
  console.log(`  ${label}: ${parts.join(", ") || "no changes"}`);
};

const compareFiles = (srcFile, destFile) => {
  if (!fs.existsSync(destFile)) return "MISSING";
  const srcContent = fs.readFileSync(srcFile, "utf8");
  const destContent = fs.readFileSync(destFile, "utf8");
  return srcContent === destContent ? "OK" : "CHANGED";
};

const diffDir = (srcDir, destDir, base = srcDir) => {
  const result = { ok: [], changed: [], missing: [] };
  if (!fs.existsSync(srcDir)) return result;

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      const sub = diffDir(s, d, base);
      result.ok.push(...sub.ok);
      result.changed.push(...sub.changed);
      result.missing.push(...sub.missing);
    } else {
      const rel = path.relative(base, s);
      const status = compareFiles(s, d);
      if (status === "OK") result.ok.push(rel);
      else if (status === "CHANGED") result.changed.push(rel);
      else result.missing.push(rel);
    }
  }

  return result;
};

const validateOnlyFilter = (onlyStr) => {
  const requested = onlyStr
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const availableSkills = getAvailableSkills();
  const valid = [];
  const invalid = [];

  requested.forEach((req) => {
    let found = false;
    if (req.includes("/")) {
      const [cat, skill] = req.split("/");
      if (CATEGORIES.includes(cat) && availableSkills[cat].includes(skill)) {
        valid.push(req);
        found = true;
      }
    } else {
      for (const cat of CATEGORIES) {
        if (availableSkills[cat].includes(req)) {
          valid.push(`${cat}/${req}`);
          found = true;
          break;
        }
      }
    }
    if (!found) invalid.push(req);
  });

  return { valid, invalid };
};

const run = () => {
  const cwd = process.cwd();

  if (hasFlag("version") || flags.includes("-v")) {
    console.log(`full-stack-skill v${VERSION}`);
    return;
  }

  if (!cmd || cmd === "help") {
    return help();
  }

  if (cmd === "diff") {
    const skillTarget = targetOverride || DEFAULT_SKILL_TARGET;
    const skillDest = path.join(cwd, skillTarget);

    console.log(`\nfull-stack-skill diff v${VERSION}\n`);

    if (!fs.existsSync(skillDest)) {
      console.log("No full-stack-skill installation found in this project.");
      console.log(`Expected skills at: ${skillTarget}/`);
      console.log('Run "full-stack-skill init" to install.\n');
      return;
    }

    let totalChanged = 0;
    let totalMissing = 0;
    let totalOk = 0;

    CATEGORIES.forEach((cat) => {
      console.log(`Category: ${cat}`);
      const catSrc = path.join(pkgRoot, cat);
      const catDest = path.join(skillDest, cat);
      const catDiff = diffDir(catSrc, catDest);
      for (const f of catDiff.missing) console.log(`  [MISSING]  ${f}`);
      for (const f of catDiff.changed) console.log(`  [CHANGED]  ${f}`);
      if (catDiff.missing.length === 0 && catDiff.changed.length === 0) {
        console.log("  All files up-to-date ✓");
      }
      totalChanged += catDiff.changed.length;
      totalMissing += catDiff.missing.length;
      totalOk += catDiff.ok.length;
      console.log("");
    });

    console.log(
      `Summary: ${totalOk} up-to-date, ${totalChanged} changed, ${totalMissing} missing`,
    );
    if (totalChanged > 0 || totalMissing > 0) {
      console.log(
        'Run "full-stack-skill install" to update to latest version.\n',
      );
    } else {
      console.log("Everything is up-to-date! ✓\n");
    }
    return;
  }

  if (cmd === "init" || cmd === "install" || cmd === "update") {
    const overwrite = cmd === "install" || cmd === "update";
    const skillTarget = targetOverride || DEFAULT_SKILL_TARGET;
    const skillDest = path.join(cwd, skillTarget);
    const action = overwrite ? "install" : "init";

    let skillFilters = {
      language: null,
      framework: null,
      infra: null,
      architecture: null,
      templates: null,
    };

    if (onlyFilter) {
      const { valid, invalid } = validateOnlyFilter(onlyFilter);
      if (invalid.length > 0) {
        console.error(`\nError: Unknown skill(s): ${invalid.join(", ")}`);
        console.error("");
        process.exit(1);
      }
      if (valid.length === 0) {
        console.error("\nError: No valid skills specified in --only");
        process.exit(1);
      }

      // Initialize filters with empty arrays to block everything not specified
      CATEGORIES.forEach((cat) => (skillFilters[cat] = []));

      valid.forEach((req) => {
        const [cat, skill] = req.split("/");
        skillFilters[cat].push(skill);
      });
      // Allow templates folder if specified
      CATEGORIES.forEach((cat) => {
        if (skillFilters[cat] && skillFilters[cat].length > 0) {
          skillFilters[cat].push("_templates");
        }
      });
    }

    if (dryRun) {
      console.log(
        `\n[DRY RUN] full-stack-skill ${action} (no files will be modified)\n`,
      );
    } else {
      console.log(`\nfull-stack-skill ${action} v${VERSION}\n`);
    }

    if (onlyFilter) {
      console.log(`Selective install applied.\n`);
    }

    console.log(`Skills → ${skillTarget}/`);

    CATEGORIES.forEach((cat) => {
      const filters = skillFilters[cat];
      // if onlyFilter is active, and this category has no skills selected, skip it entirely
      if (onlyFilter && (!filters || filters.length === 0)) return;

      const catSrc = path.join(pkgRoot, cat);
      const catDest = path.join(skillDest, cat);
      const stats = copyDir(catSrc, catDest, overwrite, dryRun, filters);
      if (!dryRun && fs.existsSync(catSrc)) printSummary(cat, stats);
    });

    console.log("");

    if (dryRun) {
      console.log("No files were modified (--dry-run mode).");
      console.log("Remove --dry-run to execute.\n");
    } else if (overwrite) {
      console.log('Done. Run "git diff" to review what changed.');
      console.log(`Skills installed at: ${skillTarget}/\n`);
    } else {
      console.log("Done (existing files were not overwritten).");
      console.log(`Skills installed at: ${skillTarget}/`);
      console.log(
        'Tip: Run "full-stack-skill install" to overwrite with latest version.\n',
      );
    }

    return;
  }

  console.error(`Unknown command: ${cmd}`);
  help();
  process.exit(1);
};

run();
