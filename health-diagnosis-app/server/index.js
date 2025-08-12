import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory knowledge base
const diseases = [
  { name: 'Common Cold', symptoms: ['cough', 'sore throat', 'runny nose', 'sneezing', 'mild fever'] },
  { name: 'Influenza (Flu)', symptoms: ['high fever', 'chills', 'body aches', 'fatigue', 'dry cough', 'headache'] },
  { name: 'COVID-19', symptoms: ['fever', 'dry cough', 'loss of taste', 'loss of smell', 'shortness of breath', 'fatigue'] },
  { name: 'Strep Throat', symptoms: ['sore throat', 'fever', 'swollen lymph nodes', 'red tonsils'] },
  { name: 'Migraine', symptoms: ['headache', 'nausea', 'sensitivity to light', 'sensitivity to sound'] },
  { name: 'Allergic Rhinitis', symptoms: ['sneezing', 'itchy eyes', 'runny nose', 'nasal congestion'] },
  { name: 'Gastroenteritis', symptoms: ['diarrhea', 'vomiting', 'stomach pain', 'nausea', 'low fever'] },
];

function scoreDisease(userSymptoms, disease) {
  const set = new Set(userSymptoms.map(s => s.toLowerCase().trim()));
  const overlap = disease.symptoms.filter(s => set.has(s.toLowerCase()));
  const score = overlap.length / disease.symptoms.length;
  return { name: disease.name, overlapCount: overlap.length, score, matchedSymptoms: overlap };
}

app.post('/api/diagnose', (req, res) => {
  const { symptoms } = req.body || {};
  if (!Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ error: 'Provide a non-empty array of symptoms' });
  }
  const results = diseases
    .map(d => scoreDisease(symptoms, d))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
  res.json({ candidates: results });
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});