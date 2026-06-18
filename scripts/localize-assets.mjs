import { promises as fs } from "node:fs";
import path from "node:path";

const DIST = "dist";
const BASE = "https://ilmaauto.lovable.app";
const OUT_DIR_REL = "assets-cdn";
const OUT_DIR = path.join(DIST, OUT_DIR_REL);
await fs.mkdir(OUT_DIR, { recursive: true });

const RE = /\/__l5e\/assets-v1\/([A-Za-z0-9-]+)\/([^"'`)\s]+)/g;

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}

const files = (await walk(DIST)).filter(f => /\.(html|css|js|webmanifest|json)$/.test(f));
const seen = new Map();

for (const f of files) {
  let txt = await fs.readFile(f, "utf8");
  const matches = [...txt.matchAll(RE)];
  if (!matches.length) continue;
  for (const m of matches) {
    const [full, id, name] = m;
    const key = `${id}/${name}`;
    if (!seen.has(key)) {
      const url = `${BASE}${full}`;
      const dest = path.join(OUT_DIR, id, name);
      await fs.mkdir(path.dirname(dest), { recursive: true });
      console.log("fetch", url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`failed ${url}: ${res.status}`);
      await fs.writeFile(dest, Buffer.from(await res.arrayBuffer()));
      seen.set(key, true);
    }
  }
  // depth of file from DIST -> relative prefix
  const rel = path.relative(path.dirname(f), OUT_DIR).replace(/\\/g, "/");
  txt = txt.replace(RE, (_, id, name) => `${rel}/${id}/${name}`);
  await fs.writeFile(f, txt);
  console.log("rewrote", f);
}
console.log("done; localized", seen.size, "assets");
