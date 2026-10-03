import { useRef, useState } from 'react';
import { Play, ArrowRight, Search, MapPin, ListChecks, Check } from 'lucide-react';
import { Arrow } from './CompanyLayout';
import { destinations, products } from './companyData';

export function ProductIndex() {
  return <div className="co-product-grid">{products.map((product, index) => <article className={`co-product-card co-product-${product.id}`} key={product.id}>
    <a href={`/products#${product.id}`} className="co-card-image" aria-label={`Explore ${product.name}`}><img src={product.image} alt={product.alt} width="1280" height="720" loading="lazy" /><span><Arrow /></span></a>
    <div className="co-card-topline"><span>0{index + 1} / {product.category}</span><span>{product.status}</span></div>
    <h3><a href={`/products#${product.id}`}>{product.name}</a></h3><p>{product.description}</p><a className="co-text-link" href={product.href}>{product.action} <Arrow /></a>
  </article>)}</div>;
}

const filmChapters = [{ label: 'Look around', start: 0 }, { label: 'Explore the home', start: 10.24 }, { label: 'Place furniture', start: 19.62 }];

export function HavenFilm() {
  const player = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);
  function playChapter(index: number) {
    setStarted(true);
    setActive(index);
    const video = player.current;
    if (!video) return;
    video.scrollIntoView?.({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    const seek = () => { video.currentTime = filmChapters[index].start; };
    if (video.readyState >= 1) seek();
    else video.addEventListener('loadedmetadata', seek, { once: true });
    video.play().catch(() => { /* Native controls remain available if playback is blocked. */ });
  }
  return <div className="co-film">
    <div className="co-film-screen">
      <video ref={player} controls={started} playsInline preload="none" poster="/media/haven-home.jpg" aria-label="Haven: look around the home and arrange furniture" onError={() => setError(true)} onTimeUpdate={() => { const time = player.current?.currentTime ?? 0; setActive(time >= 19.62 ? 2 : time >= 10.24 ? 1 : 0); }}>
        <source src="/media/haven-walkthrough.mp4" type="video/mp4" />
        <track kind="captions" src="/media/haven-walkthrough.vtt" srcLang="en" label="English descriptions" />
        Your browser cannot play this video. <a href="/media/haven-walkthrough.mp4">Open the Haven walkthrough</a>.
      </video>
      {!started && <button className="co-film-play" onClick={() => playChapter(0)}><span><Play size={26} fill="currentColor" aria-hidden="true" /></span><b>Take a look around<small>30-second product walkthrough</small></b></button>}
    </div>
    {error && <p role="alert" className="co-film-error">The film couldn’t load. <a href={`${destinations.haven}/home`}>Explore the home in Haven instead.</a></p>}
    <div className="co-film-chapters" role="group" aria-label="Haven video chapters">{filmChapters.map((chapter, index) => <button key={chapter.label} onClick={() => playChapter(index)} aria-pressed={started && active === index}><span>0{index + 1}</span>{chapter.label}<ArrowRight size={16} aria-hidden="true" /></button>)}</div>
    <div className="co-film-caption"><span>Captured in Haven · sample home & room planner</span><details><summary>What’s in the film</summary><p>Look around the furnished Courtyard House, visit the kitchen and bedroom, then move and rotate a sofa in a measured room and check the floor plan. Sample furnishings and layouts are shown; confirm dimensions and clearance before ordering.</p></details></div>
  </div>;
}

export function HavenShowcase() {
  return <section className="co-showcase co-haven" id="haven" aria-labelledby="haven-title"><div className="co-shell">
    <div className="co-section-heading"><div><p className="co-label"><span className="co-dot" /> Haven / Interactive spaces</p><h2 id="haven-title">Walk in. Look around.<br /><em>Make it yours.</em></h2></div><div><p>A home you can explore, and a room you can rearrange. Try the furniture, move things around, and see how a space could feel.</p><a className="co-text-link" href={`${destinations.haven}/home`}>Step inside Haven <Arrow /></a></div></div>
    <HavenFilm />
    <div className="co-haven-paths"><a href={`${destinations.haven}/shop`}><span>For your space</span><strong>Plan a room. Find your pieces.</strong><Arrow /></a><a href={`${destinations.haven}/retailer`}><span>For furniture retailers</span><strong>Your products, in their rooms.</strong><Arrow /></a></div>
  </div></section>;
}

const gcSteps = [
  { label: 'Discover', title: 'Start with the apps you already run.', body: 'Find Docker Compose workloads on your VPS and choose which ones to enroll.', image: '/media/groundcontrol-discovery.jpg', alt: 'GroundControl showing discovered applications and enrollment controls.' },
  { label: 'Connect', title: 'Give your agent a working connection.', body: 'Connect ChatGPT or another compatible MCP client. Review its requested capabilities and select the apps it may access.', image: '/media/groundcontrol-agents.jpg', alt: 'GroundControl’s MCP endpoint and authorized ChatGPT grant.' },
  { label: 'Operate', title: 'Ask for the work. Follow the result.', body: 'Inspect releases, read logs, check health, or request an approved deployment. Check the running services and public response.', image: '/media/groundcontrol-verification.jpg', alt: 'A recorded RentAWeekend deployment with runtime checks and a successful public HTTP response.' },
];

export function GroundControlShowcase() {
  const [step, setStep] = useState(1);
  const current = gcSteps[step];
  return <section className="co-showcase co-ground" id="groundcontrol" aria-labelledby="groundcontrol-title"><div className="co-shell co-product-story">
    <div className="co-story-copy"><p className="co-label"><span className="co-dot" /> GroundControl / Open source</p><h2 id="groundcontrol-title">Your apps.<br />Your server.<br /><em>Your agents.</em></h2><p>A self-hosted control plane that connects agents to your infrastructure through MCP and OAuth. You approve the access. GroundControl handles the supported operations.</p><a className="co-button co-button-lime" href={destinations.groundcontrol}>Explore GroundControl <Arrow /></a></div>
    <div className="co-step-demo"><div className="co-step-buttons" role="group" aria-label="GroundControl walkthrough">{gcSteps.map((item, index) => <button key={item.label} aria-pressed={step === index} onClick={() => setStep(index)}><span>0{index + 1}</span>{item.label}</button>)}</div><div className="co-gc-image"><img src={current.image} alt={current.alt} width="1512" height="982" loading="lazy" /></div><div className="co-step-copy" aria-live="polite"><h3>{current.title}</h3><p>{current.body}</p></div><p className="co-media-note">Product screens · recorded September 2026</p></div>
  </div></section>;
}

const weekendSteps = [
  { label: 'The idea', title: 'A Saturday in Accra. Where do we start?', body: 'A place, a budget, and the kind of day you have in mind. Start with what matters to you.' },
  { label: 'The research', title: 'Let the planners work through the details.', body: 'Find options, read sources, and bring location and practical details into the comparison.' },
  { label: 'Your plan', title: 'Choose what works for your day.', body: 'Compare possibilities, refine the plan, and turn a task into a local-helper request when you need a hand.' },
];

export function WeekendShowcase() {
  const [step, setStep] = useState(0);
  return <section className="co-showcase co-weekend" id="rentaweekend" aria-labelledby="weekend-title"><div className="co-shell co-product-story">
    <div className="co-story-copy"><p className="co-label"><span className="co-dot" /> RentAWeekend / For life in Ghana</p><h2 id="weekend-title">A plan for the day.<br /><em>A little time back.</em></h2><p>Outings, house hunting, shopping, errands, and trips. Planning agents help you compare the options; local help can take a task off your list.</p><a className="co-button co-button-ink" href={destinations.weekend}>Start a plan <Arrow /></a></div>
    <div className="co-weekend-demo"><div className="co-step-buttons" role="group" aria-label="RentAWeekend planning flow">{weekendSteps.map((item, index) => <button key={item.label} aria-pressed={step === index} onClick={() => setStep(index)}><span>0{index + 1}</span>{item.label}</button>)}</div><div className="co-planning-example"><p className="co-label">Example planning flow</p>
      {step === 0 && <div className="co-brief-card"><MapPin aria-hidden="true" /><blockquote>“A relaxed Saturday in Osu. Lunch and something nearby. Two people, GHS 500.”</blockquote><span>Start with a request like this <ArrowRight size={18} aria-hidden="true" /></span></div>}
      {step === 1 && <div className="co-research-flow">{[{ icon: Search, title: 'Find the possibilities', body: 'Places, activities, and useful sources.' }, { icon: ListChecks, title: 'Read the details', body: 'Menus, prices, opening times, and travel.' }, { icon: Check, title: 'Keep uncertainty visible', body: 'Flag what still needs confirming.' }].map(({ icon: Icon, title, body }, index) => <div key={title}><span className="co-research-icon"><Icon size={21} aria-hidden="true" /></span><div><h4>{title}</h4><p>{body}</p></div><span>0{index + 1}</span></div>)}</div>}
      {step === 2 && <div className="co-plan-result"><div><span>01 / Compare</span><h4>Places & possibilities</h4><p>What fits your location, budget, and day?</p></div><div><span>02 / Refine</span><h4>Make the plan yours</h4><p>Closer, cheaper, a different start—or a different idea.</p></div><div><span>03 / Get help</span><h4>Hand over a task</h4><p>Agree the work, fee, and availability with a local helper.</p></div></div>}
    </div><div className="co-step-copy" aria-live="polite"><h3>{weekendSteps[step].title}</h3><p>{weekendSteps[step].body}</p></div><p className="co-media-note">An illustrated workflow. Start your own plan in the app.</p></div>
  </div></section>;
}
