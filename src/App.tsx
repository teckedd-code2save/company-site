import Home from './sr/Home';
import ProductsPage from './sr/ProductsPage';

/**
 * Lightweight pathname router. Pages link to each other with plain <a> tags, so
 * navigation is a full document load and each page mounts the motion engine
 * fresh — no client-side router or cross-page teardown required.
 */
function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/products') return <ProductsPage />;
  return <Home />;
}

export default App;
