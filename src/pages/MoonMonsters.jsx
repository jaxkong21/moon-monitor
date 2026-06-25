import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMoon, getMonstersByMoon } from '../api/client'
import './MoonMonsters.css'

function MonsterCard({ monster, onClick }) {
  return (
    <div className="monster-card" onClick={onClick}>
      <img
        className="monster-card-image"
        src={`http://127.0.0.1:5000/proxy-image?url=${encodeURIComponent(monster.monster_image)}`}
        alt={monster.name}
        />
      <div className="monster-card-name">{monster.name}</div>
      <div className={`monster-card-spawn ${monster.spawn_chance === 0 ? 'zero' : ''}`}>
        {monster.spawn_chance}%
      </div>
    </div>
  )
}

function MoonMonsters() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moon, setMoon] = useState(null)
  const [monsters, setMonsters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMoon(id).then(moonData => {
      setMoon(moonData)
      return getMonstersByMoon(moonData.moon_name)
    }).then(monsterData => {
      setMonsters(monsterData)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <div className="moonmonsters-loading">LOADING...</div>
  }

  const indoors = monsters.filter(m => m.placement === 'indoors')
  const outdoors = monsters.filter(m => m.placement === 'outdoors')

  return (
    <div className="moonmonsters-screen">
      <div className="moonmonsters-back" onClick={() => navigate(`/moons/${id}`)}>
        ← BACK
      </div>

      <div className="moonmonsters-content">
        <h1 className="moonmonsters-title">{moon.moon_name} — INHABITANTS</h1>

        <div className="moonmonsters-section">
          <h2>INDOORS</h2>
          <div className="monster-grid">
            {indoors.map(m => (
              <MonsterCard
                key={m.monster_id}
                monster={m}
                onClick={() => navigate(`/monsters/${m.monster_id}`, {
                  state: { fromMoonId: id, fromMoonName: moon.moon_name }
                })}
              />
            ))}
          </div>
        </div>

        <div className="moonmonsters-section">
          <h2>OUTDOORS</h2>
          <div className="monster-grid">
            {outdoors.map(m => (
              <MonsterCard
                key={m.monster_id}
                monster={m}
                onClick={() => navigate(`/monsters/${m.monster_id}`, {
                  state: { fromMoonId: id, fromMoonName: moon.moon_name }
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoonMonsters