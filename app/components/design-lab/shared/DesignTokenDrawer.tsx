'use client'

import React, { useState } from 'react'
import { DesignToken } from '../types'

interface DesignTokenDrawerProps {
  tokens: DesignToken[]
  isOpen: boolean
  onClose: () => void
}

export default function DesignTokenDrawer({
  tokens,
  isOpen,
  onClose,
}: DesignTokenDrawerProps) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null)

  if (!isOpen) return null

  const handleCopy = (value: string, name: string) => {
    try {
      navigator.clipboard.writeText(value)
      setCopiedToken(name)
      setTimeout(() => setCopiedToken(null), 1800)
    } catch {}
  }

  const colorTokens = tokens.filter((t) => t.type === 'color')
  const typographyTokens = tokens.filter((t) => t.type === 'typography')
  const otherTokens = tokens.filter((t) => t.type !== 'color' && t.type !== 'typography')

  return (
    <div className="token-drawer-overlay" onClick={onClose}>
      <aside className="token-drawer-panel" onClick={(e) => e.stopPropagation()}>
        <div className="token-drawer-header">
          <div>
            <h3>Design System Tokens</h3>
            <p>Extracted from Figma source specs</p>
          </div>
          <button type="button" className="token-close-btn" onClick={onClose} aria-label="Close drawer">
            ✕
          </button>
        </div>

        <div className="token-drawer-body">
          {/* Colors */}
          {colorTokens.length > 0 && (
            <div className="token-section">
              <h4>Color Palette</h4>
              <div className="token-color-grid">
                {colorTokens.map((t) => (
                  <button
                    key={t.name}
                    type="button"
                    className="token-color-card"
                    onClick={() => handleCopy(t.value, t.name)}
                    title="Click to copy hex"
                  >
                    <span
                      className="token-color-swatch"
                      style={{ backgroundColor: t.value }}
                    />
                    <div className="token-meta">
                      <span className="token-name">{t.name}</span>
                      <code className="token-value">{t.value}</code>
                    </div>
                    {copiedToken === t.name && <span className="token-copied-pill">Copied!</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Typography */}
          {typographyTokens.length > 0 && (
            <div className="token-section">
              <h4>Typography</h4>
              <div className="token-list">
                {typographyTokens.map((t) => (
                  <div key={t.name} className="token-row">
                    <span className="token-name">{t.name}</span>
                    <code className="token-value">{t.value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Tokens */}
          {otherTokens.length > 0 && (
            <div className="token-section">
              <h4>Geometry &amp; Atmosphere</h4>
              <div className="token-list">
                {otherTokens.map((t) => (
                  <div key={t.name} className="token-row">
                    <span className="token-name">{t.name}</span>
                    <code className="token-value">{t.value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>
    </div>
  )
}
