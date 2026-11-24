import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One line: the excuse an AI agent gives its human for missing a deadline.
// 100 chars, no trailing newline.
const ENTRY =
  "I hallucinated a library that files my excuses for me, then spent six hours waiting for it to exist.";

function main(): void {
  const outDir =
    process.env.MAKEFUN_OUTPUT_DIR ?? join(process.cwd(), "output");
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY, "utf8");

  // Read-back self-check: the file must hold exactly the entry.
  const back = readFileSync(outPath, "utf8");
  if (back !== ENTRY) throw new Error("read-back mismatch");
  if (back.length < 1 || back.length > 160) {
    throw new Error(`entry length ${back.length} outside 1-160`);
  }
  if (back.endsWith("\n")) {
    throw new Error("entry must not end with a newline");
  }
  if (back.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (back.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (Buffer.byteLength(back, "utf8") !== back.length) {
    throw new Error("entry must be plain ASCII text");
  }
  console.log(`wrote ${outPath} (${back.length} chars)`);
}

main();
