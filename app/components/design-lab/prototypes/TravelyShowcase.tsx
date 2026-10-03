'use client'

import React, { useState, useEffect, useRef } from 'react'

interface Destination {
  id: string
  name: string
  region: string
  elevation: string
  temp: string
  coordinates: string
  bestSeason: string
  description: string
  cards: {
    title: string
    subtitle: string
    tag: string
    image: string
  }[]
}

const DESTINATIONS: Destination[] = [
  {
    id: 'himalayas',
    name: 'HIMALAYAS',
    region: 'Himachal & Uttarakhand',
    elevation: '6,153 m',
    temp: '-4°C',
    coordinates: '31.1048° N, 77.1734° E',
    bestSeason: 'May — Oct',
    description:
      'The sacred Himalayan spine separating the plains of the Indian subcontinent from the Tibetan Plateau, where glacial alpine tarns mirror jagged granite needles.',
    cards: [
      {
        title: 'Chandratal Tarn',
        subtitle: 'Crescent Moon Lake at 4,250m',
        tag: 'Camp Base',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Prayer Flags Pass',
        subtitle: 'Wind-blown Buddhist mantras at 4,890m',
        tag: 'Sacred Pass',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Baralacha Ridge',
        subtitle: 'High-altitude junction of Zanskar & Spiti',
        tag: 'Alpine Traverse',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'ladakh',
    name: 'LADAKH',
    region: 'Trans-Himalayan Cold Desert',
    elevation: '5,359 m',
    temp: '-8°C',
    coordinates: '34.1526° N, 77.5771° E',
    bestSeason: 'Jun — Sep',
    description:
      'Land of high passes, ancient cliff-hanging gompas, and stark mineral mountains framed against deep cobalt skies.',
    cards: [
      {
        title: 'Pangong Tso',
        subtitle: 'Endorheic saltwater lake changing cyan hues',
        tag: 'Shoreline',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Khardung La',
        subtitle: 'Gateway to the Shyok and Nubra valleys',
        tag: '5,359m Pass',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Diskit Monastery',
        subtitle: '106-foot Maitreya Buddha facing desert dunes',
        tag: 'Sanctuary',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
  {
    id: 'spiti',
    name: 'SPITI VALLEY',
    region: 'Middle Land / High Altitude',
    elevation: '4,270 m',
    temp: '-11°C',
    coordinates: '32.2461° N, 78.0349° E',
    bestSeason: 'Jul — Sep',
    description:
      'A timeless high-altitude enclave carved by the Spiti River, where thousand-year-old mudbrick monasteries cling to barren scree slopes.',
    cards: [
      {
        title: 'Key Monastery',
        subtitle: 'Fortress-style Tibetan Buddhist retreat',
        tag: 'Historic 11th C.',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Hikkim Post Office',
        subtitle: 'Highest operational post office on Earth',
        tag: '4,440m Altitude',
        image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      },
      {
        title: 'Langza Fossil Village',
        subtitle: 'Ancient Tethys Sea marine ammonites',
        tag: 'Geological Wonder',
        image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
]

export default function TravelyShowcase() {
  const [activeDest, setActiveDest] = useState<Destination>(DESTINATIONS[0])
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookedToast, setBookedToast] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Interactive Particle Snow & Mist Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const w = (canvas.width = canvas.parentElement?.clientWidth || 800)
    const h = (canvas.height = canvas.parentElement?.clientHeight || 500)

    const particles: { x: number; y: number; r: number; speedY: number; speedX: number; opacity: number }[] = []
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        speedY: Math.random() * 0.45 + 0.2,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.6 + 0.2,
      })
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = '#ffffff'
      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        p.y += p.speedY
        p.x += p.speedX
        if (p.y > h) p.y = -5
        if (p.x > w) p.x = 0
        if (p.x < 0) p.x = w
      })
      animId = requestAnimationFrame(render)
    }
    render()

    return () => cancelAnimationFrame(animId)
  }, [activeDest])

  const handleNextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % activeDest.cards.length)
  }

  const handleBookExpedition = () => {
    const currentCard = activeDest.cards[activeCardIndex]
    setBookedToast(`🏔️ Expedition to ${currentCard.title} reserved!`)
    setTimeout(() => setBookedToast(null), 3000)
  }

  return (
    <div className="travely-container">
      {/* Background Mountain Lake Visual */}
      <div className="travely-hero-backdrop">
        <picture>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Himalayan Mountain Reflection"
            className="travely-backdrop-img"
          />
        </picture>
        <div className="travely-vignette-overlay" />
        <canvas ref={canvasRef} className="travely-particle-canvas" aria-hidden="true" />
      </div>

      {/* Navigation Bar */}
      <header className="travely-nav">
        <div className="travely-logo">
          <span>TRAVELY</span>
        </div>

        <div className="travely-nav-actions">
          <button type="button" className="travely-icon-btn" title="Search destinations">
            🔍
          </button>
          <button
            type="button"
            className="travely-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{menuOpen ? '✕' : 'MENU'}</span>
          </button>
        </div>
      </header>

      {/* Main Showcase Layout */}
      <div className="travely-body">
        {/* Left Column: Big Atmospheric Title & Destination Info */}
        <div className="travely-info-column">
          <div className="travely-meta-row">
            <span className="travely-region-badge">{activeDest.region}</span>
            <span className="travely-coord">{activeDest.coordinates}</span>
          </div>

          <h2 className="travely-big-title">{activeDest.name}</h2>

          <p className="travely-summary">{activeDest.description}</p>

          <div className="travely-metrics-strip">
            <div className="metric-box">
              <span className="metric-lbl">PEAK ELEVATION</span>
              <strong className="metric-val">{activeDest.elevation}</strong>
            </div>
            <div className="metric-box">
              <span className="metric-lbl">CURRENT TEMP</span>
              <strong className="metric-val">{activeDest.temp}</strong>
            </div>
            <div className="metric-box">
              <span className="metric-lbl">OPTIMAL WINDOW</span>
              <strong className="metric-val">{activeDest.bestSeason}</strong>
            </div>
          </div>

          <div className="travely-cta-row">
            <button
              type="button"
              className="travely-explore-btn"
              onClick={handleBookExpedition}
            >
              Plan Expedition ↗
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Layered Card Stack */}
        <div className="travely-cards-column">
          <div className="travely-stack-wrapper" onClick={handleNextCard} title="Click to cycle next destination card">
            {activeDest.cards.map((card, idx) => {
              const offset = (idx - activeCardIndex + activeDest.cards.length) % activeDest.cards.length
              const isFront = offset === 0

              let style: React.CSSProperties = {}
              if (isFront) {
                style = {
                  transform: 'translate3d(0, 0, 0) scale(1)',
                  zIndex: 10,
                  opacity: 1,
                  boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.7)',
                }
              } else if (offset === 1) {
                style = {
                  transform: 'translate3d(36px, 12px, -30px) scale(0.92)',
                  zIndex: 8,
                  opacity: 0.85,
                  filter: 'brightness(0.85)',
                }
              } else {
                style = {
                  transform: 'translate3d(70px, 24px, -60px) scale(0.85)',
                  zIndex: 6,
                  opacity: 0.65,
                  filter: 'brightness(0.7)',
                }
              }

              return (
                <div key={card.title} className="travely-card-item" style={style}>
                  <img src={card.image} alt={card.title} className="card-thumb" />
                  <div className="card-glass-panel">
                    <span className="card-tag">{card.tag}</span>
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-sub">{card.subtitle}</p>
                    <div className="card-click-hint">Click to flip card →</div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Destination Switcher Pills */}
          <div className="travely-destination-bar">
            <span className="bar-label">EXPLORE REGION:</span>
            <div className="destination-pills">
              {DESTINATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`dest-pill ${activeDest.id === d.id ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveDest(d)
                    setActiveCardIndex(0)
                  }}
                >
                  {d.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Toast */}
      {bookedToast && (
        <div className="travely-toast" role="status">
          <span>{bookedToast}</span>
        </div>
      )}
    </div>
  )
}
