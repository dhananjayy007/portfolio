'use client'

import React, { useState } from 'react'
import { PrototypeId } from './types'
import DeviceFrame from './shared/DeviceFrame'
import CoffeeColorsShowcase from './prototypes/CoffeeColorsShowcase'
import TravelyShowcase from './prototypes/TravelyShowcase'
import RealEstateShowcase from './prototypes/RealEstateShowcase'
import CourseFShowcase from './prototypes/CourseFShowcase'

interface PrototypeOption {
  id: PrototypeId
  number: string
  name: string
  subtitle: string
  category: string
  tags: string[]
}

const PROTOTYPES: PrototypeOption[] = [
  {
    id: 'coffee-colors',
    number: '01',
    name: 'Coffee Colors',
    subtitle: 'Dynamic Theming & Depth',
    category: 'Brand Experience',
    tags: ['Theming Engine', 'Recessed Arch', 'Ripple Physics'],
  },
  {
    id: 'travely',
    number: '02',
    name: 'Travely',
    subtitle: '3D Mountain Motion',
    category: 'Travel Discovery',
    tags: ['3D Snowfall', 'Stacked Cards', 'Dual Viewport'],
  },
  {
    id: 'real-estate',
    number: '03',
    name: 'Luxury Interior',
    subtitle: 'Hotspots & Bilingual UI',
    category: 'Spatial UI',
    tags: ['RU/EN Toggle', 'Hotspot Pins', 'Frosted Glass'],
  },
  {
    id: 'course-f',
    number: '04',
    name: 'Course-F SaaS',
    subtitle: 'Dashboard & Analytics',
    category: 'SaaS Platform',
    tags: ['SVG Velocity Chart', 'Obsidian Sidebar', 'Radial Gauge'],
  },
]

export default function InteractiveDesignCard() {
  const [activeProto, setActiveProto] = useState<PrototypeId>('coffee-colors')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const activeMeta = PROTOTYPES.find((p) => p.id === activeProto) || PROTOTYPES[0]

  return (
    <article className="project-card project-interactive-card" data-cursor="project">
      {/* Left Column: Editorial Information & Prototype Switcher */}
      <div className="project-copy lab-card-copy">
        <span className="project-number">04</span>
        <div className="lab-copy-content">
          <p className="project-type">UI/UX Systems &amp; Live Prototypes</p>
          <h3>
            Interactive<br />
            <em>Design Lab</em>
          </h3>
          <p className="project-description">
            Interactive explorations of brand systems, 3D atmospheric motion, architectural spatial UI, and high-density SaaS analytics. Switch between 4 working prototypes right inside the stage.
          </p>

          {/* Prototype Selector Pills */}
          <div className="lab-card-picker" role="tablist">
            <span className="picker-title">SELECT PROTOTYPE:</span>
            <div className="picker-buttons">
              {PROTOTYPES.map((p) => {
                const isActive = p.id === activeProto
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`lab-picker-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveProto(p.id)}
                  >
                    <span className="picker-num">{p.number}</span>
                    <div className="picker-text">
                      <strong>{p.name}</strong>
                      <small>{p.subtitle}</small>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="project-tags">
            {activeMeta.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
            <span>Shipped UI Lab</span>
          </div>
        </div>
      </div>

      {/* Right Column: Live Interactive Studio Bezel */}
      <div className="project-visual lab-visual-viewport">
        <DeviceFrame
          title={activeMeta.name}
          category={activeMeta.category}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        >
          {activeProto === 'coffee-colors' && <CoffeeColorsShowcase />}
          {activeProto === 'travely' && <TravelyShowcase />}
          {activeProto === 'real-estate' && <RealEstateShowcase />}
          {activeProto === 'course-f' && <CourseFShowcase />}
        </DeviceFrame>

        <label className="visual-caption">Interactive UI/UX Lab / 04</label>
      </div>
    </article>
  )
}
