import { ModalProvider } from './lib/modal-context';
import PricingModal from './components/PricingModal';
import ContactModal from './components/ContactModal';
import Navbar from './components/Navbar';
import CheckoutNotice from './components/CheckoutNotice';
import Hero from './sections/Hero';
import TrustLogos from './sections/TrustLogos';
import ProductFlow from './sections/ProductFlow';
import Features from './sections/Features';
import TimelineSection from './sections/TimelineSection';
import SocialProof from './sections/SocialProof';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import GrainOverlay from './components/GrainOverlay';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import CursorSpotlight from './components/CursorSpotlight';
import AnimatedRule from './components/AnimatedRule';

function App() {
  return (
    <ModalProvider>
      <div className="dark min-h-screen text-white" style={{ backgroundColor: '#000000' }}>
        <GrainOverlay />
        <CustomCursor />
        <ScrollProgress />
        <CursorSpotlight />
        <CheckoutNotice />
        <Navbar />
        <main>
          <Hero />
          <TrustLogos />
          <AnimatedRule />
          <ProductFlow />
          <TimelineSection />
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
