import { Suspense, lazy } from 'react';
import Reveal from '../shared/Reveal';
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery';

const HeroScene = lazy(() => import('../three/HeroScene'));

export default function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="top" className="hero">
      <div className="hero-canvas-wrap">
        <Suspense fallback={<div className="hero-canvas-fallback" />}>
          <HeroScene reduceMotion={reduceMotion || isMobile} />
        </Suspense>
        <div className="hero-vignette" />
      </div>

      <div className="container hero-content">
        <Reveal as="span" className="eyebrow hero-eyebrow">
          Authentic Indian Turmeric
        </Reveal>
        <Reveal delay={1}>
          <h1 className="hero-title">
            Pure Turmeric.
            <br />
            Powered by Nature.
          </h1>
        </Reveal>
        <Reveal delay={2} as="p" className="hero-subtitle body-lg">
          Premium Indian Turmeric &amp; Turmeric Powder — naturally sourced, carefully processed,
          globally ready.
        </Reveal>
        <Reveal delay={3} className="hero-actions">
          <a href="#products" className="btn btn-primary">
            Explore Our Products
          </a>
          <a href="#contact" className="btn btn-outline">
            Request Export Inquiry
          </a>
        </Reveal>

        <Reveal delay={4} className="hero-badge">
          <span className="hero-badge-dot" aria-hidden="true" />
          <span>Premium Quality</span>
          <span className="hero-badge-sep">•</span>
          <span>Carefully Processed</span>
          <span className="hero-badge-sep">•</span>
          <span>Export Ready</span>
        </Reveal>
      </div>

      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
