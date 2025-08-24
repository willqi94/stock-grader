import React, { useState } from 'react';

function App() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);
  const [forward_pe, setPE] = useState(null);

  const getStockPrice = async () => {
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

  const getStockPE = async () => {
    try {
      const res = await fetch(`/api/stocks/forward_pe/${symbol.toUpperCase()}`);
      if (!res.ok) throw new Error("Stock not found");
      const data = await res.json();
      setPE(data.forward_pe);
    } catch (err) {
      console.error(err);
      setPE(null);
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
      <button onClick={getStockPrice}>Get Price</button>
      <button onClick={getStockPE}>Get PE</button>
      {price && <p>Price: {price}</p>}
      {forward_pe && <p>PE: {forward_pe}</p>}
    </div>
  );
}

export default App;