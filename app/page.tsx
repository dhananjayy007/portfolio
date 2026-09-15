'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ThinkingWallHero = dynamic(() => import('./components/hero-3d/ThinkingWallHero'), {
  ssr: false,
})

const skillGroups = [
  ['Product Strategy', '0 → 1 Building', 'PRDs & User Stories', 'Feature Prioritization', 'Fulfillment Workflows'],
  ['AI Product Thinking', 'Multimodal LLM Pipelines', 'Prompt Architecture', 'Vector Search (pgvector)', 'Grounded RAG & Citations'],
  ['UX & Design Craft', 'Interaction Design', 'Tactile Micro-animations', 'Design Systems', 'Mobile Ergonomics'],
  ['Technical Execution', 'Next.js & React Native', 'Supabase & PostgreSQL', 'API Webhook Architecture', 'Agile Sprint Leadership'],
]

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>
}

function ProjectVisual({ kind }: { kind: 'thenvue' | 'merchow' | 'gallery' }) {
  if (kind === 'thenvue') {
    return (
      <div className="project-visual thenvue-visual">
        <div className="visual-top">
          <span className="window-dots"><i /><i /><i /></span>
          <span>thenvue.app / memory-journal</span>
          <span>Local Calendar Anchored</span>
        </div>
        <div className="thenvue-body">
          <aside>
            <strong>thenvue</strong>
            <span className="active">Timeline</span>
            <span>Ask My Life</span>
            <span>Rediscover</span>
            <span>Perspectives</span>
            <small>INTELLIGENCE</small>
            <span>pgvector (768)</span>
          </aside>
          <div className="dashboard">
            <div className="dashboard-intro">
              <span>Tuesday, 14 October · 10:45 PM</span>
              <h4>Dinner with Sahil in Pune</h4>
              <p>&ldquo;Discussed whether to bet everything on our own ideas. Cold breeze, hot chai.&rdquo;</p>
            </div>
            <div className="dashboard-cards">
              <div>
                <small>Auto Mood</small>
                <b>Reflective</b>
                <em>Gemini Flash</em>
              </div>
              <div>
                <small>Entity Tags</small>
                <b>@Sahil</b>
                <em>#startups</em>
              </div>
              <div>
                <small>Audio Note</small>
                <b>01:24</b>
                <em>Waveform saved</em>
              </div>
            </div>
            <div className="chart">
              <span>Ask My Life Citation Engine Active · Vector Cosine Proximity</span>
              <svg viewBox="0 0 500 70" aria-hidden="true" style={{ marginTop: '8px' }}>
                <path d="M0 50 C80 20 160 60 240 30 S360 15 420 40 S480 20 500 25" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
        <label className="visual-caption">Multimodal Memory Journal / 01</label>
      </div>
    )
  }

  if (kind === 'merchow') {
    return (
      <div className="project-visual merchow-visual">
        <div className="visual-top">
          <span>merchow.com / @creator</span>
          <span>Zero-Inventory Drops</span>
        </div>
        <div className="merchow-body">
          <p className="mini-label">AUTOMATED PRINT-ON-DEMAND / 2025</p>
          <h4>Your store,<br /><em>zero dead stock.</em></h4>
          <div className="product-stack">
            <div className="product-art" />
            <div>
              <strong>260 GSM Oversized Heavy Tee</strong>
              <small>Qikink API Routing · ₹450 Margin / unit</small>
            </div>
          </div>
        </div>
        <label className="visual-caption">Creator Commerce &amp; Fulfillment / 02</label>
      </div>
    )
  }

  return (
    <div className="project-visual gallery-visual">
      <div className="gallery-card gallery-a">
        <span>01</span>
        <strong>Find My<br /><em>Scent.</em></strong>
      </div>
      <div className="gallery-card gallery-b">
        <span>02</span>
        <b style={{ fontSize: '32px', fontFamily: 'Georgia, serif' }}>10k+</b>
      </div>
      <div className="gallery-card gallery-c">
        <span>03</span>
        <b style={{ fontSize: '18px', fontWeight: 'bold' }}>Token System</b>
      </div>
      <label className="visual-caption">Escents, Sangharsh &amp; Design Systems / 03</label>
    </div>
  )
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, message } = formData
    const mailtoUrl = `mailto:dhananjayy6397@gmail.com?subject=${encodeURIComponent(
      `Product Inquiry from ${name || 'Portfolio Visitor'}`
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`
    window.location.href = mailtoUrl
    setStatus('sent')
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="contact-name">NAME</label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-email">EMAIL</label>
        <input
          id="contact-email"
          type="email"
          required
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-message">MESSAGE</label>
        <textarea
          id="contact-message"
          required
          placeholder="What's on your mind?"
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="contact-submit-btn">
          {status === 'sent' ? 'Opening Mail Client...' : 'Send Message'}
        </button>
        {status === 'sent' && (
          <span className="form-success-note">
            ✓ Prepared in your email app!
          </span>
        )}
      </div>
    </form>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<'work' | 'play' | 'about'>('work')
  const [darkMode, setDarkMode] = useState(true)
  const [easterEggText, setEasterEggText] = useState<string | null>(null)
  const [easterEggVisible, setEasterEggVisible] = useState(false)
  const easterEggTimerRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add('dark')
        try { localStorage.setItem('portfolio-theme', 'dark') } catch {}
      } else {
        document.documentElement.classList.remove('dark')
        try { localStorage.setItem('portfolio-theme', 'light') } catch {}
      }
      return next
    })

    // Handle Easter egg dry joke
    try {
      sessionStorage.setItem('theme-hint-dismissed', 'true')
    } catch {}

    if (easterEggTimerRef.current) {
      clearTimeout(easterEggTimerRef.current)
    }

    setEasterEggText('💡 This room got no lights, I guess.')
    setEasterEggVisible(true)

    easterEggTimerRef.current = setTimeout(() => {
      setEasterEggVisible(false)
      setTimeout(() => {
        setEasterEggText(null)
      }, 400)
    }, 3800)
  }

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('portfolio-theme')
      if (savedTheme === 'light') {
        setDarkMode(false)
        document.documentElement.classList.remove('dark')
      } else if (savedTheme === 'dark') {
        setDarkMode(true)
        document.documentElement.classList.add('dark')
      } else {
        setDarkMode(document.documentElement.classList.contains('dark'))
      }
    } catch {
      setDarkMode(document.documentElement.classList.contains('dark'))
    }

    // Show initial Easter egg hint once per session if not interacted with
    let hintTimer: NodeJS.Timeout | null = null
    try {
      const hintDismissed = sessionStorage.getItem('theme-hint-dismissed')
      if (!hintDismissed) {
        hintTimer = setTimeout(() => {
          setEasterEggText('💡 You can turn on the lights from here')
          setEasterEggVisible(true)
        }, 1200)
      }
    } catch {}

    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      document.documentElement.style.setProperty('--scroll', `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}`)

      // Dynamic active section detection
      const workEl = document.getElementById('work')
      const aboutEl = document.getElementById('about')
      const scrollPos = window.scrollY + 280

      if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about')
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('work')
      } else {
        setActiveSection('play')
      }
    }
    const onMove = (event: PointerEvent) => {
      if (cursorRef.current && window.matchMedia('(pointer: fine)').matches) {
        cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
        cursorRef.current.classList.add('is-active')
      }
      document.documentElement.style.setProperty('--mouse-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${event.clientY}px`)

      // Parallax mouse offsets relative to screen center
      const offsetX = ((event.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) * 16
      const offsetY = ((event.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) * 16
      document.documentElement.style.setProperty('--mouse-offset-x', `${offsetX}px`)
      document.documentElement.style.setProperty('--mouse-offset-y', `${offsetY}px`)
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      if (hintTimer) clearTimeout(hintTimer)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <main className="site-shell" id="top">
      <div className="scroll-progress" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true"><span>View<br />project</span></div>

      {/* Floating Capsule Primary Navigation */}
      <header className="site-nav-shell">
        <nav className="pill-nav" aria-label="Primary navigation">
          <a className="pill-logo" href="#top" aria-label="Home / Dhananjay Chaddha">
            <span className="pill-mark">D</span>
          </a>

          <div className={`pill-nav-links ${menuOpen ? 'is-open' : ''}`}>
            <a
              href="#work"
              className={`pill-nav-item ${activeSection === 'work' ? 'is-active' : ''}`}
              onClick={() => { setActiveSection('work'); setMenuOpen(false) }}
            >
              Work
            </a>
            <a
              href="#hero"
              className={`pill-nav-item ${activeSection === 'play' ? 'is-active' : ''}`}
              onClick={() => { setActiveSection('play'); setMenuOpen(false) }}
            >
              Play
            </a>
            <a
              href="#about"
              className={`pill-nav-item ${activeSection === 'about' ? 'is-active' : ''}`}
              onClick={() => { setActiveSection('about'); setMenuOpen(false) }}
            >
              About Me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-nav-item"
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href="#contact"
              className="pill-nav-item pill-nav-mobile-contact"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>

          <div className="pill-nav-actions">
            <div className="theme-toggle-wrapper">
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={darkMode ? 'Dark mode active' : 'Light mode active'}
              >
                {darkMode ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                )}
              </button>

              {easterEggText && (
                <div
                  className={`theme-easter-egg ${easterEggVisible ? 'is-visible' : ''}`}
                  role="status"
                  aria-live="polite"
                >
                  <span className="theme-easter-egg-arrow" aria-hidden="true" />
                  <span>{easterEggText}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              className="pill-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
            >
              <span>{menuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </nav>
      </header>

      {/* 3D Cinematic Hero Section: "The 2 AM Thinking Room" */}
      <section className="workbench-hero" id="hero">
        <ThinkingWallHero />

        {/* Minimalist Cinematic Overlay (pointer-events: none on text, auto on CTA) */}
        <div className="hero-overlay-container container">
          <div className="hero-text-block">
            <div className="hero-identity-layer">
              <span className="hero-identity-name">Hi, I’m Dhananjay Chaddha.</span>
              <span className="hero-identity-meta">Product Manager · AI · 0 → 1</span>
            </div>

            <h1 className="hero-cinematic-title">
              Turning ambiguous customer problems into <em>shipped 0→1 products.</em>
            </h1>
          </div>

          <div className="hero-action-block">
            <a className="hero-cinematic-cta" href="#work">
              Explore my work <span>↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* Case Studies / Work Section */}
      <section className="work-section container" id="work">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">01 / Featured Case Studies</p>
            <h2>Things I&apos;ve helped<br /><em>bring to life.</em></h2>
          </div>
          <p className="section-note">
            Detailed product stories covering user discovery, trade-offs, engineering leadership, and honest retrospective learnings.
          </p>
        </Reveal>

        <div className="project-list">
          
          {/* Card 01: Thenvue */}
          <Reveal>
            <article className="project-card project-hero-card" data-cursor="project">
              <div className="project-copy">
                <span className="project-number">01</span>
                <div>
                  <p className="project-type">0 → 1 AI Product Management</p>
                  <h3>Thenvue</h3>
                  <p className="project-description">
                    Eliminating blank-page journaling friction through zero-effort multimodal capture, associative semantic recall (Gemini + pgvector), and grounded memory citations.
                  </p>
                  <Link className="circle-link" href="/thenvue" aria-label="View Thenvue case study">
                    ↗
                  </Link>
                  <div className="project-tags">
                    <span>AI Product Strategy</span>
                    <span>Multimodal RAG</span>
                    <span>Latency vs. Trust</span>
                    <span>Shipped 0 → 1</span>
                  </div>
                </div>
              </div>
              <Link href="/thenvue" style={{ display: 'contents' }}>
                <ProjectVisual kind="thenvue" />
              </Link>
            </article>
          </Reveal>

          {/* Card 02: Merchow */}
          <Reveal>
            <article className="project-card project-split-card" data-cursor="project">
              <div className="project-copy">
                <span className="project-number">02</span>
                <div>
                  <p className="project-type">0 → 1 Product Leadership · Startup</p>
                  <h3>Merchow</h3>
                  <p className="project-description">
                    Led product from 0→1 with a 5-engineer team: conducted 10+ creator discovery interviews (+35% engagement), automated Qikink fulfillment APIs, and tested with a 20+ creator beta cohort.
                  </p>
                  <Link className="circle-link" href="/merchow" aria-label="View Merchow case study">
                    ↗
                  </Link>
                  <div className="project-tags">
                    <span>Customer Discovery (10+)</span>
                    <span>5-Engineer Agile Sprints</span>
                    <span>API Supply Chain</span>
                    <span>Beta Iteration (20+)</span>
                  </div>
                </div>
              </div>
              <Link href="/merchow" style={{ display: 'contents' }}>
                <ProjectVisual kind="merchow" />
              </Link>
            </article>
          </Reveal>

          {/* Card 03: Selected Design Work */}
          <Reveal>
            <article className="project-card project-gallery-card" data-cursor="project">
              <div className="project-copy">
                <span className="project-number">03</span>
                <div>
                  <p className="project-type">UX Strategy &amp; Conversion Systems</p>
                  <h3>Product Craft &amp;<br />Conversion Systems</h3>
                  <p className="project-description">
                    Optimized high-intent discovery funnels (5× monthly revenue scale on Escents) and scaled distraction-free mobile utilities to 10,000+ organic users with a 20% drop-off reduction.
                  </p>
                  <Link className="circle-link" href="/design" aria-label="View selected design work">
                    ↗
                  </Link>
                  <div className="project-tags">
                    <span>Funnel Optimization</span>
                    <span>10k+ Downloads</span>
                    <span>Drop-Off Reduction (-20%)</span>
                    <span>Design Systems</span>
                  </div>
                </div>
              </div>
              <Link href="/design" style={{ display: 'contents' }}>
                <ProjectVisual kind="gallery" />
              </Link>
            </article>
          </Reveal>

        </div>
      </section>

      {/* About Section */}
      <section className="about-section container" id="about">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">02 / Product Philosophy</p>
            <h2>Strategy meets craft.<br /><em>Builder by choice.</em></h2>
          </div>
        </Reveal>
        <div className="about-grid">
          <Reveal className="portrait-card">
            <picture>
              <source srcSet="/images/dhananjay-portrait.webp" type="image/webp" />
              <img
                src="/images/dhananjay-portrait.jpg"
                alt="Dhananjay Chaddha"
                className="portrait-img"
                loading="lazy"
                decoding="async"
                width={731}
                height={1024}
              />
            </picture>
            <div className="portrait-overlay">
              <span className="portrait-meta">NIT Hamirpur · Product / AI / Design</span>
            </div>
          </Reveal>
          <Reveal className="about-copy">
            <p className="large-copy">
              I operate at the intersection of technical systems, customer psychology, and business execution — finding the high-leverage product opportunity inside ambiguous problems, then shipping it.
            </p>
            <p>
              With an engineering degree from NIT Hamirpur and hands-on 0→1 product leadership experience, I don&rsquo;t just write feature lists or draw mockups. I conduct user discovery to invalidate bad assumptions early, lead cross-functional engineering sprints with clear PRDs, and understand API contracts and data models well enough to make smart technical tradeoffs that protect roadmap velocity.
            </p>
            <div className="about-signature">
              Dhananjay Chaddha <span>↗</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section container" id="experience">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">03 / The Path So Far</p>
            <h2>Learning by<br /><em>shipping.</em></h2>
          </div>
          <p className="section-note">
            A chronological track record of turning ambiguity into working products, validated systems, and measurable outcomes.
          </p>
        </Reveal>
        <div className="timeline">
          <Reveal className="timeline-row">
            <span>2025 — Present</span>
            <div>
              <h3>Product Lead · Merchow &amp; Thenvue</h3>
              <p>Leading 0→1 product roadmaps, PRD authoring, 10+ customer discovery interviews, and sprint execution across a 5-member engineering team for Merchow; architected multimodal AI retrieval and grounded memory RAG for Thenvue.</p>
            </div>
            <b>↗</b>
          </Reveal>
          <Reveal className="timeline-row">
            <span>2023 — 2024</span>
            <div>
              <h3>Product &amp; UX Lead · Escents &amp; Sangharsh</h3>
              <p>Drove 5× revenue growth on Escents (₹10K → ₹50K/mo) by optimizing the purchase funnel; scaled educational mobile utilities to 10k+ organic downloads with 20% lower onboarding drop-off.</p>
            </div>
            <b>↗</b>
          </Reveal>
          <Reveal className="timeline-row">
            <span>2021 — 2025</span>
            <div>
              <h3>B.Tech · National Institute of Technology (NIT) Hamirpur</h3>
              <p>First-principles engineering foundation, quantitative systems thinking, database modeling, and analytical problem-solving applied to digital products.</p>
            </div>
            <b>↗</b>
          </Reveal>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section container">
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow">04 / The Toolkit</p>
            <h2>Thinking across<br /><em>the whole stack.</em></h2>
          </div>
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map(([title, ...skills], index) => (
            <Reveal className="skill-group" key={title}>
              <span className="skill-index">0{index + 1}</span>
              <h3>{title}</h3>
              {skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact Section ("Get in Touch" - Dark Editorial Layout) */}
      <section className="contact-section-dark" id="contact">
        <div className="container contact-shell">
          <div className="contact-grid">

            {/* Left Column: Heading, Description, Cards */}
            <div className="contact-left">
              <span className="contact-eyebrow">GET IN TOUCH</span>
              <h2 className="contact-heading">
                Let&apos;s build something great.
              </h2>
              <p className="contact-description">
                Whether you&apos;re looking to collaborate, explore opportunities, or
                just want to talk product: I&apos;d love to hear from you. Fill out the
                form and I&apos;ll get back to you shortly.
              </p>

              {/* LinkedIn Connect Card */}
              <a
                href="https://www.linkedin.com/in/dhananjaychaddha007/"
                target="_blank"
                rel="noreferrer"
                className="contact-card contact-linkedin-card"
              >
                <div className="linkedin-icon-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
                  </svg>
                </div>
                <div className="contact-card-text">
                  <strong>Connect on LinkedIn</strong>
                  <span>linkedin.com/in/dhananjaychaddha007</span>
                </div>
                <span className="contact-card-arrow" aria-hidden="true">↗</span>
              </a>

              {/* Philosophy Quote Card */}
              <div className="contact-card contact-quote-card">
                <blockquote className="contact-quote-text">
                  &ldquo;Never say Never.&rdquo;
                </blockquote>
                <span className="contact-quote-caption">A PHILOSOPHY I LIVE BY</span>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="contact-right">
              <ContactForm />
            </div>

          </div>

          {/* Sub-footer Bar */}
          <footer className="contact-subfooter">
            <div className="subfooter-info">
              <a className="wordmark" href="#top">
                <span className="mark">D</span> Dhananjay Chaddha
              </a>
              <p>AI Product Manager · 0 → 1 Product Builder · UI/UX Designer</p>
            </div>
            <div className="subfooter-actions">
              <a href="mailto:dhananjayy6397@gmail.com">dhananjayy6397@gmail.com</a>
              <a href="/Dhananjay_Chaddha_Resume.pdf" target="_blank" rel="noreferrer">
                Resume (PDF) ↗
              </a>
              <a href="#top" className="back-top">
                Back to top ↑
              </a>
            </div>
          </footer>
        </div>
      </section>
    </main>
  )
}
