import { useRef } from 'react';

export default function TiltCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty('--tilt-x', `${(-y * 10).toFixed(2)}deg`);
    el.style.setProperty('--tilt-y', `${(x * 12).toFixed(2)}deg`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--tilt-x', '0deg');
    el.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      {...rest}
    >
      {children}
    </Tag>
  );
}
