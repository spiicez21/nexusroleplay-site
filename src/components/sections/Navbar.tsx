import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const close = () => setIsOpen(false)

  // Helper to determine path: if we are not on home, point literally to /#anchor
  const path = (hash: string) => location.pathname === '/' ? hash : `/${hash}`

  return (
    <nav className="nav">
      <div className="nav-logo glusp fw-700">
        <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: 'inherit' }}>
          <img src="/Logo/logo.svg" alt="Nexus City Logo" className="logo-svg" style={{ height: '32px', width: 'auto'}} />
          NEXUS
        </Link>
      </div>

      <div className={`nav-links glusp fw-600${isOpen ? ' active' : ''}`}>
        <a href={path('#hero')}     onClick={close}>HOME</a>
        <a href={path('#about')}    onClick={close}>ABOUT</a>
        <a href={path('#systems')}  onClick={close}>SYSTEMS</a>
        <a href={path('#society')}  onClick={close}>SOCIETY</a>
        <a href={path('#join')}     onClick={close}>JOIN</a>
      </div>

      <div
        className={`menu-toggle${isOpen ? ' active' : ''}`}
        onClick={() => setIsOpen(o => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </div>
    </nav>
  )
}
