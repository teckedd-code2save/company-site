import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import TrustLogos from './sections/TrustLogos';
import Products from './sections/Products';
import Features from './sections/Features';
import Founder from './sections/Founder';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import CTABanner from './sections/CTABanner';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-foreground transition-colors dark:bg-slate-950">
      <Navbar />
      <main>
        <Hero />
        <TrustLogos />
        <Products />
        <Features />
        <Founder />
        <Testimonials />
        <Pricing />
        <CTABanner />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
