import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import Icon from '../shared/icons';

const PILLARS = [
  { icon: 'farm', title: 'Carefully Sourced', text: 'Selected from trusted growing regions with attention to variety and maturity.' },
  { icon: 'cleaning', title: 'Hygienically Processed', text: 'Cleaned and handled under controlled, hygienic processing conditions.' },
  { icon: 'seal', title: 'Consistent Quality', text: 'Monitored colour, aroma and texture across every production batch.' },
  { icon: 'quality', title: 'Quality Controlled', text: 'Checked at key stages from intake through to final packing.' },
  { icon: 'lock', title: 'Securely Packed', text: 'Sealed in packaging designed to preserve freshness in transit.' },
  { icon: 'export', title: 'Export Ready', text: 'Prepared and documented to move efficiently through global supply chains.' },
];

export default function Quality() {
  return (
    <section id="quality" className="section quality-section">
      <div className="quality-bg" aria-hidden="true" />
      <div className="container">
        <SectionHeading eyebrow="Quality Systems" title="Quality You Can Trace." center />

        <div className="quality-grid">
          {PILLARS.map((p, i) => (
            <Reveal as="article" className="quality-card" delay={(i % 3) + 1} key={p.title}>
              <div className="quality-card-icon">
                <Icon name={p.icon} size={26} />
              </div>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="quality-note" delay={2}>
          <p>
            Certifications such as FSSAI, ISO, HACCP, GMP, Organic, Halal and Kosher will be displayed
            here once verified documentation is available.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
