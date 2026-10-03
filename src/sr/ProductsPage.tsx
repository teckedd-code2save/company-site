import { Arrow, CompanyLayout, ProjectInvitation } from './CompanyLayout';
import { GroundControlShowcase, HavenShowcase, ProductIndex, WeekendShowcase } from './ProductShowcases';
import { tools } from './companyData';

export default function ProductsPage() {
  return <CompanyLayout page="products" title="Our products"><header className="co-page-heading co-shell"><p className="co-label">Made at Serendepify</p><h1>Different ideas.<br /><em>Working products.</em></h1><p>Spaces to explore. Apps to run. A day to plan. Find your way into what we’re building.</p></header><section className="co-shell co-catalogue" aria-label="Product catalogue"><ProductIndex /></section><HavenShowcase /><GroundControlShowcase /><WeekendShowcase /><section className="co-section co-shell" aria-labelledby="tools-title"><div className="co-section-heading co-heading-compact"><div><p className="co-label">Also in the workshop</p><h2 id="tools-title">Tools for the people building.</h2></div></div><div className="co-tools">{tools.map(tool => <a href={tool.href} key={tool.name}><span className="co-label">{tool.type}</span><h3>{tool.name} <Arrow /></h3><p>{tool.description}</p></a>)}</div></section><ProjectInvitation /></CompanyLayout>;
}
