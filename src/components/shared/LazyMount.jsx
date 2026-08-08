import { useEffect, useRef, useState } from 'react';

/**
 * Defers mounting expensive children (WebGL canvases) until the wrapper is
 * near the viewport, then keeps them mounted — keeps concurrent WebGL
 * contexts low without repeatedly tearing scenes down while scrolling.
 */
export default function LazyMount({ children, rootMargin = '200px', className, style, placeholder = null }) {
  const ref = useRef(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldMount(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={style}>
      {shouldMount ? children : placeholder}
    </div>
  );
}
