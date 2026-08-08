import { blobPath } from './blobPath';

const CONTINENTS = [
  { cx: 250, cy: 150, rx: 95, ry: 70, points: 11, seed: 1.2 }, // North America
  { cx: 300, cy: 320, rx: 55, ry: 95, points: 10, seed: 2.6 }, // South America
  { cx: 520, cy: 120, rx: 55, ry: 42, points: 9, seed: 3.4 }, // Europe
  { cx: 560, cy: 260, rx: 78, ry: 100, points: 10, seed: 4.1 }, // Africa
  { cx: 760, cy: 160, rx: 150, ry: 90, points: 12, seed: 5.7 }, // Asia
  { cx: 905, cy: 350, rx: 55, ry: 38, points: 9, seed: 6.3 }, // Australia
];

const ORIGIN = { x: 716, y: 189, label: 'India' };

const ROUTES = [
  { x: 625, y: 183, label: 'Middle East' },
  { x: 536, y: 105, label: 'Europe' },
  { x: 294, y: 139, label: 'North America' },
  { x: 786, y: 247, label: 'Southeast Asia' },
  { x: 600, y: 253, label: 'Africa' },
  { x: 919, y: 342, label: 'Australia' },
];

function arcPath(x1, y1, x2, y2) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.18 - 20;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

export default function WorldMap() {
  return (
    <svg
      className="world-map-svg"
      viewBox="0 0 1000 480"
      role="img"
      aria-label="Stylised world map showing India as the export origin, with connection lines toward the Middle East, Europe, North America, Southeast Asia, Africa and Australia"
    >
      <defs>
        <radialGradient id="originGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4b93a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f4b93a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {CONTINENTS.map((c, i) => (
        <path
          key={i}
          d={blobPath(c.cx, c.cy, c.rx, c.ry, c.points, c.seed)}
          className="world-map-continent"
        />
      ))}

      {ROUTES.map((r, i) => (
        <path
          key={r.label}
          d={arcPath(ORIGIN.x, ORIGIN.y, r.x, r.y)}
          className="world-map-route"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}

      {ROUTES.map((r) => (
        <g key={`dest-${r.label}`}>
          <circle cx={r.x} cy={r.y} r="4" className="world-map-dest-dot" />
          <text x={r.x} y={r.y - 12} className="world-map-label" textAnchor="middle">
            {r.label}
          </text>
        </g>
      ))}

      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="26" fill="url(#originGlow)" />
      <circle cx={ORIGIN.x} cy={ORIGIN.y} r="6" className="world-map-origin-dot" />
      <text x={ORIGIN.x} y={ORIGIN.y - 16} className="world-map-label world-map-origin-label" textAnchor="middle">
        India
      </text>
    </svg>
  );
}
