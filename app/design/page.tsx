'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function DesignCaseStudy() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="cs-shell">
      {/* Sticky Case Study Navigation */}
      <header className="cs-header-nav container">
        <div className="cs-nav-left">
          <Link href="/" className="cs-back-link">
            <span>←</span> All work
          </Link>
          <span className="cs-nav-title">Case Study 03 / Selected Design Work</span>
        </div>
        <div className="cs-nav-right">
          <span className="cs-status-tag built">● UI / UX Craft &amp; Systems</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="cs-hero container">
        <div className="cs-kicker-row">
          <span className="cs-kicker">03 — Selected Design Work / Product Foundations</span>
          <span className="cs-kicker">Visual Craft &amp; Interaction Systems</span>
        </div>

        <h1 className="cs-hero-title">
          I don&rsquo;t just manage products. I understand how they <em>should feel and work</em>.
        </h1>

        <p className="cs-hero-subtitle">
          Strong product thinking requires visual judgment, interaction empathy, and system-level design craft. Here is a curated selection of design projects where interface decisions directly solved user problems.
        </p>

        <div className="cs-meta-grid">
          <div className="cs-meta-item">
            <small>Discipline</small>
            <strong>UI / UX &amp; Interaction Design</strong>
            <p>User research, design systems, visual hierarchy, mobile ergonomics</p>
          </div>
          <div className="cs-meta-item">
            <small>Selected Projects</small>
            <strong>Escents &amp; Sangharsh</strong>
            <p>E-commerce conversion flow &amp; 10k+ download mobile utility</p>
          </div>
          <div className="cs-meta-item">
            <small>Core Philosophy</small>
            <strong>Craft as Strategy</strong>
            <p>Design is not decoration; it is reducing friction and communicating value</p>
          </div>
          <div className="cs-meta-item">
            <small>Tooling</small>
            <strong>Figma, Tailwind, React Native</strong>
            <p>From tokenized wireframes to production front-end components</p>
          </div>
        </div>
      </section>

      {/* Main Narrative Body */}
      <div className="cs-body container">
        <article className="cs-prose">
          
          {/* Project 1: Escents Fragrance */}
          <section className="cs-section reveal" id="escents">
            <div className="cs-section-eyebrow">Project 01 / E-Commerce Discovery</div>
            <h2 className="cs-section-heading">
              Escents: Translating an invisible scent into an <em>intuitive digital choice</em>.
            </h2>

            {/* Interactive Mockup for Escents */}
            <div className="cs-mockup-frame">
              <div className="cs-mockup-bar">
                <div className="cs-mockup-dots"><i /><i /><i /></div>
                <span>escents.store / find-my-scent / flow</span>
                <span>Mood-Anchored Discovery</span>
              </div>
              <div className="cs-mockup-content" style={{ background: '#181916' }}>
                <div style={{ padding: '20px', border: '1px solid #2e312a', borderRadius: '4px' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#c9ed87' }}>Step 02 of 03 — Scent Profile</span>
                  <h4 style={{ fontSize: '20px', margin: '10px 0 16px', color: '#f5f4ee', letterSpacing: '-0.03em' }}>When do you want to feel this fragrance?</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                    <div style={{ border: '1px solid #c9ed87', background: '#252920', padding: '14px', borderRadius: '4px' }}>
                      <strong style={{ fontSize: '13px', color: '#f5f4ee', display: 'block' }}>Rainy Evening</strong>
                      <small style={{ color: '#979c8e', fontSize: '11px' }}>Amber, Vetiver, Cedar</small>
                    </div>
                    <div style={{ border: '1px solid #363a31', background: '#1e211b', padding: '14px', borderRadius: '4px' }}>
                      <strong style={{ fontSize: '13px', color: '#f5f4ee', display: 'block' }}>Crisp Morning</strong>
                      <small style={{ color: '#979c8e', fontSize: '11px' }}>Bergamot, Neroli</small>
                    </div>
                    <div style={{ border: '1px solid #363a31', background: '#1e211b', padding: '14px', borderRadius: '4px' }}>
                      <strong style={{ fontSize: '13px', color: '#f5f4ee', display: 'block' }}>Quiet Focus</strong>
                      <small style={{ color: '#979c8e', fontSize: '11px' }}>Sandalwood, Iris</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p>
              <strong>The Problem:</strong> Buying perfume online is notoriously high-friction because customers cannot smell the product through a screen. Traditional fragrance e-commerce sites display generic 50ml glass bottles with poetic names that communicate zero olfactory information, forcing users to guess or abandon the cart.
            </p>
            <p>
              <strong>Design Thinking:</strong> Human olfactory memory is closely linked to mood, time of day, and emotional imagery. Instead of cataloguing products by technical chemical notes, I reframed product discovery around evocative atmospheric contexts.
            </p>
            <p>
              <strong>Key UX Decision:</strong> I architected a dark-themed, sensory visual system and designed an interactive &ldquo;Find My Scent&rdquo; recommendation flow. By asking three intuitive lifestyle questions (occasion, temperature, and desired emotional presence), the flow mapped user answers directly to fragrance accords, removing guesswork.
            </p>
            <p>
              <strong>Product Result:</strong> Demonstrated how empathetic UX and structured guidance can dismantle sensory barriers in e-commerce, replacing browsing hesitation with confident decision-making.
            </p>
          </section>

          {/* Project 2: Sangharsh / Mobile Reading App */}
          <section className="cs-section reveal" id="sangharsh">
            <div className="cs-section-eyebrow">Project 02 / Mobile Utility &amp; Education</div>
            <h2 className="cs-section-heading">
              Sangharsh: Distraction-free reading for <em>10,000+ student aspirants</em>.
            </h2>

            {/* Interactive Mockup for Sangharsh */}
            <div className="cs-mockup-frame">
              <div className="cs-mockup-bar">
                <div className="cs-mockup-dots"><i /><i /><i /></div>
                <span>play.google.com / app / 10k-downloads</span>
                <span>Optimized Reader Interface</span>
              </div>
              <div className="cs-mockup-content" style={{ background: '#20221e' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #373b32', paddingBottom: '12px', marginBottom: '16px' }}>
                  <span style={{ color: '#e8e7e0', fontSize: '12px', fontWeight: 'bold' }}>Child Pedagogy 2024 · Paper 1</span>
                  <span style={{ background: '#353b2f', color: '#c9ed87', fontSize: '10px', padding: '3px 8px', borderRadius: '10px' }}>★ Bookmarked</span>
                </div>
                <div style={{ background: '#171815', padding: '18px', borderRadius: '4px', fontSize: '13px', lineHeight: '1.6', color: '#d0d1c7' }}>
                  <strong style={{ color: '#f0eee6', display: 'block', marginBottom: '6px' }}>Q.14 / Cognitive Development Frameworks</strong>
                  According to developmental psychology, which transitional milestone marks the shift from sensory-motor exploration to operational mental schemas?
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', fontSize: '11px', color: '#888d82' }}>
                  <span>Pg 14 of 120</span>
                  <span>Instant offline cache enabled</span>
                </div>
              </div>
            </div>

            <p>
              <strong>The Problem:</strong> Competitive exam students in non-metro regions often rely on dense, low-quality scanned PDF question papers on entry-level Android smartphones with low RAM and poor connectivity. Standard PDF viewers crash, lag on 100-page documents, and lack distraction-free study utilities.
            </p>
            <p>
              <strong>Design Thinking:</strong> When a user is studying for an exam that determines their career, cognitive fatigue is the enemy. The interface had to get out of the way. Every unnecessary UI button, banner, and color gradient was eliminated.
            </p>
            <p>
              <strong>Key UX Decision:</strong> Redesigned the onboarding flow down to two taps and placed critical reading utilities (one-tap bookmarking, high-contrast dark reading mode, and instant subject search) directly in thumb-accessible zones.
            </p>
            <p>
              <strong>Product Result:</strong> Scaled organically to 10,000+ downloads on the Google Play Store with a 20% reduction in onboarding drop-offs, proving that stripped-down utility beats decorative complexity.
            </p>
          </section>

          {/* Project 3: Design Systems as Product Infrastructure */}
          <section className="cs-section reveal" id="systems">
            <div className="cs-section-eyebrow">Project 03 / Product Infrastructure</div>
            <h2 className="cs-section-heading">
              Design systems as <em>engineering velocity</em>.
            </h2>
            <p className="cs-lead">
              I view design systems not as static Figma sticker sheets, but as code-level product infrastructure that aligns design intent with engineering reality.
            </p>
            <p>
              Across Thenvue, Merchow, and mobile applications, I maintain strict token hygiene:
            </p>
            <div className="cs-decisions-grid">
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Semantic Design Tokens</h3>
                  <span className="cs-decision-number">01 / TOKENS</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Colors and spacing are defined by semantic intent (`--color-background`, `--color-border`, `--color-muted`) rather than arbitrary hex values, allowing clean cross-platform dark/light mode switches across Next.js and React Native without visual regressions.
                </p>
              </div>

              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Tactile Micro-Interactions</h3>
                  <span className="cs-decision-number">02 / INTERACTION</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Micro-animations (subtle card hover translations, live audio waveform feedback, optimistic button state transitions) make software feel alive, responsive, and trustworthy without introducing lag.
                </p>
              </div>
            </div>
          </section>

        </article>

        {/* Footer Next Case Study Link */}
        <div className="cs-next-section reveal">
          <div>
            <span className="cs-kicker">Return to Flagship Case Study</span>
            <h3>
              Thenvue: Building a queryable <em>multimodal memory journal</em>.
            </h3>
          </div>
          <Link href="/thenvue" className="button button-dark magnetic">
            Read Thenvue Case Study <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
