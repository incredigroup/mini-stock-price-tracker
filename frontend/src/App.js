import React, { useState, useEffect } from 'react';
import StockSelector from './components/StockSelector';
import PriceDisplay from './components/PriceDisplay';

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (selectedStock) {
      fetchPrice();
      const interval = setInterval(fetchPrice, 60000); // Fetch price every minute
      return () => clearInterval(interval);
    }
  }, [selectedStock]);

  const fetchStocks = async () => {
    const response = await fetch('/api/stocks');
    const data = await response.json();
    setStocks(data);
  };

  const fetchPrice = async () => {
    const response = await fetch(`/api/stocks/${selectedStock}`);
    const data = await response.json();
    setPrice(data.price);
  };

  const handleStockSelect = (symbol) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="App">
      <h1>Mini Stock Price Tracker</h1>
      <StockSelector stocks={stocks} onSelect={handleStockSelect} />
      {selectedStock && <PriceDisplay symbol={selectedStock} price={price} />}
    </div>
  );
}

export default App;