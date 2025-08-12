import { useState } from 'react'
import './App.css'

function App() {
  const [symptomInput, setSymptomInput] = useState('')
  const [symptoms, setSymptoms] = useState([])
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addSymptom = () => {
    const trimmed = symptomInput.trim()
    if (!trimmed) return
    if (symptoms.includes(trimmed)) return
    setSymptoms(prev => [...prev, trimmed])
    setSymptomInput('')
  }

  const removeSymptom = (s) => {
    setSymptoms(prev => prev.filter(x => x !== s))
  }

  const diagnose = async () => {
    setLoading(true)
    setError('')
    setResults([])
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to diagnose')
      }
      const data = await res.json()
      setResults(data.candidates || [])
    } catch (e) {
      setError(e.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: 16, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Health Diagnosis (MERN)</h1>
      <p>Enter symptoms one by one. Example: fever, cough, headache.</p>

      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={symptomInput}
          onChange={e => setSymptomInput(e.target.value)}
          placeholder="Add a symptom"
          onKeyDown={e => { if (e.key === 'Enter') addSymptom() }}
          style={{ flex: 1, padding: 10, border: '1px solid #ccc', borderRadius: 8 }}
        />
        <button onClick={addSymptom} style={{ padding: '10px 14px' }}>Add</button>
      </div>

      {symptoms.length > 0 && (
        <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {symptoms.map(s => (
            <span key={s} style={{ background: '#eef', padding: '6px 10px', borderRadius: 999, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              {s}
              <button onClick={() => removeSymptom(s)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>×</button>
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: 16 }}>
        <button onClick={diagnose} disabled={loading || symptoms.length === 0}>
          {loading ? 'Diagnosing…' : 'Diagnose'}
        </button>
      </div>

      {error && <div style={{ color: 'crimson', marginTop: 12 }}>{error}</div>}

      {results.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <h2>Possible conditions</h2>
          <ul>
            {results.map(r => (
              <li key={r.name}>
                <strong>{r.name}</strong> — match {(r.score * 100).toFixed(0)}% ({r.matchedSymptoms?.join(', ')})
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 12, color: '#666' }}>
            This tool is for informational purposes only and not a medical diagnosis. Consult a healthcare professional.
          </p>
        </div>
      )}
    </div>
  )
}

export default App
