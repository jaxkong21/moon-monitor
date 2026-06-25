import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMoon } from '../api/client'
import './MoonOverview.css'

function MoonOverview() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moon, setMoon] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMoon(id).then(data => {
      setMoon(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <div className="overview-loading">LOADING...</div>
  }

  const descriptionParts = moon.description ? moon.description.split('\n') : []
  const assetName = moon.moon_name.split('-')[1].toLowerCase()

  return (
    <div className="overview-screen">
      <div className="overview-back" onClick={() => navigate('/moons')}>
        ← BACK
      </div>

      <div className="overview-content">
        <div className="overview-header">
          <h1 className="overview-title">{moon.moon_name}</h1>
          <div className="overview-badges">
            <span className="overview-hazard">HAZARD: {moon.hazard_level}</span>
            <span className="overview-price">{moon.price}</span>
          </div>
        </div>

        <img
          className="overview-image"
          src={`/moons/LCmoonImages/previews/${assetName}.png`}
          alt={moon.moon_name}
        />

        <div className="overview-stats">
          <div className="stat">
            <span className="stat-label">MIN SCRAP</span>
            <span className="stat-value">{moon.min_scrap}</span>
          </div>
          <div className="stat">
            <span className="stat-label">MAX SCRAP</span>
            <span className="stat-value">{moon.max_scrap}</span>
          </div>
          <div className="stat">
            <span className="stat-label">INDOOR POWER</span>
            <span className="stat-value">{moon.max_indoor_power}</span>
          </div>
          <div className="stat">
            <span className="stat-label">OUTDOOR POWER</span>
            <span className="stat-value">{moon.max_outdoor_power}</span>
          </div>
          <div className="stat">
            <span className="stat-label">MAP SIZE</span>
            <span className="stat-value">{moon.map_size_multiplier}x</span>
          </div>
        </div>

        <div className="overview-description">
          {descriptionParts.map((part, i) => (
            <p key={i}>{part}</p>
          ))}
        </div>

        <button
          className="overview-inhabitants-btn"
          onClick={() => navigate(`/moons/${id}/monsters`)}
        >
          SHOW INHABITANTS
        </button>
      </div>
    </div>
  )
}

export default MoonOverview