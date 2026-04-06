import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <nav className="nav">
      <div className="nav-logo glusp fw-700">
        <img src="/Logo/Logo.png" alt="Nexus" />
        NEXUS
      </div>

      <div className={`nav-links glusp fw-600${isOpen ? ' active' : ''}`}>
        <a href="#hero"     onClick={close}>HOME</a>
        <a href="#about"    onClick={close}>ABOUT</a>
        <a href="#systems"  onClick={close}>SYSTEMS</a>
        <a href="#society"  onClick={close}>SOCIETY</a>
        <a href="#join"     onClick={close}>JOIN</a>
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
