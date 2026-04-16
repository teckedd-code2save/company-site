import { ModalProvider } from './lib/modal-context';
import PricingModal from './components/PricingModal';
import ContactModal from './components/ContactModal';
import Navbar from './components/Navbar';
import CheckoutNotice from './components/CheckoutNotice';
import Hero from './sections/Hero';
import TrustLogos from './sections/TrustLogos';
import ProductFlow from './sections/ProductFlow';
import Features from './sections/Features';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';

function App() {
  return (
    <ModalProvider>
      <div className="min-h-screen bg-black text-white">
        <CheckoutNotice />
        <Navbar />
        <main>
          <Hero />
          <TrustLogos />
          <ProductFlow />
          <Features />
          <CTASection />
        </main>
        <Footer />
        <PricingModal />
        <ContactModal />
      </div>
    </ModalProvider>
  );
}

export default App;
