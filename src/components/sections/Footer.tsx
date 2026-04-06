import footerData from '../../data/footer.json'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      
      {/* ── Content Container (Pushed down into the blank red space) ── */}
      <div className="site-footer__content fade-in">
        
        {/* CTA Row */}
        <div className="site-footer__cta-row">
          <div className="site-footer__cta-title glusp fade-up">
            READY TO INITIALIZE?
            <span className="fw-300">Make your mark in the city.</span>
          </div>
          <div className="site-footer__cta-actions fade-up">
            <a href="#hero" className="btn-ghost glusp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon fill="currentColor" points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              WATCH TRAILER
            </a>
            <button 
              className="btn-primary glusp"
              onClick={() => {
                const btn = document.getElementById('apply-now-btn')
                if (btn) btn.click()
              }}
            >
              JOIN THE CITY
            </button>
          </div>
        </div>

        {/* Links Columns */}
        <div className="site-footer__columns-wrapper">
          <div className="site-footer__columns">
            
            {/* Brand Column */}
          <div className="site-footer__brand-col fade-up">
            <div className="site-footer__brand-logo glusp">
              <img src="/Logo/logo.svg" alt="Nexus City Logo" className="logo-svg" style={{ height: '32px', width: 'auto'}} />
              {footerData.branding.title}
            </div>
            
            <button className="site-footer__lang glusp" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              ENGLISH
            </button>

            <div className="site-footer__credit fw-300">
              {footerData.branding.credit.toUpperCase()} <br/>
              {footerData.copyright}
            </div>
          </div>

          {/* Nav Columns */}
          {footerData.columns.map((col, i) => (
            <div className="site-footer__nav-col fade-up" key={i}>
              <span className="site-footer__col-title glusp">{col.title}</span>
              {col.links.map((link, j) => {
                const isExternal = link.url.startsWith('http')
                return (
                  <a 
                    key={j} 
                    href={link.url} 
                    className="site-footer__link fw-300"
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>
          ))}

          </div>
        </div>

      </div>
    </footer>
  )
}
