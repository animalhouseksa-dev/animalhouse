import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const inputDir = process.argv[2] ?? 'public/images';
const outputDir = process.argv[3] ?? 'public/images/optimized';
const maxWidth = Number(process.env.IMAGE_MAX_WIDTH ?? 2400);
const quality = Number(process.env.IMAGE_QUALITY ?? 82);
const allowed = new Set(['.jpg', '.jpeg', '.png', '.webp']);

await mkdir(outputDir, { recursive: true });
const files = await readdir(inputDir, { withFileTypes: true });

let converted = 0;
for (const file of files) {
  if (!file.isFile()) continue;
  const ext = path.extname(file.name).toLowerCase();
  if (!allowed.has(ext)) continue;

  const inputPath = path.join(inputDir, file.name);
  const base = path.basename(file.name, ext);
  const outputPath = path.join(outputDir, `${base}.webp`);

  const image = sharp(inputPath).rotate();
  const metadata = await image.metadata();
  const shouldResize = metadata.width && metadata.width > maxWidth;

  await image
    .resize(shouldResize ? { width: maxWidth, withoutEnlargement: true } : undefined)
    .webp({ quality })
    .toFile(outputPath);

  console.log(`${inputPath} -> ${outputPath}`);
  converted += 1;
}

console.log(`Optimized ${converted} image(s) into ${outputDir}`);
