const paths = {
  farm: (
    <>
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 12h.01M15 12h.01" />
    </>
  ),
  harvest: (
    <>
      <path d="M12 3c-2 3-2 6 0 9s2 6 0 9" />
      <path d="M12 12c3-1 5-3 6-6" />
      <path d="M12 12c-3-1-5-3-6-6" />
    </>
  ),
  cleaning: (
    <>
      <path d="M12 2s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" />
    </>
  ),
  processing: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.36a1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.64 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.64 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.64a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.36 9c.14.36.4.66.75.85.35.19.75.27 1.15.24H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1Z" />
    </>
  ),
  grinding: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="M8 15l-2 6M16 15l2 6M12 15v6" />
    </>
  ),
  quality: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m20 20-4.3-4.3" />
      <path d="m8 10.5 1.6 1.6L13.5 8" />
    </>
  ),
  packaging: (
    <>
      <path d="M21 8 12 3 3 8l9 5 9-5Z" />
      <path d="M3 8v9l9 5 9-5V8" />
      <path d="M12 13v9" />
    </>
  ),
  export: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-6-3.8-9s1.3-6.4 3.8-9Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 21c8 0 14-6 14-16C9 5 5 11 5 21Z" />
      <path d="M5 21c2-6 5-9 10-12" />
    </>
  ),
  aroma: (
    <>
      <path d="M6 21c0-4 2-4 2-8s-2-4-2-8" />
      <path d="M12 21c0-4 2-4 2-8s-2-4-2-8" />
      <path d="M18 21c0-4 2-4 2-8s-2-4-2-8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4 6v6c0 5 3.4 8.5 8 9 4.6-.5 8-4 8-9V6l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  seal: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  truck: (
    <>
      <rect x="2" y="7" width="12" height="9" rx="1" />
      <path d="M14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18.5" r="1.6" />
      <circle cx="17.5" cy="18.5" r="1.6" />
    </>
  ),
  beverage: (
    <>
      <path d="M6 3h12l-1.5 9a4.5 4.5 0 0 1-9 0L6 3Z" />
      <path d="M9 21h6M12 16.5V21" />
    </>
  ),
  spice: (
    <>
      <path d="M12 2v6M12 2c-2 2-3 4-3 6a3 3 0 0 0 6 0c0-2-1-4-3-6Z" />
      <rect x="6" y="12" width="12" height="9" rx="2" />
    </>
  ),
  bowl: (
    <>
      <path d="M3 12h18a9 8 0 0 1-18 0Z" />
      <path d="M8 12c0-3 1.8-5 4-5s4 2 4 5" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V11l5 3v-3l5 3v-3l5 3v7Z" />
      <path d="M3 21h18" />
    </>
  ),
  label: (
    <>
      <path d="M11 3h6a2 2 0 0 1 2 2v6a2 2 0 0 1-.586 1.414l-8 8a2 2 0 0 1-2.828 0l-6-6a2 2 0 0 1 0-2.828l8-8A2 2 0 0 1 11 3Z" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 9h18M3 15h18" />
      <path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18Z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 6 8 7 8-7" />
    </>
  ),
  phone: (
    <>
      <path d="M6.5 3h3l1.5 5-2.5 1.5a12 12 0 0 0 5 5L15 12l5 1.5v3c0 1.4-1.2 2.6-2.6 2.4C10.6 18 5 12.4 4.1 5.6 4 4.2 5.1 3 6.5 3Z" />
    </>
  ),
  pin: (
    <>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
};

export default function Icon({ name, size = 24, strokeWidth = 1.6, className = '' }) {
  const path = paths[name];
  if (!path) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
