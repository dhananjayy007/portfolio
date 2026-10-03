'use client'

import React, { useState } from 'react'

export interface CoffeeTheme {
  id: string
  name: string
  swatchHex: string
  headline: string
  kicker: string
  description: string
  buttonLabel: string
  buttonColor: string
  canvasBg: string
  archBg: string
  textColor: string
  descColor: string
  badgeBg: string
  imageSrc: string
  imageAlt: string
  isArtOfLife?: boolean
}

export const COFFEE_THEMES: CoffeeTheme[] = [
  {
    id: 'blush-espresso',
    name: 'Blush Espresso',
    swatchHex: '#f3ddd3',
    headline: 'JUST TAKE A SIP',
    kicker: 'TASTE IT TO BELIEVE IT',
    description:
      'Single-origin Ethiopian Yirgacheffe slow-extracted with thick hazelnut crema. Balanced floral notes nested in an architectural recessed arch with roasted whole beans.',
    buttonLabel: 'BE FIRST TO TASTE',
    buttonColor: '#f29938',
    canvasBg: '#f6f3ee',
    archBg: '#f3ddd3',
    textColor: '#1c1b18',
    descColor: '#635e56',
    badgeBg: '#7e776e',
    imageSrc: '/images/designs/coffee_cup_beans.jpg',
    imageAlt: 'Overhead white ceramic coffee cup with crema and roasted beans',
  },
  {
    id: 'sage-matcha',
    name: 'Sage & Matcha',
    swatchHex: '#bed3c8',
    headline: 'CALM IN A CUP',
    kicker: 'CEREMONIAL STONE-GROUND',
    description:
      'First-harvest Uji ceremonial matcha whisked to micro-foam perfection. Infused with botanical notes and tranquil alpine mint tones.',
    buttonLabel: 'ORDER FRESH BREW',
    buttonColor: '#477a5b',
    canvasBg: '#f1f5f2',
    archBg: '#bed3c8',
    textColor: '#19241d',
    descColor: '#536558',
    badgeBg: '#5d7564',
    imageSrc: '/images/designs/coffee_cup_beans.jpg',
    imageAlt: 'Ceremonial matcha cup with soothing botanical tones',
  },
  {
    id: 'terracotta-roast',
    name: 'Terracotta Clay',
    swatchHex: '#c99b8d',
    headline: 'ARTISANAL ROAST',
    kicker: 'SLOW FIRED PEABERRY',
    description:
      'Sun-dried Kenyan peaberry with cinnamon bark accents, slow-roasted over fruitwood coals. Earthy warmth meeting velvety mouthfeel.',
    buttonLabel: 'EXPLORE FLAVORS',
    buttonColor: '#cf5a3c',
    canvasBg: '#faf4ef',
    archBg: '#e8c4b8',
    textColor: '#291b17',
    descColor: '#70534b',
    badgeBg: '#8c594d',
    imageSrc: '/images/designs/coffee_cup_beans.jpg',
    imageAlt: 'Artisanal peaberry roast with whole beans',
  },
  {
    id: 'slate-art-of-life',
    name: 'Slate "Art of Life"',
    swatchHex: '#3d3a39',
    headline: 'ART OF LIFE',
    kicker: 'CEREMONIAL INFUSION',
    description:
      'Porcelain teapot infusion of loose organic green tea leaves, paired with fresh garden mint on natural basalt slate. Minimalist evening steep.',
    buttonLabel: 'TASTE MASTERY',
    buttonColor: '#dfad62',
    canvasBg: '#232120',
    archBg: '#3d3a39',
    textColor: '#f5f3f0',
    descColor: '#a6a19c',
    badgeBg: '#54504e',
    imageSrc: '/images/designs/tea_art_of_life.jpg',
    imageAlt: 'White porcelain teapot with fresh mint leaves and golden tea cup',
    isArtOfLife: true,
  },
]

