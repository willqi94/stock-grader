import React, { useState } from "react";

function MetricCard({ name, value }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "15px",
      margin: "10px",
      borderRadius: "8px",
      minWidth: "150px",
      textAlign: "center",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    }}>
      <strong>{name}</strong>
      <p style={{ marginTop: "5px", fontSize: "1.1em" }}>{value}</p>
    </div>
  );
}

function App() {
  const [symbol, setSymbol] = useState("");
  const [metrics, setMetrics] = useState(null);

  const getStockGrade = async () => {
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
    <div style={{
      padding: "30px",
      fontFamily: "Arial, sans-serif",
      maxWidth: "900px",
      margin: "0 auto"
    }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "20px" }}>Stock Grader</h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          style={{
            padding: "10px",
            fontSize: "1em",
            flex: 1,
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={getStockGrade}
          style={{
            padding: "10px 20px",
            fontSize: "1em",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#3498db",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Grade Stock
        </button>
      </div>

      {metrics && (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {Object.entries(metrics).map(([key, value]) => (
            <MetricCard key={key} name={key} value={value} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
