'use client'

import React from 'react'

interface DeviceFrameProps {
  title: string
  url: string
  category: string
  figmaUrl: string
  onToggleTokens?: () => void
  showTokens?: boolean
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  children: React.ReactNode
}

export default function DeviceFrame({
  title,
  url,
  category,
  figmaUrl,
  onToggleTokens,
  showTokens,
  isFullscreen,
  onToggleFullscreen,
  children,
}: DeviceFrameProps) {
  return (
    <div className={`device-frame-shell ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Browser Chrome Header */}
      <div className="device-frame-header">
        <div className="device-frame-dots" aria-hidden="true">
          <span className="dot dot-close" />
          <span className="dot dot-min" />
          <span className="dot dot-max" />
        </div>

        <div className="device-frame-url-bar">
          <span className="url-security-icon">🔒</span>
          <span className="url-domain">{url}</span>
          <span className="url-badge">{category}</span>
        </div>

        <div className="device-frame-actions">
          {onToggleTokens && (
            <button
              type="button"
              className={`frame-action-btn ${showTokens ? 'is-active' : ''}`}
              onClick={onToggleTokens}
              title="Inspect Design Tokens"
            >
              <span className="icon">🎨</span>
              <span className="label">Tokens</span>
            </button>
          )}

          {onToggleFullscreen && (
            <button
              type="button"
              className="frame-action-btn"
              onClick={onToggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Expand to Fullscreen'}
            >
              <span>{isFullscreen ? '✕' : '⛶'}</span>
            </button>
          )}

          <a
            href={figmaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="frame-action-btn figma-link"
            title="Open in Figma"
          >
            <span>Figma ↗</span>
          </a>
        </div>
      </div>

      {/* Interactive Viewport Canvas */}
      <div className="device-frame-viewport">
        {children}
      </div>
    </div>
  )
}