export default function CoffeeColorsShowcase() {
  const [activeTheme, setActiveTheme] = useState<CoffeeTheme>(COFFEE_THEMES[0])
  const [ripples, setRipples] = useState<number[]>([])
  const [pullOffset, setPullOffset] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleCupClick = () => {
    const id = Date.now()
    setRipples((prev) => [...prev, id])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id))
    }, 1200)
  }

  const handlePullTab = () => {
    setPullOffset(28)
    setTimeout(() => setPullOffset(0), 380)
  }

  const handleOrder = () => {
    setToastMessage(`✓ ${activeTheme.name} added to tasting flight!`)
    setTimeout(() => setToastMessage(null), 2600)
  }

  return (
    <div
      className={`coffee-canvas ${activeTheme.isArtOfLife ? 'is-art-of-life' : ''}`}
      style={{
        backgroundColor: activeTheme.canvasBg,
        color: activeTheme.textColor,
        transition: 'background-color 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Prototype Navigation */}
      <header className="coffee-header">
        <div className="coffee-brand">
          <span className="coffee-brand-logo">LOGO</span>
        </div>

        {/* Signature Figma Hanging Pull Tab Badge */}
        <div
          className="coffee-hanging-badge"
          style={{
            backgroundColor: activeTheme.badgeBg,
            transform: `translate(-50%, ${pullOffset}px)`,
            transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.45s ease',
          }}
          onClick={handlePullTab}
          title="Click to pull badge"
        >
          <span className="badge-pill-slit" />
          <span className="badge-label">
            {activeTheme.isArtOfLife ? 'TEA' : 'COFFEE'}
          </span>
          <span className="badge-arrow">↓</span>
        </div>

        <nav className="coffee-nav-menu">
          <span className="is-active">Home</span>
          <span>About Us</span>
          <span>Our Menu</span>
          <span>Contact Us</span>
        </nav>
      </header>

      {/* Main Hero Body */}
      <div className="coffee-hero-body">
        {/* Left Column: Typography, Swatches & CTA */}
        <div className="coffee-copy-col">
          <div className="coffee-swatch-bar">
            <span className="swatch-label">PALETTE SYSTEM</span>
            <div className="swatch-list">
              {COFFEE_THEMES.map((theme) => {
                const isActive = theme.id === activeTheme.id
                return (
                  <button
                    key={theme.id}
                    type="button"
                    className={`coffee-swatch-chip ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveTheme(theme)}
                    title={theme.name}
                  >
                    <span
                      className="swatch-circle"
                      style={{ backgroundColor: theme.swatchHex }}
                    />
                    <span className="swatch-name">{theme.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="coffee-title-lockup">
            <span
              className="coffee-kicker"
              style={{ color: activeTheme.descColor }}
            >
              {activeTheme.kicker}
            </span>
            <h1 className="coffee-display-title">{activeTheme.headline}</h1>
            <p
              className="coffee-body-text"
              style={{ color: activeTheme.descColor }}
            >
              {activeTheme.description}
            </p>
          </div>

          <div className="coffee-cta-group">
            <button
              type="button"
              className="coffee-order-btn"
              onClick={handleOrder}
              style={{ backgroundColor: activeTheme.buttonColor }}
            >
              {activeTheme.buttonLabel}
            </button>
            <span
              className="coffee-craft-tag"
              style={{ color: activeTheme.descColor }}
            >
              Small Batch · Zero Additives
            </span>
          </div>

          {toastMessage && (
            <div className="coffee-toast-feedback">
              <span>{toastMessage}</span>
            </div>
          )}
        </div>

        {/* Right Column: Architectural Arch Cutout with Real Photo & Physics */}
        <div className="coffee-stage-col">
          <div
            className={`coffee-arch-stage ${activeTheme.isArtOfLife ? 'is-horizontal-stage' : ''}`}
            style={{
              backgroundColor: activeTheme.archBg,
              transition: 'background-color 0.45s ease',
            }}
          >
            {/* Real Photographic Still Life */}
            <div
              className="coffee-image-wrapper"
              onClick={handleCupClick}
              title="Click the cup to trigger liquid ripple physics"
            >
              <img
                src={activeTheme.imageSrc}
                alt={activeTheme.imageAlt}
                className="coffee-stage-photo"
              />

              {/* Liquid Ripple Overlay Effect on click */}
              {ripples.map((ripId) => (
                <span key={ripId} className="espresso-ripple-ring" />
              ))}

              {/* Rising Aroma Particle Steam */}
              <div className="coffee-steam-emitter" aria-hidden="true">
                <span className="steam-line steam-1" />
                <span className="steam-line steam-2" />
                <span className="steam-line steam-3" />
              </div>
            </div>

            <div className="arch-hint-pill">
              <span>● Click cup to brew</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
