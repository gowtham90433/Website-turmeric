import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import Icon from '../shared/icons';

const PILLARS = [
  {
    icon: 'leaf',
    title: 'Company History',
    text: 'Our story is grounded in a commitment to authentic Indian turmeric, built through direct relationships with growers and processors.',
  },
  {
    icon: 'factory',
    title: 'Manufacturing Facility',
    text: 'Turmeric is processed in a facility organised around hygiene, consistency and careful handling at every stage.',
  },
  {
    icon: 'farm',
    title: 'Sourcing Network',
    text: 'We work with growing regions selected for turmeric of consistent colour, aroma and quality.',
  },
  {
    icon: 'processing',
    title: 'Processing Capability',
    text: 'Cleaning, drying, grinding and packing are managed as a connected process, designed for repeatable results.',
  },
  {
    icon: 'shield',
    title: 'Quality Systems',
    text: 'Quality checks are built into our workflow, from raw material intake through to final packaged product.',
  },
  {
    icon: 'export',
    title: 'Export Capability',
    text: 'Our operations are structured to support international buyers with clear communication and dependable supply.',
  },
];

export default function CompanyStory() {
  return (
    <section id="company" className="section company-section">
      <div className="container">
        <SectionHeading eyebrow="Company" title="Rooted in Quality. Built for the World." />

        <div className="company-grid">
          {PILLARS.map((p, i) => (
            <Reveal as="article" className="company-card" delay={(i % 3) + 1} key={p.title}>
              <Icon name={p.icon} size={24} />
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
