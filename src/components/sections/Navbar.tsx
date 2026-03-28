import navData from '../../data/navigation.json'

const Navbar = () => {
  return (
    <nav className="nav reveal-hero">
      <a href="#top" className="logo">
        <img src={navData.logo.src} alt="NEXUS RP" />
        <span className="glusp">{navData.logo.text}</span>
      </a>
      <div className="nav-links">
        {navData.links.map((link, i) => (
          <a key={i} href={link.href} style={link.highlight ? { color: 'var(--red-accent)' } : undefined}>
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
