import { Suspense, lazy, useState } from 'react';
import Reveal from '../shared/Reveal';
import SectionHeading from '../shared/SectionHeading';
import LazyMount from '../shared/LazyMount';
import { usePrefersReducedMotion, useIsMobile } from '../../hooks/useMediaQuery';
import wholeTurmericPhoto from '../../assets/photos/whole-turmeric-tray.jpg';

const ProductScene = lazy(() => import('../three/ProductScene'));

const PRODUCTS = [
  {
    id: 'powder',
    tag: 'Product 01',
    name: 'Premium Turmeric Powder',
    variant: 'powder',
    features: [
      'Fine Powder',
      'Rich Natural Colour',
      'Characteristic Turmeric Aroma',
      'Hygienically Processed',
      'Suitable for Retail & Food Manufacturing',
    ],
  },
  {
    id: 'whole',
    tag: 'Product 02',
    name: 'Whole Turmeric Finger',
    variant: 'whole',
    photo: wholeTurmericPhoto,
    features: [
      'Carefully Selected Turmeric Fingers',
      'Naturally Dried',
      'Clean & Sorted',
      'Suitable for Grinding & Processing',
    ],
  },
  {
    id: 'bulk',
    tag: 'Product 03',
    name: 'Bulk Turmeric Powder',
    variant: 'bulk',
    features: ['Food Manufacturers', 'Spice Brands', 'Exporters', 'Distributors', 'Private Label Businesses'],
    featuresLabel: 'Designed For',
  },
];

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const product = PRODUCTS[active];

  return (
    <section id="products" className="section product-section">
      <div className="container">
        <SectionHeading
          eyebrow="Product Showcase"
          title="Turmeric, Crafted for Every Requirement"
          text="From retail-ready powder to bulk supply for manufacturers — explore our core turmeric product range."
        />

        <Reveal className="product-tabs" delay={1} role="tablist" aria-label="Turmeric products">
          {PRODUCTS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              className={`product-tab${active === i ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="product-tab-tag">{p.tag}</span>
              <span className="product-tab-name">{p.name}</span>
            </button>
          ))}
        </Reveal>

        <div className="product-panel">
          <div className="product-panel-visual">
            {product.photo ? (
              <img
                src={product.photo}
                alt="A tray of whole, naturally dried turmeric fingers"
                loading="lazy"
              />
            ) : (
              <LazyMount style={{ width: '100%', height: '100%' }} placeholder={<div className="product-visual-fallback" />}>
                <Suspense fallback={<div className="product-visual-fallback" />}>
                  <ProductScene variant={product.variant} reduceMotion={reduceMotion || isMobile} />
                </Suspense>
              </LazyMount>
            )}
          </div>
          <div className="product-panel-copy">
            <span className="eyebrow">{product.tag}</span>
            <h3 className="heading-md">{product.name}</h3>
            {product.featuresLabel && <p className="product-features-label">{product.featuresLabel}</p>}
            <ul className="product-feature-list">
              {product.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a href="#contact" className="btn btn-outline">
              Request Specification Sheet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
