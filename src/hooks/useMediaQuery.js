import { useEffect, useState } from 'react';

export function useMediaQuery(query) {
  const getMatch = () =>
    typeof window !== 'undefined' && 'matchMedia' in window ? window.matchMedia(query).matches : false;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return undefined;
    const mql = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion() {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function useIsMobile() {
  return useMediaQuery('(max-width: 760px)');
}
