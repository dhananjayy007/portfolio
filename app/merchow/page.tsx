'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function MerchowCaseStudy() {
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
          <span className="cs-nav-title">Case Study 02 / Merchow</span>
        </div>
        <div className="cs-nav-right">
          <span className="cs-status-tag tested">● 0 → 1 MVP / Tested in Beta</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="cs-hero container">
        <div className="cs-kicker-row">
          <span className="cs-kicker">02 — Case Study / 0 → 1 Product Leadership</span>
          <span className="cs-kicker">Founder-led Venture</span>
        </div>

        <h1 className="cs-hero-title">
          Merchow: Zero-inventory commerce for <em>creators and communities</em>.
        </h1>

        <p className="cs-hero-subtitle">
          How I led product from ideation to MVP launch for a creator merchandise platform — validating customer pain points across 10+ creator interviews (+35% engagement lift), automating print-on-demand fulfillment via the Qikink API, and steering bi-weekly Agile sprints across a 5-member engineering team.
        </p>

        {/* Project Meta Strip */}
        <div className="cs-meta-grid">
          <div className="cs-meta-item">
            <small>My Role</small>
            <strong>Product Lead (Founder-led)</strong>
            <p>0 → 1 roadmap, user discovery, PRDs, UX wireframes, sprint management</p>
          </div>
          <div className="cs-meta-item">
            <small>Team &amp; Methodology</small>
            <strong>5-Member Cross-Functional</strong>
            <p>Agile bi-weekly sprints, backlog grooming, PRDs &amp; acceptance criteria</p>
          </div>
          <div className="cs-meta-item">
            <small>Supply Chain &amp; API</small>
            <strong>Qikink Print-on-Demand</strong>
            <p>100% automated order routing, inventory sync &amp; webhook tracking</p>
          </div>
          <div className="cs-meta-item">
            <small>Validation Stage</small>
            <strong>Beta Cohort (20+ Creators)</strong>
            <p>10+ discovery interviews, +35% engagement lift, 0 manual routing errors</p>
          </div>
        </div>
      </section>

      {/* Main Narrative Body */}
      <div className="cs-body container">
        <article className="cs-prose">
          
          {/* Section 1: The Problem */}
          <section className="cs-section reveal" id="problem">
            <div className="cs-section-eyebrow">01 / The Problem</div>
            <h2 className="cs-section-heading">
              Why 90% of creators never launch merchandise: <em>The inventory trap</em>.
            </h2>
            <p className="cs-lead">
              Every digital creator and community leader reaches a moment where their audience asks: &ldquo;Where can we buy your merch?&rdquo; But almost none of them follow through.
            </p>
            <p>
              When I investigated why creator merchandise fails to launch, three structural barriers emerged:
            </p>
            <p>
              <strong>1. Capital and Dead-Stock Risk:</strong> Traditional screen printers demand minimum order quantities (MOQs) of 50 to 100 units per design. A creator must risk ₹30,000 to ₹70,000 upfront with zero guarantee of sales. Unsold hoodies end up stacked in their bedroom.
            </p>
            <p>
              <strong>2. Operational Nightmare:</strong> Managing orders on Instagram DMs or Google Forms requires printing shipping labels, taping boxes, dealing with courier pickups, and answering customer tracking emails manually. Creators want to create, not run a postal depot.
            </p>
            <p>
              <strong>3. The Enterprise Tooling Mismatch:</strong> Platforms like Shopify are built for seasoned retail operators. Setting up payment gateways, DNS records, inventory variants, and shipping plugins takes days of technical configuration.
            </p>
            <div className="cs-callout">
              <strong>The Opportunity</strong>
              <p>
                A 10-minute setup where a creator uploads a graphic, chooses curated garment blanks, sets their profit margin, and shares a link. Every order is printed, packaged, and shipped on-demand with zero upfront capital.
              </p>
            </div>
          </section>

          {/* Section 2: Origin & Discovery */}
          <section className="cs-section reveal" id="discovery">
            <div className="cs-section-eyebrow">02 / Origin &amp; Discovery</div>
            <h2 className="cs-section-heading">
              10 creator interviews that disproved our <em>initial assumptions</em>.
            </h2>
            <p>
              When we first started ideating Merchow, we assumed creators wanted a sprawling catalog of 40+ promotional products: mugs, phone cases, stickers, mousepads, and water bottles.
            </p>
            <p>
              I conducted 10+ user discovery interviews with emerging creators, college club coordinators, and independent artists to test our core hypotheses. Here is what we learned:
            </p>

            <div className="cs-decisions-grid">
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Finding 01: Catalog bloat destroys brand credibility</h3>
                  <span className="cs-decision-number">INSIGHT</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Creators felt that selling low-cost novelty mugs or mousepads cheapened their brand. They wanted high-quality apparel that their followers would genuinely wear in public: heavy 240+ GSM oversized t-shirts, structured hoodies, and premium canvas tote bags.
                </p>
              </div>

              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Finding 02: Storefront identity is non-negotiable</h3>
                  <span className="cs-decision-number">INSIGHT</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Creators refused generic marketplace links (e.g. `merchow.com/product/12398`). They wanted their own branded domain or personalized URL (`merchow.com/@creator`), custom banner artwork, and brand colors so fans felt they were buying directly from the creator.
                </p>
              </div>

              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Finding 03: Fear of negative fulfillment feedback</h3>
                  <span className="cs-decision-number">INSIGHT</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Creators were terrified of fans complaining publicly on their social comments about delayed deliveries or damaged goods. White-label packaging and automated tracking emails were essential table-stakes.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive UI Mockup 1: Creator Storefront & Product Customizer */}
          <div className="cs-mockup-frame reveal">
            <div className="cs-mockup-bar">
              <div className="cs-mockup-dots"><i /><i /><i /></div>
              <span>merchow.com / @studios / storefront-preview</span>
              <span>Live Creator Preview</span>
            </div>
            <div className="cs-mockup-content">
              <div style={{ background: '#ede8dd', color: '#2b2923', padding: '24px', borderRadius: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #d4ccbe', paddingBottom: '14px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#242622', color: '#f4f3ef', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>M</div>
                    <strong>merchow / @collective</strong>
                  </div>
                  <span style={{ fontSize: '11px', color: '#736d5f' }}>Curated drop · Zero inventory</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ background: '#f5f2eb', padding: '16px', borderRadius: '4px', border: '1px solid #dfd8cb' }}>
                    <div style={{ height: '140px', background: '#30342e', borderRadius: '2px', display: 'grid', placeItems: 'center', color: '#c9ed87', fontSize: '12px' }}>
                      [Oversized Heavy Tee Mockup]
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <strong style={{ fontSize: '13px', display: 'block' }}>&ldquo;Night Shift&rdquo; 260 GSM Tee</strong>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px' }}>
                        <span>Retail: ₹1,199</span>
                        <span style={{ color: '#2b6616', fontWeight: 'bold' }}>Profit: ₹450/unit</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ background: '#f5f2eb', padding: '16px', borderRadius: '4px', border: '1px solid #dfd8cb' }}>
                    <div style={{ height: '140px', background: '#252523', borderRadius: '2px', display: 'grid', placeItems: 'center', color: '#e8e0d0', fontSize: '12px' }}>
                      [Drop-Shoulder Hoodie Mockup]
                    </div>
                    <div style={{ marginTop: '12px' }}>
                      <strong style={{ fontSize: '13px', display: 'block' }}>&ldquo;Origin&rdquo; 380 GSM Hoodie</strong>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '12px' }}>
                        <span>Retail: ₹2,499</span>
                        <span style={{ color: '#2b6616', fontWeight: 'bold' }}>Profit: ₹850/unit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: MVP Scope & Product Decisions */}
          <section className="cs-section reveal" id="mvp">
            <div className="cs-section-eyebrow">03 / Prioritization &amp; Scope</div>
            <h2 className="cs-section-heading">
              What we intentionally <em>chose NOT to build yet</em>.
            </h2>
            <p className="cs-lead">
              As Product Lead, my most important job was protecting the team from scope creep. In a 0→1 startup, building too much is lethal.
            </p>
            <p>
              I enforced strict discipline around our MVP boundaries:
            </p>

            <table className="cs-comparison-table">
              <thead>
                <tr>
                  <th>Feature Candidate</th>
                  <th>Decision</th>
                  <th>Product Rationale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>In-browser Design Canvas</strong></td>
                  <td><span className="cs-status-tag planned">Deferred</span></td>
                  <td>Building a custom Canva-like web editor with text warping would take 3 months of dev. Creators already had Photoshop or Canva files. We accepted high-res PNG uploads instead.</td>
                </tr>
                <tr>
                  <td><strong>Public Marketplace Discovery</strong></td>
                  <td><span className="cs-status-tag planned">Deferred</span></td>
                  <td>Creators don&rsquo;t rely on SEO search bars; they drive 95% of traffic directly from their Instagram bio or YouTube description. Building a search algorithm on day 1 was wasted effort.</td>
                </tr>
                <tr>
                  <td><strong>Own Warehousing &amp; Inventory</strong></td>
                  <td><span className="cs-status-tag planned">Rejected</span></td>
                  <td>Zero upfront capital was our core value prop. We integrated with the Qikink API for print-on-demand dropshipping to validate demand before ever touching inventory.</td>
                </tr>
                <tr>
                  <td><strong>Automated Qikink Order Routing</strong></td>
                  <td><span className="cs-status-tag built">Built for MVP</span></td>
                  <td>Critical path: The moment a fan pays, the order payload must route into Qikink&rsquo;s printing queue with zero human touch.</td>
                </tr>
                <tr>
                  <td><strong>Storefront Personalization Module</strong></td>
                  <td><span className="cs-status-tag built">Built for MVP</span></td>
                  <td>Critical path: Addressed Finding 02 from user discovery. Allowed creators to brand their storefront with custom banners, bios, and highlight colors.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Section 4: Engineering Leadership & The Qikink Integration */}
          <section className="cs-section reveal" id="engineering">
            <div className="cs-section-eyebrow">04 / Execution &amp; Team Leadership</div>
            <h2 className="cs-section-heading">
              Leading a 5-member engineering team through <em>API contracts</em>.
            </h2>
            <p>
              I led a cross-functional team of 5 engineers. To maintain momentum, we ran two-week Agile sprints with explicit PRDs, acceptance criteria, and Figma wireframes before code was written.
            </p>
            <p>
              <strong>The Fulfillment Pipeline:</strong> I designed the end-to-end order orchestration engine bridging consumer checkout and Qikink&rsquo;s manufacturing API:
            </p>

            {/* Visual Flow Diagram */}
            <div className="cs-callout accent">
              <strong>Order Routing Lifecycle</strong>
              <p style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: '1.8' }}>
                Fan Purchases on Storefront<br />
                &nbsp;&nbsp;↳ Stripe/Razorpay Webhook confirms payment<br />
                &nbsp;&nbsp;&nbsp;&nbsp;↳ Backend compiles print assets + shipping coordinates<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ POST /api/qikink/order dispatched (100% automated)<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Webhook Listener tracks states: `Printing` → `Shipped`<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Real-time SMS &amp; Email tracking dispatched to fan<br />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↳ Net profit automatically credited to Creator Ledger
              </p>
            </div>

            <p>
              <strong>The Technical Challenge:</strong> Print coordinate precision. An artwork positioned slightly off-center on a digital mockup looks horrific when printed on physical cotton. I worked closely with engineering to map CSS canvas percentage coordinates directly into Qikink&rsquo;s millimeters-based print-area specification, guaranteeing that what the creator previewed on screen matched the physical shirt.
            </p>
          </section>

          {/* Section 5: The Beta Feedback Loop */}
          <section className="cs-section reveal" id="beta">
            <div className="cs-section-eyebrow">05 / Validation &amp; Iteration</div>
            <h2 className="cs-section-heading">
              Iterating with 20+ beta users: <em>What broke and how we fixed it</em>.
            </h2>
            <p>
              We rolled out an invite-only beta to 20+ creator candidates. This loop surfaced critical friction points that we immediately resolved:
            </p>

            <div className="cs-decisions-grid">
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Friction: Margin confusion on checkout pricing</h3>
                  <span className="cs-decision-number">ITERATION 01</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Creators didn&rsquo;t understand base product cost versus fulfillment fees versus taxes. We redesigned the pricing step into a real-time &ldquo;Earnings Slider&rdquo;: dragging retail price dynamically calculated base garment cost, printing fee, platform commission, and exact net profit per shirt in real time.
                </p>
              </div>

              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Friction: Artwork resolution rejections</h3>
                  <span className="cs-decision-number">ITERATION 02</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Beta creators uploaded low-resolution JPEGs (72 DPI), which resulted in order holds at the printing facility. We introduced client-side pre-flight image checks that analyzed DPI and aspect ratio before allowing submission, reducing order rejections to near zero.
                </p>
              </div>

              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Outcome: +35% Creator Engagement Lift</h3>
                  <span className="cs-decision-number">OUTCOME 03</span>
                </div>
                <p style={{ margin: '0', fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Integrating the store personalization module and real-time earnings slider reduced setup friction, driving a 35% increase in user session engagement and repeat storefront edits across the 20+ beta cohort.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Key Learnings & Reflection */}
          <section className="cs-section reveal" id="learnings">
            <div className="cs-section-eyebrow">06 / Reflection</div>
            <h2 className="cs-section-heading">
              What 0→1 startup building taught me about <em>product management</em>.
            </h2>
            <div className="cs-callout accent">
              <strong>1. The real product includes physical operations</strong>
              <p>
                In pure software, a bug is a line of code you fix and push. In physical commerce, a bug is a package sent to the wrong city or a hoodie printed in the wrong color. I learned to treat partner APIs, courier SLAs, and physical quality checks as core parts of the user experience.
              </p>
            </div>
            <div className="cs-callout">
              <strong>2. Simplicity is a competitive moat</strong>
              <p>
                We were competing against multi-billion-dollar enterprise platforms. But creators loved Merchow precisely because we didn&rsquo;t have 1,000 settings. By stripping the product down to what mattered—upload, preview, set margin, share—we delivered a faster time-to-value than any complex suite.
              </p>
            </div>
            <div className="cs-callout">
              <strong>3. Roadmap discipline is about emotional control</strong>
              <p>
                Every day brings excitement for new features: &ldquo;What if we add affiliate codes? What if we add community chat?&rdquo; As Product Lead, saying no to 90% of good ideas is the only way the critical 10% actually ships on time.
              </p>
            </div>
          </section>

        </article>

        {/* Footer Next Case Study Link */}
        <div className="cs-next-section reveal">
          <div>
            <span className="cs-kicker">Up Next — Case Study 03</span>
            <h3>
              Selected Design Work: <em>Craft, UX psychology &amp; interaction</em>.
            </h3>
          </div>
          <Link href="/design" className="button button-dark magnetic">
            Read Design Case Study <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
