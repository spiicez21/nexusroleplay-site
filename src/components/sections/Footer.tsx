import footerData from '../../data/footer.json'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__wordmark glusp fw-700 fade-up">
            {footerData.branding.title}
          </div>
          <div className="footer__credit">
            <span className="footer__credit-by">DESIGNED &amp; DEVELOPED BY</span>
            <span className="footer__credit-name glusp fw-700">
              {footerData.branding.credit.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="footer__grid">
          <div className="footer__col fade-up">
            <span className="footer__col-label glusp fw-700">SOCIAL ID&apos;S</span>
            <div className="footer__social-list">
              {footerData.socials.map((s, i) => (
                <a key={i} href={s.url} className="footer__social" target="_blank" rel="noreferrer">
                  <span className="footer__social-platform">{s.name}</span>
                  <span className="footer__social-handle fw-600">{s.id}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="footer__col fade-up">
            <span className="footer__col-label glusp fw-700">NAVIGATION</span>
            <div className="footer__link-list">
              {footerData.links.map((l, i) => (
                <a key={i} href={l.url} className="footer__link fw-300">{l.label}</a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom fade-in">
        <span className="footer__copyright glusp fw-600">{footerData.copyright}</span>
        <div className="footer__system-status glusp fw-600">
          <span className="footer__status-dot" />
          SYSTEM STABLE — V2.4.0
        </div>
      </div>
    </footer>
  )
}
