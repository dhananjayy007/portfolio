'use client'

import React, { useState } from 'react'
import { PrototypeId, PrototypeMeta } from './types'
import DeviceFrame from './shared/DeviceFrame'
import CoffeeColorsShowcase from './prototypes/CoffeeColorsShowcase'
import TravelyShowcase from './prototypes/TravelyShowcase'
import RealEstateShowcase from './prototypes/RealEstateShowcase'
import CourseFShowcase from './prototypes/CourseFShowcase'

export const PROTOTYPES_REGISTRY: PrototypeMeta[] = [
  {
    id: 'coffee-colors',
    title: 'Coffee Colors // Just Take a Sip',
    subtitle: 'Artisanal beverage brand with real-time thematic color systems & recessed arch depth',
    category: 'Brand Experience · Theming Engine',
    year: '2025',
    description:
      'An exploration of dynamic brand palettes and tactile spatial depth. Features an architectural recessed arch carved into the surface, whole roasted coffee beans, an interactive espresso cup with liquid ripple micro-physics, and a live 4-palette switcher (Blush Espresso, Sage Matcha, Terracotta, and Slate "Art of Life").',
    highlights: [
      'Authentic 4-palette switcher with harmonious brand tokens (Blush, Mint, Sage, Terracotta, Slate)',
      'Architectural recessed arch with realistic multi-layered inner drop-shadows',
      'Tactile interactive cup ripple micro-physics & animated rising steam',
      'Interactive hanging pull-tab badge with realistic spring-back physics',
    ],
  },
  {
    id: 'travely',
    title: 'Travely // Himalayan Expeditions',
    subtitle: 'Atmospheric travel platform with interactive mountain particle canvas & 3D card stacks',
    category: 'Travel Discovery · 3D Motion',
    year: '2025',
    description:
      'Immersive dark-sky travel exploration featuring a real-time particle snowfall simulation over crystal-still glacial lakes, dual viewport modes (Hero Lake Panorama with massive condensed display typography vs. 3D perspective stacked cards), and live mountain pass metrics.',
    highlights: [
      'Dual viewports: Panoramic lake reflection with massive Bebas Neue typography vs. 3D Card stack',
      'Real-time 48-node particle snowfall & alpine mist simulation',
      '3D stacked card carousel with perspective translation & spring flip',
      'Interactive regional metadata readouts (elevation, temperature, coordinates)',
    ],
  },
  {
    id: 'real-estate',
    title: 'Luxury Architecture // Design Interior',
    subtitle: 'High-end interior architecture with spatial hotspot pins & instant bilingual switching',
    category: 'Architectural Editorial · Spatial UI',
    year: '2025',
    description:
      'Dual architectural residences inspired by high-end Scandinavian and brutalist concrete design. Features a dark frosted glassmorphic panel, instantaneous RU/EN bilingual translation, pulsing hotspot pins revealing material specifications, and an architectural concrete living space.',
    highlights: [
      'Instantaneous RU / EN bilingual toggle across all headings, copy, and form inputs',
      'Frosted acrylic glass panel with backdrop blur (24px) and subtle border glow',
      '3 interactive pulsing architectural hotspot pins revealing lighting and finish specs',
      'Live scene switcher between Master Suite and Concrete Living Pavilion',
    ],
  },
  {
    id: 'course-f',
    title: 'Course-F // Next-Gen EdTech SaaS',
    subtitle: 'Modern education web application with dark navigation & interactive SVG charts',
    category: 'SaaS Platform · Data Visualization',
    year: '2025',
    description:
      'High-density EdTech learning management platform. Incorporates an obsidian sidebar with jewel-gradient brand identity, welcome banner featuring 3D glassmorphic illustration, interactive SVG weekly learning velocity spline with data tooltips, and reactive course curriculum progress toggles.',
    highlights: [
      'Obsidian sidebar (#13151b) with jewel accent brand mark and navigation states',
      '3D glassmorphic dashboard illustration banner with progress highlights',
      'Interactive SVG weekly engagement spline chart with hover data tooltips',
      'SVG radial mastery gauge (78% completion) and filterable curriculum progress rows',
    ],
  },
]

export default function DesignLabSection() {
  const [activeId, setActiveId] = useState<PrototypeId>('coffee-colors')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const activeMeta =
    PROTOTYPES_REGISTRY.find((p) => p.id === activeId) || PROTOTYPES_REGISTRY[0]

  return (
    <section className="design-lab-section container" id="designs">
      {/* Editorial Section Heading */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Interactive Design Lab</p>
          <h2>
            Tactile UI craft &amp;
            <br />
            <em>live explorations.</em>
          </h2>
        </div>
        <p className="section-note">
          Interactive web implementations of experimental brand, motion, and product interfaces. Built with responsive layout systems, realistic micro-physics, and precise typography.
        </p>
      </div>

      {/* Prototype Selector Navigation */}
      <div className="prototype-nav-pills" role="tablist">
        {PROTOTYPES_REGISTRY.map((p, idx) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`proto-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveId(p.id)}
            >
              <span className="proto-tab-number">0{idx + 1}</span>
              <div className="proto-tab-text-group">
                <span className="proto-tab-name">
                  {p.id === 'coffee-colors' && 'Coffee Colors'}
                  {p.id === 'travely' && 'Travely'}
                  {p.id === 'real-estate' && 'Luxury Interior'}
                  {p.id === 'course-f' && 'Course-F SaaS'}
                </span>
                <span className="proto-tab-sub">
                  {p.id === 'coffee-colors' && 'Dynamic Theming & Depth'}
                  {p.id === 'travely' && 'Atmospheric 3D Mountain Motion'}
                  {p.id === 'real-estate' && 'Spatial Hotspots & Bilingual UI'}
                  {p.id === 'course-f' && 'SaaS Dashboard & Analytics'}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Master Interactive Stage */}
      <div className="design-lab-stage">
        <DeviceFrame
          title={activeMeta.title}
          category={activeMeta.category}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        >
          {activeId === 'coffee-colors' && <CoffeeColorsShowcase />}
          {activeId === 'travely' && <TravelyShowcase />}
          {activeId === 'real-estate' && <RealEstateShowcase />}
          {activeId === 'course-f' && <CourseFShowcase />}
        </DeviceFrame>
      </div>

      {/* Design Insights & Specification Bar Below Stage */}
      <div className="prototype-spec-footer">
        <div className="spec-info-col">
          <div className="spec-meta-row">
            <span className="spec-badge">{activeMeta.category}</span>
            <span className="spec-year">Exploration · {activeMeta.year}</span>
          </div>
          <h3 className="spec-title">{activeMeta.title}</h3>
          <p className="spec-desc">{activeMeta.description}</p>
        </div>

        <div className="spec-features-col">
          <h4>Craft Highlights &amp; Interaction Physics</h4>
          <ul className="spec-highlights-list">
            {activeMeta.highlights.map((h) => (
              <li key={h}>
                <span className="bullet-dot" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
