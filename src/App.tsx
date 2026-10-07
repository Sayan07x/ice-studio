import { useEffect, useState, type FormEvent } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';

type Inquiry = {
  name: string;
  business: string;
  email: string;
  phone: string;
  projectType: string;
  details: string;
  timeline: string;
  budget: string;
};

const initialInquiry: Inquiry = {
  name: '',
  business: '',
  email: '',
  phone: '',
  projectType: '',
  details: '',
  timeline: '',
  budget: '',
};

const projectTypes = [
  'A new website',
  'A redesign',
  'A landing page',
  'Online shop',
  'Something else',
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [inquiry, setInquiry] = useState<Inquiry>(initialInquiry);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const updateField = (field: keyof Inquiry, value: string) => {
    setInquiry((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const labels: Record<keyof Inquiry, string> = {
      name: 'Name',
      business: 'Business',
      email: 'Email',
      phone: 'Phone',
      projectType: 'Project type',
      details: 'Project details',
      timeline: 'Preferred timeline',
      budget: 'Budget',
    };
    const rows = (Object.keys(inquiry) as (keyof Inquiry)[])
      .map((key) => `${labels[key]}: ${inquiry[key] || 'Not provided'}`);
    const subject = rows.join(' | ');
    const body = `Hello Ice Studio,\n\nI'd love to talk about a website project.\n\n${rows.join('\n\n')}\n\nThanks,\n${inquiry.name}`;
    const mailto = `mailto:chandrasayan05subhra@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice('Your email app should open with your project details ready to review. Nothing is sent until you choose to send it.');
    window.location.href = mailto;
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell grain min-h-[100dvh]">
      <header className="relative z-30">
        <div className="wrap flex h-[78px] items-center justify-between border-b border-[#c9dcda]">
          <a href="#top" aria-label="Ice Studio home" data-testid="link-home" className="flex items-center gap-2.5 text-[#173d48] no-underline">
            <span className="grid h-[29px] w-[29px] place-items-center rounded-full border border-[#7eb5b5]">
              <span className="h-[11px] w-[11px] rotate-45 border border-[#288b99] bg-[#c6e9df]" />
            </span>
            <span className="font-[Manrope] text-[15px] font-extrabold tracking-[-.065em]">ice studio<span className="text-[#2a8f9c]">.</span></span>
          </a>

          <nav aria-label="Main navigation" className="hidden items-center gap-9 text-[13px] text-[#456269] md:flex">
            <a className="nav-link no-underline hover:text-[#176b78]" href="#work" data-testid="link-nav-work">Selected work</a>
            <a className="nav-link no-underline hover:text-[#176b78]" href="#approach" data-testid="link-nav-approach">Our approach</a>
            <a className="nav-link no-underline hover:text-[#176b78]" href="#contact" data-testid="link-nav-contact">Contact</a>
          </nav>
          <a href="#contact" data-testid="link-nav-start" className="hidden items-center gap-2 rounded-[3px] border border-[#9fc4c3] px-4 py-2.5 text-[12px] font-semibold text-[#1d5963] no-underline transition-colors hover:border-[#1b6975] hover:bg-[#deeeeb] md:flex">
            Start a project <ArrowUpRight size={14} />
          </a>
          <button type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu" className="grid h-10 w-10 place-items-center rounded-full border border-[#bad2d1] text-[#1d5963] md:hidden">
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav aria-label="Mobile navigation" className="menu-panel absolute left-0 right-0 top-[78px] border-b border-[#c9dcda] bg-[#edf6f5] px-[19px] py-4 shadow-sm md:hidden">
            <a href="#work" onClick={closeMenu} data-testid="link-mobile-work" className="block border-b border-[#d5e4e2] py-3 text-sm text-[#31565d] no-underline">Selected work</a>
            <a href="#approach" onClick={closeMenu} data-testid="link-mobile-approach" className="block border-b border-[#d5e4e2] py-3 text-sm text-[#31565d] no-underline">Our approach</a>
            <a href="#contact" onClick={closeMenu} data-testid="link-mobile-contact" className="block py-3 text-sm text-[#31565d] no-underline">Start a project</a>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="wrap grid min-h-[650px] items-center gap-5 pb-16 pt-12 md:grid-cols-[1.03fr_.97fr] md:pb-20 md:pt-16" aria-labelledby="hero-heading">
          <div className="relative z-10 max-w-[610px]">
            <div className="eyebrow mb-7 flex items-center gap-3"><span className="inline-block h-px w-8 bg-[#5daeb0]" /> Independent web studio · Working everywhere</div>
            <h1 id="hero-heading" className="display max-w-[590px] text-[clamp(3.65rem,8.2vw,7.35rem)] leading-[.91] text-[#173d48]" data-testid="text-hero-heading">
              A clearer<br />kind of <span className="relative inline-block text-[#208896]">online<span className="absolute -bottom-1 left-1 h-[5px] w-[78%] -rotate-[2deg] bg-[#f1d66f]" /></span>.
            </h1>
            <p className="mt-8 max-w-[435px] text-[16px] leading-[1.75] text-[#526e72] md:text-[17px]">
              We make thoughtful websites for people with something good to put into the world. Clear, useful, and unmistakably yours.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <a href="#contact" className="button-primary no-underline" data-testid="link-hero-contact">Tell us what you’re making <ArrowRight size={15} /></a>
              <a href="#work" className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#31565d] no-underline transition-colors hover:text-[#208896]" data-testid="link-hero-work">See what we do <ArrowDown size={14} /></a>
            </div>
            <div className="mt-12 flex items-center gap-3 text-[11px] text-[#668184]">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#6db9ab] opacity-40" /><span className="relative inline-flex h-2 w-2 rounded-full bg-[#429688]" /></span>
              <span data-testid="text-studio-availability">Taking on a few good projects</span>
            </div>
          </div>

          <div className="relative mx-auto flex aspect-square w-full max-w-[510px] items-center justify-center md:-mr-3" aria-label="An abstract, icy blue glass sphere representing a bright idea taking shape" data-testid="visual-ice-orbit">
            <div className="hero-art absolute inset-[4%] overflow-hidden rounded-full shadow-[inset_0_0_80px_rgba(255,255,255,.5),0_30px_90px_rgba(56,128,137,.14)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,.38),transparent_39%,rgba(17,88,101,.1))]" />
              <div className="orbit" /><div className="orbit two" /><span className="orbit-dot" /><div className="orb-core" />
              <span className="absolute bottom-[13%] right-[18%] font-[DM_Mono] text-[10px] tracking-[.15em] text-white/80">IDEA / 001</span>
            </div>
            <div className="absolute -right-1 top-[16%] rounded-full border border-[#c0dbd9] bg-[#edf6f5]/90 px-4 py-2 text-[10px] tracking-[.1em] text-[#43747a] shadow-sm">GOOD THINGS, MADE CLEAR</div>
            <div className="absolute -bottom-1 left-[7%] flex items-center gap-2 rounded-full border border-[#c0dbd9] bg-[#edf6f5]/90 px-4 py-2 text-[10px] text-[#43747a] shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-[#e6c64e]" /> MADE FOR REAL PEOPLE</div>
          </div>
          <div className="col-span-full mt-1 flex items-center justify-between border-t border-[#c9dcda] pt-4 text-[10px] tracking-[.12em] text-[#769194]">
            <span>SMALL STUDIO. BIG PICTURE.</span><span>STRATEGY · DESIGN · DEVELOPMENT</span>
          </div>
        </section>

        <section className="border-y border-[#c6dcd9] bg-[#e3efec] py-24 md:py-32" aria-labelledby="belief-heading">
          <div className="wrap grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
            <div className="reveal">
              <p className="eyebrow mb-5">A good place to begin</p>
              <p className="font-[DM_Mono] text-xs text-[#799495]">01 — WHY ICE</p>
            </div>
            <div className="reveal">
              <h2 id="belief-heading" className="display max-w-[800px] text-[clamp(2.5rem,5.4vw,5rem)] leading-[1.02] text-[#173d48]" data-testid="text-belief-heading">Your work deserves a website that feels like <span className="text-[#208896]">you.</span></h2>
              <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1fr]">
                <p className="text-[15px] leading-[1.8] text-[#536f73]">Not a template with your name dropped in. A considered, easy-to-use home for the things you do best—and the people looking for them.</p>
                <p className="text-[15px] leading-[1.8] text-[#536f73]">Ice Studio is a small, independent creative web studio. We work directly with cafes, small businesses, independent professionals, and people building something of their own.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="wrap py-24 md:py-32" aria-labelledby="work-heading">
          <div className="reveal mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><p className="eyebrow mb-5">Useful by design</p><h2 id="work-heading" className="display text-[clamp(2.8rem,5.7vw,5.4rem)] leading-[.98] text-[#173d48]" data-testid="text-work-heading">A website with<br />a job to do.</h2></div>
            <p className="max-w-[320px] text-sm leading-7 text-[#587276]">The right amount of personality. The right information, in the right place. A next step that feels easy.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            <article className="project-tile reveal relative min-h-[310px] overflow-hidden rounded-sm bg-[#b9deda] p-7 md:col-span-7 md:min-h-[380px]" data-testid="card-work-cafe">
              <div className="absolute right-[-22px] top-[-39px] h-[285px] w-[285px] rounded-full border border-[#57979a]/40 bg-[radial-gradient(circle_at_35%_28%,#fff8d9_0,#f4d66d_26%,#e9b34f_27%,#e8bc72_65%,#d2a05a_66%)] shadow-[0_24px_60px_rgba(111,125,75,.2)] md:right-[6%] md:top-[-45px] md:h-[365px] md:w-[365px]">
                <div className="absolute inset-[11%] rounded-full border border-[#fff6d0]/70" />
                <div className="absolute left-[17%] top-[20%] h-[28%] w-[38%] rounded-[50%] bg-[#fff8dd]/60 blur-md" />
              </div>
              <p className="eyebrow relative z-10 text-[#367b79]">A good first impression</p>
              <div className="absolute bottom-7 left-7 z-10 max-w-[230px]">
                <p className="font-[DM_Mono] text-[10px] tracking-[.12em] text-[#487774]">01 / FOR THE NEIGHBOURHOOD</p>
                <h3 className="display mt-2 text-[34px] leading-none text-[#19434a]">A little more<br />local love.</h3>
                <p className="mt-3 text-xs leading-5 text-[#456d6c]">A welcoming online home for a neighbourhood cafe.</p>
              </div>
              <span className="absolute bottom-8 right-8 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#45827e]/40 text-[#255e62]"><ArrowUpRight size={17} /></span>
            </article>
            <article className="project-tile reveal relative min-h-[310px] overflow-hidden rounded-sm bg-[#dce7db] p-7 md:col-span-5 md:min-h-[380px]" data-testid="card-work-practice">
              <div className="absolute right-[-48px] top-[35px] h-[245px] w-[245px] rotate-[-12deg] border border-[#96ac98] bg-[#b1c9b5] shadow-[12px_15px_0_rgba(74,109,83,.09)] md:right-[-3px] md:top-[30px] md:h-[280px] md:w-[280px]">
                <div className="absolute inset-[12px] border border-[#eaf0df]/80" />
                <div className="absolute left-[19%] top-[23%] h-[12px] w-[58%] bg-[#f3f1df]/80" />
                <div className="absolute left-[19%] top-[33%] h-[5px] w-[36%] bg-[#f3f1df]/55" />
                <div className="absolute bottom-[16%] left-[19%] h-[75px] w-[48%] rounded-t-[60%] bg-[#849e8a]" />
              </div>
              <p className="eyebrow relative z-10 text-[#567958]">Make the next step obvious</p>
              <div className="absolute bottom-7 left-7 z-10 max-w-[220px]">
                <p className="font-[DM_Mono] text-[10px] tracking-[.12em] text-[#6a806a]">02 / FOR INDEPENDENTS</p>
                <h3 className="display mt-2 text-[32px] leading-none text-[#294536]">Room to do<br />your best work.</h3>
                <p className="mt-3 text-xs leading-5 text-[#627866]">A thoughtful digital front door for a growing practice.</p>
              </div>
              <span className="absolute bottom-8 right-8 z-10 grid h-10 w-10 place-items-center rounded-full border border-[#78947b]/50 text-[#456a50]"><ArrowUpRight size={17} /></span>
            </article>
          </div>
          <p className="reveal mt-5 text-xs text-[#7b9695]">Concepts shown to share the kinds of work we love making. Your project will be entirely its own.</p>
        </section>

        <section id="approach" className="bg-[#153f4a] py-24 text-[#edf6f5] md:py-32" aria-labelledby="approach-heading">
          <div className="wrap">
            <div className="reveal grid gap-9 md:grid-cols-[.7fr_1.3fr] md:gap-20">
              <div><p className="mb-5 font-[DM_Mono] text-[11px] uppercase tracking-[.14em] text-[#8fc8c1]">02 — HOW WE WORK</p><span className="block h-px w-12 bg-[#e4cc62]" /></div>
              <div><h2 id="approach-heading" className="display max-w-[800px] text-[clamp(2.7rem,5.8vw,5.25rem)] leading-[1]">Clear thinking.<br /><span className="text-[#8fc8c1]">Good making.</span></h2>
                <p className="mt-7 max-w-[550px] text-[15px] leading-7 text-[#bfd2ce]">No agency maze, no mystery process. You talk directly with the person thinking through and building your site. We keep it collaborative, considered, and refreshingly straightforward.</p>
              </div>
            </div>
            <div className="mt-16 grid border-t border-[#43666b] md:grid-cols-3">
              {[
                ['01', 'Get to the good bit', 'First, we listen. What do you do, who needs it, and what should your website make easier?'],
                ['02', 'Shape the idea', 'We turn the useful things into a clear plan, a distinctive visual direction, and a site map that makes sense.'],
                ['03', 'Make it real', 'We design and build together, keep you in the loop, and help you feel at home with your new website.'],
              ].map(([number, title, body]) => (
                <article key={number} className="reveal border-b border-[#43666b] py-7 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
                  <span className="font-[DM_Mono] text-xs text-[#e4cc62]">{number} /</span>
                  <h3 className="mt-7 font-[Manrope] text-xl font-semibold tracking-[-.04em]">{title}</h3>
                  <p className="mt-3 max-w-[290px] text-sm leading-6 text-[#bfd2ce]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="wrap py-24 md:py-32" aria-labelledby="fit-heading">
          <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-24">
            <div className="reveal">
              <p className="eyebrow mb-5">Small on purpose</p>
              <h2 id="fit-heading" className="display text-[clamp(2.8rem,5.6vw,5rem)] leading-[.98] text-[#173d48]">Good work<br />starts with<br /><span className="text-[#208896]">a real person.</span></h2>
              <p className="mt-7 max-w-[370px] text-sm leading-7 text-[#587276]">You don’t need a polished brief. A half-formed thought and a cup of something warm is a perfectly good start.</p>
            </div>
            <div className="reveal grid content-start gap-0">
              {[
                ['For the places people gather', 'Independent cafes, restaurants, studios, and shops that want to feel as good online as they do in person.'],
                ['For the people who know their craft', 'Consultants, makers, artists, and independent professionals ready for a more considered online presence.'],
                ['For the next thing taking shape', 'Small businesses and good ideas that need a thoughtful starting point—not a complicated digital project.'],
              ].map(([title, body], index) => (
                <article key={title} className="grid gap-4 border-t border-[#c9dcda] py-6 md:grid-cols-[35px_1fr]">
                  <span className="font-[DM_Mono] text-[10px] text-[#4b9b9f]">0{index + 1}</span>
                  <div><h3 className="font-[Manrope] text-lg font-bold tracking-[-.045em] text-[#234c53]">{title}</h3><p className="mt-2 max-w-[450px] text-sm leading-6 text-[#627d7f]">{body}</p></div>
                </article>
              ))}
              <div className="border-y border-[#c9dcda] py-5 text-xs leading-6 text-[#668184]">Based wherever good ideas happen. Working remotely with thoughtful people, wherever you are.</div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-[#c6dcd9] bg-[#e2eeeb] py-24 md:py-32" aria-labelledby="contact-heading">
          <div className="wrap grid gap-12 md:grid-cols-[.8fr_1.2fr] md:gap-20">
            <div className="reveal md:sticky md:top-12 md:self-start">
              <p className="eyebrow mb-5">03 — YOUR TURN</p>
              <h2 id="contact-heading" className="display text-[clamp(3.1rem,6.8vw,6.15rem)] leading-[.91] text-[#173d48]" data-testid="text-contact-heading">Send it<br />your way<span className="text-[#208896]">.</span></h2>
              <p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#526e72]">Tell us a little about what’s on your mind. We’ll take it from there, one good conversation at a time.</p>
              <a href="mailto:chandrasayan05subhra@gmail.com" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#1c6975] underline decoration-[#9ac5c0] underline-offset-4 hover:text-[#104c56]" data-testid="link-contact-email">Or email us directly <ArrowUpRight size={15} /></a>
              <p className="mt-12 font-[DM_Mono] text-[10px] leading-5 text-[#819b9a]">NO PRESSURE. NO AUTOMATIC MAILING LIST.<br />JUST A CONVERSATION.</p>
            </div>
            <form onSubmit={handleSubmit} className="reveal space-y-6" data-testid="form-inquiry">
              <div className="grid gap-5 sm:grid-cols-2">
                <div><label className="field-label" htmlFor="client-name">Your name <span aria-hidden="true">*</span></label><input id="client-name" name="name" className="field" autoComplete="name" placeholder="What should we call you?" required value={inquiry.name} onChange={(event) => updateField('name', event.target.value)} data-testid="input-client-name" /></div>
                <div><label className="field-label" htmlFor="business">Business or project <span aria-hidden="true">*</span></label><input id="business" name="business" className="field" autoComplete="organization" placeholder="The name you work under" required value={inquiry.business} onChange={(event) => updateField('business', event.target.value)} data-testid="input-business" /></div>
                <div><label className="field-label" htmlFor="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" className="field" autoComplete="email" placeholder="you@example.com" required value={inquiry.email} onChange={(event) => updateField('email', event.target.value)} data-testid="input-email" /></div>
                <div><label className="field-label" htmlFor="phone">Phone number <span className="text-[#829999]">(optional)</span></label><input id="phone" name="phone" type="tel" className="field" autoComplete="tel" placeholder="If a call suits you" value={inquiry.phone} onChange={(event) => updateField('phone', event.target.value)} data-testid="input-phone" /></div>
                <div><label className="field-label" htmlFor="project-type">What are you looking to make? <span aria-hidden="true">*</span></label><select id="project-type" name="projectType" className="field" required value={inquiry.projectType} onChange={(event) => updateField('projectType', event.target.value)} data-testid="select-project-type"><option value="" disabled>Choose a project type</option>{projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
                <div><label className="field-label" htmlFor="timeline">When are you hoping to begin? <span aria-hidden="true">*</span></label><select id="timeline" name="timeline" className="field" required value={inquiry.timeline} onChange={(event) => updateField('timeline', event.target.value)} data-testid="select-timeline"><option value="" disabled>Choose a timeline</option><option>As soon as it feels right</option><option>In the next month</option><option>In 1–3 months</option><option>Just exploring for now</option><option>I have a date in mind</option></select></div>
                <div className="sm:col-span-2"><label className="field-label" htmlFor="details">A little about the project <span aria-hidden="true">*</span></label><textarea id="details" name="details" className="field min-h-[130px] resize-y" placeholder="What do you do, who do you do it for, and what would you love your website to help with?" required value={inquiry.details} onChange={(event) => updateField('details', event.target.value)} data-testid="textarea-project-details" /></div>
                <div className="sm:col-span-2"><label className="field-label" htmlFor="budget">Have a budget range in mind? <span aria-hidden="true">*</span></label><select id="budget" name="budget" className="field" required value={inquiry.budget} onChange={(event) => updateField('budget', event.target.value)} data-testid="select-budget"><option value="" disabled>Choose a range that feels close</option><option>Under $1,000</option><option>$1,000–$2,500</option><option>$2,500–$5,000</option><option>$5,000+</option><option>I’m not sure yet</option></select></div>
              </div>
              <div className="border-t border-[#c5dad7] pt-6">
                <button type="submit" className="button-primary min-w-[185px]" data-testid="button-submit-inquiry">Open an email draft <ArrowRight size={15} /></button>
                <p className="mt-4 max-w-[470px] text-xs leading-5 text-[#6c8586]" data-testid="text-email-disclosure">Submitting opens your email app with your details in a draft addressed to Ice Studio. Review it there and press send when you’re ready—nothing is sent automatically.</p>
                {notice && <p role="status" aria-live="polite" className="mt-3 text-xs font-medium leading-5 text-[#226c69]" data-testid="status-email-draft">{notice}</p>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#153f4a] py-7 text-[#c6d9d5]">
        <div className="wrap flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#top" className="flex w-fit items-center gap-2.5 text-sm font-extrabold tracking-[-.06em] text-[#f0f7f4] no-underline" data-testid="link-footer-home"><span className="grid h-6 w-6 place-items-center rounded-full border border-[#6faaa7]"><span className="h-2 w-2 rotate-45 border border-[#9acac1] bg-[#d7e8b0]" /></span>ice studio<span className="text-[#e4cc62]">.</span></a>
          <p className="text-xs text-[#9db9b5]" data-testid="text-footer-note">Good websites for good work. Made with care.</p>
          <a href="mailto:chandrasayan05subhra@gmail.com" className="inline-flex items-center gap-2 text-xs text-[#c6d9d5] underline decoration-[#668d8d] underline-offset-4 hover:text-white" data-testid="link-footer-email">Say hello <ArrowUpRight size={13} /></a>
        </div>
      </footer>
    </div>
  );
}

export default App;
