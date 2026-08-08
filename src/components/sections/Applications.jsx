import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import Icon from '../shared/icons';
import TiltCard from '../shared/TiltCard';

const APPLICATIONS = [
  { icon: 'beverage', title: 'Food & Beverages' },
  { icon: 'spice', title: 'Spice Blends' },
  { icon: 'bowl', title: 'Seasonings' },
  { icon: 'processing', title: 'Ready-to-Cook Products' },
  { icon: 'factory', title: 'Food Manufacturing' },
  { icon: 'label', title: 'Private Label' },
  { icon: 'packaging', title: 'Retail Packaging' },
  { icon: 'truck', title: 'International Distribution' },
];

export default function Applications() {
  return (
    <section id="applications" className="section applications-section">
      <div className="container">
        <SectionHeading
          eyebrow="Applications"
          title="Where Our Turmeric Is Used"
          text="A versatile ingredient built to perform across food production, retail and export channels."
        />

        <div className="applications-grid">
          {APPLICATIONS.map((a, i) => (
            <Reveal delay={(i % 4) + 1} key={a.title}>
              <TiltCard className="application-card">
                <div className="application-card-icon">
                  <Icon name={a.icon} size={28} />
                </div>
                <span>{a.title}</span>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
