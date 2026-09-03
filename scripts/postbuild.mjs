import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const distDirectory = resolve(scriptDirectory, "../dist");
const indexPath = resolve(distDirectory, "index.html");
const notFoundPath = resolve(distDirectory, "404.html");
const shrimpCamDirectory = resolve(distDirectory, "shrimp-cam");
const shrimpCamPath = resolve(shrimpCamDirectory, "index.html");

const replaceRequired = (html, pattern, replacement) => {
  if (!pattern.test(html)) {
    throw new Error(`Could not generate shrimp-cam metadata: ${pattern}`);
  }
  return html.replace(pattern, replacement);
};

const indexHtml = await readFile(indexPath, "utf8");

const shrimpCamHtml = [
  [
    /<link rel="canonical" href="[^"]+" \/>/,
    '<link rel="canonical" href="https://lucyrandewich.co.uk/shrimp-cam/" />',
  ],
  [
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    '<meta name="description" content="Watch Lucy Randewich\'s shrimp tank livestream." />',
  ],
  [
    /<meta property="og:url" content="[^"]+" \/>/,
    '<meta property="og:url" content="https://lucyrandewich.co.uk/shrimp-cam/" />',
  ],
  [
    /<meta property="og:title" content="[^"]+" \/>/,
    '<meta property="og:title" content="Shrimp Cam — Lucy Randewich" />',
  ],
  [
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    '<meta property="og:description" content="Watch Lucy Randewich\'s shrimp tank livestream." />',
  ],
  [
    /<meta name="twitter:title" content="[^"]+" \/>/,
    '<meta name="twitter:title" content="Shrimp Cam — Lucy Randewich" />',
  ],
  [
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    '<meta name="twitter:description" content="Watch Lucy Randewich\'s shrimp tank livestream." />',
  ],
  [/<title>[^<]+<\/title>/, "<title>Shrimp Cam — Lucy Randewich</title>"],
].reduce(
  (html, [pattern, replacement]) => replaceRequired(html, pattern, replacement),
  indexHtml,
);

await mkdir(shrimpCamDirectory, { recursive: true });
await Promise.all([
  copyFile(indexPath, notFoundPath),
  writeFile(shrimpCamPath, shrimpCamHtml),
]);
