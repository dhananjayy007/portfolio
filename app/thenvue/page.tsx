'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function ThenvueCaseStudy() {
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
          <span className="cs-nav-title">Case Study 01 / Thenvue</span>
        </div>
        <div className="cs-nav-right">
          <span className="cs-status-tag built">● Built &amp; Live in Development</span>
        </div>
      </header>

      {/* Hero Section */}
      <section className="cs-hero container">
        <div className="cs-kicker-row">
          <span className="cs-kicker">01 — Case Study / AI Product Management (0 → 1)</span>
          <span className="cs-kicker">Web &amp; React Native Mobile</span>
        </div>

        <h1 className="cs-hero-title">
          Thenvue: Turning fragmented life logs into a <em>queryable personal memory</em>.
        </h1>

        <p className="cs-hero-subtitle">
          How I designed, architected, and shipped a private multimodal memory journal from scratch — replacing passive camera rolls and abandoned note apps with semantic recall, calendar anchoring, and grounded AI retrieval.
        </p>

        {/* Project Meta Strip */}
        <div className="cs-meta-grid">
          <div className="cs-meta-item">
            <small>My Role</small>
            <strong>AI Product Lead &amp; Architect</strong>
            <p>Product strategy, AI UX, prompt architecture, RAG retrieval design</p>
          </div>
          <div className="cs-meta-item">
            <small>Stage</small>
            <strong>0 → 1 Working Product</strong>
            <p>Next.js 16 Web app + Expo SDK 54 Native iOS/Android app</p>
          </div>
          <div className="cs-meta-item">
            <small>Core Intelligence</small>
            <strong>Google Gemini + pgvector</strong>
            <p>gemini-3.6-flash, gemini-embedding-2 (768-dim)</p>
          </div>
          <div className="cs-meta-item">
            <small>Backend &amp; Storage</small>
            <strong>Supabase (PostgreSQL)</strong>
            <p>Row-Level Security, private signed media buckets</p>
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
              People capture more life than ever, but <em>remember almost none of it</em>.
            </h2>
            <p className="cs-lead">
              Modern smartphones turn everyone into compulsive archivers. We snap 30 photos during a weekend trip, jot down two sentences in a random notes app, and record a 45-second voice memo. Three months later, those moments are effectively dead.
            </p>
            <p>
              When trying to revisit a memory, users face two compounding friction points:
            </p>
            <p>
              <strong>1. Capture friction:</strong> Traditional journaling apps (Day One, Notion) demand structured contemplation. They ask for a blank page, a title, and dedicated writing time. The moment a user feels tired or busy, journaling breaks.
            </p>
            <p>
              <strong>2. Retrieval breakdown:</strong> Cloud photo libraries (Apple Photos, Google Photos) organize by algorithmic face detection and geotags, but completely miss emotional meaning and narrative context. If a user tries to search &ldquo;when we stayed up debating startup ideas in that rainy cafe in Pune,&rdquo; keyword search returns zero results because the word &ldquo;startup&rdquo; or &ldquo;debating&rdquo; was never explicitly typed into a metadata tag.
            </p>
            <div className="cs-callout">
              <strong>The Core Product Dilemma</strong>
              <p>
                People don&rsquo;t think in exact filenames, database timestamps, or folder paths. Human memory is associative, sensory, and narrative. Traditional tools store files; they don&rsquo;t store meaning.
              </p>
            </div>
          </section>

          {/* Section 2: Who Was the User & The Product Insight */}
          <section className="cs-section reveal" id="insight">
            <div className="cs-section-eyebrow">02 / User &amp; Product Insight</div>
            <h2 className="cs-section-heading">
              The user doesn&rsquo;t want to curate an archive; they want to <em>talk to their past self</em>.
            </h2>
            <p>
              I identified two primary user segments when designing Thenvue:
            </p>
            <div className="cs-feature-list">
              <div className="cs-feature-item">
                <div>
                  <h4>The Fragmented Documenter</h4>
                  <span className="tag">Primary Persona</span>
                </div>
                <p>
                  Captures fleeting thoughts in WhatsApp self-chats, voice memos, and screenshots. Desperately wants to keep memories but abandons traditional journaling after day 4 because blank-page anxiety is too high.
                </p>
              </div>
              <div className="cs-feature-item">
                <div>
                  <h4>The Shared-Experience Chronicler</h4>
                  <span className="tag">Secondary Persona</span>
                </div>
                <p>
                  Travels, attends events, and builds projects with close friends or partners. Frustrated that a shared moment lives splintered across three different phones, with no single place honoring each person&rsquo;s perspective.
                </p>
              </div>
            </div>

            <p>
              <strong>The Fundamental Insight:</strong> The barrier to memory retention isn&rsquo;t lack of desire; it is cognitive overhead during capture and rigid syntax during recall. If capture is zero-effort (voice, photo, or quick text) and an intelligence layer automatically extracts the narrative structure, the user gets effortless long-term recall for free.
            </p>
          </section>

          {/* Interactive UI Mockup 1: Memory Capture & Waveform */}
          <div className="cs-mockup-frame reveal">
            <div className="cs-mockup-bar">
              <div className="cs-mockup-dots"><i /><i /><i /></div>
              <span>thenvue.app / capture / multimodal-sheet</span>
              <span>Local calendar locked</span>
            </div>
            <div className="cs-mockup-content">
              <div style={{ background: '#262824', padding: '24px', borderRadius: '4px', border: '1px solid #3c4038' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '11px', color: '#c9ed87', textTransform: 'uppercase', letterSpacing: '0.1em' }}>● Multimodal Capture</span>
                  <span style={{ fontSize: '11px', color: '#888d82' }}>Calendar-anchored: 14 Oct 2025 · 10:45 PM</span>
                </div>
                <p style={{ color: '#ecebe4', fontSize: '16px', lineHeight: '1.6', margin: '0 0 18px', fontFamily: 'Georgia, serif' }}>
                  &ldquo;Dinner with Sahil after 8 months. Sat by the corner table discussing whether we should bet everything on our own ideas. Cold breeze outside, hot chai in hand.&rdquo;
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span style={{ background: '#363a32', color: '#c8cdbf', fontSize: '11px', padding: '4px 10px', borderRadius: '12px' }}>#reunion</span>
                  <span style={{ background: '#363a32', color: '#c8cdbf', fontSize: '11px', padding: '4px 10px', borderRadius: '12px' }}>#startups</span>
                  <span style={{ background: '#363a32', color: '#c8cdbf', fontSize: '11px', padding: '4px 10px', borderRadius: '12px' }}>@Sahil</span>
                  <span style={{ background: '#363a32', color: '#c8cdbf', fontSize: '11px', padding: '4px 10px', borderRadius: '12px' }}>📍 Cafe Peter, Pune</span>
                </div>
                {/* Audio Waveform UI Mockup */}
                <div style={{ background: '#1c1e1a', padding: '12px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid #32362e' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#c9ed87', color: '#1c1d1a', display: 'grid', placeItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>▶</div>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '3px', height: '24px' }}>
                    {[8, 14, 22, 16, 9, 24, 32, 28, 14, 18, 26, 30, 20, 10, 16, 22, 18, 12, 26, 34, 28, 14, 8, 16, 12].map((h, i) => (
                      <span key={i} style={{ width: '3px', height: `${h}px`, background: i < 11 ? '#c9ed87' : '#454940', borderRadius: '2px' }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '11px', color: '#8d9287' }}>01:24 / voice note</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: PM Ownership & System Flow */}
          <section className="cs-section reveal" id="ownership">
            <div className="cs-section-eyebrow">03 / PM Ownership &amp; System Flow</div>
            <h2 className="cs-section-heading">
              Leading the product lifecycle from <em>concept to working software</em>.
            </h2>
            <p>
              Thenvue was conceived, architected, and built from a blank slate into a functional web application and native mobile app (Expo SDK 54). As AI Product Lead, I owned the key strategic and execution pillars:
            </p>
            <div className="cs-feature-list">
              <div className="cs-feature-item">
                <div>
                  <h4>Problem Discovery &amp; Value Proposition</h4>
                  <span className="tag">Product Strategy</span>
                </div>
                <p>
                  Identified the root cause of personal journaling abandonment (blank-page cognitive fatigue). Reframed the product hypothesis from &ldquo;manual reflection writing&rdquo; to &ldquo;zero-friction capture + intelligent associative recall.&rdquo;
                </p>
              </div>
              <div className="cs-feature-item">
                <div>
                  <h4>AI UX &amp; Latency Architecture</h4>
                  <span className="tag">AI Product Thinking</span>
                </div>
                <p>
                  Architected the user experience around AI constraints: eliminated blocking 3-second LLM load spinners by establishing an asynchronous optimistic capture flow. Designed tactile audio waveform capture and calendar date-anchoring.
                </p>
              </div>
              <div className="cs-feature-item">
                <div>
                  <h4>Grounded RAG Architecture &amp; Citations</h4>
                  <span className="tag">Trust &amp; Alignment</span>
                </div>
                <p>
                  Designed the grounded RAG architecture combining 768-dimensional Gemini embeddings (`pgvector`) with metadata filters. Authored defensive system prompts requiring the model to answer strictly using retrieved memory excerpts and attach verified source citations, falling back gracefully when context is insufficient.
                </p>
              </div>
              <div className="cs-feature-item">
                <div>
                  <h4>Data Modeling &amp; Privacy Boundary</h4>
                  <span className="tag">Technical Execution</span>
                </div>
                <p>
                  Specified database schemas on Supabase (PostgreSQL), defined strict Row-Level Security policies for encrypted personal memories, and implemented vector similarity search procedures (`match_memories`).
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Why AI? */}
          <section className="cs-section reveal" id="why-ai">
            <div className="cs-section-eyebrow">04 / The AI Layer</div>
            <h2 className="cs-section-heading">
              Why AI? What breaks without an <em>intelligence layer</em>.
            </h2>
            <p className="cs-lead">
              In most products, AI is slapped on as a decorative chatbot. In Thenvue, AI is the foundational retrieval bridge without which the product cannot fulfill its core promise.
            </p>
            <p>
              Here is the exact comparison of why simple keyword search and manual tags fail, and what AI actually solves:
            </p>

            <table className="cs-comparison-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  <th>Without AI (Traditional SQL / Tags)</th>
                  <th>With Thenvue AI Architecture</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Capture Effort</strong></td>
                  <td>User must manually enter tags, choose categories, assign moods, and type people names. High cognitive load leading to abandonment.</td>
                  <td>User speaks or writes freely. Gemini asynchronously extracts mood, topics, people, location, and a 1-sentence synopsis in the background.</td>
                </tr>
                <tr>
                  <td><strong>Conceptual Recall</strong></td>
                  <td>Query: <em>&ldquo;When was I stressed about career?&rdquo;</em> fails completely unless the exact word &ldquo;stressed&rdquo; was written in the text.</td>
                  <td>Gemini 768-dim embeddings map semantic proximity. Queries like &ldquo;feeling lost&rdquo; or &ldquo;uncertainty about next steps&rdquo; surface relevant moments with cosine similarity.</td>
                </tr>
                <tr>
                  <td><strong>Voice Note Search</strong></td>
                  <td>Audio notes are black boxes of binary data. The user has to replay entire 3-minute recordings to know what was said.</td>
                  <td>Multimodal Gemini Flash transcribes audio automatically and generates searchable text representations within seconds.</td>
                </tr>
                <tr>
                  <td><strong>Synthesized Answers</strong></td>
                  <td>Returns a flat list of 20 unranked files with no relationship between them.</td>
                  <td>&ldquo;Ask Your Life&rdquo; reads retrieved memories, synthesizes a thoughtful chronological answer, and provides verified citation chips.</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Interactive UI Mockup 2: Ask Your Life / Personal AI */}
          <div className="cs-mockup-frame reveal">
            <div className="cs-mockup-bar">
              <div className="cs-mockup-dots"><i /><i /><i /></div>
              <span>thenvue.app / ask-your-life / grounded-rag</span>
              <span>Grounded RAG · Source Citation Prompt</span>
            </div>
            <div className="cs-mockup-content">
              <div style={{ background: '#242722', padding: '22px', borderRadius: '4px', border: '1px solid #3a3f35' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '18px' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#44483e', color: '#c9ed87', display: 'grid', placeItems: 'center', fontSize: '11px', flexShrink: 0 }}>You</div>
                  <div style={{ background: '#30342b', padding: '10px 14px', borderRadius: '4px', fontSize: '14px', color: '#f0eee8' }}>
                    How has my perspective on taking career risks changed over the past year?
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: '#c9ed87', color: '#1c1d1a', display: 'grid', placeItems: 'center', fontSize: '11px', fontWeight: 'bold', flexShrink: 0 }}>TV</div>
                  <div style={{ background: '#1c1e1a', padding: '14px 18px', borderRadius: '4px', fontSize: '14px', color: '#dddcd4', lineHeight: '1.6', border: '1px solid #2f342a' }}>
                    <p style={{ margin: '0 0 12px' }}>
                      In early 2025, your notes focused on external validation and the anxiety of leaving structured paths. However, by autumn, following your discussions with Sahil in Pune and your notes after completing the Merchow MVP, you began describing risk not as reckless gambling, but as the only way to build leverage and real product intuition.
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #2b3026', paddingTop: '12px' }}>
                      <span style={{ fontSize: '10px', color: '#8f9488', textTransform: 'uppercase', letterSpacing: '0.08em', width: '100%' }}>Verified Source Citations:</span>
                      <span style={{ background: '#2b3026', color: '#c9ed87', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        📄 14 Oct 2025 · Dinner with Sahil
                      </span>
                      <span style={{ background: '#2b3026', color: '#c9ed87', fontSize: '11px', padding: '3px 8px', borderRadius: '4px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        📄 02 Jan 2025 · First week in Mumbai
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Key Product Decisions */}
          <section className="cs-section reveal" id="decisions">
            <div className="cs-section-eyebrow">05 / Product Reasoning</div>
            <h2 className="cs-section-heading">
              Four product decisions that shaped the <em>entire architecture</em>.
            </h2>
            <div className="cs-decisions-grid">
              
              {/* Decision 1 */}
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">1. Calendar-Anchored Local Dates vs. UTC Timestamps</h3>
                  <span className="cs-decision-number">DECISION 01</span>
                </div>
                <dl className="cs-decision-body">
                  <dt>The Problem</dt>
                  <dd>Standard software engineering saves every timestamp as ISO UTC. But if a user records a late-night memory in Delhi at 11:30 PM on June 5th and then travels to London or New York, viewing the app in UTC converts the date to June 6th or shifts it backwards. Human memories do not belong to UTC; they belong to the calendar day on which they were felt.</dd>
                  <dt>My Decision</dt>
                  <dd>Decoupled system metadata from memory chronology. Added dedicated columns `occurred_on` (ISO date `YYYY-MM-DD`) and `occurred_time` (local clock time `HH:MM:SS`). Memories stay permanently pinned to the lived day, regardless of client timezone shifts.</dd>
                </dl>
              </div>

              {/* Decision 2 */}
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">2. Asynchronous Background Enrichment vs. Blocking Modal</h3>
                  <span className="cs-decision-number">DECISION 02</span>
                </div>
                <dl className="cs-decision-body">
                  <dt>The Problem</dt>
                  <dd>Calling Gemini to extract tags and compute 768-dim embeddings takes between 1.2 to 2.8 seconds. Making the user stare at a spinner before saving creates immense friction and breaks the quick-capture mental model.</dd>
                  <dt>My Decision</dt>
                  <dd>Optimistic UI updates with asynchronous server-side worker enrichment. When a user taps &ldquo;Save Memory,&rdquo; the record is inserted instantly with status `enriching`. The user can immediately close the app or write another memory. In the background, Next.js Server Actions trigger Gemini Flash, enrich the record with `#topics`, `@people`, mood, and embeddings, and update the UI in real time.</dd>
                </dl>
              </div>

              {/* Decision 3 */}
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">3. Hybrid Search vs. Pure Vector Search</h3>
                  <span className="cs-decision-number">DECISION 03</span>
                </div>
                <dl className="cs-decision-body">
                  <dt>The Problem</dt>
                  <dd>Pure vector search (`match_memories` cosine distance) is amazing for fuzzy emotional queries (&ldquo;days when I was feeling tired&rdquo;), but notoriously poor at exact entity filtering (e.g. &ldquo;find moments with @Sahil at Cafe Peter in October&rdquo;). Vector models often fail exact name or date constraints.</dd>
                  <dt>My Decision</dt>
                  <dd>Implemented a two-tier hybrid search: users can combine structured facets (date ranges, people pills, mood tags, places) with a natural language semantic query. The SQL query runs vector cosine similarity with metadata filters, falling back to ILIKE substring checks if similarity confidence drops below threshold.</dd>
                </dl>
              </div>

              {/* Decision 4 */}
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">4. Multiple Perspectives vs. Shared Editable Docs</h3>
                  <span className="cs-decision-number">DECISION 04</span>
                </div>
                <dl className="cs-decision-body">
                  <dt>The Problem</dt>
                  <dd>When people experience an event together (a road trip, a wedding, a project launch), existing collaborative apps (Google Docs, Apple Shared Albums) treat the note as a shared single text file where edits overwrite each other.</dd>
                  <dt>My Decision</dt>
                  <dd>Created a &ldquo;Multiple Perspectives&rdquo; architecture. The original author remains the immutable owner of their memory. Invited participants can add their own perspective note, their own voice recordings, and their own photos to the moment. Each person&rsquo;s voice is preserved without compromising personal truth.</dd>
                </dl>
              </div>

            </div>
          </section>

          {/* Section 6: Challenges & Technical/Product Tradeoffs */}
          <section className="cs-section reveal" id="tradeoffs">
            <div className="cs-section-eyebrow">06 / Challenges &amp; Tradeoffs</div>
            <h2 className="cs-section-heading">
              What was hard: <em>Engineering limits vs. user psychology</em>.
            </h2>
            <p>
              Building a private, AI-native memory journal forced several difficult tradeoffs:
            </p>
            <p>
              <strong>1. Privacy vs. Cloud AI Processing:</strong> Because personal journals contain deeply sensitive reflections, user trust is everything. I designed the architecture so all media is stored in private Supabase buckets with strict Row-Level Security (RLS) policies and short-lived signed URLs. Raw data is never broadcast to open public channels, and prompts are explicitly scoped to the authenticated user&rsquo;s records.
            </p>
            <p>
              <strong>2. Mobile Audio Formats (WebM vs. M4A):</strong> The web application records audio as WebM via the browser MediaRecorder API, while native iOS/Android Expo records audio in AAC/M4A via `expo-av`. Handling audio transcription seamlessly across both required adapting Gemini&rsquo;s multimodal payload parser to dynamically accept MIME types without re-encoding on a heavy server.
            </p>
            <p>
              <strong>3. Historical Rediscovery (EXIF vs. Storage Quota):</strong> Users wanted to import 500 photos from their past. However, uploading and embedding 500 images simultaneously crashes browser memory and exhausts API quotas. I built an atomic client-side pipeline: parsing EXIF headers (`DateTimeOriginal`, GPS coordinates) in the browser before upload, clustering them by day, and imposing an atomic batch quota of 50 photos per import session.
            </p>
          </section>

          {/* Section 7: Feature Inventory Breakdown (Built vs Planned) */}
          <section className="cs-section reveal" id="inventory">
            <div className="cs-section-eyebrow">07 / Implementation Inventory</div>
            <h2 className="cs-section-heading">
              Engineering status: <em>Built, Tested, and Planned</em>.
            </h2>
            <p>
              In accordance with honest product management, here is the transparent breakdown of what is built, tested in beta, and queued for the roadmap:
            </p>

            <div className="cs-feature-list">
              <div className="cs-feature-item">
                <div>
                  <h4>Multimodal Capture</h4>
                  <span className="cs-status-tag built">Built &amp; Tested</span>
                </div>
                <p>
                  12,000-character rich text, camera capture, multi-photo gallery attachments, voice notes with live duration timer and waveform playback on both Web and Native Expo.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>AI Enrichment &amp; Vector Embeddings</h4>
                  <span className="cs-status-tag built">Built &amp; Tested</span>
                </div>
                <p>
                  Asynchronous Gemini 3.6 Flash auto-tagging (titles, moods, summaries, `@people`, `#topics`) and 768-dim `gemini-embedding-2` vector storage via pgvector.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>Ask Your Life &amp; Hybrid Search</h4>
                  <span className="cs-status-tag built">Built &amp; Tested</span>
                </div>
                <p>
                  Natural language grounded Q&amp;A assistant answering strictly from retrieved memory context with clickable citation chips; semantic cosine distance RPC on Supabase.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>Shared Memories &amp; Perspectives</h4>
                  <span className="cs-status-tag built">Built &amp; Tested</span>
                </div>
                <p>
                  Invite participants via username, multi-perspective collaborative threads, private signed asset sharing.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>Rediscover (Past Photo Pipeline)</h4>
                  <span className="cs-status-tag built">Built &amp; Tested</span>
                </div>
                <p>
                  Batch photo import extracting EXIF metadata (`DateTimeOriginal`, GPS), clustering moments into draft memories.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>On-Device Local AI Embedding</h4>
                  <span className="cs-status-tag planned">Planned / Roadmap</span>
                </div>
                <p>
                  Experimenting with lightweight on-device embedding models (e.g. MediaPipe / Gemma on mobile) to eliminate server round-trips for basic text indexing.
                </p>
              </div>

              <div className="cs-feature-item">
                <div>
                  <h4>Automated Temporal Anniversaries</h4>
                  <span className="cs-status-tag planned">Planned / Roadmap</span>
                </div>
                <p>
                  Push notifications reminding users: &ldquo;1 year ago today, you were in Goa writing about this.&rdquo; (Scheduled background workers).
                </p>
              </div>
            </div>
          </section>

          {/* Section 8: AI Product Guardrails & Technical Decisions */}
          <section className="cs-section reveal" id="metrics">
            <div className="cs-section-eyebrow">08 / AI Guardrails &amp; Product Decisions</div>
            <h2 className="cs-section-heading">
              Designing for user trust: <em>Latency, retrieval tuning, and grounding</em>.
            </h2>
            <div className="cs-decisions-grid">
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Optimistic Ingestion vs. Model Latency</h3>
                  <span className="cs-decision-number">DECISION 01</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Decoupled capture from inference. Users save voice memos and notes instantly with optimistic UI states, while Gemini Flash auto-tagging and 768-dim embedding generation run asynchronously in background queues.
                </p>
              </div>
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Hybrid Retrieval &amp; Threshold Tuning</h3>
                  <span className="cs-decision-number">DECISION 02</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Combined a calibrated 0.72 cosine similarity cutoff on 768-dim embeddings with SQL metadata filters (date ranges, people pills), balancing associative recall for conceptual queries against noisy matches.
                </p>
              </div>
              <div className="cs-decision-card">
                <div className="cs-decision-header">
                  <h3 className="cs-decision-title">Grounded Synthesis &amp; Source Citations</h3>
                  <span className="cs-decision-number">DECISION 03</span>
                </div>
                <p style={{ margin: 0, fontSize: '14px', color: '#40423d', lineHeight: '1.6' }}>
                  Structured the &ldquo;Ask Your Life&rdquo; synthesis prompt to answer strictly using retrieved memory context, attaching verifiable source citation chips so users can trace every assertion back to the original memory record.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: What I Learned */}
          <section className="cs-section reveal" id="learnings">
            <div className="cs-section-eyebrow">09 / Reflection</div>
            <h2 className="cs-section-heading">
              What building Thenvue taught me about <em>AI product craft</em>.
            </h2>
            <div className="cs-callout accent">
              <strong>1. AI should reduce friction, not demand conversation</strong>
              <p>
                The biggest mistake early AI apps make is forcing the user to converse with a chat interface for every action. For memory capture, typing to a chatbot is unnatural. Capturing should be silent and immediate. AI belongs in the background structuring the data, and in the foreground only when the user explicitly asks a question.
              </p>
            </div>
            <div className="cs-callout">
              <strong>2. Latency is the silent killer of user adoption</strong>
              <p>
                Waiting 3 seconds for an LLM to generate tags feels like an eternity. Shifting intelligence from synchronous blocking flows to background optimistic tasks transformed Thenvue from a laggy tech demo into a fluid, tactile daily habit.
              </p>
            </div>
            <div className="cs-callout">
              <strong>3. Grounding matters more than model creativity</strong>
              <p>
                In consumer life-logging, hallucinated memories break user trust immediately. If the AI invents an event that never happened, the user deletes the app. Prompt design had to be defensively structured around strict citation grounding, bounded context, and transparent fallback behavior when information is missing.
              </p>
            </div>
          </section>

        </article>

        {/* Footer Next Case Study Link */}
        <div className="cs-next-section reveal">
          <div>
            <span className="cs-kicker">Up Next — Case Study 02</span>
            <h3>
              Merchow: Launching a 0→1 <em>creator commerce platform</em>.
            </h3>
          </div>
          <Link href="/merchow" className="button button-dark magnetic">
            Read Merchow Case Study <span>↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
