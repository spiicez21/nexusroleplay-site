const Navbar = () => {
  return (
    <nav className="nav reveal-hero">
      <a href="#top" className="logo">
        <img src="/Logo/logo.svg" alt="NEXUS RP" />
        <span className="glusp">NEXUS CITY</span>
      </a>
      <div className="nav-links">
        <a href="#about">Project</a>
        <a href="#systems">Systems</a>
        <a href="#society">Society</a>
        <a href="#join" style={{ color: 'var(--red-accent)' }}>Initiate</a>
      </div>
    </nav>
  )
}

export default Navbar
