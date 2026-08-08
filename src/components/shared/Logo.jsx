export default function Logo({ size = 34 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      role="img"
      aria-label="Brand mark"
    >
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeOpacity="0.35" />
      <path
        d="M20 8c4.5 3.2 7 7.4 7 12.2C27 25.8 24 30 20 32c-4-2-7-6.2-7-11.8C13 15.4 15.5 11.2 20 8Z"
        fill="#e8a324"
      />
      <path
        d="M20 13c2.6 2 4 4.6 4 7.4 0 3.3-1.7 6-4 7.6-2.3-1.6-4-4.3-4-7.6 0-2.8 1.4-5.4 4-7.4Z"
        fill="#1f3d2c"
      />
    </svg>
  );
}
