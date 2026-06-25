import { Routes, Route } from 'react-router-dom'
import Terminal from './pages/Terminal'
import SolarSystem from './pages/SolarSystem'
import MoonOverview from './pages/MoonOverview'
import MoonMonsters from './pages/MoonMonsters'
import MonsterPage from './pages/MonsterPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Terminal />} />
      <Route path="/moons" element={<SolarSystem />} />
      <Route path="/moons/:id" element={<MoonOverview />} />
      <Route path="/moons/:id/monsters" element={<MoonMonsters />} />
      <Route path="/monsters/:id" element={<MonsterPage />} />
    </Routes>
  )
}

export default App