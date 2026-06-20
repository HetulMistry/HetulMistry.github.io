#!/usr/bin/env node

/**
 * TWA Build Script
 *
 * Usage:
 *   npm run twa:init   — Interactive one-time setup (bubblewrap init)
 *   npm run twa:build  — Build the signed APK/AAB  (bubblewrap build)
 *
 * Environment variables (optional, for CI / non-interactive builds):
 *   BUBBLEWRAP_KEYSTORE_PASSWORD  — keystore password
 *   BUBBLEWRAP_KEY_PASSWORD       — key password
 */

import { execSync, spawn } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const pwaOutDir = path.join(rootDir, "pwa_out");
const manifestUrl = "https://hetulmistry.tech/manifest.json";

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Get Windows 8.3 short path to dodge spaces-in-path issues with Gradle. */
function getShortPath(longPath) {
  try {
    const cmd = `powershell -NoProfile -Command "(New-Object -ComObject Scripting.FileSystemObject).GetFolder('${longPath}').ShortPath"`;
    return execSync(cmd, { encoding: "utf8" }).trim();
  } catch {
    return longPath;
  }
}

/** Cap Gradle JVM heap at 512 MB to prevent OOM on low-memory machines. */
function patchGradleProperties() {
  const gradlePropsPath = path.join(pwaOutDir, "gradle.properties");
  if (!fs.existsSync(gradlePropsPath)) return;

  let content = fs.readFileSync(gradlePropsPath, "utf8");
  const patched = content.replace(
    /org\.gradle\.jvmargs=-Xmx\d+[mg]/gi,
    "org.gradle.jvmargs=-Xmx512m",
  );

  if (patched !== content) {
    fs.writeFileSync(gradlePropsPath, patched, "utf8");
    console.log("✔ Patched gradle.properties → JVM heap capped at 512m");
  }
}

/** Spawn a command with full stdio inheritance (interactive). */
function runInteractive(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      shell: true,
      stdio: "inherit",
    });

    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Process exited with code ${code}`));
    });

    child.on("error", reject);
  });
}

// ── Main ─────────────────────────────────────────────────────────────────────

const mode = process.argv[2]; // "init" or "build"

if (!mode || !["init", "build"].includes(mode)) {
  console.error("Usage: node scripts/build-twa.js <init|build>");
  console.error("  init  — One-time interactive project setup");
  console.error("  build — Build the signed APK/AAB");
  process.exit(1);
}

(async () => {
  try {
    if (mode === "init") {
      // ── INIT ───────────────────────────────────────────────────────────
      // Create pwa_out if it doesn't exist
      if (!fs.existsSync(pwaOutDir)) {
        fs.mkdirSync(pwaOutDir, { recursive: true });
        console.log(`✔ Created ${pwaOutDir}`);
      }

      console.log("\n🚀 Running bubblewrap init (interactive)...\n");
      console.log(`   Manifest: ${manifestUrl}`);
      console.log(`   Output:   ${pwaOutDir}\n`);

      await runInteractive(
        "npx",
        ["@bubblewrap/cli", "init", "--manifest", manifestUrl],
        pwaOutDir,
      );

      // After init, patch gradle.properties
      patchGradleProperties();

      console.log("\n✅ Init complete! Run `npm run twa:build` to build.\n");
    } else {
      // ── BUILD ──────────────────────────────────────────────────────────
      if (!fs.existsSync(path.join(pwaOutDir, "twa-manifest.json"))) {
        console.error("❌ No twa-manifest.json found. Run `npm run twa:init` first.");
        process.exit(1);
      }

      const cwd = getShortPath(pwaOutDir);
      console.log(`\n🔨 Building TWA from: ${cwd}\n`);

      // Patch gradle before build
      patchGradleProperties();

      // Run bubblewrap build — interactive for password prompts
      // For CI, set BUBBLEWRAP_KEYSTORE_PASSWORD and BUBBLEWRAP_KEY_PASSWORD env vars
      await runInteractive("npx", ["@bubblewrap/cli", "build"], cwd);

      // Re-patch gradle in case bubblewrap overwrote it
      patchGradleProperties();

      console.log("\n✅ TWA build complete!\n");
      console.log("   Output APK: pwa_out/app-release-signed.apk");
      console.log("   Output AAB: pwa_out/app-release-bundle.aab\n");
    }
  } catch (err) {
    console.error(`\n❌ ${mode} failed:`, err.message);
    process.exit(1);
  }
})();
