import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Terminal.css'

const LINES = [
  'FORTUNE-9 OPERATING SYSTEM',
  'Courtesy of the Company',
  '',
  `Happy ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}.`,
  '',
  'Type "moons" to view the moons you may travel to.',
  '',
]

function Terminal() {
  const [displayedLines, setDisplayedLines] = useState([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [input, setInput] = useState('')
  const [ready, setReady] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentLine >= LINES.length) {
      setReady(true)
      setTimeout(() => inputRef.current?.focus(), 100)
      return
    }

    const line = LINES[currentLine]

    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const updated = [...prev]
          updated[currentLine] = (updated[currentLine] || '') + line[currentChar]
          return updated
        })
        setCurrentChar(prev => prev + 1)
      }, 30)
      return () => clearTimeout(timeout)
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(prev => prev + 1)
        setCurrentChar(0)
      }, line === '' ? 50 : 80)
      return () => clearTimeout(timeout)
    }
  }, [currentLine, currentChar])

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      if (input.trim().toLowerCase() === 'moons') {
        navigate('/moons')
      } else {
        setError(`Unknown command: "${input}". Type "moons" to view available moons.`)
        setInput('')
      }
    }
  }

  return (
    <div className="terminal-screen" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-body">
        {displayedLines.map((line, i) => (
          <div key={i} className="terminal-line">{line || '\u00A0'}</div>
        ))}
        {ready && (
          <>
            {error && <div className="terminal-line terminal-error">{error}</div>}
            <div className="terminal-input-row">
            <span>&gt; </span>
            <input
                ref={inputRef}
                className="terminal-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
            />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Terminal