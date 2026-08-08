import Reveal from '../shared/Reveal';
import WorldMap from '../shared/WorldMap';

export default function GlobalExport() {
  return (
    <section id="export" className="section section-dark export-section">
      <div className="container export-grid">
        <div className="export-copy">
          <Reveal as="span" className="eyebrow">
            Global Export
          </Reveal>
          <Reveal delay={1}>
            <h2 className="heading-lg">From India. For the World.</h2>
          </Reveal>
          <Reveal delay={2} as="p" className="body-lg">
            Built for businesses looking for reliable turmeric products with consistent quality,
            professional packaging and scalable supply.
          </Reveal>
          <Reveal delay={3}>
            <a href="#contact" className="btn btn-primary">
              Talk to Our Export Team
            </a>
          </Reveal>
        </div>

        <Reveal className="export-map" delay={2}>
          <WorldMap />
        </Reveal>
      </div>
    </section>
  );
}
