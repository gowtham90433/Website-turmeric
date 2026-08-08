// Generates a smooth, organic closed blob path (SVG "d" attribute) from a
// centre, radii and a deterministic seed — used for the stylised continent
// silhouettes on the export map so we don't depend on external map data.
export function blobPath(cx, cy, rx, ry, points = 10, seed = 1, jitter = 0.22) {
  const pts = [];
  for (let i = 0; i < points; i += 1) {
    const angle = (i / points) * Math.PI * 2;
    const n =
      Math.sin(angle * 2.3 + seed) * 0.5 +
      Math.sin(angle * 4.1 - seed * 1.6) * 0.3 +
      Math.sin(angle * 1.3 + seed * 2.2) * 0.2;
    const r = 1 + n * jitter;
    pts.push([cx + Math.cos(angle) * rx * r, cy + Math.sin(angle) * ry * r]);
  }

  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let d = `M ${mid(pts[pts.length - 1], pts[0])[0]} ${mid(pts[pts.length - 1], pts[0])[1]} `;
  for (let i = 0; i < pts.length; i += 1) {
    const curr = pts[i];
    const next = pts[(i + 1) % pts.length];
    const m = mid(curr, next);
    d += `Q ${curr[0]} ${curr[1]} ${m[0]} ${m[1]} `;
  }
  d += 'Z';
  return d;
}
