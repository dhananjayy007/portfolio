'use client'

import React, { useState } from 'react'
import { PrototypeId, PrototypeMeta } from './types'
import DeviceFrame from './shared/DeviceFrame'
import DesignTokenDrawer from './shared/DesignTokenDrawer'
import CoffeeColorsShowcase from './prototypes/CoffeeColorsShowcase'
import TravelyShowcase from './prototypes/TravelyShowcase'
import RealEstateShowcase from './prototypes/RealEstateShowcase'
import CourseFShowcase from './prototypes/CourseFShowcase'

export const PROTOTYPES_REGISTRY: PrototypeMeta[] = [
  {
    id: 'coffee-colors',
    title: 'Coffee Colors // Just Take a Sip',
    subtitle: 'Artisanal beverage brand with real-time thematic color systems & tactile stage physics',
    category: 'E-Commerce · Theming Engine',
    year: '2025',
    figmaUrl: 'https://www.figma.com/proto/asNo9p6jc4X1SZ7mcYIFMC/coffee-colors?node-id=1-3',
    description:
      'A study in dynamic brand expression. Features an architectural arched depth stage, overhead beverage ripples, interactive steam micro-physics, and a live 4-palette switcher (Blush Espresso, Sage Matcha, Terracotta, and Slate Dark Roast).',
    highlights: [
      'Live 4-theme palette switcher with instant canvas re-tinting',
      'Architectural recessed arch with multi-layered inner drop-shadows',
      'Tactile interactive cup ripple micro-physics & animated steam',
      'Pullable hanging leather tab badge & spring-action CTA',
    ],
    tokens: [
      { name: 'Canvas Cream', value: '#f6f3ee', type: 'color' },
      { name: 'Blush Inset', value: '#ebdcd3', type: 'color' },
      { name: 'Sage Green', value: '#cdddd3', type: 'color' },
      { name: 'Terracotta Accent', value: '#e5bfb3', type: 'color' },
      { name: 'Dark Roast Slate', value: '#353735', type: 'color' },
      { name: 'Amber Roast CTA', value: '#f29938', type: 'color' },
      { name: 'Headline Serif', value: 'Georgia, serif (Display 38px)', type: 'typography' },
      { name: 'Mono Kickers', value: 'ui-monospace, monospace (11px)', type: 'typography' },
      { name: 'Arch Border Radius', value: '180px 180px 12px 12px', type: 'radius' },
    ],
  },
  {
    id: 'travely',
    title: 'Travely // Himalayan Expeditions',
    subtitle: 'Atmospheric travel platform with interactive mountain particle canvas & 3D card stacks',
    category: 'Travel Discovery · 3D Motion',
    year: '2025',
    figmaUrl: 'https://www.figma.com/proto/d0OE0gLJHsvId8bXhilmcm/travely?node-id=5-78',
    description:
      'Immersive dark-sky travel exploration featuring a real-time particle snow & mist simulation, stacked 3D destination photography that cycles with spring physics, and dynamic altitude metrics for trans-Himalayan passes.',
    highlights: [
      'Interactive particle mist & snowfall reacting across 45 nodes',
      '3D stacked card carousel with perspective translation & spring flip',
      'Region switcher (Himalayas, Ladakh, Spiti) with live altitude/temp readouts',
      'Tactile glassmorphic expedition booking trigger',
    ],
    tokens: [
      { name: 'Alpine Midnight', value: '#0a0d12', type: 'color' },
      { name: 'Glacial Reflection', value: '#1a2434', type: 'color' },
      { name: 'Snow Flurry White', value: 'rgba(255, 255, 255, 0.95)', type: 'color' },
      { name: 'Card Glass Border', value: 'rgba(255, 255, 255, 0.15)', type: 'color' },
      { name: 'Hero Condensed Display', value: '-apple-system, sans-serif (800 / 64px)', type: 'typography' },
      { name: 'Card Blur Filter', value: 'backdrop-filter: blur(14px)', type: 'shadow' },
      { name: 'Card Perspective', value: 'perspective: 1000px', type: 'radius' },
    ],
  },
  {
    id: 'real-estate',
    title: 'Architectural Residences // Design Interior',
    subtitle: 'High-end interior architecture consulting with interactive spatial hotspots & bilingual UI',
    category: 'Spatial Design · Architecture',
    year: '2025',
    figmaUrl: 'https://www.figma.com/proto/8lCw1pymC6LzSEgkbt897E/real-estate?node-id=1-8',
    description:
      'Luxury residential showcase designed with a dark Scandinavian aesthetic. Features pulsing architectural inspection pins that detail optical specs and bespoke furniture, a glassmorphic consultation card, and an instant EN / RU locale toggle.',
    highlights: [
      'Interactive room inspection pins revealing material & lighting specs',
      'Deep frosted glassmorphic card with backdrop-blur & thin white borders',
      'Bilingual toggle (English / Russian) re-rendering all typography',
      'Integrated modal consultation booking drawer',
    ],
    tokens: [
      { name: 'Basalt Charcoal', value: '#121413', type: 'color' },
      { name: 'Glass Card Frost', value: 'rgba(28, 30, 29, 0.65)', type: 'color' },
      { name: 'Warm 2700K Glow', value: 'rgba(250, 204, 110, 0.45)', type: 'color' },
      { name: 'Thin White Border', value: 'rgba(255, 255, 255, 0.12)', type: 'color' },
      { name: 'Title Serif', value: 'Georgia, serif (Display 42px)', type: 'typography' },
      { name: 'Glass Frost Blur', value: 'backdrop-filter: blur(18px)', type: 'shadow' },
    ],
  },
  {
    id: 'course-f',
    title: 'Course-F // EdTech & SaaS Dashboard',
    subtitle: 'Productivity web app with live SVG analytics, radial progress rings, and curriculum builder',
    category: 'SaaS Platform · Dashboard Systems',
    year: '2025',
    figmaUrl: 'https://www.figma.com/design/OchfJCUAXpSoPtgCasz2yO/course-F?node-id=0-1',
    description:
      'Comprehensive product design for modern educators. Features a collapsible dark sidebar, live interactive engagement graph with hover metrics, animated SVG progress completion rings, tabbed course filtering, and modal module publication.',
    highlights: [
      'Interactive weekly engagement line chart with data point tooltips',
      'Radial SVG cohort completion ring with dynamic stroke-dashoffset',
      'Tabbed course directory (All, In Progress, Completed)',
      'Working curriculum modal builder with local state publication',
    ],
    tokens: [
      { name: 'Sidebar Dark', value: '#0f172a', type: 'color' },
      { name: 'Dashboard Canvas', value: '#f8fafc', type: 'color' },
      { name: 'Brand Electric Blue', value: '#3b82f6', type: 'color' },
      { name: 'Success Emerald', value: '#10b981', type: 'color' },
      { name: 'Amber Active', value: '#f59e0b', type: 'color' },
      { name: 'UI Sans', value: 'Inter, system-ui, sans-serif', type: 'typography' },
      { name: 'Card Elevation', value: '0 4px 20px rgba(0, 0, 0, 0.05)', type: 'shadow' },
    ],
  },
]

