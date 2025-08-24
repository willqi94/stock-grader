import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('');
  const [metrics, setMetrics] = useState(null);

  const getStock = async () => {
    try {
      const res = await fetch(`/api/stocks/grade/${symbol.toUpperCase()}`);
      if (!res.ok) throw new Error("Stock not found");
      const data = await res.json();
      setMetrics(data);
    } catch (err) {
      console.error(err);
      setMetrics(null);
      alert(err.message);
    }
  };


  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Grader</h1>
      <input 
        value={symbol} 
        onChange={e => setSymbol(e.target.value)} 
        placeholder="Enter stock symbol (AAPL)"
      />
      <button onClick={getStock}>Get Stock</button>
      {metrics && (
        <div>
          {Object.entries(metrics).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;