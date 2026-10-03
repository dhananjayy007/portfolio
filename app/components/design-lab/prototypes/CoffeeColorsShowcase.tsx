'use client'

import React, { useState } from 'react'

export interface CoffeeTheme {
  id: string
  name: string
  headline: string
  subhead: string
  buttonLabel: string
  buttonColor: string
  canvasBg: string
  archBg: string
  badgeColor: string
  drinkType: 'coffee' | 'tea' | 'chai' | 'dark'
  swatchHex: string
}

export const COFFEE_THEMES: CoffeeTheme[] = [
  {
    id: 'blush-espresso',
    name: 'Blush Espresso',
    headline: 'JUST TAKE A SIP',
    subhead: 'Rich single-origin espresso with velvet crema, nested in a warm blush architectural arch.',
    buttonLabel: 'BE FIRST TO TASTE',
    buttonColor: '#f29938',
    canvasBg: '#f6f3ee',
    archBg: '#ebdcd3',
    badgeColor: '#938b82',
    drinkType: 'coffee',
    swatchHex: '#ebdcd3',
  },
  {
    id: 'sage-matcha',
    name: 'Sage & Matcha',
    headline: 'CALM IN A CUP',
    subhead: 'Ceremonial grade stone-ground matcha with botanical mint leaves and soothing green tones.',
    buttonLabel: 'ORDER FRESH BREW',
    buttonColor: '#4f8061',
    canvasBg: '#f0f4f1',
    archBg: '#cdddd3',
    badgeColor: '#708878',
    drinkType: 'tea',
    swatchHex: '#cdddd3',
  },
  {
    id: 'terracotta-chai',
    name: 'Terracotta Clay',
    headline: 'ARTISANAL ROAST',
    subhead: 'Slow-roasted Kenyan peaberry with cinnamon bark accents and warm desert terracotta warmth.',
    buttonLabel: 'EXPLORE FLAVORS',
    buttonColor: '#d1573c',
    canvasBg: '#f8f3ef',
    archBg: '#e5bfb3',
    badgeColor: '#9b6a5e',
    drinkType: 'chai',
    swatchHex: '#e5bfb3',
  },
  {
    id: 'slate-art-of-life',
    name: 'Slate "Art of Life"',
    headline: 'ART OF LIFE',
    subhead: 'Minimalist evening steep: porcelain teapot infusion with dark basalt stone aesthetics.',
    buttonLabel: 'TASTE MASTERY',
    buttonColor: '#dfad62',
    canvasBg: '#1b1d1c',
    archBg: '#353735',
    badgeColor: '#585955',
    drinkType: 'dark',
    swatchHex: '#353735',
  },
]

