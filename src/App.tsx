import Home from './sr/Home';
import ProductsPage from './sr/ProductsPage';
import { CompanyPage, ContactPage, NotFoundPage, ServicesPage } from './sr/CompanyPages';

/**
 * Lightweight pathname router. Pages link to each other with plain <a> tags, so
 * navigation is a full document load and each page mounts the motion engine
 * fresh — no client-side router or cross-page teardown required.
 */
function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/products') return <ProductsPage />;
  if (path === '/services') return <ServicesPage />;
  if (path === '/company') return <CompanyPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/') return <Home />;
  return <NotFoundPage />;
}

export default App;
