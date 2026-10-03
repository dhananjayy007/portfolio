'use client'

import React, { useState, useEffect, useRef } from 'react'

interface TravelCard {
  id: string
  title: string
  elevation: string
  region: string
  image: string
  caption: string
}

const CARDS: TravelCard[] = [
  {
    id: 'flags',
    title: 'Prayer Flags Pass',
    elevation: '4,890 m',
    region: 'Zanskar Traverse',
    image: '/images/designs/travely_prayer_flags.jpg',
    caption: 'Ancient Buddhist mantras fluttering over freezing glacial torrents.',
  },
  {
    id: 'lake',
    title: 'Chandratal Reflection',
    elevation: '4,250 m',
    region: 'Spiti Valley',
    image: '/images/designs/travely_himalayas_lake.jpg',
    caption: 'Crescent tarn mirroring jagged granite needles under twilight dusk.',
  },
  {
    id: 'ridge',
    title: 'Chanshal Alpine Crest',
    elevation: '4,520 m',
    region: 'Himachal Border',
    image: '/images/chandranahan.jpg',
    caption: 'High mountain meadows blanketed in first autumn snowfall.',
  },
]

export default function TravelyShowcase() {
  const [viewMode, setViewMode] = useState<'panorama' | 'carousel'>('panorama')
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [activeNavTab, setActiveNavTab] = useState('Overlook')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Real-time atmospheric particle snowfall/mist simulation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600)

    const particles = Array.from({ length: 48 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 0.6,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.65 + 0.25,
    }))

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = canvas.parentElement?.clientWidth || 800
      height = canvas.height = canvas.parentElement?.clientHeight || 600
    }
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p) => {
        p.y += p.speedY
        p.x += p.speedX
        if (p.y > height) {
          p.y = -5
          p.x = Math.random() * width
        }
        if (p.x > width) p.x = 0
        if (p.x < 0) p.x = width

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)'
        ctx.shadowBlur = 4
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % CARDS.length)
  }

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length)
  }

  return (
    <div className={`travely-container view-${viewMode}`}>
      {/* Background Photography Layer */}
      <div className="travely-backdrop-layer">
        <img
          src="/images/designs/travely_himalayas_lake.jpg"
          alt="Himalayan alpine lake reflection"
          className="travely-backdrop-img"
        />
        <div className="travely-backdrop-darkener" />
      </div>

      {/* Falling Snowfall Canvas Layer */}
      <canvas ref={canvasRef} className="travely-particles-canvas" />

      {/* Top Prototype Navigation from Figma */}
      <header className="travely-nav">
        <div className="travely-logo">
          <span>LOGO</span>
        </div>

        {/* View Switcher Toggle Pill */}
        <div className="travely-mode-pill">
          <button
            type="button"
            className={viewMode === 'panorama' ? 'is-active' : ''}
            onClick={() => setViewMode('panorama')}
          >
            Panorama
          </button>
          <button
            type="button"
            className={viewMode === 'carousel' ? 'is-active' : ''}
            onClick={() => setViewMode('carousel')}
          >
            3D Cards
          </button>
        </div>

        <div className="travely-nav-actions">
          <span className="nav-icon" title="Search">🔍</span>
          <span className="nav-counter">27 / 10</span>
          <span className="nav-hamburger">☰</span>
        </div>
      </header>

      {/* VIEW 1: HERO PANORAMA with MASSIVE HIMALAYAS DISPLAY TEXT */}
      {viewMode === 'panorama' ? (
        <div className="travely-panorama-view">
          <div className="travely-center-headline-lockup">
            <span className="travely-overhead-kicker">EXPEDITIONS // 2025</span>
            <h1 className="travely-giant-title">HIMALAYAS</h1>
            <p className="travely-panorama-sub">
              Over 100 peaks exceeding 7,200 meters. Mirror lakes, prayer flags, and untouched alpine silence.
            </p>
            <button
              type="button"
              className="travely-explore-cta"
              onClick={() => setViewMode('carousel')}
            >
              Explore 3D Expedition Cards →
            </button>
          </div>

          {/* Bottom Tabs from Figma Bottom Bar */}
          <footer className="travely-bottom-bar">
            {['Overlook', 'Atmosphere', 'Stories', 'More'].map((tab) => (
              <button
                key={tab}
                type="button"
                className={`travely-tab-item ${activeNavTab === tab ? 'is-active' : ''}`}
                onClick={() => setActiveNavTab(tab)}
              >
                {tab}
              </button>
            ))}
          </footer>
        </div>
      ) : (
        /* VIEW 2: 3D CARD CAROUSEL (Figma Screen 2) */
        <div className="travely-carousel-view">
          {/* Left Column: Editorial Info */}
          <div className="travely-info-col">
            <div className="travely-menu-indicator">
              <span>MENU :</span>
            </div>
            <div className="travely-editorial-text">
              <p>
                The Himalayas, or Himalaya, is a mountain range in Asia, separating the plains of the Indian subcontinent from the Tibetan Plateau. The range has some of the planet&apos;s highest peaks, including the very highest, Mount Everest.
              </p>
              <div className="travely-metrics-badge">
                <div>
                  <small>ELEVATION</small>
                  <b>{CARDS[activeCardIndex].elevation}</b>
                </div>
                <div>
                  <small>TEMP</small>
                  <b>-6°C</b>
                </div>
                <div>
                  <small>REGION</small>
                  <b>{CARDS[activeCardIndex].region}</b>
                </div>
              </div>
            </div>

            <div className="travely-carousel-controls">
              <button
                type="button"
                onClick={prevCard}
                className="carousel-arrow"
                aria-label="Previous card"
              >
                ←
              </button>
              <span className="carousel-step">
                0{activeCardIndex + 1} / 0{CARDS.length}
              </span>
              <button
                type="button"
                onClick={nextCard}
                className="carousel-arrow"
                aria-label="Next card"
              >
                →
              </button>
            </div>
          </div>

          {/* Right Column: 3D Layered Cards Stack */}
          <div className="travely-cards-stage">
            {CARDS.map((card, idx) => {
              const diff = (idx - activeCardIndex + CARDS.length) % CARDS.length
              let cardClass = 'card-back'
              if (diff === 0) cardClass = 'card-active'
              else if (diff === 1) cardClass = 'card-next'
              else if (diff === CARDS.length - 1) cardClass = 'card-prev'

              return (
                <div
                  key={card.id}
                  className={`travely-stacked-card ${cardClass}`}
                  onClick={() => setActiveCardIndex(idx)}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="card-media-img"
                  />
                  <div className="card-glass-info">
                    <span className="card-elevation-pill">{card.elevation}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-caption">{card.caption}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
