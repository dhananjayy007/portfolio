'use client'

import React from 'react'

interface DeviceFrameProps {
  title: string
  category: string
  isFullscreen: boolean
  onToggleFullscreen: () => void
  children: React.ReactNode
}

export default function DeviceFrame({
  title,
  category,
  isFullscreen,
  onToggleFullscreen,
  children,
}: DeviceFrameProps) {
  return (
    <div className={`studio-device-shell ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Studio Header Bar */}
      <div className="studio-device-chrome">
        <div className="studio-traffic-lights" aria-hidden="true">
          <span className="dot red" />
          <span className="dot yellow" />
          <span className="dot green" />
        </div>

        <div className="studio-title-badge">
          <span className="studio-category">{category}</span>
          <span className="studio-divider">/</span>
          <span className="studio-prototype-name">{title}</span>
        </div>

        <div className="studio-actions">
          <button
            type="button"
            className="studio-btn fullscreen-btn"
            onClick={onToggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? '✕ Exit' : '⛶ Expand'}
          </button>
        </div>
      </div>

      {/* Screen Viewport */}
      <div className="studio-device-viewport">
        {children}
      </div>
    </div>
  )
}
