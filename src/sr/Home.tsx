import { Arrow, CompanyLayout, ProjectInvitation } from './CompanyLayout';
import { GroundControlShowcase, HavenShowcase, ProductIndex, WeekendShowcase } from './ProductShowcases';
import { services } from './companyData';
import { Play } from 'lucide-react';

export default function Home() {
  return <CompanyLayout>
    <section className="co-hero"><div className="co-shell co-hero-grid">
      <div className="co-hero-copy"><p className="co-label"><span className="co-dot" /> Product company & engineering partner</p><h1>We keep<br /><em>making things.</em><span className="co-spark" aria-hidden="true">✳</span></h1><p className="co-hero-intro">Software for running apps, planning days, and shaping spaces. Products of our own—and engineering for yours.</p><div className="co-actions"><a className="co-button co-button-ink" href="#products">Explore products <Arrow /></a><a className="co-button co-button-coral" href="/contact">Discuss a project <Arrow /></a></div><p className="co-location">Built in Accra. Open to wherever you are.</p></div>
      <a className="co-hero-scene" href="#haven" aria-label="Watch the Haven home walkthrough"><div className="co-hero-scene-top"><span>Inside something we’re building</span><span>01 / Haven</span></div><img src="/media/haven-home.jpg" width="1280" height="720" alt="A look inside Haven’s furnished, interactive home." fetchPriority="high" /><div className="co-hero-scene-bottom"><span><strong>A little room to play.</strong><small>Explore a home. Move the furniture.</small></span><span className="co-round-play"><Play size={20} fill="currentColor" aria-hidden="true" /></span></div><span className="co-scene-stamp">Haven<br /><i>Step inside ↗</i></span></a>
    </div></section>
    <section className="co-section co-products-intro" id="products" aria-labelledby="products-title"><div className="co-shell"><div className="co-section-heading co-heading-compact"><div><p className="co-label">Made at Serendepify</p><h2 id="products-title">Pick something to explore.</h2></div><a className="co-text-link" href="/products">All products <Arrow /></a></div><ProductIndex /></div></section>
    <section className="co-services-preview" aria-labelledby="services-title"><div className="co-shell co-services-grid"><div><p className="co-label">Built with Serendepify</p><h2 id="services-title">Your next project<br /><em>belongs here, too.</em></h2><p>We bring the same hands-on engineering to your product, workflow, or system. Start with a specific problem. We’ll help shape the work.</p><a className="co-button co-button-lime" href="/services">Explore our services <Arrow /></a></div><div className="co-service-list">{services.map(service => <a key={service.id} href={`/services#${service.id}`}><span>{service.number}</span><div><h3>{service.title}</h3><p>{service.short}</p></div><Arrow /></a>)}</div></div></section>
    <HavenShowcase /><GroundControlShowcase /><WeekendShowcase />
    <section className="co-company-strip"><div className="co-shell"><p className="co-label">From Accra, with curiosity</p><p>We like following an idea far enough to see what it can do. Sometimes that becomes a tool for developers. Sometimes, a whole home you can walk through.</p><a className="co-text-link" href="/company">Meet Serendepify <Arrow /></a></div></section>
    <ProjectInvitation />
  </CompanyLayout>;
}
