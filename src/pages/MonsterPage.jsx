import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import './MonsterPage.css'
import { getMonster, API } from '../api/client'

const MOON_ORDER = [
  { key: '41-Experimentation', label: '41-Experimentation' },
  { key: '220-Assurance',      label: '220-Assurance'      },
  { key: '56-Vow',             label: '56-Vow'             },
  { key: '21-Offense',         label: '21-Offense'         },
  { key: '61-March',           label: '61-March'           },
  { key: '20-Adamance',        label: '20-Adamance'        },
  { key: '85-Rend',            label: '85-Rend'            },
  { key: '7-Dine',             label: '7-Dine'             },
  { key: '8-Titan',            label: '8-Titan'            },
  { key: '68-Artifice',        label: '68-Artifice'        },
  { key: '5-Embrion',          label: '5-Embrion'          },
]

function MonsterPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [monster, setMonster] = useState(null)
  const [loading, setLoading] = useState(true)

  const fromMoonId = location.state?.fromMoonId
  const fromMoonName = location.state?.fromMoonName

  useEffect(() => {
    getMonster(id).then(data => {
      setMonster(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <div className="monster-page-loading">LOADING...</div>
  }

  const descriptionParts = monster.description ? monster.description.split('\n') : []

  return (
    <div className="monster-page-screen">
      <div
        className="monster-page-back"
        onClick={() => fromMoonId
          ? navigate(`/moons/${fromMoonId}/monsters`)
          : navigate(-1)
        }
      >
        ← BACK
      </div>

      <div className="monster-page-content">
        <div className="monster-page-header">
          <img
            className="monster-page-image"
            src={`${API}/proxy-image?url=${encodeURIComponent(monster.image_path)}`}
            alt={monster.name}
          />
          <div className="monster-page-header-info">
            <h1 className="monster-page-name">{monster.name}</h1>
            <span className="monster-page-placement">{monster.placement}</span>
            <div className="monster-page-description">
              {descriptionParts.map((part, i) => (
                <p key={i}>{part}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="monster-page-spawns">
          <h2>SPAWN CHANCES</h2>
          <table>
            <thead>
              <tr>
                <th>Moon</th>
                <th>Spawn %</th>
              </tr>
            </thead>
            <tbody>
              {MOON_ORDER.map(moon => {
                const chance = monster.spawns?.[moon.key] ?? 0
                const isFrom = fromMoonName === moon.label
                const isZero = chance === 0
                return (
                  <tr
                    key={moon.key}
                    className={`${isFrom ? 'highlight' : ''} ${isZero ? 'zero' : ''}`}
                  >
                    <td>{moon.label}</td>
                    <td>{chance}%</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MonsterPage