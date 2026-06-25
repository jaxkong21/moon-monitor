import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMoons } from '../api/client'
import './SolarSystem.css'

const MOON_POSITIONS = {
  1:  { x: 18, y: 20 },
  2:  { x: 26, y: 12 },
  4:  { x: 24, y: 34 },
  6:  { x: 72, y: 22 },
  3:  { x: 82, y: 13 },
  5:  { x: 84, y: 30 },
  7:  { x: 12, y: 62 },
  8:  { x: 88, y: 55 },
  9:  { x: 50, y: 68 },
  11: { x: 34, y: 80 },
  10: { x: 74, y: 78 },
}

const MOON_ASSETS = {
  1:  'experimentation',
  2:  'assurance',
  3:  'vow',
  4:  'offense',
  5:  'march',
  6:  'adamance',
  7:  'rend',
  8:  'dine',
  9:  'titan',
  10: 'artifice',
  11: 'embrion',
}

function Star({ x, y, size, duration, delay }) {
  return (
    <div
      className="star"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.7 ? '1px' : '2px',
    duration: 18 + Math.random() * 36,
    delay: -Math.random() * 54,
  }))
}

const STARS = generateStars(500)

function SolarSystem() {
  const [moons, setMoons] = useState([])
  const [hoveredMoon, setHoveredMoon] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getMoons().then(data => {
      setMoons(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="solar-system">
        {STARS.map(star => <Star key={star.id} {...star} />)}
        <div className="solar-loading">CONNECTING TO FORTUNE-9...</div>
      </div>
    )
  }

  return (
    <div className="solar-system">
      {STARS.map(star => (
        <Star key={star.id} {...star} />
      ))}

      {moons.map(moon => {
        const pos = MOON_POSITIONS[moon.id]
        const asset = MOON_ASSETS[moon.id]
        if (!pos || !asset) return null

        return (
          <div
            key={moon.id}
            className="moon-wrapper"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onMouseEnter={() => setHoveredMoon(moon.id)}
            onMouseLeave={() => setHoveredMoon(null)}
            onClick={() => navigate(`/moons/${moon.id}`)}
          >
            {hoveredMoon === moon.id && (
              <div className="hazard-popup">
                Hazard Level: {moon.hazard_level}
              </div>
            )}
            <img
              className={`moon-icon ${hoveredMoon === moon.id ? 'moon-hovered' : ''}`}
              src={`/moons/LCmoonImages/assets/${asset}.png`}
              alt={moon.moon_name}
            />
            <div className="moon-label">{moon.moon_name}</div>
            <div className="moon-price">{moon.price}</div>
          </div>
        )
      })}
    </div>
  )
}

export default SolarSystem