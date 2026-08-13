const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(width, height) {
  // Simple PNG encoder in pure Node.js
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth 8
  ihdr[9] = 2; // color type 2 (RGB)
  ihdr[10] = 0; // compression 0
  ihdr[11] = 0; // filter 0
  ihdr[12] = 0; // interlace 0

  const ihdrChunk = createChunk('IHDR', ihdr);

  // IDAT chunk (raw RGB pixels)
  // Each scanline: filter byte 0 + (width * 3) bytes
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;

      // Dark slate background (#1E293B -> R:30, G:41, B:59)
      let r = 30;
      let g = 41;
      let b = 59;

      // Center avatar silhouette approximation
      const dx = x - width / 2;
      const dy = y - height * 0.4;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < width * 0.22) {
        // Avatar circle (#475569)
        r = 71;
        g = 85;
        b = 105;
      }

      // Bottom TEDx Red Accent strip (#EB0028)
      if (y > height * 0.88 && y < height * 0.9 && x > width * 0.25 && x < width * 0.75) {
        r = 235;
        g = 0;
        b = 40;
      }

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4);
  data.copy(buf, 8);

  const crcVal = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

// CRC32 implementation
function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
    }
  }
  return (crc ^ -1) >>> 0;
}

const outDir = path.join(__dirname, '..', 'public', 'members');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const pngBuffer = createPNG(800, 1000);
fs.writeFileSync(path.join(outDir, 'placeholder.png'), pngBuffer);
console.log('Successfully generated genuine PNG raster image: public/members/placeholder.png (' + pngBuffer.length + ' bytes)');
