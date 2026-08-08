import Logo from './shared/Logo';
import Icon from './shared/icons';

const NAV_GROUPS = [
  {
    title: 'Company',
    links: [
      { label: 'Turmeric Products', href: '#products' },
      { label: 'About Us', href: '#company' },
      { label: 'Quality', href: '#quality' },
    ],
  },
  {
    title: 'Business',
    links: [
      { label: 'Export', href: '#export' },
      { label: 'Packaging', href: '#packaging' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const SOCIALS = [
  { label: 'LinkedIn', href: '#', path: 'M4 4h4v4H4V4Zm0 6h4v10H4V10Zm7 0h4v1.6c1-1.3 2.3-2 4-2 3 0 5 2 5 5.8V20h-4v-5.6c0-1.6-.9-2.6-2.2-2.6-1.4 0-2.4 1-2.6 2.4V20h-4V10Z' },
  { label: 'Instagram', href: '#', path: 'M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm4 3.5A4.5 4.5 0 1 1 7.5 13 4.5 4.5 0 0 1 12 8.5Zm0 2A2.5 2.5 0 1 0 14.5 13 2.5 2.5 0 0 0 12 10.5ZM17.3 6.7a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z' },
  { label: 'Facebook', href: '#', path: 'M13.5 21v-7.2h2.4l.4-2.8h-2.8V9.1c0-.8.2-1.4 1.4-1.4h1.5V5.2C15.9 5.1 15 5 14 5c-2.2 0-3.7 1.3-3.7 3.8v2.2H7.9v2.8h2.4V21h3.2Z' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a href="#top" className="navbar-brand">
            <Logo />
            <span className="navbar-brand-text">
              <strong>SUVARNA</strong>
              <em>Turmeric Exports</em>
            </span>
          </a>
          <p>Premium Indian turmeric powder and whole turmeric, processed and packed for global markets.</p>
        </div>

        {NAV_GROUPS.map((group) => (
          <div className="footer-nav-group" key={group.title}>
            <h4>{group.title}</h4>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-contact-group">
          <h4>Contact</h4>
          <ul>
            <li>
              <Icon name="mail" size={16} />
              <a href="mailto:export@suvarnaturmeric.com">export@suvarnaturmeric.com</a>
            </li>
            <li>
              <Icon name="phone" size={16} />
              <a href="tel:+910000000000">+91 00000 00000</a>
            </li>
            <li>
              <Icon name="pin" size={16} />
              <span>Erode, Tamil Nadu, India</span>
            </li>
          </ul>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} Suvarna Turmeric Exports. All rights reserved.</span>
      </div>
    </footer>
  );
}
