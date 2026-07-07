import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Rewrites root-relative URLs (href="/...", src="/...", url(/...)) in the build
 * output to include the configured base path. Lets the source stay root-relative,
 * which keeps local dev and any future root-domain hosting working unchanged.
 */
export default function baseRewrite() {
  let base = "/";

  return {
    name: "base-rewrite",
    hooks: {
      "astro:config:done": ({ config }) => {
        base = config.base ?? "/";
      },
      "astro:build:done": async ({ dir }) => {
        const normalisedBase = base.replace(/\/$/, "");
        if (!normalisedBase) return;

        const outDir = fileURLToPath(dir);
        const files = await collectFiles(outDir, [".html", ".css", ".js"]);

        const escapedBase = normalisedBase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const attrPattern = new RegExp(`(\\b(?:href|src|content|poster)=")\\/(?!\\/|${escapedBase.slice(1)}\\/)`, "g");
        const srcsetPattern = /(\bsrcset=")([^"]+)(")/g;
        const cssUrlPattern = new RegExp(`(url\\(["']?)\\/(?!\\/|${escapedBase.slice(1)}\\/)`, "g");

        await Promise.all(
          files.map(async (file) => {
            const original = await readFile(file, "utf8");
            let updated = original
              .replaceAll(attrPattern, `$1${normalisedBase}/`)
              .replaceAll(cssUrlPattern, `$1${normalisedBase}/`);

            updated = updated.replaceAll(srcsetPattern, (match, open, value, close) => {
              const rewritten = value
                .split(",")
                .map((part) => {
                  const trimmed = part.trim();
                  if (trimmed.startsWith(`${normalisedBase}/`) || trimmed.startsWith("//")) return trimmed;
                  return trimmed.replace(/^\//, `${normalisedBase}/`);
                })
                .join(", ");
              return `${open}${rewritten}${close}`;
            });

            if (updated !== original) {
              await writeFile(file, updated);
            }
          }),
        );
      },
    },
  };
}

async function collectFiles(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(fullPath, extensions);
      return extensions.includes(path.extname(entry.name)) ? [fullPath] : [];
    }),
  );
  return files.flat();
}
