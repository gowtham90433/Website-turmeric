import Reveal from '../shared/Reveal';
import Icon from '../shared/icons';
import turmericMacro from '../../assets/photos/turmeric-macro-collage.jpg';

const HIGHLIGHTS = [
  { icon: 'seal', title: 'Natural Golden Colour', text: 'A deep, warm hue prized in cuisines and formulations alike.' },
  { icon: 'aroma', title: 'Distinctive Aroma', text: 'An earthy, warm fragrance characteristic of quality turmeric.' },
  { icon: 'leaf', title: 'Traditional Indian Ingredient', text: 'Rooted in generations of Indian agriculture and cuisine.' },
  { icon: 'bowl', title: 'Versatile Food Application', text: 'Used across spice blends, seasonings and ready-to-cook formats.' },
  { icon: 'globe', title: 'Widely Used Across Global Cuisines', text: 'A familiar ingredient in kitchens and food production worldwide.' },
];

export default function WhyTurmeric() {
  return (
    <section id="why-turmeric" className="section why-section">
      <div className="container why-grid">
        <Reveal className="why-visual">
          <img
            src={turmericMacro}
            alt="Macro views of whole turmeric fingers, a cut root showing its natural orange-gold flesh, and ground turmeric powder"
            loading="lazy"
            width={851}
            height={1280}
          />
        </Reveal>

        <div className="why-copy">
          <Reveal as="span" className="eyebrow">
            Why Turmeric
          </Reveal>
          <Reveal delay={1}>
            <h2 className="heading-lg">
              More Than a Spice.
              <br />A Natural Tradition.
            </h2>
          </Reveal>

          <ul className="why-list">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal as="li" delay={(i % 4) + 1} key={h.title} className="why-list-item">
                <span className="why-list-icon">
                  <Icon name={h.icon} size={22} />
                </span>
                <span>
                  <strong>{h.title}</strong>
                  <p>{h.text}</p>
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
