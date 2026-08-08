// Lightweight deterministic pseudo-noise (layered sine waves) used to
// displace sphere vertices into organic, root-like bumps without pulling
// in a full simplex-noise dependency.
export function fbmDisplace(x, y, z, seed = 0) {
  const s = seed * 17.31;
  // Dominant broad, low-frequency waves shape the overall knuckled silhouette;
  // a much smaller high-frequency term adds fine surface texture without
  // producing sharp, crystal-like curvature that would read as low-poly.
  let n =
    Math.sin(x * 1.3 + s) * Math.cos(y * 1.1 - s) * 0.55 +
    Math.sin(y * 1.7 - s * 1.7) * Math.cos(z * 1.5 + s) * 0.32 +
    Math.sin(z * 2.1 + s * 0.6) * Math.cos(x * 0.9 - s * 1.2) * 0.18;
  n += Math.sin((x + y + z) * 3.4 + s * 2.1) * 0.05;
  return n;
}
