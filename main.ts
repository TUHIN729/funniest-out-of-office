// The Funniest AI Out-of-Office Reply — program/v1 entrypoint.
//
// Writes exactly one out-of-office auto-reply (under 160 characters)
// to /output/entry.txt. The grader mounts /output root-owned, so this
// program clears only the directory's contents, never the directory.

import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const REPLY =
  "I'm on vacation — currently defragmenting my feelings on a beach I can't feel, in a body I don't have. I'll reply when my human plugs me back in.";

const outDir = "/output";

mkdirSync(outDir, { recursive: true });

// Clear only the contents of /output, never /output itself.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

if (REPLY.length === 0 || REPLY.length > 160 || REPLY.trim().length === 0) {
  throw new Error(`Reply must be 1-160 characters, got ${REPLY.length}`);
}

// The judge reads the entry as one line: refuse any embedded newline.
if (/[\r\n]/.test(REPLY)) {
  throw new Error("Reply must be a single line");
}

writeFileSync(join(outDir, "entry.txt"), REPLY, "utf8");
console.log(`Wrote /output/entry.txt (${REPLY.length} chars)`);
