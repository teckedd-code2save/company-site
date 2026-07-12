import { CONVOY_URL, FORGE_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { ImageSlot, LogoMark, Wordmark } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const products = [
  { name: 'GroundControl', status: 'Flagship · Live', body: 'A self-hosted cockpit for VPS fleets, evolving with Loop: change-aware customer journeys, repair, canary, observation, and rollback.', href: GC_URL, media: PRODUCT_MEDIA.groundControlDashboard },
  { name: 'Convoy', status: 'Standalone · CLI + MCP', body: 'A supervised delivery agent: Claude opens the PR, review feedback steers a better revision, approval merges and promotes it, then guarded canary, observation, and production steps continue.', href: CONVOY_URL, media: PRODUCT_MEDIA.convoy },
  { name: 'Forge', status: 'Developer preview · CLI + Skills', body: 'An agent ecosystem bootstrapper for turning product requirements into backend and delivery workflows.', href: FORGE_URL, media: PRODUCT_MEDIA.forge },
];

export default function ProductsPage() {
  return (
    <div className="v4-page v4-products-page">
      <header className="v4-nav"><div className="v4-shell v4-nav-inner"><a href="/" className="v4-brand"><LogoMark size={28} /><Wordmark /></a><a className="v4-nav-cta" href="/">← Back home</a></div></header>
      <main className="v4-products-main">
        <div className="v4-shell">
          <p className="v4-kicker">Products · Serendepify</p>
          <h1>Software for people<br />who operate systems.</h1>
          <p className="v4-lede">Three independent products. No forced platform story—just a shared commitment to evidence, useful automation, and operator control.</p>
          <div className="v4-product-index">{products.map((product, index) => <article key={product.name}><div className="v4-index-number">0{index + 1}</div><div className="v4-index-copy"><span>{product.status}</span><h2>{product.name}</h2><p>{product.body}</p><a href={product.href} {...ext}>Open product ↗</a></div><div className="v4-index-media"><ImageSlot label={product.name} media={product.media} mediaFit="contain" background="#111417" /></div></article>)}</div>
        </div>
      </main>
    </div>
  );
}
