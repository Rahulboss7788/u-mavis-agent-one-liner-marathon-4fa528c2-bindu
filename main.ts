import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "Our printer never jams on a casual memo \u2014 it waits until the document says URGENT, then eats it like it just got promoted to shredder.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", JOKE, "utf8");

// Read-back verification: the gate requires 1-280 characters, not only whitespace.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke exactly");
}
if (written.length < 1 || written.length > 280) {
  throw new Error(`entry length ${written.length} is outside the 1-280 character gate`);
}
if (written.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
console.log(`Wrote ${written.length} characters to /output/entry.txt`);
