import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);

  const getStock = async () => {
    try {
      const res = await fetch(`/api/stocks/price/${symbol.toUpperCase()}`);
      if (!res.ok) throw new Error("Stock not found");
      const data = await res.json();
      setPrice(data.price);
    } catch (err) {
      console.error(err);
      setPrice(null);
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Dashboard</h1>
      <input 
        value={symbol} 
        onChange={e => setSymbol(e.target.value)} 
        placeholder="Enter stock symbol (AAPL)"
      />
      <button onClick={getStock}>Get Price</button>
      {price && <p>Price: {price}</p>}
    </div>
  );
}

export default App;