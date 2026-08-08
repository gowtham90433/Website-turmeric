import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import Reveal from '../shared/Reveal';
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery';

const PowderJourneyScene = lazy(() => import('../three/PowderJourneyScene'));
const Canvas = lazy(() => import('@react-three/fiber').then((m) => ({ default: m.Canvas })));

const STAGES = [
  'Whole Turmeric Root',
  'Sliced for Drying',
  'Naturally Dried Fingers',
  'Precision Grinding',
  'Fine Turmeric Powder',
  'Packed & Export Ready',
];

export default function PowderJourney() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (reduceMotion) return undefined;
    let raf = null;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const p = total > 0 ? Math.min(Math.max(scrolled / total, 0), 1) : 0;
      setProgress(p);
      setActiveStage(Math.round(p * (STAGES.length - 1)));
      raf = null;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion]);

  return (
    <section
      id="powder-journey"
      className="powder-journey"
      ref={sectionRef}
      style={{ height: reduceMotion ? 'auto' : `${STAGES.length * 90}vh` }}
    >
      <div className="powder-journey-sticky">
        <div className="container powder-journey-inner">
          <div className="powder-journey-head">
            <Reveal as="span" className="eyebrow">
              Turmeric Powder, in Motion
            </Reveal>
            <Reveal delay={1}>
              <h2 className="heading-lg">From Root to Fine Powder</h2>
            </Reveal>
          </div>

          <div className="powder-journey-canvas">
            {!reduceMotion && !isMobile ? (
              <Suspense fallback={<div className="powder-journey-fallback" />}>
                <Canvas
                  shadows
                  dpr={[1, 1.6]}
                  camera={{ position: [0, 0.3, 5.6], fov: 32 }}
                  onCreated={({ gl }) => gl.setClearColor('#000000', 0)}
                >
                  <PowderJourneyScene progress={progress} />
                </Canvas>
              </Suspense>
            ) : (
              <div className="powder-journey-static">
                <div className="powder-journey-static-badge">{STAGES[activeStage]}</div>
              </div>
            )}
          </div>

          <ol className="powder-journey-stages" aria-label="Turmeric processing stages">
            {STAGES.map((stage, i) => (
              <li key={stage} className={i === activeStage ? 'is-active' : i < activeStage ? 'is-done' : ''}>
                <span className="powder-journey-stage-index">{String(i + 1).padStart(2, '0')}</span>
                <span>{stage}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
