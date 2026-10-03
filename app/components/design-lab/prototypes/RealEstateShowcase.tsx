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

const HOTSPOTS: Hotspot[] = [
  {
    id: 'optics',
    x: 74,
    y: 18,
    title: 'Warm 2700K Architectural Optics',
    spec: 'Flos architectural recessed ceiling spots with honeycomb anti-glare louvers (CRI 98+).',
    material: 'Anodized Matte Black Aluminum',
  },
  {
    id: 'bedding',
    x: 62,
    y: 65,
    title: 'Custom Diamond-Tufted Headboard',
    spec: 'Bespoke high-density acoustic foam wrapped in imported Italian Belgian linen.',
    material: 'Charcoal Velvet & Brushed Brass Plinth',
  },
  {
    id: 'panel',
    x: 28,
    y: 34,
    title: 'Smoked Oak & Concrete Wall Cladding',
    spec: 'Micro-cement thermal finish paired with floor-to-ceiling slatted acoustic wood baffle.',
    material: 'Natural Smoked Oak & Polished Concrete',
  },
  {
    id: 'lamp',
    x: 88,
    y: 45,
    title: 'Artemide Minimalist Reading Luminaire',
    spec: 'Counterbalanced swing arm with touch-dimming optical sensor.',
    material: 'Powder-coated Carbon Steel',
  },
]

export default function RealEstateShowcase() {
  const [lang, setLang] = useState<'EN' | 'RU'>('EN')
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0])
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [applicantName, setApplicantName] = useState('')
  const [applicantPhone, setApplicantPhone] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const handleHotspotClick = (h: Hotspot, e: React.MouseEvent) => {
    e.stopPropagation()
    setActiveHotspot(activeHotspot?.id === h.id ? null : h)
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setBookingModalOpen(false)
      setApplicantName('')
      setApplicantPhone('')
    }, 2400)
  }

  return (
    <div className="realestate-container" onClick={() => setActiveHotspot(null)}>
      {/* Background Luxury Interior Visual */}
      <div className="realestate-backdrop">
        <picture>
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80"
            alt="Luxury Interior Architecture"
            className="realestate-img"
          />
        </picture>
        <div className="realestate-dark-overlay" />
      </div>

      {/* Interactive Architectural Hotspot Pins */}
      <div className="realestate-hotspots-layer">
        {HOTSPOTS.map((h, idx) => {
          const isActive = activeHotspot?.id === h.id
          return (
            <div
              key={h.id}
              className={`architectural-pin ${isActive ? 'is-active' : ''}`}
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
              onClick={(e) => handleHotspotClick(h, e)}
              title={h.title}
            >
              <span className="pin-pulse" />
              <span className="pin-core">0{idx + 1}</span>

              {/* Glassmorphic Hotspot Tooltip */}
              {isActive && (
                <div
                  className="hotspot-glass-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="hotspot-tag">{h.material}</span>
                  <h4>{h.title}</h4>
                  <p>{h.spec}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Top Navigation */}
      <header className="realestate-nav">
        <div className="realestate-logo">
          <span className="logo-symbol">▲</span>
          <span className="logo-name">ARCHITECTURAL RESIDENCES</span>
        </div>

        <div className="realestate-nav-right">
          <div className="lang-switcher">
            <button
              type="button"
              className={`lang-btn ${lang === 'RU' ? 'is-active' : ''}`}
              onClick={() => setLang('RU')}
            >
              RU
            </button>
            <span className="lang-divider">/</span>
            <button
              type="button"
              className={`lang-btn ${lang === 'EN' ? 'is-active' : ''}`}
              onClick={() => setLang('EN')}
            >
              EN
            </button>
          </div>

          <div className="realestate-menu-trigger">
            <span className="menu-bar" />
            <span className="menu-bar short" />
          </div>
        </div>
      </header>

      {/* Left Social & Floating Tools */}
      <aside className="realestate-sidebar" aria-hidden="true">
        <span className="side-icon" title="Instagram">IG</span>
        <span className="side-icon" title="Telegram">TG</span>
        <span className="side-icon" title="Behance">BE</span>
      </aside>

      {/* Main Glassmorphic Consultation Card (matching Figma) */}
      <div className="realestate-content-layer">
        <div className="glass-consultation-card" onClick={(e) => e.stopPropagation()}>
          <span className="card-kicker">
            {lang === 'EN' ? 'PREMIUM SPATIAL CRAFT' : 'ПРЕМИУМ ДИЗАЙН'}
          </span>

          <h2 className="card-title">
            {lang === 'EN' ? 'DESIGN INTERIOR' : 'ДИЗАЙН ИНТЕРЬЕРА'}
          </h2>

          <p className="card-desc">
            {lang === 'EN'
              ? 'Professional interior designer services. Only the best specialists, individual bespoke approach, museum-grade work.'
              : 'Профессиональные услуги дизайна интерьера. Лучшие специалисты, индивидуальный подход, высочайшее качество.'}
          </p>

          <div className="consultation-form-block">
            <span className="free-visit-label">
              {lang === 'EN' ? 'Free designer consultation visit:' : 'Бесплатный выезд дизайнера:'}
            </span>

            <button
              type="button"
              className="consultation-submit-btn"
              onClick={() => setBookingModalOpen(true)}
            >
              <span>{lang === 'EN' ? 'Submit your application →' : 'Оставить заявку →'}</span>
            </button>
          </div>

          <div className="card-specs-footer">
            <span>{lang === 'EN' ? 'Turnkey execution · 2-year warranty' : 'Под ключ · Гарантия 2 года'}</span>
          </div>
        </div>
      </div>

      {/* Interactive Consultation Booking Modal */}
      {bookingModalOpen && (
        <div className="realestate-modal-backdrop" onClick={() => setBookingModalOpen(false)}>
          <div className="realestate-modal-window" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{lang === 'EN' ? 'Book Private Consultation' : 'Заказать Консультацию'}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={() => setBookingModalOpen(false)}
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="modal-success-state">
                <span className="success-icon">✓</span>
                <p>
                  {lang === 'EN'
                    ? 'Application submitted! Our lead architect will contact you within 2 hours.'
                    : 'Заявка принята! Главный архитектор свяжется с вами в течение 2 часов.'}
                </p>
              </div>
            ) : (
              <form className="modal-form" onSubmit={handleBookingSubmit}>
                <label>
                  <span>{lang === 'EN' ? 'Your Name' : 'Ваше Имя'}</span>
                  <input
                    type="text"
                    required
                    placeholder={lang === 'EN' ? 'Alexander Wright' : 'Александр'}
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </label>

                <label>
                  <span>{lang === 'EN' ? 'Phone / Telegram' : 'Телефон / Telegram'}</span>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 019-2834"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                  />
                </label>

                <button type="submit" className="modal-submit-btn">
                  {lang === 'EN' ? 'Confirm Reservation' : 'Подтвердить Запись'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
