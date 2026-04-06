import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="nav reveal-hero">
      <div className="logo glusp fw-bold">
        <img src="/Logo/Logo.png" alt="Nexus" />
        NEXUS
      </div>

      <div className={`nav-links ${isOpen ? 'active' : ''} glusp fw-slim`}>
        <a href="#hero" onClick={() => setIsOpen(false)}>HOME</a>
        <a href="#about" onClick={() => setIsOpen(false)}>ABOUT</a>
        <a href="#architecture" onClick={() => setIsOpen(false)}>SYSTEMS</a>
        <a href="#society" onClick={() => setIsOpen(false)}>SOCIETY</a>
        <a href="#join" onClick={() => setIsOpen(false)}>JOIN</a>
      </div>

      <div 
        className={`menu-toggle ${isOpen ? 'active' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  )
}
