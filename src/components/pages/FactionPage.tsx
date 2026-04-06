import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import policeData from '../../data/factions/police.json'
import hospitalData from '../../data/factions/hospital.json'
import dealershipData from '../../data/factions/dealership.json'
import mechanicData from '../../data/factions/mechanic.json'
import governmentData from '../../data/factions/government.json'
import foodData from '../../data/factions/food.json'
import logisticsData from '../../data/factions/logistics.json'
import fuelData from '../../data/factions/fuel.json'

import Navbar from '../sections/Navbar'
import './FactionPage.css'

gsap.registerPlugin(ScrollTrigger)

const FACTION_MAP: Record<string, any> = {
  police: policeData,
  hospital: hospitalData,
  dealership: dealershipData,
  mechanic: mechanicData,
  government: governmentData,
  food: foodData,
  logistics: logisticsData,
  fuel: fuelData
}

export default function FactionPage() {
  const { id } = useParams()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (id && FACTION_MAP[id.toLowerCase()]) {
      setData(FACTION_MAP[id.toLowerCase()])
    }
  }, [id])

  useEffect(() => {
    if (!data) return
    setTimeout(() => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      
      gsap.utils.toArray<Element>('.fp-fade-up').forEach(el => {
        gsap.fromTo(el, 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' } }
        )
      })
      ScrollTrigger.refresh()
    }, 100)
  }, [data])

  if (!data) {
    return (
      <div className="faction-page__not-found">
        <Navbar />
        <div style={{ padding: '12rem 2rem', textAlign: 'center' }}>
          <h1 className="glusp fw-700" style={{ fontSize: '3rem', color: 'var(--c-red)' }}>DATA CORRUPTED</h1>
          <p className="fw-300">The requested faction file could not be loaded from the system.</p>
          <Link to="/" className="btn-primary glusp fw-700" style={{ marginTop: '2rem' }}>RETURN TO CITY</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="faction-page">
      <Navbar />

      {/* Hero Header */}
      <section className="faction-hero">
        <div className="faction-hero__bg" style={{ backgroundImage: `url("${data.assets.bg}")` }} />
        <div className="faction-hero__gradient" />
        <div className="faction-hero__content">
          <div className="faction-hero__tag glusp fw-700">{data.type}</div>
          <h1 className="faction-hero__title glusp fw-700" style={{ '--theme-color': data.assets.theme } as any}>
            {data.name}
          </h1>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="faction-content">
        <div className="faction-content__grid">
          
          {/* Mission & Vision Info */}
          <div className="faction-col fp-fade-up">
            <h3 className="glusp fw-700 faction__section-title">THE DIRECTIVE</h3>
            
            <div className="faction__block">
              <h4 className="glusp fw-700">MISSION</h4>
              <p className="fw-300">{data.mission}</p>
            </div>

            <div className="faction__block">
              <h4 className="glusp fw-700">VISION</h4>
              <p className="fw-300">{data.vision}</p>
            </div>
            
            {/* 10-codes if they exist */}
            {data.codes && (
              <div className="faction__block" style={{ marginTop: '2rem' }}>
                <h4 className="glusp fw-700">COMMUNICATION / 10-CODES</h4>
                <div className="faction__codes">
                  {data.codes.map((c: any, i: number) => (
                    <div key={i} className="faction__code-item fw-300">
                      <span className="fw-700 glusp" style={{ color: data.assets.theme }}>{c.code}</span>
                      <span>{c.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rules and Roles */}
          <div className="faction-col fp-fade-up">
            <h3 className="glusp fw-700 faction__section-title">SYSTEM RULES & DIVISIONS</h3>

            {/* Sub-Roles / Factions */}
            <div className="faction__block">
              <h4 className="glusp fw-700">AVAILABLE DIVISIONS</h4>
              <div className="faction__roles">
                {data.roles.map((r: any, i: number) => (
                  <div key={i} className="faction__role-item">
                    <div className="glusp fw-700">{r.name}</div>
                    <div className="fw-300" style={{ fontSize: '0.85rem', color: 'var(--c-muted)', marginTop: '0.2rem' }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rules */}
            <div className="faction__block" style={{ marginTop: '2rem' }}>
              <h4 className="glusp fw-700" style={{ color: 'var(--c-red)' }}>STANDARD OPERATING PROCEDURE</h4>
              
              <div className="faction__rules">
                <strong className="glusp fw-600">Basic Protocol:</strong>
                <ul className="fw-300">
                  {data.rules.basic.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>

                <strong className="glusp fw-600" style={{ marginTop: '1rem', display: 'block' }}>Advanced Protocol:</strong>
                <ul className="fw-300">
                  {data.rules.advanced.map((r: string, i: number) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}
