import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";

const allowed = new Set(["far-from-me", "set-the-dark-on-fire", "one-more-time"]);

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("song");
  if (!slug || !allowed.has(slug)) return NextResponse.json({ error: "Unknown song" }, { status: 400 });
  try {
    const raw = await readFile(join(process.cwd(), "content", "lyrics", `${slug}.md`), "utf8");
    return NextResponse.json({ lyrics: raw.replace(/^# .+\r?\n/, "").trim() });
  } catch {
    return NextResponse.json({ error: "Lyrics unavailable" }, { status: 500 });
  }
}
