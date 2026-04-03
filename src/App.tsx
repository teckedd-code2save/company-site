import Navbar from './components/Navbar';
import CheckoutNotice from './components/CheckoutNotice';
import Hero from './sections/Hero';
import Products from './sections/Products';
import Features from './sections/Features';
import Pricing from './sections/Pricing';
import ContactForm from './sections/ContactForm';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-foreground transition-colors dark:bg-slate-950">
      <CheckoutNotice />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Features />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
