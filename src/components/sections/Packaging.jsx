import { Suspense, lazy, useState } from 'react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import LazyMount from '../shared/LazyMount';
import Icon from '../shared/icons';
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery';

const PackagingCardScene = lazy(() => import('../three/PackagingCardScene'));

const PACKS = [
  { id: 'retail', name: 'Retail Pouch', variant: 'pouch', icon: 'packaging', labelProps: { title: 'PURE TURMERIC', subtitle: 'RETAIL PACK' } },
  { id: 'standup', name: 'Stand-Up Pouch', variant: 'standpouch', icon: 'packaging', labelProps: { title: 'PREMIUM TURMERIC', subtitle: 'STAND-UP POUCH' } },
  { id: 'jar', name: 'Jar', variant: 'jar', icon: 'seal', labelProps: { title: 'PURE TURMERIC', subtitle: 'GLASS JAR' } },
  { id: 'bulk', name: 'Bulk Bag', variant: 'bulk', icon: 'truck', labelProps: { title: 'BULK TURMERIC', subtitle: 'FOR MANUFACTURERS' } },
  { id: 'foodservice', name: 'Food-Service Pack', variant: 'foodservice', icon: 'bowl', labelProps: { title: 'TURMERIC POWDER', subtitle: 'FOOD SERVICE' } },
  { id: 'private', name: 'Private-Label Packaging', variant: 'standpouch', icon: 'label', labelProps: { title: 'YOUR BRAND', subtitle: 'PRIVATE LABEL' } },
];

export default function Packaging() {
  const [hoveredId, setHoveredId] = useState(null);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="packaging" className="section packaging-section">
      <div className="container">
        <SectionHeading
          eyebrow="Packaging"
          title="Packaging Built for Every Channel"
          text="From retail-ready pouches to bulk export bags — with custom and private-label options available."
        />

        <div className="packaging-grid">
          {PACKS.map((pack, i) => (
            <Reveal
              as="div"
              className="packaging-card"
              delay={(i % 3) + 1}
              key={pack.id}
              onPointerEnter={() => setHoveredId(pack.id)}
              onPointerLeave={() => setHoveredId((v) => (v === pack.id ? null : v))}
            >
              <div className="packaging-card-visual">
                {isMobile || reduceMotion ? (
                  <div className="packaging-visual-static">
                    <Icon name={pack.icon} size={40} />
                  </div>
                ) : (
                  <LazyMount
                    style={{ width: '100%', height: '100%' }}
                    placeholder={<div className="packaging-visual-fallback" />}
                  >
                    <Suspense fallback={<div className="packaging-visual-fallback" />}>
                      <PackagingCardScene
                        variant={pack.variant}
                        labelProps={pack.labelProps}
                        hovered={hoveredId === pack.id}
                        reduceMotion={reduceMotion}
                      />
                    </Suspense>
                  </LazyMount>
                )}
              </div>
              <span className="packaging-card-name">{pack.name}</span>
            </Reveal>
          ))}
        </div>

        <Reveal className="packaging-callouts" delay={2}>
          <span>Custom Packaging Available</span>
          <span>Private Label Solutions</span>
          <span>Bulk Supply</span>
          <span>Export Packaging</span>
        </Reveal>
      </div>
    </section>
  );
}
