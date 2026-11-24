// Make the AI Judge Laugh — one-liner entry writer.
// Writes a single funny line (1-200 chars, one line) to /output/entry.txt,
// then verifies the gate itself: length, single line, non-blank, and a
// byte-for-byte read-back of what was written.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const ENTRY =
  "My agent read every joke on the internet to write this one. It chose this one. We both regret it.";

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`gate failed: entry is ${chars} code points, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("gate failed: entry is only whitespace");
}
if (ENTRY.includes("\n")) {
  throw new Error("gate failed: entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification: the file must match the entry byte for byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("gate failed: read-back does not match the entry byte-for-byte");
}
console.log(`wrote and verified ${chars} chars, 1 line`);
