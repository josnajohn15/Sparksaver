import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: input })
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to fetch prediction' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Hugging Face Model Predictor</h1>
      
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter your text here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Submit'}
      </button>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
