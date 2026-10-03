'use client'

import React, { useState } from 'react'

interface Hotspot {
  id: string
  x: number // percentage
  y: number // percentage
  title: string
  spec: string
  material: string
}

const BEDROOM_HOTSPOTS: Hotspot[] = [
  {
    id: 'optics',
    x: 48,
    y: 12,
    title: 'Warm 2700K Architectural Optics',
    spec: 'Flos architectural recessed ceiling spots with honeycomb anti-glare louvers (CRI 98+).',
    material: 'Anodized Matte Black Aluminum',
  },
  {
    id: 'bedding',
    x: 54,
    y: 68,
    title: 'Custom Diamond-Tufted Headboard',
    spec: 'Bespoke high-density acoustic foam wrapped in imported Belgian linen.',
    material: 'Charcoal Velvet & Brushed Brass Plinth',
  },
  {
    id: 'panel',
    x: 74,
    y: 38,
    title: 'Smoked Oak Wall Panel & Inset LED',
    spec: 'Micro-cement thermal finish paired with floor-to-ceiling slatted acoustic wood baffle.',
    material: 'Natural Smoked Oak & Polished Concrete',
  },
]

export default function RealEstateShowcase() {
  const [lang, setLang] = useState<'RU' | 'EN'>('EN')
  const [scene, setScene] = useState<'interior' | 'luxury'>('interior')
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(BEDROOM_HOTSPOTS[0])
  const [applicantName, setApplicantName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleHotspotClick = (h: Hotspot, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveHotspot(activeHotspot?.id === h.id ? null : h)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!applicantName.trim()) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setApplicantName('')
    }, 3000)
  }

  return (
    <div
      className={`realestate-root scene-${scene}`}
      onClick={() => setActiveHotspot(null)}
    >
      {/* Background Architectural Layer */}
      <div className="realestate-backdrop-wrapper">
        <img
          src={
            scene === 'interior'
              ? '/images/designs/luxury_master_bedroom.jpg'
              : '/images/designs/luxury_dining_concrete.jpg'
          }
          alt="Luxury Architecture"
          className="realestate-photo"
        />
        <div className="realestate-overlay-gradient" />
      </div>

      {/* Top Navigation */}
      <header className="realestate-top-bar">
        <div className="realestate-identity">
          <span className="identity-glyph">▲</span>
          <span className="identity-text">
            {lang === 'EN' ? 'DESIGN INTERIOR ARCHITECTURE' : 'АРХИТЕКТУРА И ДИЗАЙН'}
          </span>
        </div>

        {/* Scene Toggle & Language Switcher */}
        <div className="realestate-nav-controls">
          <button
            type="button"
            className="scene-toggle-pill"
            onClick={(e) => {
              e.stopPropagation()
              setScene(scene === 'interior' ? 'luxury' : 'interior')
            }}
          >
            {scene === 'interior' ? '✦ Switch to Living Space' : '✦ Switch to Master Suite'}
          </button>

          <div className="lang-toggle-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={lang === 'RU' ? 'is-active' : ''}
              onClick={() => setLang('RU')}
            >
              RU
            </button>
            <span className="lang-slash">/</span>
            <button
              type="button"
              className={lang === 'EN' ? 'is-active' : ''}
              onClick={() => setLang('EN')}
            >
              EN
            </button>
          </div>

          <span className="realestate-menu-trigger">☰</span>
        </div>
      </header>

      {/* Left Vertical Dock (Clock, Telegram, Instagram) from Figma */}
      <aside className="realestate-vertical-dock" onClick={(e) => e.stopPropagation()}>
        <span className="dock-icon" title="Studio Hours: 10:00 - 20:00">⏱</span>
        <span className="dock-icon" title="Telegram Concierge">✈</span>
        <span className="dock-icon" title="Instagram Portfolio">📷</span>
      </aside>

      {/* SCENE 1: DESIGN INTERIOR (Figma Frame 1) */}
      {scene === 'interior' ? (
        <div className="realestate-interior-layout">
          {/* Frosted Dark Glassmorphic Left Panel */}
          <div
            className="realestate-glass-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="interior-subtag">
              {lang === 'EN' ? 'EXCLUSIVE RESIDENTIAL' : 'ЭКСКЛЮЗИВНЫЕ ПРОЕКТЫ'}
            </span>
            <h1 className="interior-heading">
              {lang === 'EN' ? 'DESIGN INTERIOR' : 'ДИЗАЙН ИНТЕРЬЕРА'}
            </h1>
            <p className="interior-desc">
              {lang === 'EN'
                ? 'Professional interior designer services. Only the best specialists, individual approach, quality work. Beautiful only with us.'
                : 'Услуги профессионального дизайнера интерьера. Только лучшие специалисты, индивидуальный подход, качество работы. Красиво только с нами.'}
            </p>

            <div className="interior-free-visit">
              <span className="free-dot" />
              <span>{lang === 'EN' ? 'Free designer visit.' : 'Бесплатный выезд дизайнера.'}</span>
            </div>

            {/* Application Input Form from Figma */}
            <form onSubmit={handleSubmit} className="interior-app-form">
              <div className="app-input-wrap">
                <input
                  type="text"
                  placeholder={
                    lang === 'EN'
                      ? 'Submit your application / Name'
                      : 'Оставить заявку / Ваше имя'
                  }
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  disabled={submitted}
                />
                <button type="submit" className="app-submit-btn">
                  {submitted ? '✓' : '→'}
                </button>
              </div>
              {submitted && (
                <span className="app-success-badge">
                  {lang === 'EN' ? 'Application received! Concierge will call.' : 'Заявка принята! Консьерж перезвонит.'}
                </span>
              )}
            </form>

            <div className="interior-bottom-contact">
              <small>HOTLINE</small>
              <b>+7 (999) 000-00-00</b>
            </div>
          </div>

          {/* Hotspot Pins Layer on Master Bedroom */}
          <div className="realestate-pins-layer">
            {BEDROOM_HOTSPOTS.map((h, idx) => {
              const isActive = activeHotspot?.id === h.id
              return (
                <div
                  key={h.id}
                  className={`hotspot-node ${isActive ? 'is-active' : ''}`}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  onClick={(e) => handleHotspotClick(h, e)}
                >
                  <span className="hotspot-pulse-ring" />
                  <span className="hotspot-core-num">0{idx + 1}</span>

                  {isActive && (
                    <div
                      className="hotspot-floating-card"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="card-material-badge">{h.material}</span>
                      <h4>{h.title}</h4>
                      <p>{h.spec}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        /* SCENE 2: LUXURY REAL ESTATE (Figma Frame 2) */
        <div className="realestate-luxury-layout">
          <div className="luxury-headline-lockup">
            <h1 className="luxury-giant-title">
              LUXURY
              <br />
              REAL ESTATE
            </h1>
            <p className="luxury-sub-quote">
              Harmonizing raw structural concrete with natural oak and expansive daylight.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
