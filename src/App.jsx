import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/sections/Hero';
import Origin from './components/sections/Origin';
import ProductShowcase from './components/sections/ProductShowcase';
import PowderJourney from './components/sections/PowderJourney';
import Quality from './components/sections/Quality';
import WhyTurmeric from './components/sections/WhyTurmeric';
import Applications from './components/sections/Applications';
import GlobalExport from './components/sections/GlobalExport';
import Packaging from './components/sections/Packaging';
import CompanyStory from './components/sections/CompanyStory';
import B2BContact from './components/sections/B2BContact';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Origin />
        <ProductShowcase />
        <PowderJourney />
        <Quality />
        <WhyTurmeric />
        <Applications />
        <GlobalExport />
        <Packaging />
        <CompanyStory />
        <B2BContact />
      </main>
      <Footer />
    </>
  );
}
