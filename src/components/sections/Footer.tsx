import footerData from '../../data/footer.json'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__landscape" />
      
      <div className="footer__inner">
        {/* ── Top CTA Row ── */}
        <div className="footer__cta-row">
          <div className="footer__cta-title glusp fade-up">
            READY TO INITIALIZE?
            <span className="fw-300">Make your mark in the city.</span>
          </div>
          <div className="footer__cta-actions fade-up">
            <a href="#hero" className="footer__btn-ghost glusp">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polygon fill="currentColor" points="10 8 16 12 10 16 10 8"></polygon>
              </svg>
              WATCH TRAILER
            </a>
            <button 
              className="footer__btn-primary glusp"
              onClick={() => {
                const btn = document.getElementById('apply-now-btn')
                if (btn) btn.click()
              }}
            >
              JOIN THE CITY
            </button>
          </div>
        </div>

        {/* ── Bottom Columns ── */}
        <div className="footer__columns">
          
          {/* Brand Column */}
          <div className="footer__brand-col fade-up">
            <div className="footer__brand-logo glusp">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 22 22 22"></polygon>
              </svg>
              {footerData.branding.title}
            </div>
            
            <button className="footer__lang glusp" style={{ background: 'none', border: 'none', textAlign: 'left', padding: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              ENGLISH
            </button>

            <div className="footer__credit fw-300">
              {footerData.branding.credit.toUpperCase()} <br/>
              {footerData.copyright}
            </div>
          </div>

          {/* Links Columns */}
          {footerData.columns.map((col, i) => (
            <div key={i} className="footer__nav-col fade-up">
              <span className="footer__col-title glusp">{col.title}</span>
              {col.links.map((link, j) => (
                <a key={j} href={link.url} className="footer__link fw-300">
                  {link.label}
                </a>
              ))}
            </div>
          ))}

        </div>
      </div>
    </footer>
  )
}
