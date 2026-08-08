import { useState } from 'react';
import Reveal from '../shared/Reveal';

const FIELDS = [
  { name: 'name', label: 'Name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'company', label: 'Company', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'country', label: 'Country', type: 'text', required: true, autoComplete: 'country-name' },
  { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'phone', label: 'WhatsApp / Phone', type: 'tel', required: false, autoComplete: 'tel' },
  { name: 'product', label: 'Product Required', type: 'text', required: false, autoComplete: 'off' },
  { name: 'quantity', label: 'Quantity', type: 'text', required: false, autoComplete: 'off' },
];

const INITIAL = FIELDS.reduce((acc, f) => ({ ...acc, [f.name]: '' }), { message: '' });

export default function B2BContact() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const handleChange = (name) => (event) => {
    setValues((v) => ({ ...v, [name]: event.target.value }));
  };

  const validate = () => {
    const nextErrors = {};
    FIELDS.forEach((f) => {
      if (f.required && !values[f.name].trim()) {
        nextErrors[f.name] = 'Required';
      }
    });
    if (values.email && !/^\S+@\S+\.\S+$/.test(values.email)) {
      nextErrors.email = 'Enter a valid email address';
    }
    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }
    setStatus('success');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-grid">
        <div className="contact-copy">
          <Reveal as="span" className="eyebrow">
            Get In Touch
          </Reveal>
          <Reveal delay={1}>
            <h2 className="heading-lg">Looking for a Reliable Turmeric Supplier?</h2>
          </Reveal>
          <Reveal delay={2} as="p" className="body-lg">
            Tell us what you need. We&rsquo;ll help you find the right turmeric product,
            specification and packaging solution.
          </Reveal>
          <Reveal delay={3} className="contact-cta-row">
            <a href="#contact-form" className="btn btn-primary">
              Request a Quote
            </a>
            <a href="#contact-form" className="btn btn-outline">
              Request Product Sample
            </a>
            <a href="#contact-form" className="btn btn-outline">
              Contact Export Team
            </a>
          </Reveal>
        </div>

        <Reveal as="form" id="contact-form" className="contact-form" delay={2} onSubmit={handleSubmit} noValidate>
          {status === 'success' ? (
            <div className="contact-success" role="status">
              <h3>Thank you — your enquiry has been received.</h3>
              <p>Our export team will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <div className="contact-form-grid">
                {FIELDS.map((f) => (
                  <div className="form-field" key={f.name}>
                    <label htmlFor={`field-${f.name}`}>
                      {f.label}
                      {f.required && <span aria-hidden="true"> *</span>}
                    </label>
                    <input
                      id={`field-${f.name}`}
                      name={f.name}
                      type={f.type}
                      autoComplete={f.autoComplete}
                      value={values[f.name]}
                      onChange={handleChange(f.name)}
                      aria-required={f.required}
                      aria-invalid={Boolean(errors[f.name])}
                      aria-describedby={errors[f.name] ? `field-${f.name}-error` : undefined}
                    />
                    {errors[f.name] && (
                      <span id={`field-${f.name}-error`} className="form-error">
                        {errors[f.name]}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-field">
                <label htmlFor="field-message">Message</label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange('message')}
                />
              </div>

              <button type="submit" className="btn btn-primary contact-submit">
                Submit Enquiry
              </button>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
