import { CONVOY_URL, FORGE_URL, GC_URL, PRODUCT_MEDIA } from './media';
import { ImageSlot, LogoMark, Wordmark } from './ui';

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;

const products = [
  { name: 'GroundControl', status: 'Flagship · live early access', body: 'The self-hosted operational cockpit, evolving into intelligence that understands VPS services, tests meaningful changes, and guides safe recovery.', href: GC_URL, media: PRODUCT_MEDIA.groundControlDashboard },
  { name: 'Convoy', status: 'Independent · CLI + MCP', body: 'Supervised delivery and promotion workflows with reviewable evidence, explicit approval, and controlled progress toward production.', href: CONVOY_URL, media: PRODUCT_MEDIA.convoy },
  { name: 'Forge', status: 'Developer tool · CLI + Skills', body: 'A focused distribution layer for agent-ready engineering practices and build context.', href: FORGE_URL, media: PRODUCT_MEDIA.forge },
];

export default function ProductsPage() {
  return (
    <div className="v5-page v5-products-page">
      <header className="v5-nav"><div className="v5-shell v5-nav-inner"><a href="/" className="v5-brand"><LogoMark size={29} /><Wordmark /></a><a className="v5-nav-cta" href="/">Back home <span>↗</span></a></div></header>
      <main className="v5-products-main">
        <div className="v5-shell">
          <p className="v5-kicker"><i /> Products · Serendepify</p>
          <h1>One company thesis.<br /><em>GroundControl</em> at the centre.</h1>
          <p className="v5-products-lede">Serendepify builds systems that make consequential software work legible, controlled, and recoverable. GroundControl is the flagship; Convoy and Forge remain focused independent tools.</p>
          <div className="v5-product-index">{products.map((product, index) => <article key={product.name}><div className="v5-index-number">0{index + 1}</div><div className="v5-index-copy"><span>{product.status}</span><h2>{product.name}</h2><p>{product.body}</p><a href={product.href} {...ext}>Open product ↗</a></div><div className="v5-index-media"><ImageSlot label={product.name} media={product.media} mediaFit="contain" background="#111417" /></div></article>)}</div>
        </div>
      </main>
    </div>
  );
}
