import footerData from '../../data/footer.json'

const Footer = () => {
  return (
    <footer className="footer-big section-padding">
      <div className="footer-container">
        {/* Branding & Credit */}
        <div className="footer-brand-column fade-up">
          <div className="footer-logo glusp fw-bold">{footerData.branding.title}</div>
          <div className="footer-credit-line fw-slim">
            <span className="glusp opacity-30 fs-tiny ls-wide fw-slim">DESIGNED & DEVELOPED BY</span>
            <span className="glusp red-text fw-bold ls-wider">{footerData.branding.credit.toUpperCase()}</span>
          </div>
        </div>

        {/* Links Grid */}
        <div className="footer-grid">
          <div className="footer-column fade-up">
            <h4 className="glusp fw-bold">SOCIAL ID'S</h4>
            <div className="social-list fw-slim">
              {footerData.socials.map((social, i) => (
                <a key={i} href={social.url} className="social-item" target="_blank" rel="noreferrer">
                  <span className="social-name opacity-50">{social.name}</span>
                  <span className="social-id fw-bold">{social.id}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer-column fade-up">
            <h4 className="glusp fw-bold">NAVIGATION</h4>
            <div className="link-list fw-slim">
              {footerData.links.map((link, i) => (
                <a key={i} href={link.url} className="footer-link-item">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extreme Bottom */}
      <div className="footer-bottom-bar fade-up fw-slim">
        <div className="copyright-text glusp fw-slim">{footerData.copyright}</div>
        <div className="system-status">
          <span className="dot pulse-red" />
          <span className="glusp fw-slim">SYSTEM STABLE /// V2.4.0</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