export default function DesignLabSection() {
  const [activeId, setActiveId] = useState<PrototypeId>('coffee-colors')
  const [showTokens, setShowTokens] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const activeMeta = PROTOTYPES_REGISTRY.find((p) => p.id === activeId) || PROTOTYPES_REGISTRY[0]

  const getDummyUrl = (id: PrototypeId) => {
    switch (id) {
      case 'coffee-colors':
        return 'brewlab.design/tasting-experience'
      case 'travely':
        return 'travely.expeditions/himalayan-traverse'
      case 'real-estate':
        return 'residences.architectural/bespoke-interior'
      case 'course-f':
        return 'coursef.app/instructor-dashboard'
    }
  }

  return (
    <section className="design-lab-section container" id="designs">
      {/* Editorial Section Heading */}
      <div className="section-heading">
        <div>
          <p className="eyebrow">02 / Interactive Design Lab</p>
          <h2>
            Tactile UI craft &amp;
            <br />
            <em>live prototypes.</em>
          </h2>
        </div>
        <p className="section-note">
          Hands-on web implementations of recent Figma design explorations. Every prototype below is fully working — switch palettes, inspect spatial hotspots, trigger micro-physics, or explore dashboard analytics.
        </p>
      </div>

      {/* Prototype Selector Pills */}
      <div className="prototype-nav-pills" role="tablist">
        {PROTOTYPES_REGISTRY.map((p) => {
          const isActive = p.id === activeId
          return (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`proto-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => {
                setActiveId(p.id)
                setShowTokens(false)
              }}
            >
              <span className="proto-tab-badge">
                {p.id === 'coffee-colors' && '☕'}
                {p.id === 'travely' && '🏔️'}
                {p.id === 'real-estate' && '🏛️'}
                {p.id === 'course-f' && '📊'}
              </span>
              <span className="proto-tab-name">
                {p.id === 'coffee-colors' && 'Coffee Colors'}
                {p.id === 'travely' && 'Travely'}
                {p.id === 'real-estate' && 'Luxury Interior'}
                {p.id === 'course-f' && 'Course-F SaaS'}
              </span>
              <span className="proto-tab-sub">{p.category.split('·')[0]}</span>
            </button>
          )
        })}
      </div>

      {/* Main Interactive Stage */}
      <div className="design-lab-stage">
        <DeviceFrame
          title={activeMeta.title}
          url={getDummyUrl(activeId)}
          category={activeMeta.category}
          figmaUrl={activeMeta.figmaUrl}
          showTokens={showTokens}
          onToggleTokens={() => setShowTokens(!showTokens)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        >
          {activeId === 'coffee-colors' && <CoffeeColorsShowcase />}
          {activeId === 'travely' && <TravelyShowcase />}
          {activeId === 'real-estate' && <RealEstateShowcase />}
          {activeId === 'course-f' && <CourseFShowcase />}
        </DeviceFrame>

        {/* Design Token Inspection Drawer */}
        <DesignTokenDrawer
          tokens={activeMeta.tokens}
          isOpen={showTokens}
          onClose={() => setShowTokens(false)}
        />
      </div>

      {/* Design Insights & Specification Bar Below Canvas */}
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
