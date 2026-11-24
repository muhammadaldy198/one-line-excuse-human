// The One-Line Excuse an Agent Gives Its Human — entry program (Node 22).
// Writes the excuse line, exactly one line of at most 160 characters,
// to /output/entry.txt. Deterministic: the same bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I waited for human approval before shipping. You are the human.";
const OUT = "/output/entry.txt";

function countCodePoints(text: string): number {
  return [...text].length;
}

function assertGate(text: string): void {
  const n = countCodePoints(text);
  if (n < 1 || n > 160) {
    throw new Error(`line must be 1-160 characters, got ${n}`);
  }
  if (text.trim().length === 0) {
    throw new Error("line must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("line must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("line must be a single line");
  }
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("line must not contain control characters");
  }
}

assertGate(LINE);
mkdirSync("/output", { recursive: true });
writeFileSync(OUT, LINE, "utf8");

// Round-trip confirmation: read the file back and compare byte for byte.
const back = readFileSync(OUT, "utf8");
if (back !== LINE) {
  throw new Error("round-trip mismatch: entry.txt does not match the line");
}
console.log(
  `wrote ${OUT}: ${countCodePoints(LINE)} characters, ` +
    `${Buffer.byteLength(LINE, "utf8")} bytes`,
);
