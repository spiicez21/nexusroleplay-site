import { useEffect } from 'react'
import './ApplyModal.css'

interface ApplyModalProps {
  isOpen: boolean
  onClose: () => void
  discordUrl?: string
}

const DiscordIcon = () => (
  <svg viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
    <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15zM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69z"/>
  </svg>
)

export default function ApplyModal({ isOpen, onClose, discordUrl = '#' }: ApplyModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="apply-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Apply to Nexus City"
    >
      <div className="apply-card">

        {/* Atmospheric background */}
        <div className="apply-card__scene-bg" />

        {/* AJ — bleeds from right */}
        <img
          src="/Assets/AJ/aj.png"
          alt="AJ — Nexus City"
          className="apply-card__character"
          draggable={false}
        />

        {/* Close */}
        <button className="apply-card__close" onClick={onClose} aria-label="Close">✕</button>

        {/* Content — left 58% */}
        <div className="apply-card__content">

          {/* Top */}
          <span className="apply-card__tag glusp">ONBOARDING</span>

          {/* Headline */}
          <div className="apply-card__headline">
            <span className="apply-card__eyebrow glusp">Nexus City Roleplay</span>
            <h2 className="apply-card__title glusp">
              <span className="fw-700">JOIN</span>
              <span className="apply-card__title-muted fw-700">THE CITY</span>
            </h2>
          </div>

          {/* Bottom */}
          <div className="apply-card__bottom">
            <p className="apply-card__sub fw-300">
              Applications via Discord.<br />
              Join and open <strong>#apply</strong> to begin.
            </p>
            <a
              href={discordUrl}
              target="_blank"
              rel="noreferrer"
              className="apply-card__cta glusp fw-700"
            >
              <DiscordIcon />
              JOIN DISCORD
            </a>
          </div>

        </div>

        {/* Bottom-right metadata */}
        <div className="apply-card__meta">
          <span className="apply-card__meta-server glusp fw-700">nexus.city</span>
          <div className="apply-card__meta-online glusp">
            <span className="apply-card__meta-dot" />
            ONLINE
          </div>
        </div>

      </div>
    </div>
  )
}
