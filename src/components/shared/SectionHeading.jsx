import Reveal from './Reveal';

export default function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
  headingLevel = 'h2',
  headingClass = 'heading-lg',
}) {
  const Heading = headingLevel;
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && (
        <Reveal as="span" className="eyebrow">
          {eyebrow}
        </Reveal>
      )}
      <Reveal delay={1}>
        <Heading className={headingClass}>{title}</Heading>
      </Reveal>
      {text && (
        <Reveal delay={2} as="p" className="body-lg">
          {text}
        </Reveal>
      )}
    </div>
  );
}
