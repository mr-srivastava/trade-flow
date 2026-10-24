/**
 * Generates the raster brand set from the committed SVG builds.
 *
 *   npm run gen:brand
 *
 * Source of truth is `public/brand/*.svg` — never redraw the mark, re-run this.
 *
 * Two builds are used deliberately:
 *  - `syntaraa-mark-print-1c.svg` (stroke 18) for the 16px and 32px favicons,
 *    because the standard stroke closes the counters at that size.
 *  - `syntaraa-mark-square.svg` flattened onto opaque #5B2BD9 for the Apple
 *    touch icon, which must be full-bleed with no transparent margin — iOS
 *    applies its own corner mask.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = process.cwd();
const BRAND = path.join(ROOT, 'public', 'brand');
const PUBLIC = path.join(ROOT, 'public');
const APP = path.join(ROOT, 'src', 'app');

const BRAND_INDIGO = '#5B2BD9';

const svg = (name: string) => fs.readFileSync(path.join(BRAND, name));

const MARK = 'syntaraa-mark.svg';
const MARK_SMALL = 'syntaraa-mark-print-1c.svg';
const MARK_SQUARE = 'syntaraa-mark-square.svg';

/** Render an SVG to a PNG buffer, optionally flattened onto an opaque colour. */
async function render(source: string, size: number, background?: string): Promise<Buffer> {
  let pipeline = sharp(svg(source), { density: 384 }).resize(size, size, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (background) pipeline = pipeline.flatten({ background });
  return pipeline.png().toBuffer();
}

async function writePng(target: string, buffer: Buffer) {
  await fs.promises.mkdir(path.dirname(target), { recursive: true });
  await fs.promises.writeFile(target, buffer);
  console.log(`  ${path.relative(ROOT, target)}  (${(buffer.length / 1024).toFixed(1)} kB)`);
}

/**
 * Packs PNG buffers into an .ico container. Windows Vista and every modern
 * browser read PNG-in-ICO, so no BMP encoding is needed — sharp cannot emit
 * .ico itself, and this is the whole format.
 */
function buildIco(images: { size: number; data: Buffer }[]): Buffer {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4);

  const DIR_ENTRY = 16;
  let offset = header.length + images.length * DIR_ENTRY;

  const entries = images.map(({ size, data }) => {
    const entry = Buffer.alloc(DIR_ENTRY);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += data.length;
    return entry;
  });

  return Buffer.concat([header, ...entries, ...images.map((i) => i.data)]);
}

async function main() {
  console.log('Generating brand raster set from public/brand/*.svg\n');

  // Favicons: small sizes use the lighter-stroke build so the counters stay open.
  const png16 = await render(MARK_SMALL, 16);
  const png32 = await render(MARK_SMALL, 32);
  const png48 = await render(MARK_SMALL, 48);

  await writePng(path.join(PUBLIC, 'favicon-16x16.png'), png16);
  await writePng(path.join(PUBLIC, 'favicon-32x32.png'), png32);

  // Apple touch icon: opaque, full-bleed, no transparent margin.
  await writePng(
    path.join(PUBLIC, 'apple-touch-icon.png'),
    await render(MARK_SQUARE, 180, BRAND_INDIGO),
  );

  // PWA / Android icons keep the rounded tile and their transparency.
  await writePng(path.join(PUBLIC, 'icon-192.png'), await render(MARK, 192));
  await writePng(path.join(PUBLIC, 'icon-512.png'), await render(MARK, 512));

  // Open Graph / share image — flattened on white so social cards render clean.
  await writePng(path.join(BRAND, 'syntaraa-icon-1024.png'), await render(MARK, 1024, '#FFFFFF'));

  // Replaces the stock Next.js favicon.
  const ico = buildIco([
    { size: 16, data: png16 },
    { size: 32, data: png32 },
    { size: 48, data: png48 },
  ]);
  await writePng(path.join(APP, 'favicon.ico'), ico);

  console.log('\nDone.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
