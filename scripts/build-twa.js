import { spawn, execSync } from "child_process";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const pwaOutDir = path.join(rootDir, "pwa_out");

// Get 8.3 short path to avoid space-in-path issues on Windows with Gradle
function getShortPath(longPath) {
  try {
    const cmd = `powershell -NoProfile -Command "(New-Object -ComObject Scripting.FileSystemObject).GetFolder('${longPath}').ShortPath"`;
    return execSync(cmd).toString().trim();
  } catch (e) {
    console.warn(
      "Warning: Could not resolve short path, using long path.",
      e.message,
    );
    return longPath;
  }
}

const pwaOutDirShort = getShortPath(pwaOutDir);
console.log(`Resolved short path for pwa_out: ${pwaOutDirShort}`);

// Modify gradle.properties to reduce JVM heap limit to prevent out-of-memory errors
const gradlePropsPath = path.join(pwaOutDir, "gradle.properties");

if (fs.existsSync(gradlePropsPath)) {
  let content = fs.readFileSync(gradlePropsPath, "utf8");
  content = content.replace(
    /org\.gradle\.jvmargs=-Xmx\d+m/g,
    "org.gradle.jvmargs=-Xmx512m",
  );

  fs.writeFileSync(gradlePropsPath, content, "utf8");

  console.log("Modified gradle.properties to limit JVM heap to 512m.");
}

console.log("Spawning bubblewrap build inside pwa_out (short path)...");

const child = spawn("npx", ["@bubblewrap/cli", "build"], {
  cwd: pwaOutDirShort,
  shell: true,
});

// Pipe process.stdin to child.stdin so send_command_input works manually if needed
process.stdin.pipe(child.stdin);

child.stdout.on("data", (data) => {
  const output = data.toString();
  process.stdout.write(output);

  // Auto-respond to key generation and signing prompts
  if (output.includes("Key store not found") || output.includes("generate one"))
    child.stdin.write("y\n");
  else if (output.includes("twa-manifest.json. Would you like to apply them")) {
    // Say YES to apply icon/manifest changes, then re-patch gradle.properties after
    child.stdin.write("y\n");
    // Re-apply gradle.properties JVM limit after bubblewrap regenerates it
    setTimeout(() => {
      if (fs.existsSync(gradlePropsPath)) {
        let gContent = fs.readFileSync(gradlePropsPath, "utf8");
        gContent = gContent.replace(
          /org\.gradle\.jvmargs=-Xmx\d+m/g,
          "org.gradle.jvmargs=-Xmx512m",
        );

        fs.writeFileSync(gradlePropsPath, gContent, "utf8");
        console.log("Re-patched gradle.properties after manifest update.");
      }
    }, 3000);
  } else if (output.toLowerCase().includes("accept? (y/n)"))
    child.stdin.write("y\n");
  else if (output.includes("Password for the Key Store:"))
    child.stdin.write("password\n");
  else if (output.includes("Key alias:")) child.stdin.write("mykeyalias\n");
  else if (output.includes("Password for the Key:"))
    child.stdin.write("password\n");
  else if (output.includes("First and last name:"))
    child.stdin.write("Hetul Mistry\n");
  else if (output.includes("organizational unit:"))
    child.stdin.write("Development\n");
  else if (output.includes("organization:"))
    child.stdin.write("Hetul Mistry\n");
  else if (output.includes("City or Locality:"))
    child.stdin.write("Gandhinagar\n");
  else if (output.includes("State or Province:"))
    child.stdin.write("Gujarat\n");
  else if (output.includes("two-letter country code:"))
    child.stdin.write("IN\n");
  else if (output.includes("Is the information correct?"))
    child.stdin.write("yes\n");
});

child.stderr.on("data", (data) => {
  process.stderr.write(data.toString());
});

child.on("close", (code) => {
  console.log(`bubblewrap build exited with code ${code}`);
  process.exit(code);
});
