import { useState } from 'react'
import joinData from '../../data/join.json'
import ApplyModal from '../ui/ApplyModal'
import './Join.css'

// Set your Discord invite URL here
const DISCORD_URL = 'https://discord.gg/nexuscity'

const stats = [
  { num: '500+', label: 'Active Members'  },
  { num: '#1',   label: 'Premium RP'      },
  { num: '24/7', label: 'Server Uptime'   },
]

export default function Join() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <section className="join" id="join">
        {/* BG spans full section */}
        <div className="join__bg" style={{ backgroundImage: `url("${joinData.assets.bg}")` }} />
        <div className="join__gradient" />

        {/* Character at left edge */}
        <img
          src={joinData.assets.actor}
          alt="Join Character"
          className="join__character char-rise"
          loading="lazy"
        />

        {/* Text card pushed to the right */}
        <div className="join__content">
          <div className="join__card fade-up">
            <span className="join__tag">{joinData.tag}</span>

            <h2 className="join__title glusp">
              <span className="fw-700">READY TO</span>
              <span className="join__title-outline fw-700">{joinData.title}</span>
            </h2>

            <p className="join__body fw-300">
              {joinData.text}
            </p>

            {/* Opens the modal instead of navigating */}
            <button
              className="btn-primary glusp fw-700"
              onClick={() => setModalOpen(true)}
              id="apply-now-btn"
            >
              {joinData.action.label}
            </button>

            <div className="join__stats fade-up">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="join__stat-num glusp fw-700">{s.num}</div>
                  <div className="join__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discord modal */}
      <ApplyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        discordUrl={DISCORD_URL}
      />
    </>
  )
}
