import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import Icon from '../shared/icons';
import InteractiveRoot from '../three/InteractiveRoot';
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery';
import originTrayPhoto from '../../assets/photos/origin-tray.jpg';

const STEPS = [
  { icon: 'farm', label: 'Farm' },
  { icon: 'harvest', label: 'Harvest' },
  { icon: 'cleaning', label: 'Cleaning' },
  { icon: 'processing', label: 'Processing' },
  { icon: 'grinding', label: 'Grinding' },
  { icon: 'quality', label: 'Quality Control' },
  { icon: 'packaging', label: 'Packaging' },
  { icon: 'export', label: 'Global Export' },
];

export default function Origin() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section id="origin" className="section origin-section">
      <div className="container">
        <SectionHeading
          eyebrow="From Farm to Product"
          title="From the Soil of India to the World"
          text="Carefully selected turmeric is sourced from trusted agricultural regions and processed with attention to purity, consistency, aroma, colour and quality."
        />

        <Reveal className="origin-flow" delay={1}>
          <div className="origin-flow-track">
            {STEPS.map((step, i) => (
              <div className="origin-step" key={step.label}>
                <div className="origin-step-icon">
                  <Icon name={step.icon} />
                </div>
                <span className="origin-step-label">{step.label}</span>
                {i < STEPS.length - 1 && <span className="origin-step-connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="origin-showcase">
          <Reveal className="origin-showcase-visual" delay={2}>
            <InteractiveRoot reduceMotion={reduceMotion} />
          </Reveal>
          <Reveal className="origin-showcase-copy" delay={3}>
            <img
              className="origin-showcase-photo"
              src={originTrayPhoto}
              alt="Whole turmeric fingers with a cut root showing its natural orange-gold flesh, in a wooden tray"
              loading="lazy"
            />
            <h3 className="heading-md">A Root Shaped by Soil, Sun and Time</h3>
            <p className="body-lg">
              Turmeric rhizomes are cultivated over a full growing season before being harvested by
              hand-informed methods, cleaned, and readied for drying — the first step in a journey
              built around consistency and care.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
