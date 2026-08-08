import { useEffect, useState } from 'react';
import Logo from './shared/Logo';

const LINKS = [
  { href: '#products', label: 'Products' },
  { href: '#origin', label: 'Origin' },
  { href: '#quality', label: 'Quality' },
  { href: '#applications', label: 'Applications' },
  { href: '#export', label: 'Export' },
  { href: '#company', label: 'Company' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleLinkClick = () => setOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a href="#top" className="navbar-brand" aria-label="Turmeric brand home">
          <Logo />
          <span className="navbar-brand-text">
            <strong>SUVARNA</strong>
            <em>Turmeric Exports</em>
          </span>
        </a>

        <nav className="navbar-links" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="navbar-actions">
          <a href="#contact" className="btn btn-primary btn-sm">
            Request Export Inquiry
          </a>
        </div>

        <button
          type="button"
          className={`navbar-burger${open ? ' is-open' : ''}`}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav aria-label="Mobile">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={handleLinkClick}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary" onClick={handleLinkClick}>
            Request Export Inquiry
          </a>
        </nav>
      </div>
    </header>
  );
}