export default function CoffeeColorsShowcase() {
  const [activeTheme, setActiveTheme] = useState<CoffeeTheme>(COFFEE_THEMES[0])
  const [ripples, setRipples] = useState<number[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [pullOffset, setPullOffset] = useState(0)

  const isDark = activeTheme.id === 'slate-art-of-life'

  const handleCupClick = () => {
    const id = Date.now()
    setRipples((prev) => [...prev, id])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r !== id))
    }, 1200)
  }

  const handleCtaClick = () => {
    setToastMessage(`☕ ${activeTheme.name} order added to tasting flight!`)
    setTimeout(() => {
      setToastMessage(null)
    }, 2800)
  }

  const handlePullTab = () => {
    setPullOffset(24)
    setTimeout(() => setPullOffset(0), 400)
  }

  return (
    <div
      className={`coffee-showcase-container ${isDark ? 'is-dark-theme' : ''}`}
      style={{
        backgroundColor: activeTheme.canvasBg,
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* Top Prototype Navigation */}
      <header className="coffee-proto-nav">
        <div className="coffee-proto-logo">
          <span className="logo-text">BREW LAB</span>
        </div>

        {/* Signature Interactive Hanging Pull-Tab Badge from Figma */}
        <div
          className="coffee-hanging-tab"
          onClick={handlePullTab}
          style={{
            backgroundColor: activeTheme.badgeColor,
            transform: `translateY(${pullOffset}px)`,
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.4s ease',
          }}
          title="Click to pull badge"
        >
          <span className="tab-pill" />
          <span className="tab-icon">↓</span>
        </div>

        <div className="coffee-proto-links">
          <span>ORIGIN</span>
          <span>ROASTS</span>
          <span>MENU</span>
        </div>
      </header>

      {/* Main Hero Layout */}
      <div className="coffee-proto-body">
        {/* Left Column: Typography & Action */}
        <div className="coffee-text-column">
          <span className="coffee-kicker">SMALL BATCH // ZERO ADDITIVES</span>
          <h2 className="coffee-headline">{activeTheme.headline}</h2>
          <p className="coffee-description">{activeTheme.subhead}</p>

          <div className="coffee-action-row">
            <button
              type="button"
              className="coffee-cta-btn"
              onClick={handleCtaClick}
              style={{
                backgroundColor: activeTheme.buttonColor,
              }}
            >
              {activeTheme.buttonLabel}
            </button>
            <span className="coffee-price-tag">₹340 / cup</span>
          </div>

          {/* Color Palette Switcher from Figma Top-Left */}
          <div className="coffee-palette-picker">
            <span className="picker-label">FIGMA PALETTES:</span>
            <div className="swatch-row">
              {COFFEE_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  type="button"
                  className={`swatch-pill ${activeTheme.id === theme.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTheme(theme)}
                  title={`Switch to ${theme.name}`}
                >
                  <span
                    className="swatch-color-dot"
                    style={{ backgroundColor: theme.swatchHex }}
                  />
                  <span className="swatch-text">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Architectural Arched Cutout & Interactive Cup */}
        <div className="coffee-visual-column">
          <div
            className="coffee-arch-stage"
            style={{
              backgroundColor: activeTheme.archBg,
              transition: 'background-color 0.4s ease',
            }}
          >
            {/* Interactive Cup with Ripple & Steam */}
            <div
              className="coffee-cup-interactive"
              onClick={handleCupClick}
              title="Click the cup to ripple"
            >
              {/* Cup Saucer */}
              <div className="coffee-saucer">
                {/* Porcelain Cup Body */}
                <div className="coffee-cup-rim">
                  {/* Brew Liquid */}
                  <div
                    className={`coffee-liquid ${
                      activeTheme.drinkType === 'tea'
                        ? 'is-tea'
                        : activeTheme.drinkType === 'chai'
                        ? 'is-chai'
                        : activeTheme.drinkType === 'dark'
                        ? 'is-dark-brew'
                        : 'is-espresso'
                    }`}
                  >
                    {/* Expanding ripples on click */}
                    {ripples.map((id) => (
                      <span key={id} className="coffee-ripple" />
                    ))}
                    {/* Subtle crema sheen */}
                    <div className="coffee-crema-glint" />
                  </div>
                </div>

                {/* Cup Handle */}
                <div className="coffee-cup-handle" />
              </div>

              {/* Steam Puffs */}
              <div className="steam-container" aria-hidden="true">
                <span className="steam-puff steam-1" />
                <span className="steam-puff steam-2" />
                <span className="steam-puff steam-3" />
              </div>
            </div>

            {/* Scattered Roasted Beans / Botanical Garnish at Base of Arch */}
            <div className="coffee-beans-bed" aria-hidden="true">
              {activeTheme.drinkType === 'tea' ? (
                <>
                  <span className="botanical-leaf leaf-1">🍃</span>
                  <span className="botanical-leaf leaf-2">🌿</span>
                  <span className="botanical-leaf leaf-3">🍃</span>
                  <span className="botanical-leaf leaf-4">🌿</span>
                </>
              ) : (
                <>
                  <span className="coffee-bean bean-1" />
                  <span className="coffee-bean bean-2" />
                  <span className="coffee-bean bean-3" />
                  <span className="coffee-bean bean-4" />
                  <span className="coffee-bean bean-5" />
                  <span className="coffee-bean bean-6" />
                  <span className="coffee-bean bean-7" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Toast Confirmation */}
      {toastMessage && (
        <div className="coffee-toast-pill" role="status">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
