import { ModalProvider } from './lib/modal-context';
import PricingModal from './components/PricingModal';
import ContactModal from './components/ContactModal';
import Navbar from './components/Navbar';
import CheckoutNotice from './components/CheckoutNotice';
import Hero from './sections/Hero';
import TrustLogos from './sections/TrustLogos';
import ProductFlow from './sections/ProductFlow';
import Features from './sections/Features';
import SocialProof from './sections/SocialProof';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import AnimatedRule from './components/AnimatedRule';

function App() {
  return (
    <ModalProvider>
      <div className="min-h-screen text-white" style={{ backgroundColor: '#050505' }}>
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <CheckoutNotice />
        <Navbar />
        <main>
          <Hero />
          <TrustLogos />
          <AnimatedRule />
          <ProductFlow />
          <Features />
          <SocialProof />
          <AnimatedRule delay={0.1} />
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
