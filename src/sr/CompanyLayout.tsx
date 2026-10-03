import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LogoMark, Wordmark } from './ui';
import { destinations } from './companyData';
import { siteConfig } from '@/lib/site-config';
import './company.css';

export function Arrow() { return <ArrowUpRight size={18} aria-hidden="true" />; }

export function CompanyLayout({ children, page = 'home', title }: { children: ReactNode; page?: string; title?: string }) {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    document.title = title ? `${title} · Serendepify` : 'Serendepify · Products & engineering';
    const canonical = `https://www.serendepify.com${window.location.pathname.replace(/\/+$/, '') || '/'}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical);
    const hash = window.location.hash.slice(1);
    if (hash) requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ block: 'start' }));
  }, [title]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <div className="co-site" id="top">
    <a className="co-skip" href="#main">Skip to content</a>
    <header className="co-nav"><div className="co-shell co-nav-inner">
      <a href="/" className="co-brand" aria-label="Serendepify home"><LogoMark size={30} /><Wordmark size={22} /></a>
      <button ref={menuButton} className="co-menu" aria-expanded={open} aria-controls="company-navigation" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      <nav id="company-navigation" className={open ? 'is-open' : ''} aria-label="Primary navigation">
        {[['Products', '/products', 'products'], ['Services', '/services', 'services'], ['Company', '/company', 'company']].map(([label, href, id]) => <a key={id} href={href} aria-current={page === id ? 'page' : undefined}>{label}</a>)}
        <a href="/contact" className="co-nav-contact" aria-current={page === 'contact' ? 'page' : undefined}>Discuss a project <Arrow /></a>
      </nav>
    </div></header>
    <main id="main">{children}</main>
    <footer className="co-footer"><div className="co-shell">
      <div className="co-footer-top"><div><a href="/" className="co-brand" aria-label="Back to Serendepify"><LogoMark size={30} inkColor="#f1f0e8" /><Wordmark size={26} color="var(--co-paper)" /></a><p>Products of our own.<br />Engineering for yours.</p></div><div><p className="co-label">Explore</p><a href={`${destinations.haven}/home`}>Haven <Arrow /></a><a href={destinations.groundcontrol}>GroundControl <Arrow /></a><a href={destinations.weekend}>RentAWeekend <Arrow /></a></div><div><p className="co-label">Work with us</p><a href="/services">Our services <Arrow /></a><a href="/contact">Discuss a project <Arrow /></a><a href={`mailto:${siteConfig.contactEmail}`}>Email Serendepify <Arrow /></a></div></div>
      <div className="co-footer-bottom"><span>© {new Date().getFullYear()} Serendepify · Accra, Ghana</span><span>Curious by nature. Hands-on by choice.</span><a href="https://github.com/teckedd-code2save/company-site">Source <Arrow /></a></div>
    </div></footer>
  </div>;
}

export function ProjectInvitation() {
  return <section className="co-invitation"><div className="co-shell"><div><p className="co-label">A project of your own?</p><h2>What are you<br />working on?</h2></div><div><p>A product to build, a system to connect, or a specific problem to solve. Tell us where you are and what needs to happen next.</p><a className="co-button co-button-ink" href="/contact">Discuss a project <Arrow /></a></div></div></section>;
}
