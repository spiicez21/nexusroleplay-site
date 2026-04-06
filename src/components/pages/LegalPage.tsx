import './LegalPage.css'

interface Props {
  type: 'tos' | 'privacy'
}

export default function LegalPage({ type }: Props) {
  return (
    <main className="legal-page fade-in">
      <div className="legal-page__container">
        {type === 'tos' ? (
          <>
            <h1 className="glusp fade-up">TERMS OF SERVICE</h1>
            <div className="legal-page__content fade-up">
              <p>Last updated: April 2026</p>
              
              <h2>1. Acceptance of Terms</h2>
              <p>By accessing and joining Nexus City Roleplay, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.</p>

              <h2>2. User Conduct</h2>
              <p>Players must adhere to the community guidelines and respect both the administrators and other players. Harassment, exploits, or toxic behavior will result in a permanent ban.</p>

              <h2>3. Digital Goods</h2>
              <p>Any digital items or priority queue packages purchased are strictly donations to support the server. They are non-refundable and subject to server wipes or economy adjustments.</p>
            </div>
          </>
        ) : (
          <>
            <h1 className="glusp fade-up">PRIVACY POLICY</h1>
            <div className="legal-page__content fade-up">
              <p>Last updated: April 2026</p>

              <h2>1. Information We Collect</h2>
              <p>We collect basic Discord profile information necessary to whitelist and identify you within our server infrastructure, as well as server logs pertaining to your in-game activities.</p>

              <h2>2. How We Use Information</h2>
              <p>Your data is used strictly for authentication, moderation, and improving the server experience. We do not sell or share your data with unauthorized third parties.</p>

              <h2>3. Data Protection</h2>
              <p>We implement standard security measures to keep your data safe. However, public game logs and metadata regarding your interactions may be visible to administrators.</p>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
