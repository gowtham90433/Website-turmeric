import * as THREE from 'three';

const cache = new Map();

/**
 * Generates a small canvas-based label texture so packaging mockups carry
 * brand type without needing an external image asset.
 */
export function getLabelTexture({
  title = 'PURE TURMERIC',
  subtitle = 'PREMIUM POWDER',
  bg = '#1f3d2c',
  fg = '#f4b93a',
  accent = '#faf6ee',
} = {}) {
  const key = `${title}|${subtitle}|${bg}|${fg}|${accent}`;
  if (cache.has(key)) return cache.get(key);

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 640;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = accent;
  ctx.globalAlpha = 0.5;
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, canvas.width - 56, canvas.height - 56);
  ctx.globalAlpha = 1;

  ctx.beginPath();
  ctx.arc(canvas.width / 2, 210, 78, 0, Math.PI * 2);
  ctx.fillStyle = fg;
  ctx.fill();

  ctx.fillStyle = bg;
  ctx.font = '700 64px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T', canvas.width / 2, 218);

  ctx.fillStyle = accent;
  ctx.font = '600 40px Arial, sans-serif';
  ctx.textAlign = 'center';
  wrapText(ctx, title, canvas.width / 2, 360, 400, 46);

  ctx.font = '400 22px Arial, sans-serif';
  ctx.fillStyle = fg;
  ctx.letterSpacing = '4px';
  ctx.fillText(subtitle, canvas.width / 2, 430);

  ctx.font = '300 18px Arial, sans-serif';
  ctx.fillStyle = accent;
  ctx.globalAlpha = 0.7;
  ctx.fillText('PRODUCT OF INDIA', canvas.width / 2, canvas.height - 60);
  ctx.globalAlpha = 1;

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  cache.set(key, texture);
  return texture;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  const lines = [];
  words.forEach((word) => {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  });
  if (line) lines.push(line);
  const startY = y - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}
